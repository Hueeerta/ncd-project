import { createContext } from "react";

export default SelectedProfileContext = () => {
  const [profileSelection, setProfileSelection] = useState({
    account_id: "",
    name: "",
    category: "",
    location: "",
    img: "",
    qr: "",
    donations: 0,
  });
}
