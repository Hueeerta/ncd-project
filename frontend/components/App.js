import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";

const App = ({ isSignedIn, wallet, buskerManager }) => {
  const [contractMessage, setContractMessage] = useState("loading...");

  useEffect(() => {
    buskerManager.getBuskers()
      .then((response) => {
        console.log(response);
        setContractMessage(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!isSignedIn) {
    return (
      <>
        <h1>Busker Donation Plataform</h1>
        <p>Here you can find Buskers to donate money to.</p>
        <p>
          Start by <strong>logging in</strong> with your NEAR wallet.
        </p>
        <button type="button" onClick={() => wallet.signIn()}>
          Log in
        </button>
      </>
    );
  }

  return (
    <>
      <p>Welcome</p>
      <button type="button" onClick={() => wallet.signOut()}>
        Log out {wallet.accountId}
      </button>
      <p>Message: {contractMessage}</p>
    </>
  );
};
export default App;
