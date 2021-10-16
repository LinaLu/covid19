import React, { useState } from 'react';
import './App.css';
import { styled } from '@mui/material/styles';
import Image from './header.jpg'
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField, Card, CardHeader, IconButton, CardMedia, CardContent, Typography, CardActions, Divider } from '@mui/material';
import { Close } from '@material-ui/icons';

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
  const [risk, setRisk] = useState<boolean | undefined>(undefined);
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

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) : void=> {
    const target = e.target;
    if (target.checked) {
      setGender(target.value);
    }
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) : string => {
    setAge(Number(e.target.value));
    return e.target.value;
  };

  const handleClose = () : void => {
    setRisk(undefined);

  };


  const RiskCard = () : JSX.Element => {
    return (
        <Card sx={{ minWidth: 345 ,padding: "30px"}}>
          <CardHeader
            action={
              <IconButton aria-label="settings" onClick={handleClose}>
                <Close/>
              </IconButton>
                 
            }
            title="RISK SCORE: "
          />
          <Divider />
          <CardMedia
            component="img"
            height="194"
            image=""
            alt="Some graphs"
          />
          <CardContent>
            <Typography> 
              <Typography style={{ marginRight: 10 }} variant="h6" color="text.primary" display="inline">
                Low risk
              </Typography>
              <Typography  variant="body2" color="text.secondary" display="inline" >
                Less than 3 percent risk
              </Typography>
            </Typography>
            <Typography>
              <Typography style={{ marginRight: 10 }} variant="h6" color="text.primary" display="inline">
                Medium risk
              </Typography>
              <Typography  variant="body2" color="text.secondary" display="inline">
                Between 3-5 percent risk
              </Typography>
            </Typography>
            <Typography>
              <Typography style={{ marginRight: 10 }} variant="h6" color="text.primary" display="inline">
                High risk
              </Typography>
              <Typography  variant="body2" color="text.secondary" display="inline">
                Greater than 5 percent risk
              </Typography>
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
          </CardActions>
      
    </Card>
      
        
    )
  }

  const Age = () : JSX.Element => {
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

  const Gender = () : JSX.Element=> {
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