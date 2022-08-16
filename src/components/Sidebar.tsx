/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Tab } from "./Layout";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

declare module "@mui/material/Button" {
    interface ButtonPropsVariantOverrides {
        dashed: true;
    }
    interface ListItemPropsVariantOverrides {
        navigation: true;
    }
}

interface SidebarProps {
    tabs: Tab[];
    mobileOpen: boolean;
    drawerWidth: number;
    onDrawerToggle: () => void;
}

export const Sidebar = ({
    tabs,
    mobileOpen,
    drawerWidth,
    onDrawerToggle,
}: SidebarProps) => {
    const location = useLocation();
    const [isWaiterLogin, setIsWaiterLogin] = useState<boolean>(false);
    useEffect(() => {
        const isWaiterLogin = Boolean(localStorage.getItem("isWaiter"));
        setIsWaiterLogin(isWaiterLogin);
    }, []);
    const drawer = (
        <div>
            <Toolbar>
                <Link to="/">
                    <Typography variant="h6" noWrap component="div">
                        <img
                            src="/solpos.png"
                            alt="Solpos"
                            css={css`
                                max-width: 160px;
                                padding: 10px;
                            `}
                        />
                    </Typography>
                </Link>
            </Toolbar>
            <Divider />
            <List>
                {tabs.map((tab) => {
                    const isTableActive =
                        tab.path === "/tables" &&
                        (location.pathname === "/" ||
                            location.pathname.includes("order"));
                    const isActive =
                        location.pathname.includes(tab.path) || isTableActive;
                    const notShowTab = isWaiterLogin && tab.user === "admin";
                    if (notShowTab) return null;
                    return (
                        <Link
                            css={css`
                                text-decoration: none;
                            `}
                            to={tab.path}
                            key={tab.name}
                        >
                            <ListItem
                                disablePadding
                                sx={{
                                    color: isActive
                                        ? "primary.main"
                                        : "primary.light",
                                    backgroundColor: isActive
                                        ? "primary.dark"
                                        : "transparent",
                                }}
                            >
                                <ListItemButton>
                                    {tab.icon}
                                    <ListItemText
                                        css={css`
                                            padding-left: 20px;
                                        `}
                                        disableTypography
                                        primary={tab.name}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    );
                })}
            </List>
        </div>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="nav"
        >
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
};
