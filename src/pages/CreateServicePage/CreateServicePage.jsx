import React, { useEffect, useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import { PlaceAnAd } from "../../components/PlaceAnAd/PlaceAnAd";
import arrowUp from "../../assets/CreateAnimalPage/arrow-up.png";
import { useForm } from "react-hook-form";
import nullPicture from "../../assets/null_picture.svg";
import { CustomButton } from "../CurrentAnimalPage/componentsPage/ModalPhotos";
import DataService from "../../auth/data.service";
import { useNavigate } from "react-router";
import { useAnimalContext } from "../../Context/AnimalContext";
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
      <Typography fontWeight={600} fontSize={20} height={40}>
        {text}
      </Typography>
    </Box>
  );
};

export const CreateServicePage = () => {
  const isMobile = useMobile();
  const navigate = useNavigate();
  const { updateServices } = useAnimalContext();
  const [photos, setPhotos] = useState([]);
  const [isDragEnter, setIsDragEnter] = useState(false);
  const [photoElements, setPhotoElements] = useState([]);
  const [isRequestImages, setIsRequestImages] = useState(false);
  const [photosId, setPhotosId] = useState([]);
  const [isRequest, setIsRequest] = useState(false);
  const [requestErrors, setRequestErrors] = useState("");


  useEffect(() => {
    if (!isRequestImages && photosId?.length === 1 && getValues("service_name")) {
      const postData = {
        photos: photosId,
        name: getValues("service_name"),
        description: getValues("description"),
      };

      DataService.addService(postData)
        .then((res) => {
          navigate("/");
          console.log(res)
          updateServices();
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
      } catch (er) { }
      tempPhotoElements[i] = (
        <img
          className={`${path ? "cursor-pointer" : ""}`}
          key={i}
          style={{
            height: "90px",
            width: "90px",
          }}
          onClick={path ? () => deleteFile(i) : () => { }}
          src={path ? path : nullPicture}
          alt={"photo_image"}
          loading="lazy"
        />
      );
    }
    setPhotoElements(tempPhotoElements);
  }, [photos]);

  useEffect(() => {
    setValue("photos", photos?.length);
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
      service_name: "",
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
    // setInfo(`Name: ${photos[0].name}, Type: ${photos[0].type}, Size: ${photos[0].size},`)
    if (photos?.length >= 1) {
      await DataService.addPhotoAnimal(photos[0])
        .then((res) => {
          tempPhotosId.push(res.data);
        })
        .catch((er) => {
          setRequestErrors("Photo 1 request: " + er.message);
          setIsRequest(false);
        });
    }
    if (photos?.length >= 2) {
      await DataService.addPhotoAnimal(photos[1])
        .then((res) => {
          tempPhotosId.push(res.data);
        })
        .catch((er) => {
          setRequestErrors("Photo 2 request: " + er.message);
          setIsRequest(false);
        });
    }
    if (photos?.length === 3) {
      await DataService.addPhotoAnimal(photos[2])
        .then((res) => {
          tempPhotosId.push(res.data);
        })
        .catch((er) => {
          setRequestErrors("Photo 3 request: " + er.message);
          setIsRequest(false);
        });
    }

    if (tempPhotosId?.length === photos?.length) {
      setPhotosId(tempPhotosId);
      setIsRequestImages(false);
    }
  };


  const handleSubmitForm = () => {
    getPhotosId();
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
    files.forEach((el) => addFile(el));
    setIsDragEnter(false);
  };

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
        <PlaceAnAd type={"Услуги"} />
        <Box sx={{ ml: { lg: 10 }, my: 3, mr: { lg: 15 } }}>
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
                    className={`!font-semibold ${isMobile && "flex justify-center"
                      }`}
                  >
                    Фотографии
                  </Typography>
                  {isMobile && (
                    <Box>
                      <Typography className="flex justify-center" fontSize={18}>
                        &nbsp;{`Загружено ${photos?.length} из 3`}
                      </Typography>
                      {photos?.length < 1 && (
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
                            &nbsp; Добавьте фотографию
                          </Typography>
                        </>
                      }
                      index={1}
                      handleFileLoad={handleFileLoad}
                      type="create-service"
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
                            &nbsp;{`Загружено ${photos?.length} из 3`}
                          </Typography>
                        </Box>
                        {photos?.length < 1 && (
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
                gridTemplateRows: "repeat(3, 1fr)",
                gridTemplateColumns: "200px 1fr",
                display: "grid",
                rowGap: "30px",
              }
            }
          >
            {/* LABEL */}
            <CustomLabelTag

              text={"Название"}
              className={isMobile && "flex justify-center my-4"}
            />
            <Box
              className={`flex items-center ${isMobile ? "justify-center flex-col px-10" : "ml-10"
                }`}
            >
              <input
                {...register("service_name", {
                  required: "Обязательное поле",
                  minLength: {
                    value: 3,
                    message: "Минимальная длина 3 символа",
                  },
                })}
                type="text"
                min={0}
                max={30}
                className={`outline-0 rounded-md h-auto pl-6 !border-solid !border-2 ${errors.service_name
                    ? "border-red-300 w-6/12"
                    : "!border-gray-300 w-full"
                  }`}
              />
              {errors.service_name && (
                <Box sx={{ color: "red", ml: { lg: 4 } }}>
                  {errors.service_name.message}
                </Box>
              )}
            </Box>

            {/* DESCRIPTION */}
            <CustomLabelTag
              className={`!items-start ${isMobile && "flex justify-center my-4"
                }`}
              text={"Информация"}
              sx={{ gridRowStart: "2", gridRowEnd: "4" }}
            />
            <Box
              className={`flex ${isMobile ? "mx-10" : "ml-10"} flex-col`}
              sx={{ gridRowStart: "2", gridRowEnd: "4" }}
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
                className={`resize-none w-full h-auto border-2 border-gray-300 outline-0 rounded-md px-6 cursor-default font-normal leading-6 ${errors.description
                    ? "border-red-300 w-6/12"
                    : "!border-gray-300 w-full"
                  }`}
              />
              {errors.description && (
                <Box sx={{ color: "red" }} className={isMobile && "flex justify-center"}>{errors.description.message}</Box>
              )}
            </Box>
          </Box>
          <Box className="flex justify-center mt-20">
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
