import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "../../context/auth";
function SignupForm() {
  const { signup, currentUser } = useAuthContext();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (error) {
      console.log("error in signup", error);
      setError(error.message || "Failed to create account");
    }
    setLoading(false);
  }
  return (
    <div>
      <form onSubmit={handleSignup}>
        <h3> Signup form</h3>
        {error && <p> {error} </p>}
        <input type="email" ref={emailRef} /> <br />
        <input type="password" ref={passwordRef} />
        <button disabled={loading} type="submit">
          Sign up
        </button>
        <div>
          <p>
            {" "}
            <span onClick={() => {}}> Facebook </span>{" "}
          </p>
        </div>
        <p>
          Got account ? <Link to="/login">Login</Link>
        </p>
        <div>
          <pre>{JSON.stringify(currentUser, undefined, 4)}</pre>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
