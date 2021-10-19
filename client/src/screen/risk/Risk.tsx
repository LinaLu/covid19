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
    vaue: number
};

type Score = {
    class: string
    context: Array<Risk>
    probabilityOfDeath: number
}

export interface RiskResponse {
    parameters: Parameter   
    score: Score
}

function Risk() {
    const [risk, setRisk] = useState<RiskResponse>();
    const [payload, setPayload] = useState<string>();

    function onSubmit() {
        fetch("/api/risk", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: payload,                         
        })
        .then(response => response.json())
        .then(data => { setRisk(data) })
    }

    const handleClose = (): void => {
        setRisk(undefined);
    };   

    return (
        risk ? 
        <Score risk={risk} handleClose={handleClose}/> : 
        <Parameters onSubmit={onSubmit} setPayload={setPayload}/>
    );
}

export default Risk

