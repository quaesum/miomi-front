// ProfilePage.js
import {
  Box,
  Card,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import axios from "axios";
import { useNavigate } from "react-router";
import userService from "../../auth/user.service";
import authService from "../../auth/auth.service";
import authHeader from "../../auth/auth.headers";
import {
  ACCEPT_INVITATION_ENDPOINT,
  APPROVE_SHELTER_REQUEST_ENDPOINT,
  REJECT_INVITATION_ENDPOINT,
  REJECT_SHELTER_REQUEST_ENDPOINT,
  GET_SHELTERS_REQUESTS_ENDPOINT,
  EMAIL_CONFIRM_ENDPOINT,
  GET_ANIMALS_ENDPOINT,
  GET_ALL_REPORTS_ENDPOINT
} from "../../endpoints";
import { ModalInvitation } from "./components/ModalInvitations";
import { styled } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import { useMobile } from "../../hooks/useMobile";
import { Animals } from "../../components/Animals/Animals";
import BurgerMenu from "./components/Burger";
import ReportsModal from "./components/Reports";

const StyledPhoneInput = styled(PhoneInput)`
  .form-control {
    width: 245px !important;
    height: 56px !important;
  }
`;

const schema = yup.object().shape({
  name: yup.string().required('Введите имя.').min(2, 'Минимально 2 символа'),
  secondName: yup.string().required('Введите фамилию.').min(2, 'Минимально 2 символа'),
  email: yup
    .string()
    .required('Введите адрес электронной почты.')
    .test('Email', 'Неверный формат (example@post.com).', value =>
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(value)
    ),
  phone: yup.string().length(12, 'Введите 12 цифр.').required('Введите номер.')
});

export default function ProfilePage({ data, updateUserInfo, logout, avatarUrl, isAdmin, invitations, getInvitations }) {
  const [edit, setEdit] = useState(false);
  const [requestError, setRequestError] = useState("");
  const [isRequest, setIsRequest] = useState(false);
  const navigation = useNavigate();
  const [open, setOpen] = useState(false);
  const [shelterRequests, setShelterRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [errorRequests, setErrorRequests] = useState("");
  const [openShelters, setOpenShelters] = useState(false);
  const [openInvitations, setOpenInvitations] = useState(false);
  const [animalsData, setAnimalsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [reportsOpen, setReportsOpen] = useState(false);
  const menuOpen = Boolean(anchorEl);
  const [reports, setReports] = useState();

  const handleCloseReports = () => {
    setReportsOpen(false)
  };

  const handleOpenReports = () => {
    updateReports()
    setReportsOpen(true)
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleIncrementPage = () => {
    let page = currentPage + 1
    setCurrentPage(page);
    updateAnimals(page)
  };

  const handleDecrementPage = () => {
    let page = currentPage - 1
    setCurrentPage(page);
    updateAnimals(page)
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const updateAnimals = (page) => {
    axios.post(GET_ANIMALS_ENDPOINT, { request: "", page: page, per_page: 21, filters: { shelterId: [data.shelter_id] } }, { headers: authHeader() })
      .then((response) => {
        setAnimalsData(response?.data.animals);
        setMaxPage(response?.data.max_page)
      })
  }

  const handleClickExit = () => {
    authService.logout();
    logout();
  };

  const handleClickOpenShelters = () => {
    setOpenShelters(true);
  };

  const updateReports = () => {
    axios.get(GET_ALL_REPORTS_ENDPOINT, {headers: authHeader()}).then((res) => {
      setReports(res.data.reports)
    })
  }

  const convertToTime = (unix) => {
    var date = new Date(unix * 1000);
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = day + "." + month + "." + year + " " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
  };

  const handleCloseShelters = () => {
    setOpenShelters(false);
  };

  const handleCloseInvitations = () => {
    setOpenInvitations(false);
  };

  const handleOpenInvitations = () => {
    setOpenInvitations(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAccept = () => {
    setOpen(false);
    axios.post(EMAIL_CONFIRM_ENDPOINT, {}, { headers: authHeader() });
  };

  const handleAcceptInvitation = async (id) => {
    setOpenInvitations(false);
    await axios.post(`${ACCEPT_INVITATION_ENDPOINT}${id}`, {}, { headers: authHeader() });
    getInvitations();
    updateUserInfo()
  };

  const handleRejectInvitation = async (id) => {
    setOpenInvitations(false);
    await axios.post(`${REJECT_INVITATION_ENDPOINT}${id}`, {}, { headers: authHeader() });
    getInvitations();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getShelterRequests = () => {
    setLoadingRequests(true);
    axios
      .get(GET_SHELTERS_REQUESTS_ENDPOINT, { headers: authHeader() })
      .then((response) => {
        setShelterRequests(response.data.data);
        setLoadingRequests(false);
      })
      .catch((error) => {
        setErrorRequests(error.message);
        setLoadingRequests(false);
      });
  };

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: data.firstName,
      secondName: data.lastName,
      email: data.email,
      phone: data.phone,
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
    criteriaMode: 'all'
  });

  useEffect(() => {
    setValue("email", data.email);
    setValue("name", data.firstName);
    setValue("secondName", data.lastName);
    setValue("phone", data.phone);
  }, [edit]);

  const handleAcceptRequest = (id) => {
    axios.post(`${APPROVE_SHELTER_REQUEST_ENDPOINT}${id}`, {}, { headers: authHeader() });
    getShelterRequests();
  };

  const handleRejectRequest = (id) => {
    axios.post(`${REJECT_SHELTER_REQUEST_ENDPOINT}${id}`, {}, { headers: authHeader() });
    getShelterRequests();
  };

  useEffect(() => {
    isAdmin && getShelterRequests();
  }, [updateUserInfo, isAdmin]);

  useEffect(() => {
    if (!isRequest) {
      updateUserInfo();
    }
  }, [isRequest]);

  useEffect(() => {
    updateAnimals()
    isAdmin && updateReports()
  }, [navigation]);

  const handleSubmitForm = () => {
    setIsRequest(true);
    console.log(getValues());
    let postData = {
      first_name: getValues('name'),
      last_name: getValues('secondName'),
      email: getValues("email"),
      phone: getValues("phone")
    };
    userService
      .chageUserIformation(postData)
      .then((res) => {
        setIsRequest(false);
        setEdit(false);
      })
      .catch((er) => {
        setRequestError(er.message);
        setIsRequest(false);
      });
  };

  const handleChangeEdit = (e, state) => {
    setEdit(e, state);
  };

  return (
    <div className={`grid place-content-center h-fit w-full mt-24 flex-1 ${edit ? "pb-20" : "pb-80"}`}>
      <Card
        sx={{
          maxWidth: {
            lg: "1240px",
            borderRadius: "20px",
          },
          minWidth: {
            lg: "1000px"
          }
        }}
      >
        <Box className={`flex justify-between items-center min-h-80 px-24 p-12 ${useMobile() ? "flex-col" : "flex-row"}`}>
          {edit ? (
            <form onSubmit={handleSubmit(handleSubmitForm)} className="grid place-content-center gap-6 flex-1 mt-5">
              <TextField
                error={!!errors.name}
                label="Имя"
                {...register('name')}
                helperText={errors?.name?.message}
                autoComplete="off"
              />
              <TextField
                error={!!errors.secondName}
                label="Фамилия"
                {...register('secondName')}
                helperText={errors?.secondName?.message}
                autoComplete="off"
              />
              <TextField
                error={!!errors.email}
                label="Email"
                {...register('email')}
                helperText={errors?.email?.message}
                autoComplete="off"
              />
              <StyledPhoneInput
                country="by"
                countryCodeEditable={false}
                onlyCountries={["by"]}
                placeholder="375 (29) 000-00-00"
                {...register("phone")}
                onChange={(e) => {
                  setValue("phone", e);
                }}
              />
              {errors.phone && (
                <Box sx={{ color: "red" }}>
                  {errors["phone"]?.message}
                </Box>
              )}
              {requestError && <Box sx={{ color: "red" }}>{requestError}</Box>}
              <LoadingButton
                loading={isRequest}
                type="submit"
                variant="contained"
                onClick={() => handleSubmit()}
                sx={{
                  borderRadius: "8px",
                  padding: "5px 40px",
                  backgroundColor: "#EE7100",
                  "&:hover": { backgroundColor: "#ee6f00d2" },
                }}
              >
                <Typography fontSize={18}>Сохранить</Typography>
              </LoadingButton>
              <Button
                type="reset"
                onClick={() => handleChangeEdit(false)}
              >Назад
              </Button>
            </form>
          ) : (
            <Box className="flex flex-row items-center justify-center">
              <Avatar sx={{ width: 100, height: 100 }} className="m-4 mr-8" alt="User Avatar" src={avatarUrl} />
              <Box className="flex flex-col">
                <Typography component="h1" variant="h5" className="mt-2">
                  {data?.firstName} {data?.lastName}
                  {invitations?.data?.length > 0  && <Tooltip title="Новые приглашения">
                    <IconButton onClick={() => {handleOpenInvitations(); console.log('click')}} >
                    <MarkEmailUnreadOutlinedIcon sx={{ width: "30px", height: "30px" }} className="cursor-pointer" color="info"/>
                    </IconButton>
                  </Tooltip>}
                </Typography>
                <Typography fontSize={20} className="flex fustify-center items-center">{data?.email}
                  {!data?.isVerified && <Tooltip title="Требуется подтверждение" onClick={() => handleClickOpen()}>
                    <WarningAmberIcon className="pl-4 text-orange cursor-pointer" sx={{ width: "32px", height: "32px" }} />
                  </Tooltip>}
                </Typography>
                <Typography className="mt-2">{data?.phone}</Typography>
                <Typography className="mt-2">{data?.address}</Typography>
              </Box>

            </Box>
          )}

          {!edit && <Box>
            <Tooltip title="Домашняя страница" placement="top">
              <IconButton onClick={() => navigation("/")} size="large" className="m-1 mr-2 text-blue-600">
                <HomeIcon />
              </IconButton>
            </Tooltip>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleMenuClick}
              size="large"
              className="m-1 mr-2 text-blue-600"
            >
              <MenuIcon />
            </IconButton>
            <BurgerMenu
              isAdmin={isAdmin}
              handleOpenReports={handleOpenReports}
              anchorEl={anchorEl}
              menuOpen={menuOpen}
              handleMenuClose={handleMenuClose}
              setEdit={setEdit}
              handleClickOpenShelters={handleClickOpenShelters}
              handleClickExit={handleClickExit}
              isAdmin={isAdmin}
            />
          </Box>}
        </Box>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Подтверждение почты</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Мы отправили письмо на вашу почту для подтверждения. Проверьте ваш почтовый ящик.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Закрыть</Button>
            <Button onClick={handleAccept} autoFocus>
              Подтвердить
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openShelters} onClose={handleCloseShelters} className="min-w-200" PaperProps={{style: {alignItems: "center"}}}>
          <DialogTitle>Запросы на подтверждение</DialogTitle>
          <DialogContent>
            {loadingRequests ? (
              <Typography>Загрузка...</Typography>
            ) : errorRequests ? (
              <Typography color="error">{errorRequests}</Typography>
            ) : (
              shelterRequests ? (shelterRequests.map((request) => (
                <Box key={request.id} className="p-12 justify-between flex flex-col" sx={{width: "270px", height:"200px"}}>
                      <div>
                      <Typography>{`${request?.user.firstName} ${request.user.lastName}`}</Typography>
                      <Typography>{request?.shelter.name}</Typography>
                      <Typography>{request?.shelter.description}</Typography>
                      <Typography>{convertToTime(request?.createdAt)}</Typography>
                      </div>
                      <div className="flex justify-between space-x-4 self-end">
                      <Button onClick={() => handleAcceptRequest(request?.shelter.id)} variant="contained" color="primary">Принять</Button>
                      <Button onClick={() => handleRejectRequest(request?.shelter.id)} variant="contained" color="secondary">Отклонить</Button>
                      </div>
                    </Box>
              )))
                : (
                  <Typography>Нет входящих запросов</Typography>
                )
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseShelters}>Закрыть</Button>
          </DialogActions>
        </Dialog>

        <ModalInvitation
          isOpen={openInvitations}
          handleClose={handleCloseInvitations}
          handleAccept={handleAcceptInvitation}
          handleReject={handleRejectInvitation}
          data={invitations}
        />

        {isAdmin &&<ReportsModal
        requests={reports}
        isOpen={reportsOpen}
        onClose={handleCloseReports}
        updateReports={updateReports}
        />}

        {/* Render Animals Component */}
        {!edit && <Box mt={4}>
          <Animals
            prev={"/profile"}
            animals={animalsData}
            currentAnimalPage={currentPage}
            handleDecrementPage={handleDecrementPage}
            handleIncrementPage={handleIncrementPage}
            maxAnimalsPages={maxPage}
          />
        </Box>}
      </Card>
    </div>
  );
}