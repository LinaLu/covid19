import React, { useState } from 'react';
import Score from './Score';
import Parameters from './Parameters';

type Parameter = {
    age: number
    gender: number
    neumonia: number
    obesity: number
};

export type Risk = {
    covid: boolean
    name: string
    value: number
};

type ScoreProbability = {
    class: string
    context: Array<Risk>
    probabilityOfDeath: number
}

export interface RiskResponse {
    parameters: Parameter   
    score: ScoreProbability
}


function RenderRisk() {
    const [risk, setRisk] = useState<RiskResponse>();
    const [payload, setPayload] = useState<string>();

    async function onSubmit() {
        await fetch("/api/risk", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: payload,                         
        }).then(response => {
            if (!response.ok) { throw response }
            return response.json()
        }).then((data) => {
            setRisk(data);            
        }).catch( (err) => {
            alert('Oops, something went wrong.');
        })
        
    };
    
    const handleClose = (): void => {
        setRisk(undefined);
    };   

    return (
        risk ? 
        <Score risk={risk} handleClose={handleClose}/> : 
        <Parameters onSubmit={onSubmit} setPayload={setPayload}/>
    );
}

export default RenderRisk

