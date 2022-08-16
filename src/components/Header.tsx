/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { Tab } from "./Layout";
import { ModeSwitcher } from "./ModeSwitcher";

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
            <ModeSwitcher />
          </Box>
        </Toolbar>
      </AppBar>
    </header>
  );
};
