import firebase from "./firebase.config";

const Federation = (provider) => {
  return firebase.auth().signInWithPopup(provider);
};

export default Federation;
