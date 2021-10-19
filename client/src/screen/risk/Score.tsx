import React from 'react';

import { Box, Stack, IconButton, Typography, Slide, Divider, styled } from '@mui/material';
import { Close } from '@material-ui/icons';
import { Bar, XAxis, YAxis, CartesianGrid, Legend, ComposedChart, Cell, LabelList } from 'recharts';
import { RiskResponse } from './Risk';

const WhiteDivider = styled(Divider)(({ theme }) => ({
    backgroundColor: "#313334"
}));

interface ScoreProps {
    risk: RiskResponse;
    handleClose: any;
}

function Score({risk, handleClose}: ScoreProps) {

    const containerRef = React.useRef(null);
 
    const renderCusomizedLegend = () => {
        return (
            <Stack
                direction="row"
                sx={{
                    width: '100%',
                    margin: '1em 0',
                    justifyContent: 'center',
                    paddingLeft: '25px'
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        letterSpacing: '0.031rem',
                    }}>
                    {`  Risk of death in percent `}
                </Typography>
            </Stack>

        )
    }

    return (
        <Slide direction="up" in={risk !== undefined} container={containerRef.current} mountOnEnter unmountOnExit>
            <Stack
                spacing={2}
                sx={{
                    boxShadow: 8,
                    minWidth: 640,
                    padding: "30px",
                    backgroundColor: 'white',
                    borderRadius: '8px',
                }}>
                <Stack direction="row" justifyContent="space-between" alignItems="top">
                    <Box>
                        <Typography variant="h4" >
                            {`RISK SCORE: ${Math.round(Number(risk.score.probabilityOfDeath + Number.EPSILON) * 1000000) / 10000}%`}
                        </Typography>
                    </Box>
                    <Box>
                        <IconButton
                            onClick={handleClose}
                            aria-label="settings"
                            sx={{
                                backgroundColor: '#EEEEEE'
                            }}
                        >
                            <Close />
                        </IconButton>
                    </Box>
                </Stack>
                <WhiteDivider />

                <ComposedChart
                    layout="vertical"
                    width={600}
                    height={350}
                    data={risk.score.context}
                    maxBarSize={20}
                    margin={{
                        top: 20,
                        right: 60,
                        left: 60,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#313334" />
                    <XAxis stroke="#313334" type="number" />
                    <YAxis dataKey="name" type="category" stroke="#313334" scale="band" />
                    <Legend verticalAlign="bottom" content={renderCusomizedLegend} />
                    <Bar
                        dataKey="value"
                        fill="#8884d8"
                        background={{ fill: '#eee' }}
                        radius={[0, 15, 15, 0]}
                    >
                        {risk.score.context.map((entry: any, index: number) => (
                            <Cell cursor="pointer" fill={entry.covid ? '#82ca9d' : '#8884d8'} key={`cell-${index}`} />
                        ))}
                        <LabelList dataKey={"value"} position="right"/>
                    </Bar>
                </ComposedChart>
            </Stack>
        </Slide>
    )
}

export default Score;