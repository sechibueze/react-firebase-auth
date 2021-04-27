import { useAuthContext } from "../../context/auth";
import UpdateAuthdata from "../UpdateAuthData";
const Home = () => {
  const { currentUser, logout } = useAuthContext();
  return (
    <>
      <h1> Home page</h1>
      <h3> Welcome, {currentUser.email} </h3>
      <span onClick={() => logout()}>Logout </span>
      <div>
        <UpdateAuthdata />
      </div>
      <div>
        <pre>{JSON.stringify(currentUser, undefined, 4)}</pre>
      </div>
    </>
  );
};

export default Home;
