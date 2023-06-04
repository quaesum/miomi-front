import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  ImageList,
  ImageListItem,
  Modal,
  Typography,
} from "@mui/material";
import pointSrc from "../../assets/CurrentAnimalPage/point.png";
import { ageTransformation } from "../../components/Animals/Animals";
import { useForm } from "react-hook-form";
import { Name } from "./componentsPage/Name";
import { Sex } from "./componentsPage/Sex";
import { CustomTypographyTag } from "./componentsPage/CustomTypographyTag";
import { Description } from "./componentsPage/Description";
import { Age } from "./componentsPage/Age";
import { ModalPhotos } from "./componentsPage/ModalPhotos";
import { ModalAnimalDelete } from "../../components/ModalAnimalDelete/ModalAnimalDelete";

export const CurrentAnimalPage = ({ animal, id }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSterilized, setIsSterilized] = useState(animal.sterilized);
  const [isVaccinated, setIsVaccinated] = useState(animal.vaccinated);
  const [filesURL, setFilesURL] = useState(animal.photos);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sex = animal.sex ? "девочка" : "мальчик";

  const { register, handleSubmit, getValues, setValue } = useForm({
    defaultValues: {
      sex,
      age: animal.age,
      nameAnimal: animal.name,
      description: animal.description,
    },
  });
  console.log(getValues());

  const defaultPropsForComponents = {
    register: register,
    isEditMode: isEditMode,
  };

  const handleClickModeChange = () => {
    if (isEditMode) {
      handleSubmit();
      // let bodyFromData = new FormData();
      // let sex = getValues("sex") === "мальчик" ? 1 : 0;
      // bodyFromData.append("name", getValues("nameAnimal"));
      // bodyFromData.append("sex", sex);
      // bodyFromData.append("age", Number(getValues("age")));
      // bodyFromData.append("sterilized", isSterilized);
      // bodyFromData.append("vaccinated", isVaccinated);
      // bodyFromData.append("animals", [...files]);
      // console.log(bodyFromData)
      // axios
      //   .post("http://localhost:8000/animal", bodyFromData, {
      //     headers: { "Content-Type": "multipart/form-data" },
      //   })
      //   .then((res) => {
      //     console.log(res.data);
      //   })
      //   .catch((e) => console.log(e));
      setIsEditMode((prev) => !prev);
    } else {
      setIsEditMode((prev) => !prev);
    }
  };

  const handleChangeSex = (e) => {
    setValue("sex", e.target.value);
  };

  const handleCustomTag = (type, active) => {
    if (type === "vaccinated") setIsVaccinated(active);
    else setIsSterilized(active);
    setValue(type, active);
  };

  const handleFileLoad = (e, index) => {
    let tempIndex = Number(index.split("-")[2]);
    if (e.target.files) {
      let image = e.target.files[0];
      let path = URL.createObjectURL(image);
      let tempFilesURL = [...filesURL];

      tempFilesURL[tempIndex] = path;

      setFilesURL(tempFilesURL);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="grid place-content-center h-full w-full flex-1"
    >
      <Card
        sx={{
          width: { sm: "100%", lg: "1024px", xs: "100%", borderRadius: "20px" },
        }}
      >
        <Box sx={{ px: 10, py: 5 }} className="flex justify-between">
          <Box className="flex">
            <Typography>
              <Avatar
                alt="avatar-animal"
                src={animal?.photos[0]}
                sx={{ width: 90, height: 90 }}
              />
            </Typography>
            <Box sx={{ mt: "10px" }} className="flex">
              <Typography sx={{ ml: "20px" }} className="flex flex-col">
                <Name
                  {...defaultPropsForComponents}
                  name={getValues("nameAnimal")}
                />
                <Sex
                  {...defaultPropsForComponents}
                  sex={getValues("sex")}
                  handleChangeSex={handleChangeSex}
                />
              </Typography>
              <Age
                {...defaultPropsForComponents}
                age={getValues("age")}
                ageName={ageTransformation(getValues("age"))}
              />
            </Box>
          </Box>
          <Box className="flex flex-col" sx={{ mt: "23px" }}>
            <Typography
              fontSize={18}
              className={"text-grey-600 cursor-pointer"}
              onClick={handleClickModeChange}
            >
              {isEditMode ? "Сохранить" : "Изменить"}
            </Typography>
            <Typography
              onClick={handleOpen}
              fontSize={18}
              className="cursor-pointer !ml-auto w-max"
              sx={{ color: "#EE7100" }}
            >
              Удалить
            </Typography>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ModalAnimalDelete id={id} handleClose={handleClose}/>
            </Modal>
          </Box>
        </Box>
        <div
          className="h-2 w-full"
          style={{ backgroundColor: "#DCDCDC" }}
        ></div>
        <Box sx={{ px: 10, pt: 2, pb: 5 }} className="flex flex-col">
          <Box className="flex">
            <img
              src={pointSrc}
              style={{ width: "17px", height: "26px" }}
              alt="point"
            />
            <Typography fontSize={22} sx={{ color: "#6A6D76" }}>
              <div className="ml-10">{animal?.shelter}</div>
            </Typography>
          </Box>
          <Box className="flex" sx={{ mt: "25px" }}>
            <CustomTypographyTag
              {...defaultPropsForComponents}
              type={"vaccinated"}
              text={"Есть прививка"}
              active={isVaccinated}
              handleCustomTag={handleCustomTag}
            />
            <CustomTypographyTag
              {...defaultPropsForComponents}
              className="!ml-10"
              handleCustomTag={handleCustomTag}
              type={"sterilized"}
              text={
                getValues("sex") === "мальчик" ? "Кастрирован" : "Кастрирована"
              }
              active={isSterilized}
            />
          </Box>
          <Box className="flex flex-col">
            {isEditMode && <ModalPhotos handleFileLoad={handleFileLoad} />}
            <ImageList
              sx={
                !isEditMode
                  ? { mt: "30px", width: "100%", height: "285px" }
                  : { width: "100%", height: 285 }
              }
              variant="quilted"
              cols={3}
            >
              {filesURL.map((item) => (
                <ImageListItem key={item}>
                  <img
                    style={{
                      borderRadius: "15px",
                      height: "285px",
                      width: "285px",
                    }}
                    src={item}
                    alt={"animal_image"}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
          <Box sx={{ mt: "30px", color: "#6A6D76", fontSize: "18px" }}>
            <Description {...defaultPropsForComponents} />
          </Box>
        </Box>
      </Card>
    </form>
  );
};
