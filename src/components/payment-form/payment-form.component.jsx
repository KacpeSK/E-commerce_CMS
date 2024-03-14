import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import "./payment-form.styles.scss";

const defaultFormField = {
  cardNumber: "",
  expirationDate: "",
  securityCode: "",
};

const PaymentForm = () => {
  const cartTotal = useSelector(selectCartTotal);
  const [formFields, setFormFields] = useState(defaultFormField);
  const { cardNumber, expirationDate, securityCode } = formFields;
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (cardNumber === "" || expirationDate === "" || securityCode === "") {
      return;
    }

    setIsProcessingPayment(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ amount: cartTotal }),
    }).then((res) => res.json());

    setIsProcessingPayment(false);
  };

  return (
    <>
      <div className="payment-form-container">
        <form
          className="payment-form-form"
          onSubmit={paymentHandler}
        >
          <FormInput
            label="Card number"
            type="number"
            onChange={handleChange}
            required
            name="cardNumber"
            value={cardNumber}
          ></FormInput>
          <FormInput
            label="Expiration date"
            type="number"
            onChange={handleChange}
            required
            name="expirationDate"
            value={expirationDate}
          ></FormInput>{" "}
          <FormInput
            label="Security code"
            type="number"
            onChange={handleChange}
            required
            name="securityCode"
            value={securityCode}
          ></FormInput>
          <p>Just for testing purposes. Submition is not gonna be handled</p>
          <Button
            isLoading={isProcessingPayment}
            type="submit"
          >
            Pay
          </Button>
        </form>
      </div>
    </>
  );
};

export default PaymentForm;
