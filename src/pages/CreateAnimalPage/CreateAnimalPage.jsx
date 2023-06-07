import React, { useEffect, useState } from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import { PlaceAnAd } from "../../components/PlaceAnAd/PlaceAnAd";
import arrowUp from "../../assets/CreateAnimalPage/arrow-up.png";
import { useForm } from "react-hook-form";
import { CustomTypographyTag } from "../../components/CustomTypographyTag/CustomTypographyTag";
import nullPicture from "../../assets/CreateAnimalPage/null-picture.png";
import { CustomButton } from "../CurrentAnimalPage/componentsPage/ModalPhotos";
import DataService from "../../auth/data.service";

export const CustomTag = ({
  type,
  text,
  active,
  className = "",
  handleCustomTag,
}) => {
  return (
    <Typography
      fontSize={18}
      className={`cursor-pointer flex justify-center w-80 max-h-24 !mx-10 ${className}`}
      onClick={() => handleCustomTag(type)}
      sx={[
        { py: "3px", borderRadius: "10px", transition: "0.2s" },
        active
          ? {
              color: "white",
              backgroundColor: "#EE7100",
              border: "2px solid #EE7100",
              "&:hover": {
                backgroundColor: "#ee6f00d2",
                borderColor: "#ee6f00d2 !important",
                boxShadow:
                  "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12) !important",
              },
            }
          : {
              color: "#6A6D76",
              border: "2px solid #DCDCDC",
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "#DCDCDC",
                border: "2px solid #DCDCDC",
                boxShadow:
                  "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12) !important",
              },
            },
      ]}
    >
      {text}
    </Typography>
  );
};

export const CustomLabelTag = ({ text, sx, className }) => {
  return (
    <Box sx={sx} className={`${className} text-semibold flex items-center`}>
      <Typography fontWeight={600} fontSize={20}>
        {text}
      </Typography>
    </Box>
  );
};

const typesImage = ["image/png", "image/jpeg", "image/gif", "image/svg+xml"];

