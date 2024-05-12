import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';

export default function CustomizedInputBase({register, handleSubmit, handleSubmitForm}) {
  return (
    <Paper
      onSubmit={handleSubmit(handleSubmitForm)}
      component="form"
      className='shadow-lg'
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: {md: "80%", xs:"100%"}, height: {md: "70px", xs:"60px"}}}
    >
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        {...register("request")}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Поиск"
        inputProps='aria-label'
      />
      
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '15px' }} aria-label="directions">
        <TuneIcon />
      </IconButton>
    </Paper>
  );
}