import React, { useState } from 'react';
import BugReportIcon from '@mui/icons-material/BugReport';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ADD_REPORT_ENDPOINT } from '../../endpoints';
import authHeader from '../../auth/auth.headers';
import axios from 'axios';
import { Typography } from '@mui/material';

const BugReport = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(ADD_REPORT_ENDPOINT, {
        label: title,
        description: description,
      }, {headers: authHeader()});
      if (response.status === 200 || response.status === 201) {
        setSnackbarOpen(true);
        setTitle('');
        setDescription('');
        handleClose();
      } else {
        // handle error
      }
    } catch (error) {
      // handle error
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <BugReportIcon className="cursor-pointer" onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose} PaperProps={{style: {padding: '12px', alignItems: "center"}}} className='flex flex-col'>
        <DialogTitle>Сообщить о проблеме/обратная связь</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Заголовок"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Описание"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <Button
            className="!mb-12"
            onClick={handleSubmit}
            variant="contained"
            sx={{
              width: "40%",
              borderRadius: "8px",
              padding: "5px 60px",
              backgroundColor: "#EE7100",
              "&:hover": { backgroundColor: "#ee6f00d2" },
            }}
          >
            <Typography fontSize={18}>Отправить</Typography>
          </Button>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleSnackbarClose} severity="success">
          Сообщение отправлено
        </Alert>
      </Snackbar>
    </div>
  );
};

export default BugReport;