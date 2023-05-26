import { QueryClient, QueryClientProvider } from "react-query";
import NewActivityTool from "./components/newactivitytool";
import styled from "styled-components";
import Background from "./background.png";

const TestImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
`;

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <TestImage src={Background} />
      <NewActivityTool />
    </QueryClientProvider>
  );
};

export default App;
