import { QueryClient, QueryClientProvider } from "react-query";
import NewActivityTool from "./components/newactivitytool";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NewActivityTool />
    </QueryClientProvider>
  );
};

export default App;
