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
                        <Grid item xs={12} sm={4}>
                            <Item>
                                <Typography variant="h6" component="div" gutterBottom>
                                    Your Balance
                                </Typography>
                                <Typography variant="h4" gutterBottom>
                                    $ {(balance * props.price).toFixed(4)}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {balance.toFixed(4)} MEDUSA
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Item>
                                <Typography variant="h6" component="div" gutterBottom>
                                    APY
                                </Typography>
                                <Typography variant="h4" gutterBottom>
                                    383,025.8%
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Daily ROI 2.28%
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Item>
                                <Typography variant="h6" component="div" gutterBottom>
                                    Next Rebase:
                                </Typography>
                                <Typography variant="h4" gutterBottom>
                                    <Timer time={props.time} />
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    You will earn money soon
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Item>
                                <Box className={"account_box"}>
                                    <Typography variant="h6">Current MEDUSA Price</Typography>
                                    <Typography variant="h6">$ {props.price.toFixed(4)}</Typography>
                                </Box>
                                <Box className={"account_box"}>
                                    <Typography variant="h6">Next Reward Amount</Typography>
                                    <Typography variant="h6">{((balance * 0.02355) / 100).toFixed(4)} MEDUSA</Typography>
                                </Box>
                                <Box className={"account_box"}>
                                    <Typography variant="h6">Next Reward Amount USD</Typography>
                                    <Typography variant="h6">$ {(((balance * 0.02355) / 100) * props.price).toFixed(4)}</Typography>
                                </Box>
                                <Box className={"account_box"}>
                                    <Typography variant="h6">Next Reward Yield</Typography>
                                    <Typography variant="h6">0.02355%</Typography>
                                </Box>
                                <Box className={"account_box"}>
                                    <Typography variant="h6">ROI(1-Day Rate) USD</Typography>
                                    <Typography variant="h6">$ {(((balance * 0.02355) / 100) * 96 * props.price).toFixed(4)}</Typography>
                                </Box>
                                <Box className={"account_box"}>
                                    <Typography variant="h6">ROI(5-Day Rate)</Typography>
                                    <Typography variant="h6">11.96%</Typography>
                                </Box>
                                <Box className={"account_box"}>
                                    <Typography variant="h6">ROI(5-Day Rate) USD</Typography>
                                    <Typography variant="h6">$ {(((balance * 0.02355) / 100) * 480 * props.price).toFixed(4)}</Typography>
                                </Box>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </Fade>
        </>
    );
}
