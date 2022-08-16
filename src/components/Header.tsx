/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useColorScheme,
} from "@mui/material";
import { Tab } from "./Layout";
import { ModeSwitcher } from "./ModeSwitcher";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onDrawerToggle: () => void;
  activeTab: Tab | undefined;
  drawerWidth: number;
}

export const Header = ({
  onDrawerToggle,
  activeTab,
  drawerWidth,
}: HeaderProps) => {
  const { mode } = useColorScheme();
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("waiterToken");
    navigate("/");
  };
  return (
    <header>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            css={css`
              display: flex;
              justify-content: space-between;
              width: 100%;
            `}
          >
            <Typography variant="h6" noWrap component="div">
              {activeTab?.name}
            </Typography>
            <Box
              css={css`
                display: flex;
                gap: 10px;
              `}
            >
              <ModeSwitcher />
              <Button
                variant="outlined"
                sx={{
                  color:
                    mode === "light" ? "primary.contrastText" : "primary.main",
                  borderColor:
                    mode === "light" ? "primary.contrastText" : "primary.main",
                }}
                onClick={handleLogoutClick}
              >
                <LogoutIcon />
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </header>
  );
};
