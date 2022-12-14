import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { ProfileSelectionProvider } from "./context/ProfileSelectionContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Wallet } from "./lib/near-wallet";
import { BuskerManager } from "./lib/busker-manager";

const wallet = new Wallet({ createAccessKeyFor: process.env.CONTRACT_NAME });
const buskerManager = new BuskerManager({
  contractId: process.env.CONTRACT_NAME,
  userWallet: wallet,
});

// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp();

  ReactDOM.createRoot(document.getElementById("root")).render(
    <ProfileSelectionProvider>
      <App
        isSignedIn={isSignedIn}
        wallet={wallet}
        buskerManager={buskerManager}
      />
    </ProfileSelectionProvider>
  );
};
