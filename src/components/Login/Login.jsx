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
import React, { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import AuthService from "../../auth/auth.service";
import { useNavigate } from "react-router";

export const Login = ({ setIsLogin }) => {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = React.useState(false);
  const [errors, setErrors] = useState("");
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
    const res = AuthService.login(getValues("email"), getValues("password"))
      .then((res) => {
        setIsLogin(false);
        navigate("/")
      })
      .catch((er) => {
        setIsRequest(false);
        setErrors(er.message);
      });
  };

  const { register, handleSubmit, getValues } = useForm();

  return (
    <div className="grid place-content-center h-screen w-full flex-1 pb-80">
      <Card
        sx={{
          width: { sm: "100%", lg: "650px", xs: "100%", borderRadius: "20px" },
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
            <TextField
              sx={{ width: "400px" }}
              className="!mb-20 w-full"
              id="outlined-basic"
              label="E-mail"
              variant="outlined"
              {...register("email")}
            />
            <FormControl sx={{ width: "400px" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
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
                label="Password"
              />
            </FormControl>
            <Box className="!mt-20">
              {errors && (
                <Typography
                  className="flex justify-center"
                  sx={{ color: "red" }}
                >
                  {errors}
                </Typography>
              )}
              <LoadingButton
                loading={isRequest}
                type="submit"
                variant="contained"
                sx={{
                  borderRadius: "8px",
                  padding: "5px 60px",
                  backgroundColor: "#ff9800",
                  "&:hover": { backgroundColor: "#e38800" },
                }}
              >
                <Typography fontSize={18}>Продолжить</Typography>
              </LoadingButton>
            </Box>
          </form>
        </Box>
      </Card>
    </div>
  );
};
