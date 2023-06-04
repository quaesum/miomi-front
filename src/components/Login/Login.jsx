import {
  Box,
  Button,
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";

export const Login = ({setIsLogin}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmitForm = () =>{
    console.log(getValues())
    setIsLogin(true)
  }

  const {register, handleSubmit, getValues} = useForm();

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
              label="Login"
              variant="outlined"
              {...register("login")}
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
            <Button
              className="!mt-20"
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
            </Button>
          </form>
        </Box>
      </Card>
    </div>
  );
};
