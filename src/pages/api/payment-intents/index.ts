import {formatAmountForStripe} from '@/common/utils/stripe-helpers';
import {NextApiRequest, NextApiResponse} from 'next';
import {CURRENCY} from '@/app/constants';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!, {apiVersion: '2020-08-27'});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const {product} = JSON.parse(req.body);

    try {

      const params: Stripe.PaymentIntentCreateParams = {
        payment_method_types: ['card'],
        amount: formatAmountForStripe(product?.price, CURRENCY),
        description: product?.title || '',
        currency: CURRENCY,
      }

      const payment_intent: Stripe.PaymentIntent = await stripe.paymentIntents.create(params);

      res.status(200).json(payment_intent);

    } catch (err) {
      res.status(500).json({statusCode: 500, message: err.message})
    }

  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

export default handler;