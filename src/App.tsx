import { QueryClient, QueryClientProvider } from "react-query";

import { Route, Routes } from "react-router-dom";
import Team from "./team";
import Personal from "./personal";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/diary/team/" element={<Team />} />
        <Route path="/diary/" element={<Personal />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
