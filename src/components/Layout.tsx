import { Box, createTheme, ThemeProvider } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { RouteContent } from "./RouteContent";
import { Sidebar } from "./Sidebar";
import TableBarIcon from "@mui/icons-material/TableBar";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { useColorScheme } from "@mui/material/styles";

interface LayoutProps {
    children: ReactNode;
}

export type Tab = {
    name: string;
    path: string;
    icon: ReactNode;
    user: "all" | "admin";
};

export const Layout = ({ children }: LayoutProps) => {
    const { setMode } = useColorScheme();
    const DRAWER_WIDTH = 240 as const;
    const tabs: Tab[] = [
        {
            icon: <TableBarIcon fontSize="small" />,
            name: "Tables",
            path: "/tables",
            user: "all",
        },
        {
            icon: <Inventory2OutlinedIcon fontSize="small" />,
            name: "Products",
            path: "/products",
            user: "admin",
        },
        {
            icon: <PeopleOutlineIcon fontSize="small" />,
            name: "Waiters",
            path: "/waiters",
            user: "admin",
        },
        {
            icon: <MonetizationOnOutlinedIcon fontSize="small" />,
            name: "Transactions",
            path: "/transactions",
            user: "admin",
        },
    ];

    const [activeTab, setActiveTab] = useState<Tab | undefined>(undefined);
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const [isUserLogin, setIsUserLogin] = useState<boolean>(false);

    const location = useLocation();
    useEffect(() => {
        const login = localStorage.getItem("login");
        setIsUserLogin(Boolean(login));
    }, []);

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const handleActiveTab = () => {
        const isHomePage = location?.pathname === "/";
        if (isHomePage)
            return setActiveTab({
                name: "Tables",
                path: "/tables",
                icon: <TableBarIcon />,
                user: "all",
            });

        const activeTab = tabs.find((tab) => tab.path === location?.pathname);
        setActiveTab(activeTab);
    };

    useEffect(() => {
        handleActiveTab();
    }, [location]);

    useEffect(() => {
        setMode("dark");
    }, []);

    const isPageWithOutLayout = location.pathname === "/" && !isUserLogin;

    const theme = createTheme({
        components: {
            MuiButton: {
                variants: [
                    {
                        props: { variant: "dashed" },
                        style: {
                            textTransform: "none",
                            border: `2px dashed ${blue[500]}`,
                        },
                    },
                    {
                        props: { variant: "dashed", color: "secondary" },
                        style: {
                            border: `4px dashed ${red[500]}`,
                        },
                    },
                ],
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            {isPageWithOutLayout ? (
                <>{children}</>
            ) : (
                <Box sx={{ display: "flex" }}>
                    <Sidebar
                        tabs={tabs}
                        mobileOpen={mobileOpen}
                        drawerWidth={DRAWER_WIDTH}
                        onDrawerToggle={handleDrawerToggle}
                        isUserLogin={isUserLogin}
                    />
                    <Header
                        onDrawerToggle={handleDrawerToggle}
                        activeTab={activeTab}
                        drawerWidth={DRAWER_WIDTH}
                        isUserLogin={isUserLogin}
                    />
                    <RouteContent>{children}</RouteContent>
                </Box>
            )}
        </ThemeProvider>
    );
};
