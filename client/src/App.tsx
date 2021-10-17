import React, { useState } from 'react';
import './App.css';
import { styled } from '@mui/material/styles';
import Image from './header.jpg'
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField,  IconButton,  Typography, Divider, Slide } from '@mui/material';
import { Close } from '@material-ui/icons';
import { Bar, XAxis, YAxis, CartesianGrid, Legend, ComposedChart, Cell, LabelList, Surface, Symbols, ContentRenderer, LabelProps } from 'recharts';



const SubmitButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #8F8099 10%, #4A756D 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '1 1px 1px 1px rgb(214,217,231)',
  color: 'white',
  height: 48,
  padding: '0 30px',
}));

const WhiteDivider = styled(Divider)(({ theme }) => ({
  backgroundColor:"#313334"
}));


function App() {
  const [risk, setRisk] = useState<any>();
  const [gender, setGender] = useState<string>();
  const [age, setAge] = useState<number>();

  const containerRef = React.useRef(null);


  function calculateRisk() {
    fetch("/api/risk", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        age: age,
        gender: gender,
      })
    })
    .then(response => response.json())
    .then(data => {    console.log('**data**', data, data['risk']);setRisk(data['risk']) })
  }


  const handleClose = () : void=> {
    setRisk(undefined);
  };

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


  const data = [
    {
      name: 'Covid',
      risk: 4000,

    },
    {
      name: 'Suicide ',
      risk: 3000,

    },
    {
      name: 'Murdered',
      risk: 2000,

    },
  ]
  
  const Risk = () : JSX.Element => {
  
    const renderCusomizedLegend= () => {
      return (
        <Stack 
          direction="row" 
          style={{width: '100%',
            margin: '1em 0',
            justifyContent:'center',
            paddingLeft:'25px'
          }}
        >
          <Typography 
          variant="h6" 
          style={{
            fontWeight: 600, 
            letterSpacing:'0.031rem',
            }}>
        {`  Risk of death in percent `}
      </Typography>
        </Stack>
        
      )
    }

    return (
      <Slide direction="up" in={risk} container={containerRef.current} mountOnEnter unmountOnExit>          
        <Stack 
          sx={{boxShadow: 8}}
          spacing={2} 
          style={{ 
            minWidth: 345 ,
            padding: "30px", 
            backgroundColor: 'white', 
            borderRadius:'8px',
            }}>
          <Stack direction="row" justifyContent="space-between" alignItems="top">
            <Box>
              <Typography variant="h4" >
                {`RISK SCORE: ${risk}`}
              </Typography>
            </Box>
            <Box>
              <IconButton 
                onClick={handleClose} 
                aria-label="settings"
                style={{ 
                  backgroundColor: '#EEEEEE' 
                }}
                >
                <Close/>
              </IconButton>
            </Box>
          </Stack>
          <WhiteDivider   />

          <ComposedChart
            layout="vertical"
            width={550} 
            height={350} 
            data={data} 
            maxBarSize={ 20 } 
            margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#313334" />
            <XAxis stroke="#313334" type="number" />
            <YAxis dataKey="name" type="category" stroke="#313334" scale="band" />
        
            <Legend verticalAlign="bottom" content={renderCusomizedLegend}/>
            <Bar 
              dataKey="risk" 
              fill="#8884d8" 
              background={{ fill: '#eee' }} 
              radius={[0, 15, 15, 0]} 
            >
              {data.map((entry, index) => (
                    <Cell cursor="pointer" fill={entry.name === 'Covid' ? '#82ca9d' : '#8884d8'} key={`cell-${index}`} />
                  ))}
              <LabelList dataKey={"risk"} position="top" />
            </Bar>        
          </ComposedChart>
          
      </Stack>
    </Slide>
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
            <Risk/>          
          :
            <Stack spacing={2} style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius:"8px",
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

