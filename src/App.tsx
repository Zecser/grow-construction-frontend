import { Provider } from "react-redux";
import { store } from "./store";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster />
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
