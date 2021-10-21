import React from 'react';
import { Divider, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';


const Disclaimer = () => {
    return (
        <Stack spacing={2}>
           <Typography variant="h5" component="h5" gutterBottom>
                MEDICAL DISCLAIMER
            </Typography>
            <Divider sx={{background:'white'}} variant="fullWidth" light/>
            <Typography variant="h6" component="h6" gutterBottom>
                THIS WEBSITE DOES NOT PROVIDE MEDICAL ADVICE
            </Typography>
            <Typography variant="body1" gutterBottom>
                The information, including but not limited to, text, graphics, images and other material contained on this website are for entertaining purposes only. 
            </Typography>
            <Divider sx={{background:'white'}} variant="fullWidth" light/>
            <Typography variant="overline" gutterBottom >
                No material on this site is intended to be a substitute for professional medical advice, diagnosis or treatment. 
            </Typography>
            
            <Typography variant="body2" gutterBottom>
               Always seek the advice of your physician or other qualified health care provider with any questions you may have regarding a medical condition or treatment and before undertaking a new health care regimen, and never disregard professional medical advice or delay in seeking it because of something you have read on this website. 
            </Typography>
        </Stack>
        )
};

export default Disclaimer;