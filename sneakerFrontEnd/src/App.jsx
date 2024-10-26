import React from "react";

import RouterNavbar from "./Router/RouterNavbar";
import { AppProvider } from "./context/AppContext";
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
