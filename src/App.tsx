import { Route, Routes } from "react-router-dom";
import { Reset } from "styled-reset";
import NewActivityTool from "./components/newactivitytool";
import TemplatesIndex from "./pages/list";
import NonTemplate from "./pages/nonTemplate";
import Test from "./pages/test";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <Routes>
        <Route path="/" element={<TemplatesIndex />} />
        <Route path="/:templateId" element={<NonTemplate />} />
        <Route path="/test" element={<Test />} />
      </Routes>
      <NewActivityTool />
      <Reset />
    </>
  );
};

export default App;
