import React, { useEffect, useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import { PlaceAnAd } from "../../components/PlaceAnAd/PlaceAnAd";
import arrowUp from "../../assets/CreateAnimalPage/arrow-up.png";
import { useForm } from "react-hook-form";
import { CustomTypographyTag } from "../../components/CustomTypographyTag/CustomTypographyTag";
import nullPicture from "../../assets/CreateAnimalPage/null-picture.png";
import { CustomButton } from "../CurrentAnimalPage/componentsPage/ModalPhotos";
import { useAnimalContext } from "../../Context/AnimalContext";
import DataService from "../../auth/data.service";
import { useNavigate } from "react-router";
import { LoadingButton } from "@mui/lab";
import { useMobile } from "../../hooks/useMobile";

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

export const CreateAnimalPage = () => {
  const isMobile = useMobile();
  const { userData, updateAnimals } = useAnimalContext();
  const navigate = useNavigate();

  const [activeAnimal, setAcitveAnimal] = useState(1);
  const [isSterilized, setIsSterilized] = useState(false);
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [sex, setSex] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [isDragEnter, setIsDragEnter] = useState(false);
  const [photoElements, setPhotoElements] = useState([]);
  const [isRequest, setIsRequest] = useState(false);
  const [isRequestImages, setIsRequestImages] = useState(false);
  const [photosId, setPhotosId] = useState([]);
  const [requestErrors, setRequestErrors] = useState("123");

  useEffect(() => {
    if (
      !isRequestImages &&
      photosId.length === photos.length &&
      getValues("age") > 0
    ) {
      const postData = {
        age: Number(getValues("age")),
        name: getValues("name"),
        sex: getValues("sex"),
        type: getValues("animalType"),
        description: getValues("description"),
        sterilized: getValues("sterilized"),
        vaccinated: getValues("vaccinated"),
        shelterId: userData.shelter_id,
        photos: photosId,
      };

      DataService.addNewAnimal(postData)
        .then((res) => {
          navigate("/");
          updateAnimals();
          setIsRequest(false);
        })
        .catch((er) => {
          setIsRequest(false);
          setRequestErrors("Final request: " + er.message);
          console.log(er.message);
        });
    }
  }, [photosId, isRequestImages]);

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
    tempFiles = tempFiles.map((el, index) => {
      if (index !== i) return el;
      else return null;
    });
    tempFiles = tempFiles.filter((el) => el !== null);
    setPhotos(tempFiles);
  };

  const getPhotosId = async () => {
    const tempPhotosId = [];

    setIsRequest(true);
    setIsRequestImages(true);

    if (photos.length >= 1) {
      await DataService.addPhotoAnimal(photos[0])
        .then((res) => {
          tempPhotosId.push(res.data);
        })
        .catch((er) => {
          setRequestErrors("Photo 1 request: " + er.message);
          setIsRequest(false);
        });
    }
    if (photos.length >= 2) {
      await DataService.addPhotoAnimal(photos[1])
        .then((res) => {
          tempPhotosId.push(res.data);
        })
        .catch((er) => {
          setRequestErrors("Photo 2 request: " + er.message);
          setIsRequest(false);
        });
    }
    if (photos.length === 3) {
      await DataService.addPhotoAnimal(photos[2])
        .then((res) => {
          tempPhotosId.push(res.data);
        })
        .catch((er) => {
          setRequestErrors("Photo 3 request: " + er.message);
          setIsRequest(false);
        });
    }

    if (tempPhotosId.length === photos.length) {
      setPhotosId(tempPhotosId);
      setIsRequestImages(false);
    }
  };

  const handleSubmitForm = async () => {
    getPhotosId();
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

  console.log(isMobile);

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="grid place-content-center h-fit w-full flex-1 !py-20"
    >
      <Card
        sx={{
          width: { lg: "1240px", xs: "full", minHeight: "80px" },
          borderRadius: { lg: 7, xs: 0 },
        }}
        className="w-screen"
      >
        <PlaceAnAd type={"Животные"} />
        <Box
          sx={{
            ml: { lg: 10 },
            my: { lg: 3, xs: 3 },
            mr: { lg: 15 },
          }}
        >
          {/* PHOTOS */}
          <div
            className={
              isMobile
                ? "flex justify-center"
                : `${isDragEnter ? "" : "flex justify-between"} w-full`
            }
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
            {isDragEnter && !isMobile ? (
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
                  <Typography
                    fontSize={20}
                    className={`!font-semibold ${
                      isMobile && "flex justify-center"
                    }`}
                  >
                    Фотографии
                  </Typography>
                  {isMobile && (
                    <Box>
                      <Typography className="flex justify-center" fontSize={18}>
                        &nbsp;{`Загружено ${photos.length} из 3`}
                      </Typography>
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
                  )}
                  <Box
                    className={
                      !isMobile
                        ? "grid grid-rows-2 grid-cols-2 gap-y-6"
                        : "flex justify-center"
                    }
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
                    {!isMobile && (
                      <>
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
                      </>
                    )}
                  </Box>
                </Box>

                {/* VIEW PHOTOS */}
                {!isMobile && (
                  <Box className={`min-w-100 ${isMobile ? "hidden" : ""}`}>
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
                )}
              </>
            )}
          </div>

          {/* MAIN INFORMATION */}
          <Box
            sx={
              !isMobile && {
                mt: 4,
                gridTemplateRows: "repeat(7, 1fr)",
                gridTemplateColumns: "200px 1fr",
                display: "grid",
                rowGap: "30px",
              }
            }
          >
            {/* WANT SHARED || ANIMAL TYPE*/}
            <CustomLabelTag
              className={isMobile && "flex justify-center my-4"}
              text={"Хочу поделиться"}
            />
            <Box className={`flex ${isMobile && "flex-wrap justify-center"}`}>
              <CustomTag
                className={isMobile && "!mb-6"}
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
            <CustomLabelTag
              className={isMobile && "flex justify-center my-4"}
              text={"Пол"}
            />
            <Box className={`flex ${isMobile && "justify-around"}`}>
              <CustomTag
                type={0}
                text={"Мужской"}
                active={sex === 0}
                handleCustomTag={handleChangeSex}
              />
              <CustomTag
                text={"Женский"}
                type={1}
                active={sex === 1}
                handleCustomTag={handleChangeSex}
              />
            </Box>

            {/* AGE */}
            <CustomLabelTag
              className={isMobile && "flex justify-center my-4"}
              text={"Возраст"}
            />
            <Box
              className={`flex items-center ${
                isMobile ? "justify-center flex-col" : "ml-10"
              }`}
            >
              <input
                {...register("age", {
                  required: "Обязательное поле",
                  min: { value: 0.1, message: "Минимальный возраст 1 год" },
                  max: { value: 30, message: "Максимальный возраст 30 лет" },
                })}
                type="number"
                min={0}
                max={30}
                className={` outline-0 rounded-md w-40 h-full pl-6 !border-solid !border-2 ${
                  errors.age ? "border-red-300" : "!border-gray-300"
                }`}
              />
              {errors.age && (
                <Box sx={{ color: "red", ml: { lg: 4 } }}>
                  {errors.age.message}
                </Box>
              )}
            </Box>

            {/* NAME */}
            <CustomLabelTag
              className={isMobile && "flex justify-center my-4"}
              text={"Имя"}
            />
            <Box
              className={`flex items-center ${
                isMobile ? "justify-center flex-col" : "ml-10"
              }`}
            >
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
                <Box sx={{ color: "red", ml: { lg: 4 } }}>
                  {errors.name.message}
                </Box>
              )}
            </Box>

            {/* ADDRESS */}
            {/*<CustomLabelTag
              className={isMobile && "flex justify-center my-4"}
              text={"Местоположение"}
            />
            <Box
              className={`flex ${
                isMobile ? "my-10 mx-4 flex flex-col" : "ml-10"
              } items-center`}
            >
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
                className={` outline-0 rounded-md h-full pl-6 !border-solid !border-2 ${
                  errors.address
                    ? "border-red-300 w-6/12"
                    : "!border-gray-300 w-full"
                }`}
              />
              {errors.address && (
                <Box sx={{ color: "red", ml: { lg: 4 } }}>
                  {errors.address.message}
                </Box>
              )}
              </Box>*/}

            {/* INFO MEDIC */}
            <CustomLabelTag text={""} />
            <Box
              className={`${
                isMobile ? "m-auto flex-col w-max my-12" : "ml-10"
              } flex`}
            >
              <CustomTypographyTag
                register={register}
                isEditMode={true}
                type={"vaccinated"}
                text={"Есть прививка"}
                className={isMobile && "!mb-10"}
                active={isVaccinated}
                handleCustomTag={handleChangeMedic}
              />
              <CustomTypographyTag
                register={register}
                isEditMode={true}
                className={!isMobile && "!ml-10"}
                handleCustomTag={handleChangeMedic}
                type={"sterilized"}
                text={getValues("sex") === 1 ? "Стерелизована" : "Кастрирован"}
                active={isSterilized}
              />
            </Box>

            {/* DESCRIPTION */}
            <CustomLabelTag
              className={`!items-start ${
                isMobile && "flex justify-center my-4"
              }`}
              text={"Доп. информация"}
              sx={{ gridRowStart: "6", gridRowEnd: "8" }}
            />
            <Box
              className={`flex ${isMobile ? "mx-10" : "ml-10"} flex-col`}
              sx={{ gridRowStart: "6", gridRowEnd: "8" }}
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
                <Box sx={[{ color: "red" }, isMobile && { margin: "0 auto" }]}>
                  {errors.description.message}
                </Box>
              )}
            </Box>
          </Box>
          <Box className={`flex flex-col justify-center mt-20 ${isMobile && "mx-10"}`}>
            {requestErrors && (
              <Box sx={[{ color: "red" }, isMobile && { margin: "0 auto" }]}>
                {requestErrors}
              </Box>
            )}
            <LoadingButton
              loading={isRequest}
              type="submit"
              variant="contained"
              sx={{
                borderRadius: "8px",
                padding: "5px 60px",
                backgroundColor: "#EE7100",
                "&:hover": { backgroundColor: "#ee6f00d2" },
              }}
            >
              <Typography
                fontSize={20}
                className="font-normal !normal-case !mx-20"
              >
                Сохранить
              </Typography>
            </LoadingButton>
          </Box>
        </Box>
      </Card>
    </form>
  );
};
