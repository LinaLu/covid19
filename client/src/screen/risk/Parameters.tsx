import { InputAdornment } from '@material-ui/core';
import { Button, Checkbox, FormControl, FormControlLabel, Radio, RadioGroup, Stack, TextField } from '@mui/material';
import { format } from 'path';
import React, { useEffect, useState } from 'react';


export interface ParametersProps {
    setPayload: (payload:string) => void;
    onSubmit: ()=> void;
}

function Parameters({setPayload, onSubmit}: ParametersProps) {

    const [height, setHeight] = useState<number>();
    const [weight, setWeight] = useState<number>();
    const [neumonia, setNeumonia] = useState<boolean>(false);
    const [gender, setGender] = useState<string>();
    const [age, setAge] = useState<number>();
    
    const [submitEnabled, setSubmitEnabled] = useState<boolean>(false);

    useEffect(() => {
        function formValues(): string {
            return JSON.stringify({
                age: age,
                gender: gender === "male" ? 2 : 1,
                obesity: obesity(height, weight),
                neumonia: neumonia ? 1 : 0
            });
        }

        setPayload(formValues());

        setSubmitEnabled([age, gender, weight, height, (neumonia !== undefined)].every(Boolean))
    }, [age, height, weight, gender, neumonia, setPayload])



    function obesity(heightInCm?: number, weightInKg?: number ): boolean {
        if (heightInCm && weightInKg){
            const heightInM = heightInCm * 0.01
            const bmi = Math.round(weightInKg / (heightInM * heightInM))
            return bmi > 30 ? true : false
        } else {
            return false;
        }
    }

    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const target = e.target;
        if (target.checked) {
            setGender(target.value);
        }
    };

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>): string => {
        e.preventDefault();
        setAge(Number(e.target.value));
        return e.target.value;
    };

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>): string => {
        setWeight(Number(e.target.value));
        return e.target.value;
    };


    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>): string => {
        setHeight(Number(e.target.value));
        return e.target.value;
    };

    const handleNeumoniaChange = (e: React.ChangeEvent<HTMLInputElement>): boolean => {
        const target = e.target;
        if (target.checked) {
            setNeumonia(true);
        }
        return e.target.checked;
    };

    return (
        <Stack
            spacing={2}
            sx={{ backgroundColor: 'white', borderRadius: '8px', padding:'30px'}}
       >
            <FormControl component="fieldset">
                <Stack direction="row">
                    <TextField
                        autoComplete="off"
                        onChange={handleAgeChange}
                        label="Age"
                        value={age || ''}
                        margin="normal"
                        required
                    />
                </Stack>
                <Stack direction="row" sx={{mb: 2}}>
                    <TextField
                        autoComplete="off"
                        onChange={handleHeightChange}
                        label="Height"
                        value={height || ''}
                        margin="normal"
                        required
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>cm</InputAdornment>
                           }}
                        sx={{mr: 2}}
                    />
                    <TextField
                        autoComplete="off"
                        onChange={handleWeightChange}
                        name="weight"
                        label="Weight"
                        value={weight|| ''} 
                        margin="normal"
                        required
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>kg</InputAdornment>
                           }}
                        sx={{mr: 2}}
                    />
                </Stack>
                
                <Stack direction="row">
                    <RadioGroup
                        row
                        aria-label="gender"
                        name="radio-buttons-group"
                        onChange={handleGenderChange}
                        sx={{mb: 2}}
                    >
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                    </RadioGroup>
                </Stack>

                <Stack direction="row"  sx={{mb: 2}}>     
                    <FormControlLabel 
                        control={<Checkbox defaultChecked={false} onChange={(e)=> handleNeumoniaChange(e)} />} 
                        label="Neumonia" 
                    />
                </Stack>
                
                <Stack direction="row">
                    <Button 
                        disabled={!submitEnabled} 
                        onClick={onSubmit} 
                        variant="contained"
                        color="success">
                        Calculate risk
                    </Button>            
                </Stack>
            </FormControl>
        </Stack>  
        )
}

export default Parameters;