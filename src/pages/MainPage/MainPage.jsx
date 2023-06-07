import React, { useState } from "react";
import { Card, Typography, Tabs, Tab, Box } from "@mui/material";
import { UserContainer } from "../../components/main-page-components/User/UserContainer";
import { AnimalsContainer } from "../../components/main-page-components/Animals/AnimalsContainer";
import { NewsContainer } from "../../components/News/NewsContainer";

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

export const MainPage = () => {
  const [tab, setTab] = useState(0);
  const [isAllAnimal, setIsAllAnimal] = useState(true);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <div className="grid place-content-center h-screen w-full flex-1 pt-12">
      <Card
        sx={{ width: { lg: "1240px", borderRadius: "20px" } }}
        className="w-screen"
      >
        <UserContainer
          isAllAnimal={isAllAnimal}
          setIsAllAnimal={setIsAllAnimal}
        />
        <Tabs value={tab} onChange={handleChangeTab} variant="fullWidth">
          <Tab label="Животные" {...a11yProps(0)} />
          <Tab label="Новости" {...a11yProps(1)} />
          <Tab label="Пожертвования" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={tab} index={0}>
          <AnimalsContainer isAllAnimal={isAllAnimal} />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <NewsContainer />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          Item Three
        </TabPanel>
      </Card>
    </div>
  );
};
