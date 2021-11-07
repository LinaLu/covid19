import { Box, Button, IconButton, InputAdornment, Stack, Tooltip } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInputCheckbox } from '../../components/FormInputCheckbox';
import { FormInputRadio } from '../../components/FormInputRadio';
import { FormInputText } from '../../components/FormTextInput';
import { FormInput } from '../../domain/types';
import Disclaimer from '../disclaimer/Disclaimer';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Info } from '@mui/icons-material';

export interface ParametersProps {
    setPayload: (payload: string) => void;
}

export interface ErrorMessage {
    age?: string;
    height?: string;
    weight?: string;
}

const validationSchema = Yup.object().shape({
    age: Yup.number().typeError('Age should be a number').integer('age should be an integer').positive('Age should positive').max(300, "Age needs to be reasonable").required('Age is required'),
    height: Yup.number().typeError('Height should be anumber').integer('Height should be an integer').positive('Height should be positive').max(300, "Height needs to be reasonable").required('Height is required'),
    weight: Yup.number().typeError('Weight should be anumber').integer('Weight should be an integer').positive('Weight should be positive').max(1000, "Weight needs to be reasonable").required('Weight is required')
});

function Parameters({ setPayload }: ParametersProps) {

    const {control, handleSubmit, formState: { errors } } = useForm<FormInput>(
        {resolver: yupResolver(validationSchema)}
    );

    const onSubmit: SubmitHandler<FormInput> = async (data, e) => {
        setPayload(JSON.stringify({
            age: data.age,
            gender: parseInt(data.gender),
            obesity: obesity(data.height, data.weight),
            neumonia: data.neumonia ? 1 : 0
        }));
    }

    function obesity(heightInCm?: number, weightInKg?: number): boolean {
        if (heightInCm && weightInKg) {
            const heightInM = heightInCm * 0.01
            const bmi = Math.round(weightInKg / (heightInM * heightInM))
            return bmi > 30 ? true : false
        } else {
            return false;
        }
    }

    return (
        <Stack
            spacing={2}
            sx={{ backgroundColor: 'white', borderRadius: '8px', padding: '30px' }}
        >
             <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                >     
                <Stack direction="row" sx={{ m: 1 }}>           
                <FormInputText name="age" control={control} label="Age">
                    <div className="invalid-age">{errors.age?.message}</div>  
                </FormInputText>   
                </Stack>      
                 <Stack direction="row" spacing={1} sx={{ m: 1 }}>
                    <FormInputText 
                        name="height" 
                        control={control} 
                        label="Height" 
                        autoComplete="off"
                        required      
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>cm</InputAdornment>
                        }}
                        sx={{ mr: 2, width: 180 }}
                    >
                        <div className="invalid-height">{errors.height?.message}</div>  
                    </FormInputText>
                    <FormInputText 
                        name="weight" 
                        control={control} 
                        label="Weight" 
                        autoComplete="off"
                        required      
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>cm</InputAdornment>
                        }}
                        sx={{ mr: 2, width: 180 }}>
                        <div className="invalid-weight">{errors.weight?.message}</div>  
                    </FormInputText>
                </Stack>
                <Stack direction="row" sx={{ m: 1 }}>
                   <FormInputRadio 
                        name={"gender"} 
                        control={control} 
                        label={"Radio Label"}              
                        options={[
                            {value: "1", label: "Female"},
                            {value: "2", label: "Male"}
                        ]}>
                         <div className="invalid-gender">{errors.gender?.message}</div>  
                    </FormInputRadio>                         
                </Stack>
                <Stack direction="row" sx={{ m: 1 }}>
                    <FormInputCheckbox name={"neumonia"} label="Neumonia" control={control} />
                </Stack>  
                <Stack direction="row" sx={{ m: 1 }} justifyContent={"space-between"}>
                    <Button                                               
                    type="submit"
                    variant="contained"
                    color="success"                        
                >
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
            </Box>
        </Stack>
    )
}

export default Parameters;