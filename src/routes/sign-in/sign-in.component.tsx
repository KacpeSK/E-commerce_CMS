/* eslint-disable */
// @ts-nocheck
import { useEffect } from "react";
//import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

import {
  signInWithGooglePopup,
  //  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
  auth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  //useEffect(async()=> {
  //  const response = await getRedirectResult(auth);
  //  if (response) {
  //    const userDocRef = await createUserDocumentFromAuth(response.user);
  //  }
  //},[])

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    console.log(user);
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google popup</button>
      {/*<button onClick={logGoogleUser}>Sign in with Google redirect</button>*/}
      <SignUpForm />
    </>
  );
};

export default SignIn;
