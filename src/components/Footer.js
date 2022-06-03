import * as React from "react";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { FaDiscord } from "react-icons/fa";
import { Telegram, Twitter } from "@mui/icons-material";

export default function Footer(props) {
    return (
        <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
            <BottomNavigation sx={{ backgroundColor: "#1B0230", height: "70px" }}>
                <BottomNavigationAction
                    icon={<Telegram fontSize="large" />}
                    iconOnly
                    sx={{ color: "white", minWidth: "50px", maxWidth: "50px" }}
                    onClick={() => {
                        window.open("#", "_blank");
                    }}
                ></BottomNavigationAction>
                <BottomNavigationAction
                    icon={<Twitter fontSize="large" />}
                    iconOnly
                    sx={{ color: "white", minWidth: "50px", maxWidth: "50px" }}
                    onClick={() => {
                        window.open("#", "_blank");
                    }}
                ></BottomNavigationAction>
                <BottomNavigationAction
                    icon={<FaDiscord style={{ fontSize: "2rem" }} />}
                    iconOnly
                    sx={{ color: "white", minWidth: "50px", maxWidth: "50px" }}
                    onClick={() => {
                        window.open("#", "_blank");
                    }}
                ></BottomNavigationAction>
            </BottomNavigation>
        </Box>
    );
}
