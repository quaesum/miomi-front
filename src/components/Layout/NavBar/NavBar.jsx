import { Avatar, Button, Popover, Typography } from "@mui/material";
import React from "react";
import catSrc from "../../../assets/NavBar/cat.png";
import pawSrc from "../../../assets/NavBar/paw.png";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

export const NavBar = () => {
  return (
    <div className="p-0 max-h-40 h-40 relative bg-white">
      <div className="flex flex-1 px-16 absolute">
        <img src={catSrc} alt="cat-icon" />
        <Typography fontSize={36} className="!mt-10 !font-semibold">
          mio.mi
        </Typography>
      </div>
      <div className="flex items-center px-8 h-full justify-end">
        <div className="mr-20">
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
                <Button
                  {...bindTrigger(popupState)}
                  variant="contained"
                  sx={{
                    backgroundColor: "#ff9800",
                    "&:hover": { backgroundColor: "#e38800" },
                  }}
                >
                  <img src={pawSrc} alt="paw-icon" />
                  <Typography fontSize={16}>
                    &nbsp; Подать объявление
                  </Typography>
                </Button>
                <Popover
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
                  <Typography sx={{ p: 2, minWidth: "64px;" }}>
                    The content of the Popover.
                  </Typography>
                </Popover>
              </div>
            )}
          </PopupState>
        </div>
        <div className="mr-7">
          <Button
            className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
            color="inherit"
          >
            <div className="hidden md:flex flex-col mx-4 items-end">
              <Typography component="span" className="font-semibold flex">
                User
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
        <Button
          style={{ backgroundColor: "transparent" }}
          className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6 !ml-7"
          color="inherit"
        >
          Выйти
        </Button>
      </div>
    </div>
  );
};
