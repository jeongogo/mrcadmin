import React from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import useStore from '../../store/store';
import Login from '../../components/auth/Login';


const LoginPage = () => {
  const setUser = useStore((state) => state.setUser);

  const handleSubmit = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setUser(user.email);
    })
    .catch((error) => {
      alert(error.code);
    });
  }

  return (
    <Login handleSubmit={handleSubmit} />
  )
}

export default LoginPage