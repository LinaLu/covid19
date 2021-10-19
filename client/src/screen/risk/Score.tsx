import React from 'react';

import { Box, Stack, IconButton, Typography, Slide, Divider, styled } from '@mui/material';
import { Close } from '@material-ui/icons';
import { Bar, XAxis, YAxis, CartesianGrid, Legend, ComposedChart, Cell, LabelList } from 'recharts';

const WhiteDivider = styled(Divider)(({ theme }) => ({
    backgroundColor: "#313334"
}));

function Score(props: any) {
    const risk = props.risk;
    const handleClose = props.handleClose;

    const containerRef = React.useRef(null);
 
    const renderCusomizedLegend = () => {
        return (
            <Stack
                direction="row"
                style={{
                    width: '100%',
                    margin: '1em 0',
                    justifyContent: 'center',
                    paddingLeft: '25px'
                }}
            >
                <Typography
                    variant="h6"
                    style={{
                        fontWeight: 600,
                        letterSpacing: '0.031rem',
                    }}>
                    {`  Risk of death in percent `}
                </Typography>
            </Stack>

        )
    }

    return (
        <Slide direction="up" in={risk} container={containerRef.current} mountOnEnter unmountOnExit>
            <Stack
                sx={{ boxShadow: 8 }}
                spacing={2}
                style={{
                    minWidth: 345,
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
                            style={{
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
                    width={550}
                    height={350}
                    data={risk.score.context}
                    maxBarSize={20}
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
                        <LabelList dataKey={"value"} position="top" />
                    </Bar>
                </ComposedChart>
            </Stack>
        </Slide>
    )
}

export default Score;