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
import { Description } from "./componentsPage/Description";
import { ModalPhotos } from "../CurrentAnimalPage/componentsPage/ModalPhotos";
import { Label } from "./componentsPage/Label";

export const CurrentNewsPage = ({ news, id }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [filesURL, setFilesURL] = useState(news.photos);

  console.log(news);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      label: news.label,
      description: news.description,
    },
  });

  const defaultPropsForComponents = {
    register: register,
    isEditMode: isEditMode,
  };

  const handleClickModeChange = () => {
    if (isEditMode) {
      handleSubmit();
      setIsEditMode((prev) => !prev);
    } else {
      setIsEditMode((prev) => !prev);
    }
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
        <Box sx={{ px: 10, py: 3 }} className="flex justify-between h-min-80">
          <Box className="flex flex-col justify-center">
            <Label label={getValues("label")} {...defaultPropsForComponents} />
          </Box>
          <Box className="flex flex-row" sx={{ mt: "15px" }}>
            <Typography
              fontSize={18}
              className="text-grey-600 cursor-pointer !mr-16"
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
            <Description {...defaultPropsForComponents} />
          </Box>
        </Box>
      </Card>
    </form>
  );
};
