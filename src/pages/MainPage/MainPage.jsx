import React, { useState } from "react";
import { Card, Typography, Tabs, Tab, Box } from "@mui/material";
import { NewsContainer } from "../../components/News/NewsContainer";
import { UserContainer } from "../../components/User/UserContainer";
import { AnimalsContainer } from "../../components/Animals/AnimalsContainer";
import { Donations } from "../../components/Donations/Donations";
import { useAnimalContext } from "../../Context/AnimalContext";

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
  const { currentTab, setCurrentTab } = useAnimalContext();
  const [isAllAnimal, setIsAllAnimal] = useState(false);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <div className="grid place-content-center h-fit w-full flex-1 pb-12 pt-24">
      <Card
        sx={{ width: { lg: "1240px" }, borderRadius: { lg: 7, xs: 0 } }}
        className="w-screen"
      >
        <UserContainer
          isAllAnimal={isAllAnimal}
          setIsAllAnimal={setIsAllAnimal}
        />
        <Tabs value={currentTab} onChange={handleChangeTab} variant="fullWidth">
          <Tab
            label="Животные"
            sx={{ fontSize: { xs: 12, sm: 16 } }}
            {...a11yProps(0)}
          />
          <Tab
            label="Новости"
            sx={{ fontSize: { xs: 12, sm: 16 } }}
            {...a11yProps(1)}
          />
          <Tab
            label="Пожертвования"
            sx={{ fontSize: { xs: 12, sm: 16 } }}
            {...a11yProps(2)}
          />
           <Tab
            label="Магазин"
            sx={{ fontSize: { xs: 12, sm: 16 } }}
            {...a11yProps(3)}
          />
           <Tab
            label="Услуги"
            sx={{ fontSize: { xs: 12, sm: 16 } }}
            {...a11yProps(4)}
          />
        </Tabs>
        <TabPanel value={currentTab} index={0}>
          <AnimalsContainer isAllAnimal={isAllAnimal} />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <NewsContainer />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <Donations />
        </TabPanel>
      </Card>
    </div>
  );
};
