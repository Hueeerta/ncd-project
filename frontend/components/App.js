import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";

const App = ({ isSignedIn, wallet, buskerManager }) => {
  const [buskerList, setBuskerList] = useState([]);
  const [newBusker, setNewBusker] = useState({ name: "" });

  const getBuskersList = () => {
    buskerManager
      .getBuskers()
      .then((response) => {
        console.log(response);
        setBuskerList(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const createNewBusker = (name) => {
    buskerManager
      .setBusker(name)
      .then((response) => {
        console.log(response);
        getBuskersList();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getBuskersList();
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

  const handleInputChange = (event) => {
    const buskerInput = { ...newBusker };
    if (event.target.id === "name") {
      buskerInput.name = event.target.value;
    }
    setNewBusker(buskerInput);
  };

  const handleNewBusker = (event) => {
    event.preventDefault();
    console.log("Calling set_busker() on chain:", newBusker);
    createNewBusker(newBusker.name); 
  };

  return (
    <>
      <h1>Busker Donation Plataform</h1>
      <p>Welcome</p>
      <button type="button" onClick={() => wallet.signOut()}>
        Log out {wallet.accountId}
      </button>
      <hr />
      <form>
        <h3>Create your Busker Profile here:</h3>
        <label htmlFor="name">
          Busker Name:
          <input
            id="name"
            name="name"
            type="text"
            value={newBusker.name}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" onClick={handleNewBusker}>
          Create my Busker profile
        </button>
      </form>
      <hr />
      <h3>Search for a Buskert to donate to:</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ACCOUNT</th>
            <th>NAME</th>
          </tr>
        </thead>
        <tbody>
          {buskerList.map((busker) => (
            <tr key={busker.id}>
              <td>{busker.id}</td>
              <td>{busker.account_id}</td>
              <td>{busker.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default App;
