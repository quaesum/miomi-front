import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { FormControl, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function CustomizedInputBase({ 
  register,
  handleSubmit,
  handleSubmitForm,
  currentTab,
  setValue,
  shelterInfo,
  types,
  reset,
}) {
  const [openFilters, setOpenFilters] = React.useState(false);
  const [ageRange, setAgeRange] = React.useState([1, 20]);
  const [isMan, setIsMan] = React.useState(false);
  const [isWoman, setIsWoman] = React.useState(false)
  const [type, setType] = React.useState([])
  const [shelter, setShelter] = React.useState([])
  const [isSter, setIsSter] = React.useState(false)
  const [isVacc, setIsVacc] = React.useState(false)

  const typesNames = types?.map((el) => {
    return el.name
  })



  const handleOpenFilters = () => {
    setOpenFilters(true);
  };

  const handleCloseFilters = () => {
    handleSubmitForm()
    setOpenFilters(false);
  };

  const setDefaultFilters = () => {
    reset()
    setIsMan(false)
    setIsWoman(false)
    setIsSter(false)
    setIsVacc(false)
    setAgeRange([1, 20])
    setType([])
    setShelter([])
  }

  const handleIsManChange = (event, newValue) => {
    setIsMan(newValue)
  }

  const handleIsWomanChange = (event, newValue) => {
    setIsWoman(newValue)
  }

  const handleIsVaccChange = (event, newValue) => {
    setIsVacc(newValue)
    setValue("vaccinated", newValue)
  }

  const handleIsSterChange = (event, newValue) => {
    setIsSter(newValue)
    setValue("sterilized", newValue)
  }


  const handleAgeRangeChange = (event, newValue) => {
    setAgeRange(newValue);
    console.log(newValue)
    setValue("ageMin", newValue[0])
    setValue("ageMax", newValue[1])
  };

  const handleAnimalTypeChange = (event, newValue) => {
    setType(newValue);
    console.log(newValue)
    setValue("type", newValue.map((el) => el.name))
  };

  const handleShelterChange = (event, newValue) => {
    setShelter(newValue);
    setValue("sheltersIds", newValue.map((el) => el.id))
  };

  return (
    <Paper
      component="form"
      className='shadow-lg'
      onSubmit={handleSubmit(handleSubmitForm)}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: { md: "80%", xs: "100%" }, height: { md: "70px", xs: "60px" } }}
    >
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" disabled={currentTab == 1}>
        <SearchIcon />
      </IconButton>
      <InputBase
        disabled={currentTab == 1}
        {...register("request")}
        onChange={(e, val) => {setValue('request', e.target.value)}}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Поиск"
        inputProps='aria-label'
      />
      {currentTab == 0 && (
        <>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton color="primary" sx={{ p: '15px' }} aria-label="directions" onClick={handleOpenFilters}>
            <TuneIcon />
          </IconButton>
        </>
      )}
      <Dialog open={openFilters} onClose={handleCloseFilters} sx={{ width: { md: "350" } }} className='flex self-center justify-self-center justify-center'>
        <DialogTitle>Фильтры</DialogTitle>
        <DialogContent sx={{ width: "350px" }}>
          <FormControl className='space-y-6' style={{ width: '100%' }}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox onChange={handleIsManChange} checked={isMan} />}
                label="Мужской"
                {...register("gender")}
                value={0}
              />
              <FormControlLabel
                control={<Checkbox checked={isWoman} onChange={handleIsWomanChange} />}
                label="Женский"
                value={1}
                {...register("gender")}
              />
            </FormGroup>
            <FormGroup className='space-y-12'>
              <Autocomplete
                {...register("type")}
                multiple
                id="animal-type"
                limitTags={1}
                getOptionLabel={(option) => option.name}
                options={types}
                value={type}
                onChange={handleAnimalTypeChange}
                disableCloseOnSelect
                renderInput={(params) => <TextField {...params} label="Тип животного" size='10' autoComplete="off" />}
                className="w-max-full"
              />
              <Autocomplete
                {...register("sheltersIds")}
                multiple
                id="shelters"
                limitTags={1}
                options={shelterInfo}
                getOptionLabel={(option) => option.name}
                value={shelter}
                onChange={handleShelterChange}
                disableCloseOnSelect
                style={{ minWidth: '200px' }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Приюты"
                    placeholder="Выберите приюты"
                  />
                )}
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={isSter} value={isSter} onChange={handleIsSterChange} />}
                label="Стерилизация"
                {...register("vaccinated")}
              />
              <FormControlLabel
                control={<Checkbox checked={isVacc} value={isVacc} onChange={handleIsVaccChange} />}
                label="Вакцинация"
                {...register("sterilized")}
              />
            </FormGroup>
            <FormGroup>
              <div className='flex flex-row w-full space-x-8 items-center'>
              <Typography color="gray">1</Typography>
              <Slider
                {...register("age")}
                value={ageRange}
                onChange={handleAgeRangeChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={1}
                max={20}
              />
              <Typography color="gray">20</Typography>
              </div>
            </FormGroup>
          </FormControl>

          <Button onClick={() => { handleCloseFilters(); }}>Применить</Button>
          <Button onClick={() => { setDefaultFilters(); handleCloseFilters(); }} sx={{ color: "grey" }}>Отменить</Button>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
