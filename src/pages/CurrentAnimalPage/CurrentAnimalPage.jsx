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
import { Place } from "./componentsPage/Place";
import { Address } from "./componentsPage/Address";
import { useNavigate } from "react-router";

export const CurrentAnimalPage = ({
  animal,
  updateAnimals,
  id,
  isCanEdit,
  urlsImages,
  baseURL,
}) => {
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSterilized, setIsSterilized] = useState(animal?.sterilized);
  const [isVaccinated, setIsVaccinated] = useState(animal?.vaccinated);
  const [filesURL, setFilesURL] = useState(animal?.photos);
  const [filesID, setFilesID] = useState();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const tempPhotosUrls = [...animal?.photos?.map((el) => `${baseURL}${el}`)];
    const tempPhotoID = [
      ...animal?.photos?.map((defaultUrl) => {
        let id = urlsImages.filter((el) => el.url === defaultUrl)[0].id;
        return id;
      }),
    ];
    setFilesURL(tempPhotosUrls);
    setFilesID(tempPhotoID);
  }, [animal]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sex = animal.sex ? "девочка" : "мальчик";

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
      place: animal.shelter,
      address: animal.address,
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
    if (e.target.files) {
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
          .catch((er) => {});
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
      shelterId: animal.shelterId,
      description: getValues("description"),
      sterilized: isSterilized,
      vaccinated: isVaccinated,
      onrainbow: animal.onrainbow,
      onhappines: animal.onhappines,
      photos: tempPhotosId,
    };

    console.log(postData)

    await DataService.updateAnimal(postData, id)
      .then((res) => {
        console.log(res);
        updateAnimals();
        navigate("/");
      })
      .catch((er) => console.log(er));
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="grid place-content-center h-full w-full flex-1 pt-12"
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
                src={filesURL?.[0]}
                sx={{ width: 90, height: 90 }}
              />
            </Typography>
            <Box sx={{ mt: "10px" }} className="flex">
              <Typography sx={{ ml: "20px" }} className="flex flex-col">
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
            <Box className="flex flex-col" sx={{ mt: "23px" }}>
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
                <ModalDelete
                  type={"animal"}
                  id={id}
                  handleClose={handleClose}
                />
              </Modal>
            </Box>
          )}
        </Box>
        <div
          className="h-2 w-full"
          style={{ backgroundColor: "#DCDCDC" }}
        ></div>
        <Box sx={{ px: 10, pt: 2, pb: 5 }} className="flex flex-col">
          {/* PLACE */}
          <Box className="flex">
            <Box className={isEditMode ? "flex items-center" : ""}>
              <img
                src={pointSrc}
                style={{ width: "17px", height: "26px" }}
                alt="point"
              />
            </Box>
            <Box className={isEditMode ? "flex flex-col" : "ml-10"}>
              <Place
                validationDefaultProps={validationDefaultProps}
                errors={errors.place}
                place={getValues("place")}
                {...defaultPropsForComponents}
              />
              <Address
                validationDefaultProps={validationDefaultProps}
                errors={errors.address}
                address={getValues("address")}
                {...defaultPropsForComponents}
              />
            </Box>
          </Box>
          <Box
            className={isEditMode ? "flex justify-center" : "flex"}
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
              {filesURL?.map((item) => (
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
              className={`resize-none w-full outline-0 rounded-md px-6 cursor-default font-normal leading-6 ${
                isEditMode ? "border-2 border-gray-300" : ""
              } ${
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
      </Card>
    </form>
  );
};
