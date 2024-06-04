import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

export const ModalInvitation = ({ isOpen, handleClose, handleAccept, handleReject, data }) => {
    console.log(data)
  return (
    <Modal open={isOpen} onClose={handleClose} aria-labelledby="invitation-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxWidth: '90vw',
          minWidth: '320px',
          overflow: 'auto',
        }}
      >
        {data && data?.data?.map((invitation) => (
          <Box key={invitation?.id} mb={4}>
            <Typography variant="h6">Приглашение от: {invitation?.from.firstName} {invitation?.from?.lastName}</Typography>
            <Typography>в приют: {invitation?.invitedTo.name}</Typography>
            <Typography>Адрес: {invitation?.invitedTo.address}</Typography>
            <Typography>Телефон: {invitation?.invitedTo.phone}</Typography>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button onClick={() => handleAccept(invitation?.id)} variant="contained" sx={{ mr: 2 }}>Принять</Button>
              <Button onClick={() => handleReject(invitation?.id)} variant="contained" color="error">Отклонить</Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Modal>
  );
};
