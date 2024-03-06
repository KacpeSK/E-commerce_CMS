import { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";

import "./sign-in-form.styles.scss";

const defaultFormField = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormField);
  const { email, password } = formFields;
  const dispatch = useDispatch();

  const resetFormFields = () => {
    setFormFields(defaultFormField);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(emailSignInStart(email, password));
    resetFormFields();
  };

  const signInWithGoogle = () => {
    dispatch(googleSignInStart());
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
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
