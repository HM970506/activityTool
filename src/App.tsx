import { Route, Routes } from "react-router-dom";
import { Reset } from "styled-reset";
import NewActivityTool from "./components/newactivitytool";
import TemplateActivity from "./pages/template";
import TemplatesIndex from "./pages/list";
import NonTemplate from "./pages/nonTemplate";
import Test from "./pages/test/test";

const App = () => {
  return (
    <>
      <Reset />

      <Routes>
        <Route path="/" element={<TemplatesIndex />} />
        <Route path="/template/:templateId" element={<TemplateActivity />} />
        <Route path="/:templateId" element={<NonTemplate />} />
        <Route path="/test" element={<Test />} />
      </Routes>
      <NewActivityTool />
    </>
  );
};

export default App;
