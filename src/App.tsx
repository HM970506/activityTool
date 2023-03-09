import React, { useRef } from "react";
import { Route, Routes } from "react-router-dom";
import { Reset } from "styled-reset";
import NewActivityTool from "./components/newactivitytool";
import TemplateActivity from "./pages/template";
import TemplatesIndex from "./pages/list";
import NonTemplate from "./pages/nonTemplate";

function App() {
  return (
    <>
      <Reset />

      <Routes>
        <Route path="/" element={<TemplatesIndex />} />
        <Route path="/template/:templateId" element={<TemplateActivity />} />
        <Route path="/:templateId" element={<NonTemplate />} />
      </Routes>
      <NewActivityTool />
    </>
  );
}

export default App;
