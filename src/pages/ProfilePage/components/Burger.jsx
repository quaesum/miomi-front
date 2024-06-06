// BurgerMenu.js
import React from 'react';
import { Menu, MenuItem } from '@mui/material';

export default function BurgerMenu({ isAdmin, anchorEl, menuOpen, handleMenuClose, setEdit, handleClickOpenShelters, handleClickExit, handleOpenReports }) {
  return (
    <Menu
      id="long-menu"
      anchorEl={anchorEl}
      open={menuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        style: {
          maxHeight: 48 * 4.5,
          width: "max-content",
        },
      }}
    >
      <MenuItem onClick={() => { setEdit(true); handleMenuClose(); }}>
        Изменить
      </MenuItem>
      {isAdmin && <MenuItem onClick={() => { handleClickOpenShelters(); handleMenuClose(); }}>
        Запросы на подтверждение
      </MenuItem>}
      {isAdmin && <MenuItem onClick={() => {handleOpenReports(); handleMenuClose()}}>
        Сообщения
      </MenuItem>}
      <MenuItem onClick={() => { handleClickExit(); handleMenuClose(); }}>
        Выйти
      </MenuItem>
    </Menu>
  );
}
