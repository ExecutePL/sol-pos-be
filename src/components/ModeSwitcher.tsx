import { Button } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Moon from "@mui/icons-material/DarkMode";
import Sun from "@mui/icons-material/LightMode";

export const ModeSwitcher = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      sx={{
        color: mode === "light" ? "primary.contrastText" : "primary.main",
        borderColor: mode === "light" ? "primary.contrastText" : "primary.main",
      }}
      onClick={() => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
      }}
    >
      {mode === "light" ? <Moon /> : <Sun />}
    </Button>
  );
};
