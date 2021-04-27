import { useRef, useState } from "react";
import { useAuthContext } from "../../context/auth";
import { Link, useHistory } from "react-router-dom";
import Federation from "../../firebase/federation";
import {
  facebookProvider,
  googleProvider,
  githubProvider,
} from "../../firebase/authMethods";
function LoginForm() {
  const { login } = useAuthContext();
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleFederation(provider) {
    return Federation(provider)
      .then((res) => {
        console.log("results ", res);
        return history.push("/");
      })
      .catch((err) => {
        console.log("err ", { err });
        setError(err.message || "Failed to work");
      });
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (error) {
      console.log("error in signup", error);
      setError("Failed to login ");
    }
    setLoading(false);
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <p onClick={() => handleFederation(facebookProvider)}> Facebok </p>
        <p onClick={() => handleFederation(googleProvider)}> Google </p>
        <p onClick={() => handleFederation(githubProvider)}> Github </p>
        <h3> Login form</h3>
        {error && <p> {error} </p>}
        <input type="email" ref={emailRef} /> <br />
        <input type="password" ref={passwordRef} />
        <button disabled={loading} type="submit">
          Login up
        </button>
        <p>
          <Link to="/forgot-password"> Forgot password</Link>
        </p>
        <p>
          <Link to="/signup"> sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
