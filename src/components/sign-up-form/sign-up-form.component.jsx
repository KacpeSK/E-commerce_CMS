import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./sign-up-form.styles.scss";

const defaultFormField = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormField);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormField);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      if (user) {
        await createUserDocumentFromAuth(user, {
          displayName,
        });
        resetFormFields();
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation failed: ", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <>
      <div className="sign-up-container">
        <h2>Don't have an account?</h2>
        <span>Sign Up with your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Display name"
            type="text"
            required
            onChange={handleChange}
            name="displayName"
            value={displayName}
          ></FormInput>
          <FormInput
            label="Email"
            type="email"
            onChange={handleChange}
            required
            name="email"
            value={email}
          ></FormInput>
          <FormInput
            label="Password"
            type="password"
            onChange={handleChange}
            required
            name="password"
            value={password}
          ></FormInput>
          <FormInput
            label="Confirm Password"
            type="password"
            onChange={handleChange}
            required
            name="confirmPassword"
            value={confirmPassword}
          ></FormInput>
          <Button type="submit">Sign up</Button>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
