import { InputAdornment } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import { Button, Checkbox, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, Stack, TextField, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Disclaimer from '../disclaimer/Disclaimer';


export interface ParametersProps {
    setPayload: (payload: string) => void;
    onSubmit: () => void;
}

export interface ErrorMessage {
    age?: string;
    height?: string;
    weight?: string;
}

function Parameters({ setPayload, onSubmit }: ParametersProps) {

    const [height, setHeight] = useState<number>();
    const [weight, setWeight] = useState<number>();
    const [neumonia, setNeumonia] = useState<boolean>(false);
    const [gender, setGender] = useState<string>();
    const [age, setAge] = useState<number>();

    const [submitEnabled, setSubmitEnabled] = useState<boolean>(false);

    const [errorMessage, setErrorMessage] = useState<ErrorMessage>({});

    const validateInput = (): boolean => {

        if (age && 0 > age) {
            setErrorMessage((prevState) => ({
                ...prevState,
                age: 'Age must be positive'
            }));
        } else if (age && age > 300) {
            setErrorMessage((prevState) => ({
                ...prevState,
                age: 'Age must be less than 300'
            }));
        } else if (height && 0 > height) {
            setErrorMessage((prevState) => ({
                ...prevState,
                height: 'Height must be positive'
            }));

        } else if (height && height > 400) {
            setErrorMessage((prevState) => ({
                ...prevState,
                height: 'Height must be less than 400'
            }));
        } else if (weight && 0 > weight) {
            setErrorMessage((prevState) => ({
                ...prevState,
                weight: 'Weight must be positive'
            }));

        } else if (weight && weight > 1000) {
            setErrorMessage((prevState) => ({
                ...prevState,
                weight: 'Weight must be less than 1000kg'
            }));
        } else {
            setErrorMessage({});
            return true;
        }

        return false;
    }

    useEffect(() => {
        function formValues(): string {
            return JSON.stringify({
                age: age,
                gender: gender === "male" ? 2 : 1,
                obesity: obesity(height, weight),
                neumonia: neumonia ? 1 : 0
            });
        }

        const isValid = validateInput();
        setPayload(formValues());
        setSubmitEnabled([age, gender, weight, height, (neumonia !== undefined), isValid].every(Boolean))
    }, [age, height, weight, gender, neumonia, setPayload])

    function obesity(heightInCm?: number, weightInKg?: number): boolean {
        if (heightInCm && weightInKg) {
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
            sx={{ backgroundColor: 'white', borderRadius: '8px', padding: '30px' }}
        >
            <FormControl component="fieldset">
                <Stack direction="row">
                    <TextField
                        error={errorMessage.age !== undefined}
                        helperText={errorMessage.age}
                        autoComplete="off"
                        onChange={handleAgeChange}
                        label="Age"
                        value={age || ''}
                        margin="normal"
                        required
                        sx={{ width: 180 }}

                    />
                </Stack>
                <Stack direction="row" sx={{ mb: 2 }}>
                    <TextField
                        error={errorMessage.height !== undefined}
                        helperText={errorMessage.height}
                        autoComplete="off"
                        onChange={handleHeightChange}
                        label="Height"
                        value={height || ''}
                        margin="normal"
                        required
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>cm</InputAdornment>
                        }}
                        sx={{ mr: 2, width: 180 }}
                    />
                    <TextField
                        error={errorMessage.weight !== undefined}
                        helperText={errorMessage.weight}
                        autoComplete="off"
                        onChange={handleWeightChange}
                        name="weight"
                        label="Weight"
                        value={weight || ''}
                        margin="normal"
                        required
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>kg</InputAdornment>
                        }}
                        sx={{ mr: 2, width: 180 }}
                    />
                </Stack>

                <Stack direction="row">
                    <RadioGroup
                        row
                        aria-label="gender"
                        name="radio-buttons-group"
                        onChange={handleGenderChange}
                        sx={{ mb: 2 }}
                    >
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                    </RadioGroup>
                </Stack>

                <Stack direction="row" sx={{ mb: 2 }}>
                    <FormControlLabel
                        control={<Checkbox defaultChecked={false} onChange={(e) => handleNeumoniaChange(e)} />}
                        label="Neumonia"
                    />
                </Stack>

                <Stack direction="row" justifyContent={"space-between"}>
                    <Button
                        disabled={!submitEnabled}
                        onClick={onSubmit}
                        variant="contained"
                        color="success">
                        Calculate risk
                    </Button>
                    <Tooltip
                        title={<Disclaimer />}
                        describeChild
                        sx={{ m: 1 }}
                    >
                        <IconButton
                            sx={{ m: 1 }}
                            aria-label="settings"
                        >
                            <Info color="primary" />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </FormControl>
        </Stack>
    )
}

export default Parameters;