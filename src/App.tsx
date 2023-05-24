import { QueryClient, QueryClientProvider } from "react-query";
import NewActivityTool from "./components/newactivitytool";
import React from "react";
import { Button } from "rolluptest_mimi";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <Route path="/diary/test" element={<Test />} />
      <NewActivityTool />
    </QueryClientProvider>
  );
};

export default App;
