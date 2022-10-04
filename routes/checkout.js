require('dotenv').config()
const router = require('express').Router()
const stripe = require('stripe')("sk_test_51LmYdYFImYDXPJ37eBIv4lpGPv6N9c6AaPKknjxtMy8p3T9rjjxm0Fae6mtwuO3DCOl0TLvTiDhfqwDQv20IBGFD00LErTsPzV")
const { validateCartItems } = require('use-shopping-cart/utilities')
const Module = require('../models/Module')


router.get('/checkout-session/:sessionId', async (req, res) => {
    const { sessionId } = req.params
    try {
      if (!sessionId.startsWith("cs_")) {
        throw Error('Incorrect checkout session id')
      }
      const checkout_session = await stripe.checkout.sessions.retrieve(
        sessionId,
        { expand: ["payment_intent"] }
      )
      res.status(200).json(checkout_session)
    } catch {
      res.status(500).json({  statusCode: 500, message: error.message });
    }
  })



router.post("/checkout-session", async (req, res) => {
    try {
        let products = []
        await Module.find()
        .then(response => {
        products = [...response]
        })
        .catch(err => console.log(err))

        const cartItems = req.body;
        const line_items = validateCartItems(products, cartItems);
        // console.log(line_items)
        const origin = process.env.NODE_ENV === 'production' ? req.headers.origin : 'http://localhost:3000'
    
        const params = {
            submit_type: "pay",
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'AU', 'DE']
            },
            line_items,
            success_url: `${origin}/success/{CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/cart`,
            mode: 'payment'
        }
    
        const checkoutSession = await stripe.checkout.sessions.create(params);
        res.status(200).json(checkoutSession)
      } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message });
      }


})

module.exports = router;