import * as React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import abi from "../helpers/contact.json";
import { GetContract } from "../helpers/Contract";
import Timer from "./Timer";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";

export default function Accounts(props) {
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
                <Box sx={{ flexGrow: 1, maxWidth: "1000px", mx: "auto",pb:10 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <Item>
                                <Box className={"account_box"}>
                                    <Typography variant="h6">Current MVE Price</Typography>
                                    <Typography variant="h6">$ {props.price.toFixed(2)}</Typography>
                                </Box>
                                <Box className={"account_box"}>
                                    <Typography variant="h6">Next Reward Amount</Typography>
                                    <Typography variant="h6">{((balance * 0.02355) / 100).toFixed(2)} MVE</Typography>
                                </Box>
                                <Box className={"account_box"}>
                                    <Typography variant="h6">Next Reward Amount USD</Typography>
                                    <Typography variant="h6">$ {(((balance * 0.02355) / 100) * props.price).toFixed(2)}</Typography>
                                </Box>
                                <Box className={"account_box"}>
                                    <Typography variant="h6">Next Reward Yield</Typography>
                                    <Typography variant="h6">0.0083%</Typography>
                                </Box>
                                <Box className={"account_box"}>
                                    <Typography variant="h6">ROI per day</Typography>
                                    <Typography variant="h6">2.4191%</Typography>
                                </Box>
                                <Box className={"account_box"}>
                                    <Typography variant="h6">ROI per month</Typography>
                                    <Typography variant="h6">104.8464%</Typography>
                                </Box>
                                <Box className={"account_box"}>
                                    <Typography variant="h6">ROI per year</Typography>
                                    <Typography variant="h6">615,140.2496%</Typography>
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Item>
                                <Typography variant="h6" component="div">
                                    Your Balance
                                </Typography>
                                <Typography variant="h4">$ {(balance * props.price).toFixed(2)}</Typography>
                                <Typography variant="body1">{balance.toFixed(2)} MVE</Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <ColorItem>
                                <Typography variant="h6" component="div">
                                    APY
                                </Typography>
                                <Typography variant="h4">615,240.2496%</Typography>
                                <Typography variant="body1">Daily ROI 2.4191%</Typography>
                            </ColorItem>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Item>
                                <Typography variant="h6" component="div">
                                    Next Rebase:
                                </Typography>
                                <Typography variant="h4">
                                    <Timer time={props.time} />
                                </Typography>
                                <Typography variant="body1">You will earn money soon</Typography>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </Fade>
        </>
    );
}
