import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store/index.ts";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
