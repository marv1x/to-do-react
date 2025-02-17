import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; 
import { store } from "./store/store"; 
import "./index.css";
import App from "./App.tsx";
import "@fontsource/roboto/300.css"; // Импорт шрифта (можно 400, 500 и 700)
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}> 
      <App />
    </Provider>
  </StrictMode>
);