export const CreateAnimalPage = () => {
  const [activeAnimal, setAcitveAnimal] = useState(1);
  const [isSterilized, setIsSterilized] = useState(false);
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [sex, setSex] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [isDragEnter, setIsDragEnter] = useState(false);
  const [photoElements, setPhotoElements] = useState([]);

  useEffect(() => {
    let tempPhotoElements = [];
    for (let i = 0; i < 3; i++) {
      let path = "";
      try {
        path = URL.createObjectURL(photos[i]);
      } catch (er) {}
      tempPhotoElements[i] = (
        <img
          className={`${path ? "cursor-pointer" : ""}`}
          key={i}
          style={{
            height: "90px",
            width: "90px",
          }}
          onClick={path ? () => deleteFile(i) : () => {}}
          src={path ? path : nullPicture}
          alt={"photo_image"}
          loading="lazy"
        />
      );
    }
    setPhotoElements(tempPhotoElements);
  }, [photos]);

  useEffect(() => {
    setValue("photos", photos.length);
  }, [photos]);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      animalType: 1,
      sex,
      name: "",
      age: 0,
      vaccinated: isVaccinated,
      sterilized: isSterilized,
      description: "",
      photos: 0,
    },
  });

  const addFile = (file) => {
    let tempPhotos = [...photos];
    tempPhotos.unshift(file);
    tempPhotos = tempPhotos.slice(0, 3);
    setPhotos(tempPhotos);
  };

  const addFiles = (files) => {
    let tempPhotos = [...photos];
    files.forEach((el) => {
      tempPhotos.unshift(el);
    });
    tempPhotos = tempPhotos.slice(0, 3);
    setPhotos(tempPhotos);
  };

  const deleteFile = (i) => {
    let tempFiles = [...photos];
    console.log(i);
    tempFiles = tempFiles.map((el, index) => {
      if (index !== i) return el;
      else return null;
    });
    tempFiles = tempFiles.filter((el) => el !== null);
    setPhotos(tempFiles);
  };

  const handleSubmitForm = () => {
    const postData = {
      age: getValues("age"),
      name: getValues("name"),
      sex: getValues("sex"),
      type: getValues("animalType"),
      description: getValues("description"),
      sterilized: getValues("sterilized"),
      vaccinated: getValues("vaccinated"),
      //shelterId:
      //photos: [] 
    };
    //DataService.addNewAnimal(postData)
    console.log(postData)
  };

  const handleChangeAnimal = (type) => {
    setAcitveAnimal(type);
    setValue("animalType", type);
  };

  const handleChangeSex = (type) => {
    setSex(type);
    setValue("sex", type);
  };

  const handleChangeMedic = (type, active) => {
    if (type === "vaccinated") setIsVaccinated(active);
    else setIsSterilized(active);
    setValue(type, active);
  };

  const handleFileLoad = (e, index) => {
    if (e.target.files) {
      const files = [...e.target.files];
      addFiles(files);
    }
  };

  const dragEnterHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragEnter(true);
  };

  const dragLeaveHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragEnter(false);
  };

  const dragOverHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "move";
    event.returnValue = false;
  };

  const dropHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "move";
    event.returnValue = false;

    const files = [...event.dataTransfer.files];
    console.log(files);
    if (files.length > 1) {
      addFiles(files);
    } else {
      files.forEach((el) => addFile(el));
    }
    setIsDragEnter(false);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="grid place-content-center h-screen w-full flex-1 !py-20"
    >
      <Card
        sx={{
          width: { lg: "1240px", borderRadius: "20px", minHeight: "80px" },
        }}
        className="w-screen"
      >
        <PlaceAnAd type={"Животные"} />
        <Box sx={{ ml: 10, my: 3, mr: 15 }}>
          {/* PHOTOS */}
          <div
            className={`${isDragEnter ? "" : "flex justify-between"} w-full`}
            onDragEnter={dragEnterHandler}
            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
            onDrop={dropHandler}
          >
            <input
              className="hidden"
              {...register("photos", {
                min: { value: 1, message: "Загрузите минимум 1 фотографию" },
              })}
            />
            {isDragEnter ? (
              <>
                {/* DROP AREA */}
                <Box
                  minHeight={133}
                  sx={{
                    border: "3px solid #EE7100",
                    color: "#6A6D76",
                    fontSize: "24px",
                  }}
                  className="!h-full !border-dashed flex justify-center items-center"
                >
                  Перетащите сюда
                </Box>
              </>
            ) : (
              <>
                {/* PHOTOS */}
                <Box>
                  <Typography fontSize={20} className="!font-semibold">
                    Фотографии
                  </Typography>
                  <Box
                    className="grid grid-rows-2 grid-cols-2 gap-y-6"
                    sx={{ mt: 2 }}
                  >
                    <CustomButton
                      text={
                        <>
                          <img
                            src={arrowUp}
                            alt="arrow-up"
                            height={8}
                            width={20}
                          />
                          <Typography className="!normal-case" fontSize={18}>
                            &nbsp; Добавьте фотографии
                          </Typography>
                        </>
                      }
                      index={1}
                      handleFileLoad={handleFileLoad}
                      type="create-animal"
                    />
                    <Typography
                      className="flex justify-center items-center"
                      sx={{ color: "#6A6D76" }}
                      fontSize={18}
                    >
                      Или перетащите сюда
                    </Typography>
                    <Typography
                      className="flex justify-center items-center"
                      sx={{ color: "#6A6D76" }}
                      fontSize={18}
                    >
                      Максимальный размер 10 МБ
                    </Typography>
                  </Box>
                </Box>

                {/* VIEW PHOTOS */}
                <Box className="min-w-100 ">
                  <Box width={340} className="flex flex-row justify-between">
                    {photoElements}
                  </Box>
                  <Box className="flex justify-center items-center !mt-10">
                    <Box className="flex flex-col">
                      <Box className="flex justify-center items-center">
                        <img
                          key={999}
                          style={{
                            height: "22px",
                            width: "22px",
                          }}
                          src={nullPicture}
                          alt={"null-puctire"}
                          loading="lazy"
                        />
                        <Typography fontSize={18}>
                          &nbsp;{`Загружено ${photos.length} из 3`}
                        </Typography>
                      </Box>
                      {photos.length < 1 && (
                        <Typography
                          sx={{
                            color: "red",
                            display: "flex",
                            justifyContent: "center",
                          }}
                          fontSize={18}
                        >
                          {errors?.photos?.message}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              </>
            )}
          </div>

          {/* MAIN INFORMATION */}
          <Box
            sx={{
              mt: 4,
              gridTemplateRows: "repeat(8, 1fr)",
              gridTemplateColumns: "200px 1fr",
              display: "grid",
              rowGap: "30px",
            }}
          >
            {/* WANT SHARED || ANIMAL TYPE*/}
            <CustomLabelTag text={"Хочу поделиться"} />
            <Box className="flex">
              <CustomTag
                text={"Котом"}
                type={1}
                active={activeAnimal === 1}
                handleCustomTag={handleChangeAnimal}
              />
              <CustomTag
                type={2}
                text={"Собакой"}
                active={activeAnimal === 2}
                handleCustomTag={handleChangeAnimal}
              />
              <CustomTag
                text={"Птицой"}
                type={3}
                active={activeAnimal === 3}
                handleCustomTag={handleChangeAnimal}
              />
              <CustomTag
                text={"Другим"}
                type={4}
                active={activeAnimal === 4}
                handleCustomTag={handleChangeAnimal}
              />
            </Box>

            {/* SEX */}
            <CustomLabelTag text={"Пол"} />
            <Box className="flex">
              <CustomTag
                type={1}
                text={"Мужской"}
                active={sex === 1}
                handleCustomTag={handleChangeSex}
              />
              <CustomTag
                text={"Женский"}
                type={0}
                active={sex === 0}
                handleCustomTag={handleChangeSex}
              />
            </Box>

            {/* AGE */}
            <CustomLabelTag text={"Возраст"} />
            <Box className="flex items-center ml-10">
              <input
                {...register("age", {
                  required: "Обязательное поле",
                  min: { value: 0.1, message: "Минимальный возраст 1 год" },
                  max: { value: 30, message: "Максимальный возраст 30 лет" },
                })}
                type="number"
                min={0}
                max={30}
                className={`outline-0 rounded-md w-40 h-full pl-6 !border-solid !border-2 ${
                  errors.age ? "border-red-300" : "!border-gray-300"
                }`}
              />
              {errors.age && (
                <Box sx={{ color: "red", ml: 4 }}>{errors.age.message}</Box>
              )}
            </Box>

            {/* NAME */}
            <CustomLabelTag text={"Имя"} />
            <Box className="flex ml-10 items-center">
              <input
                {...register("name", {
                  required: "Обязательное поле",
                  minLength: {
                    value: 3,
                    message: "Минимальная длина 3 символа",
                  },
                  maxLength: {
                    value: 13,
                    message: "Максимальная длина 13 символов",
                  },
                })}
                type="text"
                min={0}
                max={30}
                className={`outline-0 rounded-md w-120 h-full pl-6 !border-solid !border-2 ${
                  errors.name ? "border-red-300" : "!border-gray-300"
                }`}
              />
              {errors.name && (
                <Box sx={{ color: "red", ml: 4 }}>{errors.name.message}</Box>
              )}
            </Box>

            {/* ADDRESS */}
            <CustomLabelTag text={"Местоположение"} />
            <Box className="flex ml-10 items-center">
              <input
                {...register("address", {
                  required: "Обязательное поле",
                  minLength: {
                    value: 3,
                    message: "Минимальная длина 3 символа",
                  },
                })}
                type="text"
                min={0}
                max={30}
                className={`outline-0 rounded-md h-full pl-6 !border-solid !border-2 ${
                  errors.address
                    ? "border-red-300 w-6/12"
                    : "!border-gray-300 w-full"
                }`}
              />
              {errors.address && (
                <Box sx={{ color: "red", ml: 4 }}>{errors.address.message}</Box>
              )}
            </Box>

            {/* INFO MEDIC */}
            <CustomLabelTag text={""} />
            <Box className="flex ml-10">
              <CustomTypographyTag
                register={register}
                isEditMode={true}
                type={"vaccinated"}
                text={"Есть прививка"}
                color="#6A6D76"
                border="2px solid #DCDCDC"
                active={isVaccinated}
                handleCustomTag={handleChangeMedic}
              />
              <CustomTypographyTag
                register={register}
                isEditMode={true}
                className="!ml-10"
                color="#6A6D76"
                border="2px solid #DCDCDC"
                handleCustomTag={handleChangeMedic}
                type={"sterilized"}
                text={getValues("sex") === 1 ? "Кастрирован" : "Кастрирована"}
                active={isSterilized}
              />
            </Box>

            {/* DESCRIPTION */}
            <CustomLabelTag
              className="!items-start"
              text={"Доп. информация"}
              sx={{ gridRowStart: "7", gridRowEnd: "9" }}
            />
            <Box
              className="flex ml-10 flex-col"
              sx={{ gridRowStart: "7", gridRowEnd: "9" }}
            >
              <textarea
                rows={2}
                {...register("description", {
                  required: "Обязательное поле",
                  minLength: {
                    value: 5,
                    message: "Минимальная длина 5 символа",
                  },
                })}
                className={`resize-none w-full border-2 border-gray-300 outline-0 rounded-md px-6 cursor-default font-normal leading-6 ${
                  errors.description
                    ? "border-red-300 w-6/12"
                    : "!border-gray-300 w-full"
                }`}
              />
              {errors.description && (
                <Box sx={{ color: "red" }}>{errors.description.message}</Box>
              )}
            </Box>
          </Box>
          <Box className="flex justify-center mt-20">
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#EE7100",
                borderRadius: "10px",
                "&:hover": { backgroundColor: "#ee6f00d2" },
              }}
            >
              <Typography
                fontSize={20}
                className="font-normal !normal-case !mx-20"
              >
                Сохранить
              </Typography>
            </Button>
          </Box>
        </Box>
      </Card>
    </form>
  );
};
