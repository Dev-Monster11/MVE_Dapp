import * as React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import Timer from "./Timer";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import { GetContract } from "../helpers/Contract";
import abi from "../helpers/contact.json";

export default function Dashboard(props) {
    const { library, account } = useWeb3React();
    const contract = GetContract("0xE97CBB39487a4B06D9D1dd7F17f7fBBda4c2b9c4", abi);
    const [totalSupply, setTotalSupply] = useState(0);
    const [circulateSupply, setCirculateSupply] = useState(0);
    const [treasury, setTreasury] = useState(0);
    const [risk, setRisk] = useState(0);
    const [pit, setPit] = useState(0);

    useEffect(() => {
        if (contract) {
            contract._totalSupply().then((val) => {
                setTotalSupply(ethers.utils.formatUnits(val, 5).toString());
            });
            contract.getCirculatingSupply().then((val) => {
                setCirculateSupply(ethers.utils.formatUnits(val, 5).toString());
            });
            contract.balanceOf("0x000000000000000000000000000000000000dEaD").then((val) => {
                setPit(ethers.utils.formatUnits(val, 5).toString() * 1);
            });

            getVal();
        }
    }, [contract]);

    const getVal = async () => {
        var testval = 0;
        if (library) {
            testval = await library.getBalance("0x22A48f1aBbcFCB987dB168AeE0F359237E1CD7Ae");
            setTreasury(ethers.utils.formatUnits(testval, 18).toString() * props.bnbPrice);
            testval = await library.getBalance("0xC3DCB2cB23597A15F54c55245F4C1ce1760cf1f0");
            setRisk(ethers.utils.formatUnits(testval, 18).toString() * props.bnbPrice);
        }
    };
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: "white",
        border: "solid thin #e7b913",
        borderRadius: "10px",
        paddingTop: "1rem",
        paddingBottom: "1rem",
    }));
    return (
        <>
            <Fade in={true} style={{ transitionDelay: "100ms" }}>
                <Box sx={{ flexGrow: 1, maxWidth: "1000px", mx: "auto" }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <Item>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="h6" component="div" gutterBottom>
                                            MEDUSA Price
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            $ {props.price.toFixed(4)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="h6" component="div" gutterBottom>
                                            Market Cap
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            $ {(props.price * circulateSupply).toFixed(4)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="h6" component="div" gutterBottom>
                                            Circulating Supply
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            {(circulateSupply * 1).toFixed(4)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="h6" component="div" gutterBottom>
                                            Backed Liquidity
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            100%
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="h6" component="div" gutterBottom>
                                            Next Rebase
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            <Timer time={props.time} />
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="h6" component="div" gutterBottom>
                                            Total Supply
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            {(totalSupply * 1).toFixed(4)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <Typography variant="h6" component="div" gutterBottom>
                                    MEDUSA Price
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    $ {props.price.toFixed(4)}
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <Typography variant="h6" component="div" gutterBottom>
                                    Market Value of Treasury Asset
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    $ {treasury.toFixed(4)}
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <Typography variant="h6" component="div" gutterBottom>
                                    Pool Value
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    $ {props.pool.toFixed(4)}
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Item>
                                <Typography variant="h6" component="div" gutterBottom>
                                    Risk Free Fund Value
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    $ {risk.toFixed(4)}
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Item>
                                <Typography variant="h6" component="div" gutterBottom>
                                    # Value of Venom Pit
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {pit.toFixed(4)} MEDUSA
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Item>
                                <Typography variant="h6" component="div" gutterBottom>
                                    $ Value of Venom Pit
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    $ {(pit * props.price).toFixed(4)}
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Item>
                                <Typography variant="h6" component="div" gutterBottom>
                                    % Venom Pit : Supply
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {((pit / totalSupply) * 100).toFixed(4)}%
                                </Typography>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </Fade>
        </>
    );
}
