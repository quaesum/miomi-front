import {
  Box,
  Card,
  Typography,
  Avatar,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import userService from "../../auth/user.service";
import { useNavigate } from "react-router";
import { LoadingButton } from "@mui/lab";
import HomeIcon from '@mui/icons-material/Home';

export default function ProfilePage({ data, updateUserInfo }) {
  const [edit, setEdit] = useState(false);
  const [requestError, setRequestError] = useState("");
  const [isRequest, setIsRequest] = useState(false);
  const navigation = useNavigate();

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

  console.log(errors);

  const validationDefaultProps = {
    required: "Обяазательное поле",
    minLength: {
      value: 3,
      message: "Минимальная длина 3 символа",
    },
  };

  return (
    <div className="grid place-content-center h-screen w-full flex-1 pb-80">
      <Card
        sx={{
          width: {
            sm: "400px",
            lg: "650px",
            xs: "400px",
            borderRadius: "20px",
          },
        }}
        className="w-screen"
      >
        <Box className="flex justify-center items-center min-h-80">
          <Avatar sx={{ width: 100, height: 100 }} />
        </Box>
        <Box
          className={`items-center min-h-80 pb-12 ${edit ? "hidden" : "flex flex-col"
            }`}
        >
          <Typography fontSize={24} fontWeight="bold">
            {data?.firstName} {data?.lastName}
          </Typography>
          <Typography fontSize={20}>{data?.email}</Typography>
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
        </Box>
      </Card>
      <Box className='md:hidden grid place-content-center pt-24'>
        <Box className="bg-white rounded-full flex items-center justify-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-grey duration-300 " height={50} width={50} onClick={() => navigation('/')}>
        <HomeIcon fontSize="large" />
        </Box>
      </Box>
    </div>
  );
}
