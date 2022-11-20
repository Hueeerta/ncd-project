import { useContext } from "react";
import ProfileSelectionContext from "../context/ProfileSelectionContext";

function ProfileList({ buskerList }) {
  const { profileSelection, setProfileSelection } = useContext(
    ProfileSelectionContext
  );

  return (
    <div className="list-group h-100">
      {buskerList.map((busker, key) => (
        <div
          key={key + busker.account_id}
          className="list-group-item list-group-item-action d-flex flex-row justify-content-start"
          onClick={() => {
            console.log(busker.account_id);
            setProfileSelection(busker);
          }}
        >
          <img
            src={busker.img}
            alt={busker.name}
            className="img-thumbnail mr-4 rounded"
            width="70"
          />
          <p className="ml-4">
            {busker.name}, {busker.category}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ProfileList;
