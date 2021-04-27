import React, { useState, createContext, useContext, useEffect } from "react";
import { auth } from "../firebase/firebase.config";
const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}
function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  function signup(email, password) {
    console.log("[signup]:: email & password", { email, password });
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }
  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }
  function login(email, password) {
    console.log("[login]:: email & password", { email, password });
    return auth.signInWithEmailAndPassword(email, password);
  }
  function sendPasswordReset(email) {
    return auth.sendPasswordResetEmail(email);
  }
  function logout() {
    return auth.signOut();
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("[onAuthStateChanged]:: user", user);
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const contextValues = {
    currentUser,
    signup,
    login,
    logout,
    sendPasswordReset,
    updateEmail,
    updatePassword,
  };
  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <AuthContext.Provider value={contextValues}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
