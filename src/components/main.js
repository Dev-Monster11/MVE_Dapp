// import img from "../assets/pak.gif";
import abi from "../helpers/busd.json";
import lpabi from "../helpers/lp.json";
import mainabi from "../helpers/contact.json";

import { GetContract } from "../helpers/Contract";
import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
// import { HashRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import { ethers } from "ethers";

import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Accounts from "./Account";
import Calculator from "./Calculator";

const drawerWidth = 250;

function Main(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [bnbprice, setBNBPrice] = useState(0);
    const [price, setPrice] = useState(0);
    const [pool, setPool] = useState(0);
    const [time, setTime] = useState(0);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const contract = GetContract("0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16", abi);
    const lpcontract = GetContract("0xc41dd4ecceabbbf8467107f5d49b70d216605cfe", lpabi);
    const maincontract = GetContract("0xE97CBB39487a4B06D9D1dd7F17f7fBBda4c2b9c4", mainabi);

    useEffect(() => {
        if (contract) {
            contract.getReserves().then((val) => {
                let bnb = ethers.utils.formatUnits(val._reserve0, 18).toString();
                let busd = ethers.utils.formatUnits(val._reserve1, 18).toString();
                setBNBPrice(busd / bnb);
            });
        }
        if (lpcontract) {
            lpcontract.getReserves().then((val) => {
                let bnb = ethers.utils.formatUnits(val._reserve0, 18).toString();
                let medusa = ethers.utils.formatUnits(val._reserve1, 5).toString();
                setPrice((bnb * bnbprice) / medusa);
                setPool(bnb * bnbprice);
            });
        }
        if (maincontract) {
            maincontract._lastRebasedTime().then((val) => {
                setTime(ethers.utils.formatUnits(val, 0).toString() * 1);
            });
        }
    }, [maincontract]);
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Router>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <Header openMenu={handleDrawerToggle} />
                <Sidebar closeMenu={handleDrawerToggle} open={mobileOpen} container={container} />
                <Box
                    className="main-part"
                    sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, borderBottomLeftRadius: { sm: `100px` } }}
                >
                    <Box sx={{ flexGrow: 1, p: 5, mt: 7 }}>
                        <Routes>
                            {/* <Switch> */}
                            <Route exact path="/" element={<Dashboard price={price} bnbPrice={bnbprice} pool={pool} time={time} />} />
                            <Route path="/account" element={<Accounts price={price} bnbPrice={bnbprice} time={time} />} />
                            <Route path="/calculator" element={<Calculator price={price} bnbPrice={bnbprice} />} />
                            {/* </Switch> */}
                        </Routes>
                    </Box>
                </Box>
                <Footer />
            </Box>
        </Router>
    );
}

Main.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Main;
