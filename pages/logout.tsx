/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:15:32
 * @modify date 2021-07-15 13:15:39
 * @desc [description]
 */
import axios from "axios";
import { useCallback, useEffect } from "react";
import { API, API_LOGOUT } from "../config/apis";
import { useAuth } from "../middleware/AuthProvider";
import withAuth from "../middleware/withAuth";

/**
 * Logout
 * @returns - Conditional Routing
 * A pending message will be displayed, if something goes wrong.
 */
function Logout(): JSX.Element {
  const { setAuthenticated } = useAuth();

  const logout = useCallback(async () => {
    const config = {
      withCredentials: true,
    };

    await axios
      .get(API + API_LOGOUT, config)
      .then((res) => {
        if (res.status === 200) {
          setAuthenticated(false);
        } else {
          console.log("Failed to logout", res);
        }
      })
      .catch((err) => console.log("Failed to logout", err));
  }, []);

  useEffect(() => {
    logout();
  }, [setAuthenticated]);

  return <p>Logging out...</p>;
}

export default withAuth(Logout);
