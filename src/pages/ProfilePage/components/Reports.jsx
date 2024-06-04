import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import Collapse from '@mui/material/Collapse';
import { REMOVE_REPORT_BY_ID_ENDPOINT } from '../../../endpoints';
import authHeader from '../../../auth/auth.headers';
import axios from 'axios';
import { Typography } from '@mui/material';

const ReportsModal = ({ requests, isOpen, onClose, updateReports }) => {
  const [expanded, setExpanded] = useState({});

  const handleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = (id) => {
    axios.post(`${REMOVE_REPORT_BY_ID_ENDPOINT}${id}`, {}, {headers: authHeader()}).then((response) => {
        if (response.status === 200 || response.status === 201) {
            updateReports()
          }
    })
    
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Отчеты</DialogTitle>
      <DialogContent>
        <List className='min-w-200'>
          {requests ? (requests?.map((request) => (
            <React.Fragment key={request.id}>
              <ListItem button onClick={() => handleExpand(request.id)}>
                <ListItemText
                  primary={`${request.sender.first_name} ${request.sender.last_name} - ${request.label}`}
                />
                <ExpandMoreIcon className="cursor-pointer" />
              </ListItem>
              <Collapse in={expanded[request.id]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className="pl-8">
                    <ListItemText primary={`Email: ${request.sender.email}`} />
                  </ListItem>
                  <ListItem button className="pl-8">
                    <ListItemText primary={`Описание: ${request.description}`} />
                  </ListItem>
                  <ListItem button className="pl-8">
                    <Button onClick={() => handleDelete(request.id)} startIcon={<DeleteIcon />}>
                      Удалить
                    </Button>
                  </ListItem>
                </List>
              </Collapse>
            </React.Fragment>
          ))) :
          (<Typography>Сообщений нет</Typography>)}
        </List>
      </DialogContent>
      <Button onClick={onClose}>Закрыть</Button>
    </Dialog>
  );
};

export default ReportsModal;