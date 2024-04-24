import { Avatar, Box, Button, Popover, Typography } from "@mui/material";
import React from "react";
import catSrc from "../../../assets/NavBar/cat.png";
import pawSrc from "../../../assets/NavBar/paw.png";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { useNavigate } from "react-router-dom";

const CustomButton = ({ text, url, popupState }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(url);
    popupState.close()
  };

  return (
    <Button
      sx={{
        borderRadius: "8px",
        padding: "5px 50px",
        width: "100%",
        "&:hover": {
          backgroundColor: "#DCDCDC",
          border: "3px solid #DCDCDC",
        },
        color: "#EE7100",
        border: "3px solid #DCDCDC",
        maxWidth: "180px",
        maxHeight: "35px",
      }}
      className="!text-xs !normal-case"
      type="submit"
      variant="outlined"
      onClick={handleClick}
    >
      {text}
    </Button>
  );
};

export const NavBar = ({ firstName, lastName, isLogin, handleClickExit }) => {
  const navigate = useNavigate();
  const userName = `${firstName} ${lastName}`;

  return (
    <div className="p-0 max-h-40 h-40 relative bg-white">
      <div
        className="flex flex-1 px-16 absolute cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src={catSrc}
          alt="cat-icon"
          className="hidden md:flex"
        />
        <Typography className="!mt-10 !font-semibold !text-3xl hidden sm:flex">
          MioMi
        </Typography>
      </div>
      <div className="flex items-center px-8 h-full justify-end">
        {firstName && (
          <>
            <div className="sm: mr-5 md:mr-20">
              <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                  <>
                    <Button
                      {...bindTrigger(popupState)}
                      variant="contained"
                      sx={
                        popupState.isOpen
                          ? {
                              borderEndEndRadius: "0px",
                              borderEndStartRadius: "0px",
                              backgroundColor: "#EE7100",
                              boxShadow: "0",
                              "&:hover": { backgroundColor: "#ee6f00d2" },
                            }
                          : {
                              backgroundColor: "#EE7100",
                              "&:hover": { backgroundColor: "#ee6f00d2" },
                            }
                      }
                    >
                      <img
                        src={pawSrc}
                        alt="paw-icon"
                        className="hidden sm:flex"
                      />
                      <Typography
                        sx={{ lineHeight: { xs: "1rem", sm: "1.5rem" } }}
                      >
                        &nbsp; Подать объявление
                      </Typography>
                    </Button>
                    <Popover
                      classes={{
                        paper: "!rounded-t-none",
                      }}
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          width: {
                            xs: "185px",
                            sm: "248px",
                            md: "248px",
                            lg: "248px;",
                          },
                          borderStartStartRadius: 0,
                        }}
                        className="flex justify-center"
                      >
                        <Box className="grid grid-rows-2 gap-6">
                          <CustomButton
                            popupState={popupState}
                            text={"Животное"}
                            url={"animals/create-animal"}
                          />
                          <CustomButton
                            popupState={popupState}
                            text={"Новость"}
                            url={"news/create-news"}
                          />
                          {/* <CustomButton
                            popupState={popupState}
                            text={"Пожертвование"}
                            url={"donations/create-animal"}
                          /> */}
                        </Box>
                      </Box>
                    </Popover>
                  </>
                )}
              </PopupState>
            </div>
            <div className="mr-7">
              <Button
                onClick={() => navigate("/profile")}
                className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
                color="inherit"
              >
                <div className="hidden md:flex flex-col mx-4 items-end">
                  <Typography
                    fontSize={18}
                    component="span"
                    className="font-semibold flex !normal-case"
                  >
                    {userName}
                  </Typography>
                  <Typography
                    className="text-11 font-medium capitalize"
                    color="text.secondary"
                  ></Typography>
                </div>
                <Avatar className="md:mx-4"></Avatar>
              </Button>
            </div>
            <div
              className="w-2 h-full"
              style={{ backgroundColor: "#DCDCDC" }}
            ></div>
          </>
        )}
        <Button
          style={{ backgroundColor: "transparent" }}
          className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6 !ml-7"
          color="inherit"
          onClick={handleClickExit}
        >
          {isLogin ? "Выйти" : "Войти"}
        </Button>
      </div>
    </div>
  );
};
