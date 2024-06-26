import React, { useState } from "react";
import { Box, Card, ImageListItem, Modal, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { ModalDelete } from "../../components/ModalDelete/ModalDelete";
import { CustomButton } from "../CurrentAnimalPage/componentsPage/ModalPhotos";
import { Label } from "./componentsPage/Label";
import { useMobile } from "../../hooks/useMobile";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router";


export const CurrentNewsPage = ({ news, id, isCanEdit }) => {
  const navigate = useNavigate();
  const isMobile = useMobile();
  const [isEditMode, setIsEditMode] = useState(false);
  const [filesURL, setFilesURL] = useState(news.photos);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      label: news.label,
      description: news.description,
    },
  });

  const defaultPropsForComponents = {
    register: register,
    isEditMode: isEditMode,
  };

  const handleClickActive = () => {
    setIsEditMode(true);
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

  const handleFormSubmit = () => {
    if (isEditMode) setIsEditMode(false);
    console.log(getValues());
  };

  const validationDefaultProps = {
    required: "Обязательное поле",
    minLength: { value: 3, message: "Минимальная длина 3 символа" },
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="grid place-content-center h-fit flex-1 py-24"
    >
      <Card
        sx={{
          width: {
            sm: "100%",
            lg: "1240px",
            xs: "100%",
          },
          borderRadius: { lg: 7, xs: 0 },
        }}
      >
        <Box
          sx={{ px: { md: 10, xs: 3 }, py: 3 }}
          className="flex justify-between h-min-80"
        >
          <ArrowBackIcon
              onClick={() => navigate("/")}
              className="cursor-pointer transition ease-in-out delay-150 hover:bg-gray-200 rounded-full hover:scale-110 hover:duration-300 self-center"
              sx={{
                width: {xs: 30, md: 35},
                height: {xs: 30, md:35},
                marginRight: {xs: "12px", md: "24px"},
              }}
              />
          <Box className="flex flex-col justify-center w-full pr-12 md:pr-60">
            <Label
              errors={errors.label}
              validationDefaultProps={validationDefaultProps}
              label={getValues("label")}
              {...defaultPropsForComponents}
            />
            <Typography
              sx={{ fontSize: { xs: 16, md: 18 }}}
              className="text-grey-600 cursor-default !mt-4"
            >
              {news.created_at}
            </Typography>
          </Box>
          {isCanEdit && (
            <Box
              className="flex flex-col md:flex-row justify-center items-center"
              sx={{ mt: { md: "15px", xs: 0 } }}
            >
              {isEditMode ? (
                <button type="submit" className="h-max">
                  <Typography
                    fontSize={18}
                    className="text-grey-600 cursor-pointer !mr-16"
                  >
                    Сохранить
                  </Typography>
                </button>
              ) : (
                <Typography
                  fontSize={18}
                  className="text-grey-600 cursor-pointer !mr-16"
                  onClick={handleClickActive}
                >
                  Изменить
                </Typography>
              )}
              <Typography
                onClick={handleOpen}
                fontSize={18}
                className="cursor-pointer !mr-16 md:!ml-auto w-max"
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
                <ModalDelete id={id} handleClose={handleClose} type={"news"} />
              </Modal>
            </Box>
          )}
        </Box>
        <div
          className="h-2 w-full"
          style={{ backgroundColor: "#DCDCDC" }}
        ></div>
        <Box
          sx={{ px: { md: 10, xs: 5 }, pt: 2, pb: 5 }}
          className="flex flex-col"
        >
          <Box className="flex flex-col">
            {isEditMode && (
              <CustomButton
                text={"Поменять картинку"}
                handleFileLoad={handleFileLoad}
                index={0}
              />
            )}
            <ImageListItem
              className="!flex !justify-center"
              sx={isEditMode ? { mt: 3 } : {}}
              key={filesURL[0]}
            >
              <img
                style={{
                  borderRadius: "15px",
                  height: "285px",
                  width: "285px",
                }}
                src={filesURL[0]}
                alt="news_image"
                loading="lazy"
              />
            </ImageListItem>
          </Box>
          <Box sx={{ mt: "30px", color: "#6A6D76", fontSize: "18px" }}>
            <textarea
              rows={8}
              readOnly={!isEditMode}
              {...register("description", {
                required: "Обязательное поле",
                minLength: {
                  value: 5,
                  message: "Минимальная длина 5 символа",
                },
              })}
              className={`resize-none w-full outline-0 rounded-md px-6 cursor-default font-normal leading-6 ${
                isEditMode ? "border-2 border-gray-300" : ""
              } ${
                errors.description
                  ? "border-red-300"
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
