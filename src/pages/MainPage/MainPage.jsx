import React, { useState } from "react";
import { Card, Typography, Tabs, Tab, Box } from "@mui/material";
import { NewsContainer } from "../../components/News/NewsContainer";
import { AnimalsContainer } from "../../components/Animals/AnimalsContainer";
import { useAnimalContext } from "../../Context/AnimalContext";
import { ProductsContainer } from "../../components/Products/ProductsContainer";
import { SearchBar } from "../../components/Search/Search";
import { ServiceContainer } from "../../components/Services/ServicesContainer";

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
    <div className="grid place-content-center h-fit w-full flex-1 pb-12 pt-24 bg-transparent">
      <Card
        sx={{ width: { lg: "1240px" }, borderRadius: { lg: 7, xs: 0 }, backgroundColor: "transparent" }}
        className="w-screen min-h-fit bg-transparent"
      >
        <SearchBar />
        <div className="h-3 w-full"></div>
        <div style={{ background: "#fff" }}>
          <Tabs value={currentTab} onChange={handleChangeTab} variant="fullWidth" className="bg-white">
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
              label="Магазин"
              sx={{ fontSize: { xs: 12, sm: 16 } }}
              {...a11yProps(2)}
            />
            <Tab
              label="Услуги"
              sx={{ fontSize: { xs: 12, sm: 16 } }}
              {...a11yProps(3)}
            />
          </Tabs>
          <TabPanel value={currentTab} index={0}>
            <AnimalsContainer isAllAnimal={isAllAnimal} />
          </TabPanel>
          <TabPanel value={currentTab} index={1}>
            <NewsContainer />
          </TabPanel>
          <TabPanel value={currentTab} index={2}>
            <ProductsContainer />
          </TabPanel>
          <TabPanel value={currentTab} index={3}>
            <ServiceContainer/>
            </TabPanel> 
        </div>
      </Card>
    </div>
  );
};
