import React from "react";
import { Route, Routes } from "react-router-dom";
import { Reset } from "styled-reset";
import NewActivityTool from "./components/newactivitytool";
import TemplateActivity from "./pages/templateActivity";
import TemplatesIndex from "./pages/templateList";

function App() {
  return (
    <>
      <Reset />
      <NewActivityTool />
      <Routes>
        <Route path="/" element={<TemplatesIndex />} />
        <Route path="/:templateId" element={<TemplateActivity />} />
      </Routes>
    </>
  );
}

export default App;
