import { createContext, useState } from "react";

const ProfileSelectionContext = createContext();

export const ProfileSelectionProvider = ({ children }) => {
  const [profileSelection, setProfileSelection] = useState({
    account_id: "",
    name: "",
    category: "",
    location: "",
    img: "",
    qr: "",
    donations: 0,
  });

  return (
    <ProfileSelectionContext.Provider
      value={{ profileSelection, setProfileSelection }}
    >
      {children}
    </ProfileSelectionContext.Provider>
  );
};

export default ProfileSelectionContext;
