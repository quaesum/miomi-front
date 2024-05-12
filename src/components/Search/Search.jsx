import { Box, Input } from "@mui/material";
import CustomizedInputBase from "./SearchInputBase";
import { useAnimalContext } from "../../Context/AnimalContext";
import { useForm } from "react-hook-form";


export const SearchBar = () => {
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
      } = useForm({
        defaultValues: {
          request: '',
        },
      });
    const {handleSearch, setRequest} = useAnimalContext();

    const handleSubmitForm = async () => {
        setRequest(getValues('request'))
        handleSearch()
      }
    console.log(getValues('request'))
    
    return (
      <Box className="flex justify-center bg-white"
      sx={{
        padding: {md: "30px", xs: "20px"}
      }}
         >
        <CustomizedInputBase register={register} handleSubmit={handleSubmit} handleSubmitForm={handleSubmitForm}/>
      </Box>
    );
  };