import React, { useState } from "react";
import { Card, Typography, Tabs, Tab, Box } from "@mui/material";
import { Animals } from "../../components/Animals/Animals";
import { News } from "../../components/News/News";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

export const MainPage = ({animalsData, newsData}) => {
  const [tab, setTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <div className="grid place-content-center h-screen w-full flex-1 pt-12">
      <Card sx={{ width: {lg: "1240px"} }} className="w-screen">
        <Tabs value={tab} onChange={handleChangeTab} variant="fullWidth">
          <Tab label="Животные" {...a11yProps(0)} />
          <Tab label="Новости" {...a11yProps(1)} />
          <Tab label="Пожертвования" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={tab} index={0}>
          <Animals animals={animalsData} />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <News news={newsData} />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          Item Three
        </TabPanel>
      </Card>
    </div>
  );
};
