import React, { useEffect, useState } from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import { PlaceAnAd } from "../../components/PlaceAnAd/PlaceAnAd";
import arrowUp from "../../assets/CreateAnimalPage/arrow-up.png";
import { useForm } from "react-hook-form";
import { CustomTypographyTag } from "../../components/CustomTypographyTag/CustomTypographyTag";
import nullPicture from "../../assets/CreateAnimalPage/null-picture.png";
import { CustomButton } from "../CurrentAnimalPage/componentsPage/ModalPhotos";

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
            }
          : {
              color: "#6A6D76",
              border: "2px solid #DCDCDC",
              backgroundColor: "white",
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

export const CreateNewsPage = () => {
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
      description: "",
      label: "",
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
    console.log(getValues());
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
        <PlaceAnAd type={"Новости"} />
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
              gridTemplateRows: "repeat(3, 1fr)",
              gridTemplateColumns: "200px 1fr",
              display: "grid",
              rowGap: "30px",
            }}
          >
            {/* LABEL */}
            <CustomLabelTag text={"Заголовок"} />
            <Box className="flex ml-10 items-center">
              <input
                {...register("label", {
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
                  errors.label
                    ? "border-red-300 w-6/12"
                    : "!border-gray-300 w-full"
                }`}
              />
              {errors.label && (
                <Box sx={{ color: "red", ml: 4 }}>{errors.label.message}</Box>
              )}
            </Box>

            {/* DESCRIPTION */}
            <CustomLabelTag
              className="!items-start"
              text={"Доп. информация"}
              sx={{ gridRowStart: "2", gridRowEnd: "4" }}
            />
            <Box
              className="flex ml-10"
              sx={{ gridRowStart: "2", gridRowEnd: "4" }}
            >
              <textarea
                rows={2}
                {...register("description")}
                className="resize-none w-full border-2 border-gray-300 outline-0 rounded-lg px-6 cursor-default font-normal leading-6"
              />
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
