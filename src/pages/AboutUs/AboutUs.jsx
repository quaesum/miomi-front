import React from 'react';
import { Box, Card, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const AboutUs = () => {
    const navigate = useNavigate();
    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', mt: 10, borderRadius: 4 }} className='flex flex-col items-center'>
            <Box className="m-12">
                <Typography fontSize={24} gutterBottom>
                    О нас
                </Typography>
                <Typography variant="body1" fontSize={18}>
                    Приложение разработано в рамках дипломного проектирования приложения «MioMi».
                </Typography>
                <Typography fontSize={18} className="pt-8">
                    Веб-приложение позволяет потенциальным владельцам легко находить информацию о животных,
                    соответствующих их предпочтениям и возможностям, а волонтерам приютов –
                    эффективно распространять и хранить эту информацию. Централизованная база данных и
                    удобный интерфейс упростят процесс поиска нового дома для бездомных питомцев.
                </Typography>
                <Typography fontSize={18} className="pt-8">
                    Разработчик: Пожарицкий Максим гр.53ТП.
                </Typography>
            </Box>
            <IconButton onClick={() => navigate('/')}>
                <HomeIcon sx={{width: '30px', height: "30px"}}/>
            </IconButton>
        </Card>
    );
};

export default AboutUs;