import { Button, Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, styled, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

const SubmitButton = styled(Button)(({ theme }) => ({
    border: 0,
    borderRadius: 3,    
    height: 48,
    padding: '0 30px',
}));


function Parameters(props: any) {
    const [height, setHeight] = useState<number>();
    const [weight, setWeight] = useState<number>();
    const [neumonia, setNeumonia] = useState<boolean>();
    const [gender, setGender] = useState<string>();
    const [age, setAge] = useState<number>();
    
    const [submitEnabled, setSubmitEnabled] = useState<boolean>(false);

    useEffect(() => {
        props.setPayload(
            JSON.stringify({
                age: age,
                gender: gender == "male" ? 2 : 1,
                obesity: obesity(height, weight),
                neumonia: neumonia ? 1 : 0
            })
        );

        setSubmitEnabled([age, gender, weight, height].every(Boolean))
    }, [age, height, weight, gender])

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

    const handleNeumoniaChange = (e: React.ChangeEvent<HTMLInputElement>): string => {
        const target = e.target;
        if (target.checked) {
            setNeumonia(true);
        }
        return e.target.value;
    };


    return (
        <Stack
            component="form"
            noValidate
            autoComplete="off"
            spacing={2}
            style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "8px",
            }}>
            <Stack
                direction="row"
            >
                <TextField
                    onChange={handleAgeChange}
                    id="age"
                    label="Age"
                    value={age}
                    margin="normal"
                />
            </Stack>
            <Stack
                direction="row"
            >
                <TextField
                    onChange={handleHeightChange}
                    id="height"
                    required
                    label="Height"
                    value={height}
                    margin="normal"
                />
                <TextField
                    onChange={handleWeightChange}
                    name="weight"
                    required
                    label="Weight"
                    value={weight}
                    margin="normal"
                />
            </Stack>
            <Checkbox
                onChange={handleNeumoniaChange}
                inputProps={{ 'aria-label': 'controlled' }}
                />
            <Stack
                direction="row"
            >
                <FormControl component="fieldset">
                    <FormLabel component="legend"></FormLabel>
                    <RadioGroup
                        row
                        aria-label="gender"
                        name="radio-buttons-group"
                        onChange={handleGenderChange}
                    >
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                    </RadioGroup>
                </FormControl>
            </Stack>
            <Stack direction="row">
                {/* FIXME: DISABLE BUTTON IF NOT ALL FIELDS ARE FILLED IN */}
                <SubmitButton 
                    disabled={!submitEnabled} 
                    onClick={props.onSubmit} 
                    variant="contained"
                    color="success">
                    Calculate risk
                </SubmitButton>            
            </Stack>
        </Stack>)
}

export default Parameters;