import React, { useState } from "react";
import {
  Box,
  Card,
  ImageList,
  ImageListItem,
  Modal,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { ModalDelete } from "../../components/ModalDelete/ModalDelete";
import { ModalPhotos } from "../CurrentAnimalPage/componentsPage/ModalPhotos";
import { Label } from "./componentsPage/Label";

export const CurrentNewsPage = ({ news, id }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
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
      className="grid place-content-center h-full w-full flex-1"
    >
      <Card
        sx={{
          width: { sm: "100%", lg: "1024px", xs: "100%", borderRadius: "20px" },
        }}
      >
        <Box sx={{ px: 10, py: 3 }} className="flex justify-between h-min-80">
          <Box className="flex flex-col justify-center w-full pr-60">
            <Label
              errors={errors.label}
              validationDefaultProps={validationDefaultProps}
              label={getValues("label")}
              {...defaultPropsForComponents}
            />
          </Box>
          <Box className="flex flex-row justify-center" sx={{ mt: "15px" }}>
            {isEditMode ? (
              <button type={isSubmit ? "submit" : ""} className="h-max">
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
              <ModalDelete id={id} handleClose={handleClose} />
            </Modal>
          </Box>
        </Box>
        <div
          className="h-2 w-full"
          style={{ backgroundColor: "#DCDCDC" }}
        ></div>
        <Box sx={{ px: 10, pt: 2, pb: 5 }} className="flex flex-col">
          <Box className="flex flex-col">
            <Box>
              <Typography
                fontSize={18}
                className="text-grey-600 cursor-default !mr-16"
              >
                {news.created_at}
              </Typography>
            </Box>
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
                    alt="news_image"
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
          <Box sx={{ mt: "30px", color: "#6A6D76", fontSize: "18px" }}>
            <textarea
              rows={3}
              readOnly={!isEditMode}
              {...register("description", {
                required: "Обязательное поле",
                minLength: {
                  value: 5,
                  message: "Минимальная длина 5 символа",
                },
              })}
              className={`resize-none w-full border-2 border-gray-300 outline-0 rounded-md px-6 cursor-default font-normal leading-6 ${
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
