import { useState, useContext } from "react";
import ProfileSelectionContext from "../context/ProfileSelectionContext";

export default function SelectedProfile({ buskerManager }) {
  const [donationAmount, setDonationAmount] = useState(0);
  const { profileSelection, setProfileSelection } = useContext(
    ProfileSelectionContext
  );

  const handleDonation = (account_id) => {
    console.log("Dona", donationAmount);
    buskerManager
      .donateToBusker(account_id, donationAmount)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div id="single-profile" className="border rounded p-4">
        <div id="single-profile-content" className="">
          <img
            src={profileSelection.img}
            alt={profileSelection.name}
            className=""
            width="100"
          />

          <h3>{profileSelection.name}</h3>
          <p>{profileSelection.category}</p>
          <p>
            <a
              href={
                "http://maps.google.com/maps?z=19&t=m&q=loc:" +
                profileSelection.location
              }
              target="_blank"
            >
              {profileSelection.location}
            </a>
          </p>
          <div id="single-profile-donation">
            <input
              className="donation"
              id="amount"
              type="number"
              name="amount"
              value={donationAmount}
              onChange={(event) => {
                setDonationAmount(event.target.value);
              }}
            />{" "}
            NEAR
            <br />
            <button
              onClick={(event) => {
                event.target.innerText = "Loading...";
                handleDonation(profileSelection.account_id);
              }}
            >
              Donate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
