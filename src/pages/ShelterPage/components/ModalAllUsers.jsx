import React from "react";
import {
  Modal,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";

const InviteUsersModal = ({ users, handleCloseModal, handleInvite, openUsersModal }) => {
  return (
    <Modal
      open={openUsersModal}
      onClose={handleCloseModal}
      aria-labelledby="invite-users-modal"
      aria-describedby="modal to invite users"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Выберите пользователей для приглашения
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Имя</TableCell>
                <TableCell>Фамилия</TableCell>
                <TableCell>Почтовый адрес</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users && users.data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>
                    {`${user.email.slice(0, 3)}****${user.email.split("@")[1]}`}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleInvite(user.id)}
                    >
                      Пригласить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button sx={{ paddingTop: "12px" }} onClick={handleCloseModal}>
          Закрыть
        </Button>
      </Box>
    </Modal>
  );
};

export default InviteUsersModal;
