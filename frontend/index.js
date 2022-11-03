import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { Wallet } from "./lib/near-wallet";

const wallet = new Wallet({ createAccessKeyFor: process.env.CONTRACT_NAME });

// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp();
  ReactDOM.createRoot(document.getElementById("root")).render(
    <App isSignedIn={isSignedIn} wallet={wallet} />
  );
};
