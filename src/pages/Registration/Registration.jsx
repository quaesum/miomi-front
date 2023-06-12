import {
  Box,
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import AuthService from "../../auth/auth.service";
import { CustomLabelTag } from "../CreateAnimalPage/CreateAnimalPage";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const Registration = ({ login }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);
  const [isRequest, setIsRequest] = useState(false);
  const [phone, setPhone] = useState("");
  const [requestError, setRequestError] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowRepeatPassword = () =>
    setShowRepeatPassword((show) => !show);
  const handleMouseDownRepeatPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmitForm = () => {
    setIsRequest(true);
    const postData = {
      first_name: getValues("name"),
      last_name: getValues("second-name"),
      password: getValues("password"),
      email: getValues("email"),
      phone: `+${getValues("phone-number")}`,
      address: getValues("address"),
    };
    console.log(postData);
    AuthService.signup(
      postData.first_name,
      postData.last_name,
      postData.password,
      postData.email,
      postData.phone,
      postData.address
    )
      .then((res) => {
        login();
      })
      .catch((er) => {
        setIsRequest(false);
        setRequestError(er.message);
      });
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const validationDefaultProps = {
    required: "Обяазательное поле",
    minLength: {
      value: 3,
      message: "Минимальная длина 3 символа",
    },
  };

  return (
    <div className="grid place-content-center h-fit w-full flex-1 py-12 md:py-0 overflow-x-scroll">
      <Card
        sx={{
          width: { sm: "100%", lg: "900px", xs: "100%", borderRadius: "20px" },
          height: { lg: "800px" },
        }}
        className="w-screen"
      >
        <Box className="flex justify-center items-center min-h-80">
          <Typography className="!font-semibold !text-3xl">
            Регистрация
          </Typography>
        </Box>
        <div
          className="h-2 w-full"
          style={{ backgroundColor: "#DCDCDC" }}
        ></div>
        <Box className="flex justify-center min-h-80" sx={{ py: 5, px: 10 }}>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Box
              sx={{
                xs: {display : "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",},
                md: {display : "grid"},
                gridTemplateColumns: "200px 1fr",
                gridTemplateRows: "1fr",
                rowGap: "10px",
                columnGap: "20px",
              }}
              className="flex flex-col items-center justify-center md:grid"
            >
              {/* NAME */}
              <CustomLabelTag text={"Имя"} />
              <Box className="flex flex-col pt-6">
                <TextField
                  sx={{ width: "222px" }}
                  variant="outlined"
                  label="Имя"
                  {...register("name", { ...validationDefaultProps })}
                />
                {errors.name && (
                  <Box sx={{ color: "red" }}>{errors.name.message}</Box>
                )}
              </Box>

              {/* SECOND_NAME */}
              <CustomLabelTag text={"Фамилия"} />
              <Box className="flex flex-col">
                <TextField
                  sx={{ width: "222px" }}
                  variant="outlined"
                  label="Фамилия"
                  {...register("second-name", { ...validationDefaultProps })}
                />
                {errors["second-name"] && (
                  <Box sx={{ color: "red" }}>
                    {errors["second-name"].message}
                  </Box>
                )}
              </Box>

              {/* PASSWORD */}
              <CustomLabelTag text={"Пароль"} />
                  <Box className="flex flex-col pt-6">
                    <FormControl sx={{ width: "222px" }} variant="outlined">
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
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Пароль"
                      />
                    </FormControl>
                    {errors["password"] && (
                      <Box sx={{ color: "red" }}>
                        {errors["password"].message}
                      </Box>
                    )}
                  </Box>

                  {/* REPEAT PASSWORD */}
                  <CustomLabelTag text={"Повторите пароль"} />
                  <Box className="flex flex-col pt-6">
                    <FormControl sx={{ width: "222px" }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password-repeat">
                        Повтор пароля
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password-repeat"
                        type={showRepeatPassword ? "text" : "password"}
                        {...register("repeat-password", {
                          ...validationDefaultProps,
                          validate: (value) => {
                            if (watch("password") !== value) {
                              return "Пароли не сопадают";
                            }
                          },
                        })}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowRepeatPassword}
                              onMouseDown={handleMouseDownRepeatPassword}
                              edge="end"
                            >
                              {showRepeatPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Повтор пароля"
                      />
                    </FormControl>
                    {errors["repeat-password"] && (
                      <Box sx={{ color: "red" }}>
                        {errors["repeat-password"].message}
                      </Box>
                    )}
              </Box>

              {/* EMAIL */}
              <CustomLabelTag text={"Почтовый ящик"} />
              <Box className="flex flex-col">
                <TextField
                  type="email"
                  sx={{ width: "222px" }}
                  {...register("email", {
                    ...validationDefaultProps,
                    pattern: {
                      value:
                        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                      message: "Неверный формат (example@gmail.com)",
                    },
                  })}
                  variant="outlined"
                  label="Почтовый ящик"
                />
                {errors.email && (
                  <Box sx={{ color: "red" }}>{errors.email.message}</Box>
                )}
              </Box>

              {/* PHONE NUMBER */}
              <CustomLabelTag text={"Номер телефона"} />
              <Box className="flex flex-col">
                <PhoneInput
                  country="by"
                  placeholder="375 (29) 000-00-00"
                  {...register("phone-number", {
                    ...validationDefaultProps,
                    minLength: {
                      value: 11,
                      message: "Номер должен состоять минимум из 11 символов",
                    },
                  })}
                  onChange={(e) => {
                    setPhone(e);
                    setValue("phone-number", e);
                  }}
                />
                {phone.length < 11 && (
                  <Box sx={{ color: "red" }}>
                    {errors["phone-number"]?.message}
                  </Box>
                )}
              </Box>

              {/* ADDRESS */}
              <CustomLabelTag text={"Адрес"} />
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
            <Box className="flex justify-center items-center !mt-20 flex-col">
              {requestError && <Box sx={{ color: "red" }}>{requestError}</Box>}
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
                <Typography fontSize={18}>Зарегистрироваться</Typography>
              </LoadingButton>
            </Box>
          </form>
        </Box>
      </Card>
    </div>
  );
};
