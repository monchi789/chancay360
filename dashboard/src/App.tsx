import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import {Provider} from 'react-redux';
import {store} from "@/app/store.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AppRoutes/>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
