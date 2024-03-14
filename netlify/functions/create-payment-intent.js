export const handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);
    return {
      statusCode: 200,
      body: JSON.stringify({
        amount,
        currency: "eur",
        payment_method_type: ["card"],
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "error" }),
    };
  }
};
