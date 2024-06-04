import { Box, Input } from "@mui/material";
import CustomizedInputBase from "./SearchInputBase";
import { useAnimalContext } from "../../Context/AnimalContext";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { GET_ALL_SHELTERS_INFO, GET_ANIMALS_TYPES } from "../../endpoints";
import authHeader from "../../auth/auth.headers";
import axios from "axios";

export const SearchBar = () => {
  const [shelterInfo, setShelterInfo] = useState()
  const [types, setTypes] = useState()
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      request: '',
      type: [],
      gender: [],
      sheltersIds: [],
      vaccinated: false,
      sterilized: false,
      ageMin: 1,
      ageMax: 20,
    },
  });
  const { handleSearch, setAnimalsFilters, currentTab, handleSetRequest } = useAnimalContext();

  const handleSubmitForm = async () => {
    let request = getValues('request')
    let postData = {
      sex: getValues("gender"),
      type: getValues("type"),
      sterilized: getValues("sterilized"),
      vaccinated: getValues("vaccinated"),
      maxAge: getValues("ageMax"),
      minAge: getValues("ageMin"),
      shelterId: getValues("sheltersIds")
    }
    console.log(postData)
    handleSearch(postData, request)
  }

  useEffect(() => {
    axios.get(GET_ALL_SHELTERS_INFO, { headers: authHeader() }).then((res) => {
      setShelterInfo(res.data)
    });
    axios.get(GET_ANIMALS_TYPES, { headers: authHeader() }).then((res) => {
      setTypes(res.data)
    })
  }, [])

  return (
    <Box className="flex justify-center bg-white"
      sx={{
        padding: { md: "30px", xs: "20px" }
      }}
    >
      <CustomizedInputBase
        register={register}
        handleSubmit={handleSubmit}
        handleSubmitForm={handleSubmitForm}
        currentTab={currentTab}
        setValue={setValue}
        shelterInfo={shelterInfo}
        types={types}
        reset={reset}
      />
    </Box>
  );
};