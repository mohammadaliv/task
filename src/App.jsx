import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import "./App.css";
import Login from "./components/Login";
import Cities from "./components/Cities";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import NotFound from "./components/NotFound";

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  const auth = localStorage.getItem("token");
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route index element={<Login />} />
            {auth ? <Route path="cities" element={<Cities />} /> : ""}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
