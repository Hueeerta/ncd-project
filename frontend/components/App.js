import "regenerator-runtime/runtime";
import React from "react";

const App = ({ isSignedIn, wallet }) => {
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
      <p>Bienvenido</p>
      <button type="button" onClick={() => wallet.signOut()}>
        Log out {wallet.accountId}
      </button>
    </>
  );
};
export default App;
