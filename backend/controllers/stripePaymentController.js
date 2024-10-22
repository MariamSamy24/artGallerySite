const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const reactSiteUrl = process.env.REACT_SITE

exports.stripePayment = async (req, res) => {
  const { items } = req.body; 
  const lineItems = [];

  for (const item of items) {
      const product = await createOrRetrieveProduct(item.id, {
          name: item.title,
          description: item.short_description,
      });

      const price = await createPrice(product.id, {
          amount:  Math.round(item.price * 100), 
          currency: 'usd', 
      });

     
      lineItems.push({
          price: price.id, 
          quantity: item.quantity,
      });
  }

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: reactSiteUrl +'/success',
    cancel_url:  reactSiteUrl +'/cancel', 
});

  res.json({ id: session.id });
}

async function createOrRetrieveProduct(productId, productData) {
  const existingProduct = await stripe.products.list({
      limit: 100,
  });

  const product = existingProduct.data.find(p => p.name === productData.title);

  if (!product) {
      return await stripe.products.create(productData);
  }
  
  return product; 
}

async function createPrice(productId, priceData) {
  return await stripe.prices.create({
      unit_amount: priceData.amount, 
      currency: priceData.currency,
      product: productId,
  });
}
