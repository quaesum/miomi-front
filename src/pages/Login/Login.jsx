import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import AuthService from "../../auth/auth.service";
import { useNavigate } from "react-router";
import { useMobile } from "../../hooks/useMobile";
import { Link } from "react-router-dom";

const btnStyle = {
  borderRadius: "10px",
  padding: "2px 50px",
  width: "100%",
};

export const Login = ({ login, setIsLogin }) => {
  const isMobile = useMobile();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [errorsRequest, setErrorsRequest] = useState("");
  const [isRequest, setIsRequest] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const user = localStorage.getItem("user");

  useEffect(() => {
    if (user) setIsLogin(true);
    else setIsLogin(false);
  }, [user, setIsLogin]);

  const handleSubmitForm = () => {
    setIsRequest(true);
    AuthService.login(getValues("email"), getValues("password"))
      .then((res) => {
        login();
      })
      .catch((er) => {
        setIsRequest(false);
        setErrorsRequest(er.message);
      });
  };

  const validationDefaultProps = {
    required: "Обязательное поле",
    minLength: {
      value: 3,
      message: "Минимальная длина 3 символа",
    },
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  return (
    <div
      className={`grid place-content-center h-fit w-full flex-1 pt-24 ${
        isMobile ? "" : "pb-80"
      } `}
    >
      <Card
        sx={{
          width: { sm: "100%", lg: "650px", xs: "100%" },
          borderRadius: { lg: 10 },
        }}
        className="w-screen"
      >
        <Box className="flex justify-center items-center min-h-80">
          <Typography className="!font-semibold !text-3xl">Вход</Typography>
        </Box>
        <div
          className="h-2 w-full"
          style={{ backgroundColor: "#DCDCDC" }}
        ></div>
        <Box className="flex justify-center items-center min-h-80">
          <form
            action="submit"
            className="flex flex-col items-center w-full px-20 py-20"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            {/* EMAIL */}
            <Box
              className="flex flex-col !mb-10"
              sx={{ width: { lg: 400, xs: "100%" } }}
            >
              <TextField
                sx={{ width: "100%" }}
                className="w-full"
                id="outlined-basic"
                label="Почтовый ящик"
                variant="outlined"
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

            {/* PASSWORD */}
            <Box sx={{ width: { lg: 400, xs: "100%" } }}>
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Пароль
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", { ...validationDefaultProps })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Пароль"
                />
              </FormControl>
              {errors.password && (
                <Box sx={{ color: "red" }}>{errors.password.message}</Box>
              )}
            </Box>
            <Box className="mt-8">
              <Typography component={Link} to={"/forgot-password"} className="text-blue">Забыли пароль?</Typography>
            </Box>

            <Box className="!mt-20 flex flex-col">
              {errorsRequest && (
                <Typography
                  className="flex justify-center"
                  sx={{ color: "red" }}
                >
                  {errorsRequest}
                </Typography>
              )}
              <LoadingButton
                loading={isRequest}
                type="submit"
                variant="contained"
                sx={{
                  borderRadius: "8px",
                  padding: "5px 60px",
                  backgroundColor: "#EE7100",
                  "&:hover": { backgroundColor: "#ee6f00d2" },
                }}
              >
                <Typography fontSize={18}>Продолжить</Typography>
              </LoadingButton>
              <Button
                sx={{
                  ...btnStyle,
                  "&:hover": {
                    backgroundColor: "#DCDCDC",
                    border: "2px solid #DCDCDC",
                  },
                  borderRadius: "10px",
                  color: "#6A6D76",
                  border: "2px solid #DCDCDC",
                }}
                onClick={() => navigate("/registration")}
                className="!mt-4 !text-sm !normal-case"
                type="submit"
                variant="outlined"
              >
                Регистрация
              </Button>
            </Box>
          </form>
        </Box>
      </Card>
    </div>
  );
};
