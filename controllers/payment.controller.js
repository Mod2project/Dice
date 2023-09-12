const Stripe = require('stripe');
require("dotenv").config()


const stripe = new Stripe (process.env.STRIPE_URI)

module.exports.createCheckout = async (req, res, next) =>{
   
    const sessionStripe = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
    {
      price: '{{event.prize}}',
      quantity: 1,
    },
  ],
  
  success_url: 'https://localhost:3000/success',
  cancel_url: 'https://localhost:3000/cancel',
});
return res.json(sessionStripe)


res.redirect(303, session.url);
}



module.exports.cancel = (req, res, next) =>{
    
}

module.exports.success = (req, res, next) =>{
    
}

