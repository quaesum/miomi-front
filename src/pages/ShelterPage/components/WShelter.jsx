import {
  Box,
  Card,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SupportIcon from '@mui/icons-material/Support';
import { EXIT_FROM_SHELTER, GET_USERS_ON_SHELTER_ENDPOINT, UPDATE_SHELTER_ENDPPOINT } from "../../../endpoints";
import authHeader from "../../../auth/auth.headers";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { ModalParticipatiors } from "./ModalParticipator";
import { INVITE_USER_TO_SHELTER } from "../../../endpoints";
import InviteUsersModal from "./ModalAllUsers";

export const WShelter = ({
  data,
  isMobile,
  navigation,
  getShelterByID,
  allUsersInfo,
}) => {
  const [edit, setEdit] = useState(false);
  const [users, setUsers] = useState()
  const [openModal, setOpenModal] = useState(false);
  const [isRequest, setIsRequest] = useState(false);
  const [phone, setPhone] = useState(data?.phone);
  const [openUsersModal, setOpenUsersModal] = useState(false)

  const exitFromShelter = async () => {
    await axios.post(EXIT_FROM_SHELTER, {}, { headers: authHeader() });
    navigation('/');
  }

  const handeInviteUserToShelter = async (id) => {
    await axios.post(`${INVITE_USER_TO_SHELTER}${id}`, {shelterID: data.id}, {headers: authHeader()})
  }

  const getShelterParticipators = async () => {
    await axios.post(`${GET_USERS_ON_SHELTER_ENDPOINT}${data.id}`, {}, { headers: authHeader() }).then((res) => {
      setUsers(res.data)
    });
  };

  const handleChangeEdit = (e, state) => {
    setEdit(e, state);
    console.log(e, state)
  };

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: data.name,
      description: data.description,
      phone: data?.phone,
      address: data?.address,
    },
  });

  useEffect(() => {
    getShelterParticipators()
  }, [data, edit])

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseUsersModal = () => {
    setOpenUsersModal(false);
  };

  const handleOpenUsersModal = () => {
    setOpenUsersModal(true);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleSubmitForm = async () => {
    setIsRequest(true);
    const postData = {
      name: getValues("name"),
      description: getValues("description"),
      phone: `+${getValues("phone")}`,
      address: getValues("address"),
    };
    console.log(postData)
    await axios.post(`${UPDATE_SHELTER_ENDPPOINT}${data.id}`, {...postData}, {headers: authHeader()}).then((res) =>{
      setIsRequest(false);
      handleChangeEdit(false)
      getShelterByID(data.id)
    })
  };

  const validationDefaultProps = {
    required: "Обязательное поле",
    minLength: {
      value: 3,
      message: "Минимальная длина 3 символа",
    },
  };


  return (
    <>
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
        <Box
          className={`items-center min-h-80 py-12 flex flex-col`}
        >
          <div className={`${edit ? "hidden" : "block"} items-center flex flex-col`}>
            <SupportIcon sx={{ width: "36px", height: "36px" }} />
          <Typography fontSize={20} className="flex justify-center items-center">{data?.name}
          </Typography>
          <Typography textAlign={"center"} fontSize={20}>{data?.description}</Typography>
          <Typography fontSize={20}>{data?.addres}</Typography>
          <Typography fontSize={20}>{data?.phone}</Typography>
          <Button
            className="!mt-20"
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
          </div>

          {/* Редактируемые поля */}
          <div className={`items-center min-h-80 py-12 ${edit ? "flex flex-col" : "hidden"}`}>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Box className="flex flex-col space-y-24">
              <Box className="flex flex-col justify-center">
                <TextField
                  label="Название"
                  {...register("name", { ...validationDefaultProps })}
                />
                {errors.name && (
                  <Box sx={{ color: "red" }}>{errors.name.message}</Box>
                )}
              </Box>
              <Box className="flex flex-col justify-center">
                <TextField
                  label="Описание"
                  {...register("description", { ...validationDefaultProps })}
                />
                {errors.description && (
                  <Box sx={{ color: "red" }}>{errors.description.message}</Box>
                )}
              </Box>
              <Box className="flex flex-col">
                <PhoneInput
                  country="by"
                  placeholder="375 (29) 000-00-00"
                  {...register("phone", {
                    ...validationDefaultProps,
                    minLength: {
                      value: 11,
                      message: "Номер должен состоять минимум из 11 символов",
                    },
                  })}
                  onChange={(e) => {
                    setPhone(e);
                    setValue("phone", e);
                  }}
                />
                {phone.length < 11 && (
                  <Box sx={{ color: "red" }}>
                    {errors["phone"]?.message}
                  </Box>
                )}
              </Box>
              <Box className="flex flex-col justify-center">
              <Box className="flex flex-col">
                <TextField
                  sx={{ width: "222px" }}
                  {...register("address", { ...validationDefaultProps })}
                  type="text"
                  variant="outlined"
                  label="Адрес"
                />
                {errors.address && (
                  <Box sx={{ color: "red" }}>{errors.address.message}</Box>
                )}
              </Box>
              </Box>
            </Box>
            <Box className="flex justify-center items-center !mt-20 flex-col">
              <LoadingButton
                loading={isRequest}
                type="submit"
                variant="contained"
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
            </Box>
          </form>
          </div>
          <div className={`${edit ? "hidden" : "flex flex-col"}`}>
          <Button
            className={`${edit ? "hidden" : "block"} !mt-8`}
            onClick={handleOpenModal}
            variant="contained"
            sx={{
              borderRadius: "8px",
              padding: "5px 60px",
              backgroundColor: "#4CAF50",
              color: "white",
              "&:hover": { backgroundColor: "#388E3C" },
            }}
          >
            <Typography fontSize={18}>Просмотреть участников</Typography>
          </Button>
          <Button
            className={`${edit ? "hidden" : "block"} !mt-8`}
            onClick={handleOpenUsersModal}
            variant="contained"
            sx={{
              borderRadius: "8px",
              padding: "5px 60px",
              backgroundColor: "#4CAF50",
              color: "white",
              "&:hover": { backgroundColor: "#388E3C" },
            }}
          >
            <Typography fontSize={18}>Пригласить участников</Typography>
          </Button>
          <Button
            className={`${edit ? "hidden" : "block"} !mt-8`}
            onClick={() => exitFromShelter()}
            variant="contained"
            sx={{
              borderRadius: "8px",
              padding: "5px 60px",
              backgroundColor: "#DADAD9",
              color: "black",
              "&:hover": { backgroundColor: "#F2F2F2" },
            }}
          >
            <Typography fontSize={18}>Покинуть приют</Typography>
          </Button>
          </div>
        </Box>
      </Card>
      <Box className={edit ? "hidden" : 'md:hidden grid place-content-center pt-24'}>
        <Box className="bg-white rounded-full flex items-center justify-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-grey duration-300 " height={50} width={50} onClick={() => navigation('/')}>
          <HomeIcon fontSize="large" />
        </Box>
      </Box>
     <ModalParticipatiors
     users={users}
     handleCloseModal={handleCloseModal}
     openModal={openModal}
     />
     <InviteUsersModal
     users={allUsersInfo}
     handleCloseModal={handleCloseUsersModal}
     handleInvite={handeInviteUserToShelter}
     openUsersModal={openUsersModal}
     />
    </>
  )
}
