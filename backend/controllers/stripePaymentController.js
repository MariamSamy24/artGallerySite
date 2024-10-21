const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


exports.stripePayment = async (req, res) => {
  const { items } = req.body; 

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, 
      },
      quantity: item.quantity,
    })),
    mode: 'payment', 
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel', 
  });
  console.log(session.id)
  res.json({ id: session.id });
}

