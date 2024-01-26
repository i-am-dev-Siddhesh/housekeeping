import { stripeClient } from "../clients/stripe";


export const addNewCustomerToStripe = async (email: string) => {
  const customer = await stripeClient.customers.create({
    email,
    description: "New Customer",
  });

  return customer;
};

export const getStripeCheckoutSession = async (sessionID: string) => {
  const session = await stripeClient.checkout.sessions.retrieve(sessionID);
  return session;
};
export const getCustomerByIDFromStripe = async (id: string) => {
  const customer = await stripeClient.customers.retrieve(id);
  return customer;
};

export const createCheckoutSession = async (
  customer: string,
  price: string
) => {
  const session = await stripeClient.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer,
    line_items: [
      {
        price,
        quantity: 1,
      },
    ],

    success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/payment-failed?session_id={CHECKOUT_SESSION_ID}`,
  });

  return session;
};
