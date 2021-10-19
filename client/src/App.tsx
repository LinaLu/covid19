import React from 'react';
import './App.css';
import Image from './header.jpg'
import { Box, Container } from '@mui/material';
import Risk from './screen/risk/Risk';

function App() {

  return (
      <Container style={{
      backgroundImage: `url(${Image})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'}}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
         <Risk/>
        </Box>
    </Container>    

  );
}

export default App
