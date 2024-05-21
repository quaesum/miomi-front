import {
  Box,
  Card,
  Typography,
  Avatar,
  TextField,
  Button,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import userService from "../../auth/user.service";
import { useNavigate } from "react-router";
import { LoadingButton } from "@mui/lab";
import HomeIcon from '@mui/icons-material/Home';
import { useMobile } from "../../hooks/useMobile"
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { ACCEPT_INVITATION_ENDPOINT, APPROVE_SHELTER_REQUEST_ENDPOINT, EMAIL_CONFIRM_ENDPOINT, REJECT_INVITATION_ENDPOINT, REJECT_SHELTER_REQUEST_ENDPOINT } from "../../endpoints";
import authHeader from "../../auth/auth.headers";
import axios from "axios";
import authService from "../../auth/auth.service";
import { GET_SHELTERS_REQUESTS_ENDPOINT } from "../../endpoints";
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import { ModalInvitation } from "./components/ModalInvitations";

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
  const [openInvitations, setOpenInvitations] = useState(false)

  const handleClickOpenShelters = () => {
    setOpenShelters(true)
  }

  const convertToTime = (unix) => {
    var date = new Date(unix * 1000)
    var day = date.getDate()
    var month = date.getMonth()
    var year = date.getFullYear()
    var hours = date.getHours()
    var minutes = "0" + date.getMinutes()
    var seconds = "0" + date.getSeconds()
    var formattedTime = day + "." + month + "." + year + " " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
    return formattedTime
  }

  const handleCloseShelters = () => {
    setOpenShelters(false)
  }

  const handleCloseInvitations = () => {
    setOpenInvitations(false)
  }

  const handleOpenInvitations = () => {
    setOpenInvitations(true)
  }

  const handleClickExit = () => {
    authService.logout();
    logout()
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAccept = () => {
    setOpen(false);
    axios.post(EMAIL_CONFIRM_ENDPOINT, {}, { headers: authHeader() })
  };

  const handleAcceptInvitation = async (id) => {
    setOpenInvitations(false)
    await axios.post(`${ACCEPT_INVITATION_ENDPOINT}${id}`, {}, { headers: authHeader() })
    getInvitations()
  }

  const handleRejectInvitation = async (id) => {
    setOpenInvitations(false)
    await axios.post(`${REJECT_INVITATION_ENDPOINT}${id}`, {},  { headers: authHeader() })
    getInvitations()
  }


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
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
    },
  });

  

  useEffect(() => {
    setValue("email", data.email);
    setValue("last_name", data.lastName);
    setValue("first_name", data.firstName);
  }, [edit]);

  const handleAcceptRequest = (id) => {
    axios.post(`${APPROVE_SHELTER_REQUEST_ENDPOINT}${id}`, { headers: authHeader() })
    getShelterRequests()
  };

  const handleRejectRequest = (id) => {
    axios.post(`${REJECT_SHELTER_REQUEST_ENDPOINT}${id}`, { headers: authHeader() })
    getShelterRequests()
  };

  useEffect(() => {
    isAdmin && getShelterRequests()
  }, [updateUserInfo, isAdmin]);


  useEffect(() => {
    if (!isRequest) {
      updateUserInfo();
    }
  }, [isRequest]);

  const handleSubmitForm = () => {
    setIsRequest(true);
    console.log(getValues());
    userService
      .chageUserIformation(getValues())
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

  const validationDefaultProps = {
    required: "Обязательное поле",
    minLength: {
      value: 3,
      message: "Минимальная длина 3 символа",
    },
  };

  const isMobile = useMobile()

  return (
    <div className={`grid place-content-center h-fit w-full mt-24 flex-1 ${edit ? "pb-20" : "pb-80"}`}>
      <Card
        sx={{
          width: {
            sm: "400px",
            lg: "650px",
            xs: "400px",
            borderRadius: "20px",
          },
        }}
        className={isMobile && `!w-screen`}
      >
        <Box className="flex justify-center items-center min-h-80">
          <Avatar sx={{ width: 100, height: 100 }} src={`${avatarUrl && avatarUrl}`} />
        </Box>
        <Box
          className={`items-center min-h-80 pb-12 ${edit ? "hidden" : "flex flex-col"
            }`}
        >
          <Typography fontSize={24} fontWeight="bold">
            {data?.firstName} {data?.lastName}  
            {invitations.lenght > 0 && <Tooltip title="Новые приглашения">
              <MarkEmailUnreadOutlinedIcon sx={{width: "30px", height: "30px"}}className="cursor-pointer" color="info" onClick={() => handleOpenInvitations()}/>
            </Tooltip>}
          </Typography>
          <Typography fontSize={20} className="flex fustify-center items-center">{data?.email}
            {!data?.isVerified && <Tooltip title="Требуется подтверждение" onClick={() => handleClickOpen()}>
              <WarningAmberIcon className="pl-4 text-orange cursor-pointer" sx={{ width: "32px", height: "32px" }} />
            </Tooltip>}
          </Typography>
          <Typography fontSize={20}>{data?.phone}</Typography>
          <Typography fontSize={20}>{data?.addres}</Typography>
          <Button
            className={`${edit ? "hidden" : "block"} !mt-20`}
            onClick={() => handleChangeEdit(true)}
            variant="contained"
            sx={{
              borderRadius: "8px",
              padding: "5px 60px",
              backgroundColor: "#EE7100",
              "&:hover": { backgroundColor: "#ee6f00d2" },
            }}
          >
            <Typography fontSize={18}>Изменить</Typography>
          </Button>
          {isAdmin&& <Button
            className={`block !mt-8 ${edit ? "invisible" : "block"}`}
            onClick={handleClickOpenShelters}
            variant="contained"
            sx={{
              borderRadius: "8px",
              padding: "5px 60px",
              color: "black",
              backgroundColor: "white",
              "&:hover": { backgroundColor: "gray" },
            }}
          >
            <Typography fontSize={18}>Запросы на подтверждение</Typography>
          </Button>}
          <ModalInvitation
          data={invitations}
          isOpen={openInvitations}
          handleClose={handleCloseInvitations}
          handleAccept={handleAcceptInvitation}
          handleReject={handleRejectInvitation}
          />
          <Button
            className={`${edit ? "hidden" : "block"} !mt-8`}
            onClick={() => handleClickExit()}
            variant="contained"
            sx={{
              borderRadius: "8px",
              padding: "5px 60px",
              color: "black",
              backgroundColor: "white",
              "&:hover": { backgroundColor: "gray" },
            }}
          >
            <Typography fontSize={18}>Выйти</Typography>
          </Button>
        </Box>
        <Box
          className={`${edit ? "flex flex-col" : "hidden"
            } items-center min-h-80 pb-12`}
        >
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Box className="flex flex-col space-y-24">
              <Box className="flex flex-col justify-center">
                <TextField
                  label="Имя"
                  {...register("first_name", { ...validationDefaultProps })}
                />
                {errors.first_name && (
                  <Box sx={{ color: "red" }}>{errors.first_name.message}</Box>
                )}
              </Box>
              <Box className="flex flex-col justify-center">
                <TextField
                  label="Фамилия"
                  {...register("last_name", { ...validationDefaultProps })}
                />
                {errors.last_name && (
                  <Box sx={{ color: "red" }}>{errors.last_name.message}</Box>
                )}
              </Box>
              <Box className="flex flex-col justify-center">
                <TextField
                  label="Эл. почта"
                  {...register("email", {
                    ...validationDefaultProps,
                    pattern: {
                      value:
                        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                      message: "Неверный формат (example@gmail.com)",
                    },
                  })}
                />
                {errors.email && (
                  <Box sx={{ color: "red" }}>{errors.email.message}</Box>
                )}
              </Box>
            </Box>
            <Box className="flex justify-center items-center !mt-20 flex-col">
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
            </Box>
          </form>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {`Отправить подтверждение на почту?`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                После принятия, проверьте входящие на {data.email}, в том числе папку "спам"
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAccept}>Принять</Button>
              <Button onClick={handleClose} autoFocus>
                Отмена
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openShelters}
            onClose={handleCloseShelters}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>Список запросов на подтверждение</DialogTitle>
            <DialogContent>
              {loadingRequests ? (
                <Typography>Loading...</Typography>
              ) : errorRequests ? (
                <Typography color="error">{errorRequests}</Typography>
              ) : (
                <Box className="flex flex-row">
                  {shelterRequests?.map((request) => (
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
                  ))}
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseShelters} color="primary">
                Закрыть
              </Button>
            </DialogActions>
          </Dialog>

        </Box>
      </Card>
      <Box className={edit ? "hidden" : 'md:hidden grid place-content-center pt-24'}>
        <Box className="bg-white rounded-full flex items-center justify-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-grey duration-300 " height={50} width={50} onClick={() => navigation('/')}>
          <HomeIcon fontSize="large" />
        </Box>
      </Box>
    </div>
  );
}