import * as React from "react";
import { useState, useEffect } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { FaDiscord } from "react-icons/fa";
import { Dashboard, AccountCircle, Calculate, SwapHorizontalCircle, Article, Telegram, Twitter } from "@mui/icons-material";
import logo from "../assets/images/logo512.png";

export default function Sidebar(props) {
    const drawerWidth = 250;
    const [select_sideItem, setSelectItem] = useState(window.location.hash);

    const drawer = (
        <div>
            <img className="side_logo" src={logo} />
            <ul className="side_selector">
                <li className={select_sideItem === "#/" ? "side_select acive" : "side_select"}>
                    <Link
                        to="/"
                        onClick={() => {
                            setSelectItem("#/");
                        }}
                    >
                        <>
                            <Dashboard />
                            <span>Dashboard</span>
                        </>
                    </Link>
                </li>
                <li className={select_sideItem === "#/account" ? "side_select acive" : "side_select"}>
                    <Link
                        to="/account"
                        onClick={() => {
                            setSelectItem("#/account");
                        }}
                    >
                        <>
                            <AccountCircle />
                            <span>Account</span>
                        </>
                    </Link>
                </li>
                <li className={select_sideItem === "#/calculator" ? "side_select acive" : "side_select"}>
                    <Link
                        to="/calculator"
                        onClick={() => {
                            setSelectItem("#/calculator");
                        }}
                    >
                        <>
                            <Calculate />
                            <span>Calculator</span>
                        </>
                    </Link>
                </li>
                <li className="side_select">
                    <a
                        href="https://pancakeswap.finance/swap?outputCurrency=0xE97CBB39487a4B06D9D1dd7F17f7fBBda4c2b9c4"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <SwapHorizontalCircle />
                        <span>Swap</span>
                    </a>
                </li>
                <li className="side_select">
                    <a href="https://movearn-official.gitbook.io/movearn/" target="_blank" rel="noopener noreferrer">
                        <Article />
                        <span>Docs</span>
                    </a>
                </li>
            </ul>
        </div>
    );
    return (
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
            <Drawer
                container={props.container}
                variant="temporary"
                open={props.open}
                onClose={props.closeMenu}
                onClick={props.closeMenu}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": { border: "none", backgroundColor: "#3c0f6b", width: drawerWidth },
                }}
            >
                <div>
                    <ul className="side_selector">
                        <li className={select_sideItem === "#/" ? "side_select acive" : "side_select"}>
                            <Link
                                to="/"
                                onClick={() => {
                                    setSelectItem("#/");
                                }}
                            >
                                <>
                                    <Dashboard />
                                    <span>Dashboard</span>
                                </>
                            </Link>
                        </li>
                        <li className={select_sideItem === "#/account" ? "side_select acive" : "side_select"}>
                            <Link
                                to="/account"
                                onClick={() => {
                                    setSelectItem("#/account");
                                }}
                            >
                                <>
                                    <AccountCircle />
                                    <span>Account</span>
                                </>
                            </Link>
                        </li>
                        <li className={select_sideItem === "#/calculator" ? "side_select acive" : "side_select"}>
                            <Link
                                to="/calculator"
                                onClick={() => {
                                    setSelectItem("#/calculator");
                                }}
                            >
                                <>
                                    <Calculate />
                                    <span>Calculator</span>
                                </>
                            </Link>
                        </li>
                        <li className="side_select">
                            <a
                                href="https://pancakeswap.finance/swap?outputCurrency=0xE97CBB39487a4B06D9D1dd7F17f7fBBda4c2b9c4"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <SwapHorizontalCircle />
                                <span>Swap</span>
                            </a>
                        </li>
                        <li className="side_select">
                            <a href="https://movearn-official.gitbook.io/movearn/" target="_blank" rel="noopener noreferrer">
                                <Article />
                                <span>Docs</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": { border: "none", background: "transparent", width: drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}
