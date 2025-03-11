/* eslint-disable */
// @ts-nocheck
import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import "./sign-up-form.styles.scss";
import FormInput from "../form-input/form-input.component";

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
      const userDocRef = await createUserDocumentFromAuth(user, displayName);
      resetFormFields();
    } catch (error) {
      console.log(error);
    }
  };

  const HandleChange = (event) => {
    const { name, value } = event.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };
  console.log(formFields);

  return (
    <div>
      <h1>Sign up with your email and password</h1>
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
          type="text"
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
