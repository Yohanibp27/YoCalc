import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout.jsx";

import StandardPage from "./pages/StandardPage.jsx";
import ScientificPage from "./pages/ScientificPage.jsx";

// Dummy page components untuk rute navigasi
// const StandardPage = () => <h2>Standard Calculator Page</h2>;
// const ScientificPage = () => <h2>Scientific Calculator Page</h2>;
const GraphingPage = () => <h2>Graphing Calculator Page</h2>;
const ProgrammerPage = () => <h2>Programmer Calculator Page</h2>;
const DataCalcPage = () => <h2>Date Calculation Page</h2>;

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<StandardPage />} />
          <Route path="/" element={<StandardPage />} />
          <Route path="/scientific" element={<ScientificPage />} />
          <Route path="graphing" element={<GraphingPage />} />
          <Route path="programmer" element={<ProgrammerPage />} />
          <Route path="date-calculation" element={<DataCalcPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
