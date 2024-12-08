import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Alert, Link } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { SEND_PASSWORD_RECOVERY } from '../../endpoints';

const validationSchema = yup.object({
  email: yup
    .string()
    .required('Введите адрес электронной почты.')
    .test('Email', 'Неверный формат (example@post.com).', value =>
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(value)
    ),
});

const ForgotPassword = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(10);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true)
        await axios.post(SEND_PASSWORD_RECOVERY, {
          email: values.email,
        });
        setSuccess(true);
        setError(null);
      } catch (err) {
        err.response.status == 404 ? setError('Ошибка отправки запроса. Проверьте введенные данные.') : setError("Ошибка сервера")
        setSuccess(false);
        setLoading(false)
      }
    },
  });

  useEffect(() => {
    if (success) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);

      if (countdown === 0) {
        window.location.href = '/login';
      }

      return () => clearInterval(timer);
    }
  }, [success, countdown]);

  return (
    <Box
  sx={{
    p: { md: '25px', xs: '15px' },
    width: { md: '400px', xs: '100%' },
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: { md: '0 0 10px rgba(0,0,0,0.1)', xs: 'none' },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }}
>
      {success ? (
        <>
          <Typography variant="h6" textAlign="center" mb={2}>
            На указанную вами почту было отправлено письмо для сброса пароля.
          </Typography>
          <Typography textAlign="center" mb={3}>
            Вы будете перенаправлены на страницу авторизации через {countdown} секунд.
          </Typography>
          <Link href="/login" underline="hover">
            Перейти на страницу авторизации
          </Link>
        </>
      ) : (
        <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
          <Typography variant="h5" textAlign="center" mb={3}>
            Восстановление пароля
          </Typography>
          <TextField
            label="Эл. почта"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
            margin="normal"
          />
          {error && <Alert severity="error" sx={{ my: 1 }}>{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
            sx={{
                borderRadius: "8px",
                padding: "5px 60px",
                backgroundColor: "#EE7100",
                "&:hover": { backgroundColor: "#ee6f00d2" },
                p: { md: '12px', xs: '10px' },
                fontSize: { md: '1rem', xs: '0.875rem' },
              }}
          >
            Сбросить пароль
          </Button>
        </form>
      )}
    </Box>
  );
};

export default ForgotPassword;
