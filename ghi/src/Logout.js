import { useToken } from "./Auth";

function Logout() {
  const logout = useToken()[2];
  logout();
}

export default Logout;
