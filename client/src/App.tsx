import React, { useState } from 'react';
import './App.css';
import { styled } from '@mui/material/styles';
import Image from './header.jpg'
import { Box, Button, Container, Paper, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField, Card } from '@mui/material';

const SubmitButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #8F8099 10%, #4A756D 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '1 1px 1px 1px rgb(214,217,231)',
  color: 'white',
  height: 48,
  padding: '0 30px',
}));


function App() {
  const [risk, setRisk] = useState<boolean>(false);
  const [gender, setGender] = useState<string>();
  const [age, setAge] = useState<number>();

  function calculateRisk() {
    fetch("api/risk", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        age: age,
        gender: gender,
      })
    }).then(() => {
      setRisk(true);
    })
  }

  const handleGenderChange = (e: { target: any; }) => {
    const target = e.target;
    if (target.checked) {
      setGender(target.value);
    }
  };

  const handleAgeChange = (e: { target: any; }) => {
    setAge(e.target.value);
    return e.target.value;
  };

  const RiskCard = () => {
    return (
        <Card style={{padding: "30px"}}>
          You gonna be fine
        </Card>
    )
  }

  const Age = () => {
    return (
      <Stack
        direction="row"
      >
        <TextField
          onChange={handleAgeChange}
          name="age"
          label="Age"
          value={age}
          autoFocus
          margin="normal"
        />
      </Stack>
    )
  }

  const Gender = () => {
    return (
      <Stack
        direction="row"
      >
        <FormControl component="fieldset">
          <FormLabel component="legend"></FormLabel>
          <RadioGroup
            row
            aria-label="gender"
            defaultValue="female"
            name="radio-buttons-group"
            onChange={handleGenderChange}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>
        </FormControl>
      </Stack>
    )
  }

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
          {risk ?
            <RiskCard/>
          :
            <Stack spacing={2} style={{ 
              backgroundColor: "white",
              padding: "30px"
            }}>
              <Age />
              <Gender />
              <Stack direction="row">
                <SubmitButton onClick={calculateRisk} variant="contained">
                  Calculate risk
                </SubmitButton>
              </Stack>
            </Stack>
          }
        </Box>
    </Container>

  );
}

export default App