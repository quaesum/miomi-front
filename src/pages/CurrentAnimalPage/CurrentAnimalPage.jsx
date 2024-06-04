import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  ImageList,
  ImageListItem,
  Modal,
  Typography,
} from "@mui/material";
import Slider from "react-slick";
import pointSrc from "../../assets/CurrentAnimalPage/point.png";
import { useForm } from "react-hook-form";
import { Name } from "./componentsPage/Name";
import { Sex } from "./componentsPage/Sex";
import { CustomTypographyTag } from "../../components/CustomTypographyTag/CustomTypographyTag";
import { Age } from "./componentsPage/Age";
import { ModalPhotos } from "./componentsPage/ModalPhotos";
import { ModalDelete } from "../../components/ModalDelete/ModalDelete";
import { ageTransformation } from "../../components/Animals/Animals";
import DataService from "../../auth/data.service";
import { useNavigate } from "react-router";
import { useMobile } from "../../hooks/useMobile";
import { MobilePhotos } from "./componentsPage/MobilePhotos";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const CurrentAnimalPage = ({
  animal,
  updateAnimals,
  id,
  isCanEdit,
  urlsImages,
  baseUrl,
  shelter,
}) => {
  const navigate = useNavigate();
  const isMobile = useMobile();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSterilized, setIsSterilized] = useState(animal?.sterilized);
  const [isVaccinated, setIsVaccinated] = useState(animal?.vaccinated);
  const [filesURL, setFilesURL] = useState(animal?.photos);
  const [filesID, setFilesID] = useState();
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [openCarousel, setOpenCarousel] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenCarousel = () => setOpenCarousel(true);
  const handleCloseCarousel = () => setOpenCarousel(false);

  const sex = animal.sex == "0" ? "мальчик" : "девочка";

  let params = (new URL(document.location)).searchParams; 

  useEffect(() => {
    setDefaultFiles();
  }, [animal]);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sex,
      age: animal.age,
      nameAnimal: animal.name,
      description: animal.description,
    },
  });

  const defaultPropsForComponents = {
    register: register,
    isEditMode: isEditMode,
  };

  const validationDefaultProps = {
    required: "Обязательное поле",
    minLength: { value: 3, message: "Минимальная длина 3 символа" },
  };

  const setDefaultFiles = () => {
    const tempPhotosUrls = [...animal?.photos?.map((el) => `${el.startsWith("http") ? '' : baseUrl}${el}`)];
    const tempPhotoID = [
      ...animal?.photos?.map((defaultUrl) => {
        let id = urlsImages?.filter((el) => el?.url === defaultUrl)?.[0]?.id;
        return id;
      }),
    ];
    setFilesURL(tempPhotosUrls);
    setFilesID(tempPhotoID);
  };

  const handleClickActive = () => {
    setIsEditMode(true);
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
    if (e.target.files.length > 0) {
      let image = e.target.files[0];
      let path = URL.createObjectURL(image);
      let tempFilesURL = [...filesURL];
      let tempFiles = [...files];

      tempFilesURL[tempIndex] = path;
      tempFiles[tempIndex] = image;

      setFilesURL(tempFilesURL);
      setFiles(tempFiles);
    }
  };

  const handleFormSubmit = async () => {
    setIsEditMode(false);
    const tempPhotosId = []; //id photos
    for (let i = 0; i < filesURL.length; i++) {
      if (files[i]) {
        await DataService.addPhotoAnimal(files[i])
          .then((res) => {
            tempPhotosId.push(res.data);
          })
          .catch((er) => { });
      } else {
        tempPhotosId.push(filesID[i]);
      }
    }
    setFilesID(tempPhotosId);
    const type =
      animal.type === "Кот"
        ? 1
        : animal.type === "Собака"
          ? 2
          : animal.type === "Птица"
            ? 3
            : 4;
    const postData = {
      age: Number(getValues("age")),
      name: getValues("nameAnimal"),
      sex: getValues("sex") === "мальчик" ? 1 : 0,
      type: type,
      shelterId: Number(animal.shelterId),
      description: getValues("description"),
      sterilized: isSterilized,
      vaccinated: isVaccinated,
      onrainbow: animal.onrainbow,
      onhappines: animal.onhappines,
      photos: tempPhotosId,
    };

    await DataService.updateAnimal(postData, id)
      .then((res) => {
        updateAnimals();
      })
      .catch((er) => {
        console.log(`Post update animal: ${er}`);
      });
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setValue("sex", sex);
    setValue("age", animal?.age);
    setValue("description", animal?.description);
    setValue("nameAnimal", animal?.name);
    setIsSterilized(animal?.sterilized);
    setIsVaccinated(animal?.vaccinated);
    setDefaultFiles();
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowForwardIcon />,
    prevArrow: <ArrowBackIcon />,
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="grid place-content-center h-fit w-full flex-1 py-24 bg-transparent"
    >
      <Card
        sx={{
          width: { sm: "100%", lg: "content", xs: "100vw" },
          borderRadius: { lg: 7, xs: 0 },
          background: "transparent"
        }}
      >
        <Box
          sx={{ px: { md: 10, xs: 2 }, py: { md: 5, xs: 2 } }}
          className="flex justify-between bg-white"
        >
          <Box className="flex items-center">
            <Typography className="flex items-center">
              <ArrowBackIcon
                onClick={() => navigate(params.get("prev"))}
                className="cursor-pointer transition ease-in-out delay-150 hover:bg-gray-200 rounded-full hover:scale-110 hover:duration-300 hover:border-4 border-gray-200"
                sx={{
                  width: { xs: 30, md: 35 },
                  height: { xs: 30, md: 35 },
                  marginRight: { xs: "12px", md: "24px" },
                }}
              />
              <Avatar
                alt="avatar-animal"
                src={filesURL[0]}
                sx={{
                  width: { lg: 100, md: 70, xs: 60 },
                  height: { lg: 100, md: 70, xs: 60 },
                }}
              />
            </Typography>
            <Box
              sx={{ mt: { md: "10px", xs: "5px" }, width: "150px" }}
              className="flex flex-col md:flex-row"
            >
              <Typography
                sx={{ ml: { md: "20px", xs: "10px" } }}
                className="flex flex-col"
              >
                <Name
                  errors={errors.nameAnimal}
                  validationDefaultProps={validationDefaultProps}
                  {...defaultPropsForComponents}
                  name={getValues("nameAnimal")}
                />
                <Sex
                  validationDefaultProps={validationDefaultProps}
                  {...defaultPropsForComponents}
                  sex={getValues("sex")}
                  handleChangeSex={handleChangeSex}
                />
              </Typography>
              <Age
                errors={errors.age}
                {...defaultPropsForComponents}
                age={getValues("age")}
                ageName={ageTransformation(getValues("age"))}
              />
            </Box>
          </Box>

          {isCanEdit && (
            <Box
              className="flex flex-col"
              sx={{ mt: { md: "23px", xs: "20px" } }}
            >
              {isEditMode ? (
                <button type="submit" className="h-max">
                  <Typography
                    fontSize={18}
                    className="text-grey-600 cursor-pointer"
                  >
                    Сохранить
                  </Typography>
                </button>
              ) : (
                <Typography
                  fontSize={18}
                  className="text-grey-600 cursor-pointer"
                  onClick={handleClickActive}
                >
                  Изменить
                </Typography>
              )}
              <Typography
                onClick={isEditMode ? handleCancel : handleOpen}
                fontSize={18}
                className="cursor-pointer !ml-auto w-max"
                sx={{ color: "#EE7100" }}
              >
                {isEditMode ? "Отменить" : "Удалить"}
              </Typography>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <ModalDelete
                  prev={params.get("prev")}
                  type={"animal"}
                  id={id}
                  handleClose={handleClose}
                />
              </Modal>
            </Box>
          )}
        </Box>
        <div
          className="h-2 w-full bg-transparent"
        ></div>
        <Box
          sx={{ px: { md: 10, xs: 2 }, pt: 2, pb: 5 }}
          className="flex flex-col bg-white"
        >
          {/* PLACE */}
          <div className={`flex ${isMobile ? "flex-col" : "flex-row"} w-full items-center justify-center`}>
            <div>
              <Box className="flex">
                <Box>
                  <img
                    src={pointSrc}
                    style={{ width: "17px", height: "26px" }}
                    alt="point"
                  />
                </Box>
                <Box className={`${isEditMode ? "flex flex-col" : ""} ml-6`}>
                  <Typography name={22} sx={{ color: "#6A6D76" }}>
                    {shelter?.place}
                  </Typography>
                  <Typography sx={{ color: "#6A6D76" }} fontSize={22}>
                    {shelter?.address}
                  </Typography>
                  <Typography fontSize={22} sx={{ color: "#6A6D76" }}>
                    {shelter?.phone}
                  </Typography>
                </Box>
              </Box>
              <Box
                className={`flex ${isMobile && "flex-col"} ${isEditMode && "justify-center"
                  }`}
                sx={{ mt: "25px" }}
              >
                <CustomTypographyTag
                  {...defaultPropsForComponents}
                  type={"vaccinated"}
                  text={"Есть прививка"}
                  active={isVaccinated}
                  handleCustomTag={handleCustomTag}
                />
                <CustomTypographyTag
                  {...defaultPropsForComponents}
                  className={`${isMobile ? "!mt-10" : "!ml-10"}`}
                  handleCustomTag={handleCustomTag}
                  type={"sterilized"}
                  text={
                    getValues("sex") === "мальчик" ? "Кастрирован" : "Стерелизована"
                  }
                  active={isSterilized}
                />
              </Box>
            </div>

            {isMobile ? (
              <MobilePhotos
                isEditMode={isEditMode}
                handleFileLoad={handleFileLoad}
                files={filesURL}
              />
            ) : (
              <Box className="flex flex-col" sx={{ marginLeft: { xs: 0, md: "24px", lg: "36px" } }}>
                {isEditMode && <ModalPhotos handleFileLoad={handleFileLoad} />}
                <ImageList
                  sx={
                    !isEditMode
                      ? {
                        width: "100%",
                        height: 128,
                      }
                      : { width: "100%", height: 128 }
                  }
                  variant="quilted"
                  cols={3}
                >
                  {filesURL?.map((item, index) => (
                    <ImageListItem key={item}>
                      <img
                        style={{
                          borderRadius: "15px",
                          height: 128,
                          width: 128,
                        }}
                        src={item}
                        alt={"animal_image"}
                        loading="lazy"
                        onClick={handleOpenCarousel}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>
            )}
          </div>
          <Box sx={{ mt: "30px", color: "#6A6D76", fontSize: "18px" }}>
            <textarea
              ref={(element) => {
                if (element) {
                  element.style.height = "auto";
                  element.style.height = `${element.scrollHeight}px`;
                }
              }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              readOnly={!isEditMode}
              {...register("description", {
                required: "Обязательное поле",
                minLength: {
                  value: 5,
                  message: "Минимальная длина 5 символа",
                },
              })}
              className={`resize-none w-full outline-0 rounded-md px-6 cursor-default font-normal leading-6 bg-gray-200 ${isEditMode ? "border-2 border-gray-300" : ""
                } ${errors.description
                  ? "border-red-300 w-6/12"
                  : "!border-gray-300 w-full"
                }`}
            />
            {errors.description && (
              <Box sx={{ color: "red" }}>{errors.description.message}</Box>
            )}
          </Box>
        </Box>
      </Card>

      <Modal
        open={openCarousel}
        onClose={handleCloseCarousel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90vw', md: '60vw' },
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2
        }}>
          <Slider {...settings}>
            {filesURL?.map((item, index) => (
              <div key={index}>
                <img
                  src={item}
                  alt={`animal_image_${index}`}
                  style={{
                    width: '100%',
                    maxHeight: '80vh',
                    objectFit: 'contain'
                  }}
                />
              </div>
            ))}
          </Slider>
        </Box>
      </Modal>
    </form>
  );
};
