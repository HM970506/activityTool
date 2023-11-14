import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import Personal from "./personal";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Personal />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
