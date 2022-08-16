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
  const drawer = (
    <div>
      <Toolbar>
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
      </Toolbar>
      <Divider />
      <List>
        {tabs.map((tab) => {
          const isTableActive =
            tab.path === "/tables" &&
            (location.pathname === "/" || location.pathname.includes("order"));
          const isActive =
            location.pathname.includes(tab.path) || isTableActive;
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
                  color: isActive ? "primary.main" : "primary.light",
                  backgroundColor: isActive ? "primary.dark" : "transparent",
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
            // <Link
            //   to={tab.path}
            //   key={tab.name}
            //   css={css`
            //     text-decoration: none;
            //     color: #00fdbc;
            //   `}
            // >
            //   <ListItem
            //     disablePadding
            //     sx={{
            //       color: isActive ? "primary.main" : "primary.light",
            //       background: isActive
            //         ? "rgba(255,255,255,0.1)"
            //         : "transparent",
            //     }}
            //   >
            //     <ListItemButton>
            //       {tab.icon}
            //       <ListItemText
            //         primary={tab.name}
            //         css={css`
            //           padding-left: 10px;
            //         `}
            //       />
            //     </ListItemButton>
            //   </ListItem>
            // </Link>
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
