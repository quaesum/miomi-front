import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { PASSWORD_CHANGE } from '../../endpoints';

const validationSchema = yup.object({
  password: yup
    .string()
    .required('Введите пароль.')
    .min(8, 'Не менее 8 символов.')
    .matches(/(?=.*[!@#$%^&*_0-9])[0-9a-zA-Z!@#$%^&*]/g, 'Используйте цифры (0-9) или символы.')
    .test('Letters1', 'Используйте строчные и заглавные буквы (a-zA-Z).', value =>
      /(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]/.test(value)
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
    .required('Подтвердите пароль.'),
});

const ChangePassword = () => {
  const [searchParams] = useSearchParams();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const token = searchParams.get('token');

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post(PASSWORD_CHANGE, {
          token,
          password: values.password,
        });
        setSuccess(true);
        setError(null);
      } catch (err) {
        setError('Ошибка смены пароля. Попробуйте еще раз.');
        setSuccess(false);
      }
    },
  });
  
  if (!token || token === '') {
    return <Typography>Ошибка: отсутствует токен.</Typography>;
  }

  return (
    <Box
      sx={{
        p: { md: '25px', xs: '15px' },
        mx: { md: 'auto', xs: '10px' },
        width: { md: '400px', xs: '100%' },
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: { md: '0 0 10px rgba(0,0,0,0.1)', xs: 'none' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {success ? (
        <Typography variant="h6" textAlign="center">Пароль успешно изменен.</Typography>
      ) : (
        <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
          <Typography variant="h5" textAlign="center" mb={3}>
            Изменение пароля
          </Typography>
          <TextField
            label="Новый пароль"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Подтверждение пароля"
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            fullWidth
            margin="normal"
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 3,
              p: { md: '12px', xs: '10px' },
              fontSize: { md: '1rem', xs: '0.875rem' },
            }}
          >
            Изменить пароль
          </Button>
        </form>
      )}
    </Box>
  );
};

export default ChangePassword;
