import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ChakraProvider
      toastOptions={{
        defaultOptions: {
          position: "top-right",
          isClosable: true,
          duration: 4000,
          variant: "subtle",
          containerStyle : {
            maxWidth : "400px"
          },
        },
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
);
