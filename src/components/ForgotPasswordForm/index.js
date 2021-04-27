import { useRef, useState } from "react";
import { useAuthContext } from "../../context/auth";
const ForgotPasswordForm = () => {
  const { sendPasswordReset } = useAuthContext();
  const emailRef = useRef();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  async function handlePasswordReset(e) {
    e.preventDefault();
    try {
      await sendPasswordReset(emailRef.current.value);
      setMessage("Check your email");
    } catch (error) {
      setError("Failed to send reset link");
    }
  }
  return (
    <form onSubmit={handlePasswordReset}>
      {error && <p>{error} </p>}
      {message && <p>{message} </p>}
      <input type="email" ref={emailRef} /> <br />
      <button type="">Send password link</button>
    </form>
  );
};

export default ForgotPasswordForm;
