import { CssBaseline } from "@mui/material";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme,
} from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { OrderList } from "./components/OrderList";
import { Home } from "./views/Home";
import { Products } from "./views/Products";
import { Tables } from "./views/Tables";
import { Transactions } from "./views/Transactions";
import { Waiters } from "./views/Waiters";

const App = () => {
  const themeColors = experimental_extendTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: {
            light: "#000",
            main: "#8968fc",
            dark: "rgba(0,0,0,0.1)",
            contrastText: "#fff",
          },
        },
      },
      dark: {
        palette: {
          primary: {
            light: "#fff",
            main: "#00fdbc",
            dark: "rgba(255,255,255,0.2)",
          },
        },
      },
    },
  });
  const isUserLogin = true;

  return (
    <BrowserRouter>
      <CssVarsProvider theme={themeColors}>
        <CssBaseline />
        <Layout>
          <Routes>
            <Route path="/" element={isUserLogin ? <Tables /> : <Home />} />
            <Route path="tables" element={<Tables />} />
            <Route path="products" element={<Products />} />
            <Route path="waiters" element={<Waiters />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="orders/:tableId" element={<OrderList />} />
          </Routes>
        </Layout>
      </CssVarsProvider>
    </BrowserRouter>
  );
};

export default App;
