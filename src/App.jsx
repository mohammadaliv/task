import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Cities from "./components/Cities";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="cities" element={<Cities />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
