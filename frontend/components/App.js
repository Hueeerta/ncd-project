import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import { utils } from "near-api-js";
import ProfileList from "./ProfileList";
import SelectedProfile from "./SelectedProfile";

const App = ({ isSignedIn, wallet, buskerManager }) => {
  const [buskerList, setBuskerList] = useState([]);
  const [hasProfile, setHasProfile] = useState({
    account_id: "",
    name: "",
    category: "",
    location: "",
    img: "",
    qr: "",
    donations: 0,
  });
  const [newBusker, setNewBusker] = useState({
    name: "",
    category: "",
    location: "",
    img: "",
    qr: "",
  });

  const yoctoToNEAR = (amount) =>
    utils.format.formatNearAmount(
      amount.toLocaleString("fullwide", { useGrouping: false })
    );

  const getBusker = () => {
    buskerManager
      .getBusker(wallet.accountId)
      .then((response) => {
        console.log("My profile:", response);
        // debugger;
        if (response) {
          setHasProfile(response);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getBuskersList = () => {
    buskerManager
      .getBuskers()
      .then((response) => {
        // console.log("Busker List:", response);
        setBuskerList(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createNewBusker = ({ name, category, location, img, qr }) => {
    buskerManager
      .setBusker(name, category, location, img, qr)
      .then((response) => {
        alert(response.receipts_outcome[0].outcome.logs[0]);
        // debugger;
        getBusker();
        getBuskersList();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (isSignedIn) {
      getBusker();
      if (hasProfile.name === "") {
        getBuskersList();
      }
    }
  }, []);

  // If the user haven't signed in with the NEAR Wallet
  if (!isSignedIn) {
    return (
      <div className="container p-4">
        <h1>Busker Donation Plataform</h1>
        <p>Here you can find Buskers to donate money to.</p>
        <p>
          Start by <strong>logging in</strong> with your NEAR wallet.
        </p>
        <button type="button" onClick={() => wallet.signIn()}>
          Log in
        </button>
      </div>
    );
  }

  const handleInputChange = (event) => {
    const buskerInput = { ...newBusker };
    if (event.target.id === "name") {
      buskerInput.name = event.target.value;
    } else if (event.target.id === "category") {
      buskerInput.category = event.target.value;
    } else if (event.target.id === "location") {
      buskerInput.location = event.target.value.replace(/\s/g, "");
    } else if (event.target.id === "img") {
      buskerInput.img = event.target.value;
    }
    setNewBusker(buskerInput);
  };

  const handleNewBusker = (event) => {
    event.preventDefault();
    console.log("Calling set_busker() on chain:", newBusker);
    event.target.innerText = "Creating...";
    createNewBusker(newBusker);
  };

  const handleDeleteBusker = (event) => {
    event.target.innerText = "Deleting...";
    buskerManager
      .deleteBusker(wallet.accountId)
      .then((response) => {
        alert(response.receipts_outcome[0].outcome.logs[0]);
        setHasProfile({
          account_id: "",
          name: "",
          category: "",
          location: "",
          img: "",
          qr: "",
          donations: 0,
        });
        getBuskersList();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const PrintImage = () => {
    const pwa = window.open("about:blank", "_new");
    pwa.document.open();
    pwa.document.write(
      "<html><head><scri" +
        "pt>function step1(){\n" +
        "setTimeout('step2()', 10);}\n" +
        "function step2(){window.print();window.close()}\n" +
        "</scri" +
        "pt></head><body onload='step1()'>\n" +
        "<img src='" +
        hasProfile.qr +
        "' width='100%' /></body></html>"
    );
    pwa.document.close();
  };

  // If the user is logged in
  return (
    <>
      <div className="container p-4">
        <h1>Busker Donation Plataform</h1>
        <button type="button" onClick={() => wallet.signOut()}>
          Log out {wallet.accountId}
        </button>
      </div>
      <hr />
      {hasProfile.name === "" ? ( // If user don't have a profile
        <>
          <div className="container p-4">
            <h3>Wanna create your own Profile?</h3>
            <form>
              <label htmlFor="name">
                Your stage name:
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={newBusker.name}
                  placeholder="Busker Name"
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <label htmlFor="category">
                Category of your performance:
                <input
                  id="category"
                  name="category"
                  type="text"
                  value={newBusker.category}
                  placeholder="Juggling"
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <label htmlFor="location">
                Place where you can be found on a regular basis:
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={newBusker.location}
                  placeholder="-33.425572,-70.614705"
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label htmlFor="img">
                An image of you and/or your performance:
                <input
                  id="img"
                  name="img"
                  type="text"
                  value={newBusker.img}
                  placeholder="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/One-man_band_street_performer_-_5.jpg/1280px-One-man_band_street_performer_-_5.jpg"
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <br />
              <button type="submit" onClick={handleNewBusker}>
                Create my Busker profile
              </button>
            </form>
          </div>
          <hr />

          <div className="container p-4">
            <div className="row">
              <h3>Looking for a Busker to donate to?</h3>
              <div className="col-md-7">
                <ProfileList buskerList={buskerList} />
              </div>
              <div className="col-md-5">
                <SelectedProfile
                  buskerManager={buskerManager}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        // If user has a profile
        <div className="container p-4">
          <h2>Welcome {hasProfile.name}</h2>
          <img src={hasProfile.img} alt={hasProfile.name} width="200" />
          <br />
          <p>
            <strong>Total donation recieved:</strong> {yoctoToNEAR(hasProfile.donations)} NEAR
          </p>
          <br />
          <button onClick={PrintImage}>Print your QR</button>
          <br />
          <button onClick={handleDeleteBusker}>Delete my profile</button>
        </div>
      )}
    </>
  );
};
export default App;
