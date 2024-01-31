import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  signInUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

const defaultFormField = {
  email: "",
  password: "",
};

const SignInForm = ({ onClickHandler }) => {
  const [formFields, setFormFields] = useState(defaultFormField);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormField);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInUserWithEmailAndPassword(email, password);
      if (response) {
        console.log(response);
        resetFormFields();
      }
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        alert("incorrect email or password");
      }
      /* Delete error log for build*/
      console.log("user sign-in failed: " + error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  return (
    <>
      <div className="sign-in-container">
        <h2>I already have an account</h2>
        <span>Sign In with your email and password</span>
        <form onSubmit={handleSubmit}>
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
          <div className="btn-container">
            <Button type="submit">Sign in</Button>
            <Button
              onClick={signInWithGoogle}
              buttonType="google"
              type="button"
            >
              Sign in with Google
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInForm;
