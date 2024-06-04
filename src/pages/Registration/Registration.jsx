import {
  Box,
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
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import AuthService from "../../auth/auth.service";
import { CustomLabelTag } from "../CreateAnimalPage/CreateAnimalPage";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router";
import { useMobile } from "../../hooks/useMobile";

export const Registration = ({ login }) => {
  const navigate = useNavigate();
  const isMobile = useMobile();

  const schema = yup.object().shape({
  name: yup.string().required('Введите имя.').min(2, 'Минимально 2 символа'),
	secondName: yup.string().required('Введите фамилию.').min(2, 'Минимально 2 символа'),
	email: yup
		.string()
		.required('Введите адрес электронной почты.')
    .test('Email', 'Неверный формат (example@post.com).', value =>
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(value)
    ),
	password: yup
		.string()
		.required('Введите пароль.')
		.min(8, 'Не менее 8 симв.')
		.matches(/(?=.*[!@#$%^&*_0-9])[0-9a-zA-Z!@#$%^&*]/g, 'Используйте цифры (0-9) или символы.')
		.test('Letters1', 'Используйте строчные и заглавные буквы (a-zA-Z).', value =>
			/(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]/.test(value)
		),
	passwordConfim: yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают.'),
	phone: yup.string().length(12, 'Введите 12 цифр.').required('Введите номер.'),
  address: yup.string().required('Введите адрес.'),
  acceptTermsConditions: yup
		.boolean()
		.oneOf([true], 'Условия пользования и Политика конфиденциальности должны быть приняты.')
});

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
      last_name: getValues("secondName"),
      password: getValues("password"),
      email: getValues("email"),
      phone: `+${getValues("phone")}`,
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
        if (er.response.data.error == "user exist") {
          setRequestError("Почтовый адрес уже зарегестрирован")
        } else {
          setRequestError(er.message);
        }
        console.log(er)
      });
  };

  const methods = useForm({
		mode: 'onChange',
		defaultValues: '',
		resolver: yupResolver(schema),
		criteriaMode: 'all'
	});

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
  } = methods;

  const validationDefaultProps = {
    required: "Обязательное поле",
    minLength: {
      value: 3,
      message: "Минимальная длина 3 символа",
    },
  };

  return (
    <div className="grid place-content-center w-full flex-1 overflow-scroll py-24 md:max-w-900">
      <Card
        sx={{
          width: { sm: "100%", md: "900px", xs: "100%" },
          borderRadius: { lg: 10, xs: 0 },
          marginTop: { xs: 0.45 },
          minHeight: { lg: "800px" },
          background: "transparent"
        }}
        className="w-screen"
      >
        <Box className="flex justify-center items-center min-h-80 bg-white">
          <Typography className="!font-semibold !text-3xl">
            Регистрация
          </Typography>
        </Box>
        <div
          className="h-2 w-full"
          style={{ backgroundColor: "transparent" }}
        ></div>
        <Box className="flex justify-center min-h-80 bg-white" sx={{ py: 5, px: 10 }}>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Box
              sx={{
                xs: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                },
                md: { display: "grid"},
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
                  {...register("name")}
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
                  {...register("secondName")}
                />
                {errors["secondName"] && (
                  <Box sx={{ color: "red" }}>
                    {errors["secondName"].message}
                  </Box>
                )}
              </Box>

              {/* PASSWORD */}
              <CustomLabelTag text={"Пароль"} />
              <Box className="flex flex-col pt-6" sx={{ width: "222px" }}>
                <FormControl sx={{ width: "222px" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Пароль
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
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
                {errors["password"] && (
                  <Box sx={{ color: "red" }}>{errors["password"].message}</Box>
                )}
              </Box>

              {/* REPEAT PASSWORD */}
              <CustomLabelTag text={"Повторите пароль"} />
              <Box className="flex flex-col pt-6" sx={{ width: "222px" }}>
                <FormControl sx={{ width: "222px" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password-repeat">
                    Повтор пароля
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password-repeat"
                    type={showRepeatPassword ? "text" : "password"}
                    {...register("passwordConfim")}
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
                {errors["passwordConfim"] && (
                  <Box sx={{ color: "red" }}>
                    {errors["passwordConfim"].message}
                  </Box>
                )}
              </Box>

              {/* EMAIL */}
              <CustomLabelTag text={"Почтовый ящик"} />
              <Box className="flex flex-col pt-6" sx={{ width: "222px" }}>
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
                  countryCodeEditable={false}
                  onlyCountries={["by"]}
                  placeholder="375 (29) 000-00-00"
                  {...register("phone")}
                  onChange={(e) => {
                    setPhone(e);
                    setValue("phone", e);
                  }}
                />
                {errors.phone && (
                  <Box sx={{ color: "red" }}>
                    {errors["phone"]?.message}
                  </Box>
                )}
              </Box>

              {/* ADDRESS */}
              <CustomLabelTag text={"Адрес"} />
              <Box className="flex flex-col">
                <TextField
                  sx={{ width: "222px" }}
                  {...register("address")}
                  type="text"
                  variant="outlined"
                  label="Адрес"
                />
                {errors.address && (
                  <Box sx={{ color: "red" }}>{errors.address.message}</Box>
                )}
              </Box>

              {/* CHECKBOX */}
              <Box
                className="flex flex-col justify-center"
                sx={!isMobile && { gridColumnStart: 1, gridColumnEnd: 3, maxWidth: 440, textAlign: "center" }}
              >
                <Box className="flex justify-center items-center">
                  <Checkbox
                    label="Пользовательское соглашение"
                    {...register("acceptTermsConditions")}
                  />
                  <Typography
                    sx={{
                      color: "#6A6D76",
                      "&:hover": { color: "#EE7100" },
                    }}
                    className="cursor-pointer"
                    onClick={() => navigate("/terms-of-use")}
                  >
                    Согласен с пользовательским соглашением
                  </Typography>
                </Box>
                {errors.acceptTermsConditions && (
                  <Box
                    className={isMobile && "flex justify-center"}
                    sx={{ color: "red" }}
                  >
                    {errors.acceptTermsConditions.message}
                  </Box>
                )}
              </Box>
            </Box>
            <Box className="flex justify-center items-center !mt-20 flex-col pb-24">
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
