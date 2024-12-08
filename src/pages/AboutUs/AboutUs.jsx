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
                Проект "MioMi" — это единая база данных бездомных животных г. Минска, созданная для того, чтобы помочь каждому бездомному животному обрести дом.
                </Typography>
                <Typography fontSize={18} className="pt-8">
                Мы собираем и объединяем информацию от приютов и волонтеров, предоставляя жителям города возможность найти себе верного друга. 
                Наша цель — не просто показать, сколько бездомных животных нуждаются в помощи, но и вдохновить людей на одомашнивание, 
                тем самым даря животным шанс на жизнь. Вместе мы можем сделать мир добрее!
                </Typography>
            </Box>
            <IconButton onClick={() => navigate('/')}>
                <HomeIcon sx={{width: '30px', height: "30px"}}/>
            </IconButton>
        </Card>
    );
};

export default AboutUs;