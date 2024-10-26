import React from "react";
import RouterNavbar from "./component/Router/RouterNavbar";
import { AppProvider } from "./component/context/AppContext";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
      <ToastContainer />

      <AppProvider>
        <RouterNavbar />
      </AppProvider>
    </div>
  );
};

export default App;
