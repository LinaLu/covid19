import React, { useState } from 'react';
import Score from './Score';
import Parameters from './Parameters';

function App() {
    const [risk, setRisk] = useState<any>();
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



export default App

