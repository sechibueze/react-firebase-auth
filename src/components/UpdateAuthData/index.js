import { useRef, useState } from "react";
import { useAuthContext } from "../../context/auth";
const UpdateAuthdata = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, updateEmail, updatePassword } = useAuthContext();
  function handleUpdate(e) {
    e.preventDefault();
    setLoading(true);
    let promises = [];
    if (currentUser.email !== emailRef.current.value) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value !== "") {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        setMessage("Data Updated");
      })
      .catch((err) => {
        setError("Failed to update");
      })
      .finally(() => setLoading(false));
  }
  return (
    <form onSubmit={handleUpdate}>
      <h3> Signup form</h3>
      {error && <p> {error} </p>}
      {message && <p> {message} </p>}
      <input type="email" ref={emailRef} /> <br />
      <input type="password" ref={passwordRef} />
      <button disabled={loading} type="submit">
        Update
      </button>
    </form>
  );
};

export default UpdateAuthdata;
