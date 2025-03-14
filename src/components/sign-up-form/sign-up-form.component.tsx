/* eslint-disable */
// @ts-nocheck
import { useState, useCallback } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import "./sign-up-form.styles.scss";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.componen";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const HandleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords dont match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      const userDocRef = await createUserDocumentFromAuth(user, {
        displayName,
      });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use");
      alert("Cannot create user with this email");
      console.log(error);
    }
  };

  const HandleChange = (event) => {
    const { name, value } = event.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };
  console.log(formFields);
  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={HandleSubmit}>
        <FormInput
          label={"Display Name"}
          name="displayName"
          value={displayName}
          type="text"
          required
          onChange={HandleChange}
        />
        <FormInput
          label={"Email"}
          name="email"
          value={email}
          type="text"
          required
          onChange={HandleChange}
        />
        <FormInput
          label={"Password"}
          name="password"
          value={password}
          type="password"
          required
          onChange={HandleChange}
        />
        <FormInput
          label={"Confirm Password"}
          name="confirmPassword"
          value={confirmPassword}
          type="password"
          required
          onChange={HandleChange}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
