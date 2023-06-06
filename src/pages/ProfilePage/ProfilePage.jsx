import {
  Box,
  Card,
  Typography,
  Avatar,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import authHeader from "../../auth/auth.headers";

export default function ProfilePage({ data }) {
  const BASE_URL = "http://miomi.by";
  const [edit, setEdit] = useState(false);
  console.log(data);

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
    },
  });

  const handleSubmitForm = () => {
    const values = getValues();
    console.log(values);
    axios
      .post(
        `${BASE_URL}/api/user/v1/update`,
        { ...values },
        { headers: authHeader() }
      )
      .then((res) => console.log(res));
  };

  const handleChangeEdit = (e, state) => {
    setEdit(e, state);
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
          className={`items-center min-h-80 pb-12 ${
            edit ? "hidden" : "flex flex-col"
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
              backgroundColor: "#ff9800",
              "&:hover": { backgroundColor: "#e38800" },
            }}
          >
            <Typography fontSize={18}>Изменить</Typography>
          </Button>
        </Box>
        <Box
          className={`${
            edit ? "flex flex-col" : "hidden"
          } items-center min-h-80 pb-12`}
        >
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Box className="flex flex-col space-y-24">
              <TextField label="Имя" {...register("first_name")} />
              <TextField label="Фамилия" {...register("last_name")} />
              <TextField label="Эл. почта" {...register("email")} />
            </Box>
          </form>
          <Button
            className="!mt-20"
            type="submit"
            onClick={() => {
              handleChangeEdit(false);
              handleSubmitForm();
            }}
            variant="contained"
            sx={{
              borderRadius: "8px",
              padding: "5px 60px",
              backgroundColor: "#ff9800",
              "&:hover": { backgroundColor: "#e38800" },
            }}
          >
            <Typography fontSize={18}>Сохранить</Typography>
          </Button>
        </Box>
      </Card>
    </div>
  );
}
