import React, { useState, useEffect } from "react";
import { Box, Card, ImageListItem, Modal, Typography, ImageList } from "@mui/material";
import { useForm } from "react-hook-form";
import { ModalDelete } from "../../components/ModalDelete/ModalDelete";
import nullPicture from "../../assets/null_picture.svg";
import { useMobile } from "../../hooks/useMobile";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router";
import { MobilePhotos } from "./componentsPage/MobilePhotos";
import DataService from "../../auth/data.service";
import { ModalPhotos } from "./componentsPage/ModalPhotos";
import { Label } from "./componentsPage/Label"
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';



export const CurrentServicePage = ({ services, id, isCanEdit, baseUrl, urlsImages, updateServices, currentUser }) => {
  const navigate = useNavigate();

  const isMobile = useMobile();
  const [isEditMode, setIsEditMode] = useState(false);
  const [filesURL, setFilesURL] = useState(services?.images);
  const [filesID, setFilesID] = useState();
  const [files, setFiles] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: services?.name,
      description: services?.description,
    },
  });

  useEffect(() => {
    setDefaultFiles();
  }, [services]);

  const setDefaultFiles = () => {
    const tempPhotosUrls = [...services?.images?.map((el) => `${baseUrl}${el}`)];
    const tempPhotoID = [
      ...services?.images?.map((defaultUrl) => {
        let id = urlsImages?.filter((el) => el?.url === defaultUrl)?.[0]?.id;
        return id;
      }),
    ];
    setFilesURL(tempPhotosUrls);
    setFilesID(tempPhotoID);
  };

  const defaultPropsForComponents = {
    register: register,
    isEditMode: isEditMode,
  };


  const handleClickActive = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setValue("name", services?.name);
    setValue("description", services?.description);
    setDefaultFiles();
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
        await DataService.addPhotoService(files[i])
          .then((res) => {
            tempPhotosId.push(res.data);
          })
          .catch((er) => { });
      } else {
        tempPhotosId.push(filesID[i]);
      }
    }
    setFilesID(tempPhotosId);
    const postData = {
      name: getValues("name"),
      description: getValues("description"),
      photos: tempPhotosId,
    };

    await DataService.updateService(postData, id)
      .then((res) => {
        updateServices();
      })
      .catch((er) => {
        console.log(`Post update animal: ${er}`);
      });
    console.log(getValues());
  };

  const validationDefaultProps = {
    required: "Обязательное поле",
    minLength: { value: 3, message: "Минимальная длина 3 символа" },
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="grid place-content-center h-fit w-full flex-1 py-24 bg-transparent"
    >
      <Card
        sx={{
          width: {
            sm: "100%",
            lg: "content",
            xs: "100vw",
          },
          borderRadius: { lg: 7, xs: 0 },
          background: "transparent"
        }}
      >
        <Box
          sx={{ px: { md: 10, xs: 2 }, py: { md: 5, xs: 2 } }}
          className="flex justify-between bg-white"
        >
          <Box className="flex items-center">
            <ArrowBackIcon
              onClick={() => navigate("/")}
              className="cursor-pointer transition ease-in-out delay-150 hover:bg-gray-200 rounded-full hover:scale-110 hover:duration-300 self-center"
              sx={{
                width: { xs: 30, md: 35 },
                height: { xs: 30, md: 35 },
                marginRight: { xs: "12px", md: "24px" },
              }}
            />
            <Box className="flex flex-col justify-center w-full pr-12 md:pr-60">
              <Label
                errors={errors.label}
                validationDefaultProps={validationDefaultProps}
                label={getValues("name")}
                {...defaultPropsForComponents}
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
                  type={"services"}
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
          sx={{ px: { md: 10, xs: 5 }, pt: 2, pb: 5 }}
          className="flex flex-col bg-white"
        >
          <div className={`flex ${isMobile ? "flex-col" : "flex-row" } w-full items-center justify-center`}>
            <div>
              <div className="flex flex-row items-center text-lg">
                <PersonIcon sx={{ height: "32px", width: "32px", marginRight: "6px" }} />
                {currentUser?.firstName} {currentUser?.lastName}
              </div>
              <div className="flex flex-row items-center text-lg">
                <LocalPhoneIcon sx={{ height: "32px", width: "32px", marginRight: "6px" }} />
                {currentUser?.phone}
              </div>

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
                  {filesURL?.map((item) => (
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
              className={`resize-none w-full outline-0 rounded-md px-6 cursor-default font-normal leading-6 rounded-full bg-gray-200 ${isEditMode ? "border-2 border-gray-300" : ""
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
    </form>
  );
};
