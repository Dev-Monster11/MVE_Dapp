import * as React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import abi from "../helpers/contact.json";
import { GetContract } from "../helpers/Contract";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Card, CardContent } from "@mui/material";
import Slider from "@mui/material/Slider";
import Fade from "@mui/material/Fade";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export default function Calculator(props) {
    const { library, account } = useWeb3React();
    const [balance, setBalance] = useState(0);
    const contract = GetContract("0xE97CBB39487a4B06D9D1dd7F17f7fBBda4c2b9c4", abi);
    useEffect(() => {
        if (contract) {
            contract.balanceOf(account).then((val) => {
                setBalance(ethers.utils.formatUnits(val, 5).toString() * 1);
            });
        }
    }, [contract]);

    const [pro, setPro] = useState(0);
    const apy = 1.0241909747817607828248181948642;
    const [price, setPrice] = useState(props.price.toFixed(2));
    const [m_price, setMPrice] = useState(props.price.toFixed(2));
    const [day, setDay] = useState(30);
    useEffect(() => {}, [pro, price, m_price, day]);
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: "white",
        border: "solid thin #F84FED",
        borderRadius: "10px",
        paddingTop: "1rem",
        paddingBottom: "1rem",
    }));

    const ColorItem = styled(Paper)(({ theme }) => ({
        backgroundColor: "#791EDB",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: "white",
        border: "solid thin white",
        borderRadius: "10px",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        fontFamily: "Montserrat Medium",
    }));

    return (
        <>
            <Fade in={true} style={{ transitionDelay: "100ms" }}>
                <Grid container spacing={3} sx={{ color: "white",pb:10 }}>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h5" component="div" align="left">
                            Calculator
                        </Typography>
                        <Typography variant="body2" component="div" align="left">
                            Estimate your returns
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <ColorItem>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        RunEarn Price
                                    </Typography>
                                    <Typography variant="h5" gutterBottom>
                                        $ {props.price.toFixed(2)}
                                    </Typography>
                                </ColorItem>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Item>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        Current APY
                                    </Typography>
                                    <Typography variant="h5" gutterBottom>
                                        615,240.2496%
                                    </Typography>
                                </Item>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Item>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        Your RunEarn Balance
                                    </Typography>
                                    <Typography variant="h5" gutterBottom>
                                        {balance.toFixed(2)} RunEarn
                                    </Typography>
                                </Item>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="form-group" style={{ textAlign: "left" }}>
                                    <label htmlFor="formGroupExampleInput">RunEarn Amount</label>
                                    <div style={{ display: "flex" }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => {
                                                setPro(e.target.value);
                                            }}
                                            style={{ backgroundColor: "transparent", color: "white" }}
                                            value={pro}
                                        />
                                        <button
                                            style={{
                                                border: "none",
                                                marginLeft: "-42px",
                                                backgroundColor: "#791EDB",
                                                color: "white",
                                                borderRadius: "3px",
                                                fontWeight: "bold",
                                            }}
                                            onClick={() => {
                                                setPro(balance);
                                            }}
                                        >
                                            Max
                                        </button>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="form-group" style={{ textAlign: "left" }}>
                                    <label htmlFor="formGroupExampleInput">APY (%)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        style={{ backgroundColor: "transparent", color: "white" }}
                                        readOnly
                                        defaultValue={615240.2496}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="form-group" style={{ textAlign: "left" }}>
                                    <label htmlFor="formGroupExampleInput">RunEarn price at purchase ($)</label>
                                    <div style={{ display: "flex" }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            style={{ backgroundColor: "transparent", color: "white" }}
                                            onChange={(e) => {
                                                setPrice(e.target.value);
                                            }}
                                            value={price}
                                        />
                                        <button
                                            style={{
                                                border: "none",
                                                marginLeft: "-66px",
                                                backgroundColor: "#791EDB",
                                                color: "white",
                                                borderRadius: "3px",
                                                fontWeight: "bold",
                                            }}
                                            onClick={() => {
                                                setPrice(props.price.toFixed(2));
                                            }}
                                        >
                                            Current
                                        </button>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="form-group" style={{ textAlign: "left" }}>
                                    <label htmlFor="formGroupExampleInput">Future RunEarn market price ($)</label>
                                    <div style={{ display: "flex" }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            style={{ backgroundColor: "transparent", color: "white" }}
                                            onChange={(e) => {
                                                setMPrice(e.target.value);
                                            }}
                                            value={m_price}
                                        />
                                        <button
                                            style={{
                                                border: "none",
                                                marginLeft: "-66px",
                                                backgroundColor: "#791EDB",
                                                color: "white",
                                                borderRadius: "3px",
                                                fontWeight: "bold",
                                            }}
                                            onClick={() => {
                                                setMPrice(props.price.toFixed(2));
                                            }}
                                        >
                                            Current
                                        </button>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h6" align="left">
                                    {day} days
                                </Typography>

                                <Slider
                                    valueLabelDisplay="auto"
                                    defaultValue={day}
                                    max={365}
                                    min={1}
                                    onChange={(event, value) => {
                                        setDay(value);
                                    }}
                                    sx={{ height: "10px", color: "#791EDB" }}
                                    aria-label="custom thumb label"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box className={"calculator_box"}>
                                    <Typography variant="h6">Your initial investment</Typography>
                                    <Typography variant="h6">${(pro * price).toFixed(2)}</Typography>
                                </Box>
                                <Box className={"calculator_box"}>
                                    <Typography variant="h6">Current wealth</Typography>
                                    <Typography variant="h6">${(pro * price).toFixed(2)}</Typography>
                                </Box>
                                <Box className={"calculator_box"}>
                                    <Typography variant="h6">RunEarn rewards estimation</Typography>
                                    <Typography variant="h6">{(Math.pow(apy, day) * pro).toFixed(2)} RunEarn</Typography>
                                </Box>
                                <Box className={"calculator_box"}>
                                    <Typography variant="h6">Potential return</Typography>
                                    <Typography variant="h6">${(Math.pow(apy, day) * pro * m_price).toFixed(2)}</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Fade>
        </>
    );
}
