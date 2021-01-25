import {CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe} from "@stripe/react-stripe-js";
import getStripe from "@/common/utils/get-stripe";
import React, {useEffect, useState} from "react";
import confetti from 'canvas-confetti';
import {css} from "@emotion/react";

const CheckoutForm = ({product}): JSX.Element => {
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState(null);
    const elements = useElements();
    const stripe = useStripe();
    
    const handleChange = async (event) => {
        setError(event.error ? event.error.message : '');
        setDisabled(event.empty);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const request = await fetch('/api/payment-intents', {
            method: 'POST', 
            body: JSON.stringify({product}),
        });
        const response = await request.json();
 
        const cardElement = elements.getElement(CardNumberElement);
        const {error, paymentIntent} = await stripe!.confirmCardPayment(
            response.client_secret,
            {payment_method: {card: cardElement!}}
        );

        if (error) {
            setError(error.message ?? 'An unknown error occured');
        } else if (paymentIntent) {
            setSucceeded(true);
        }
    };

    useEffect(() => {
        if (!succeeded) return;
        setTimeout(() => setSucceeded(false), 4000);
        elements.getElement(CardNumberElement).clear();
        elements.getElement(CardExpiryElement).clear();
        elements.getElement(CardCvcElement).clear();
        confetti();
    }, [succeeded])

    return (
        <form 
            id="payment-form" 
            onSubmit={handleSubmit} 
            style={{width: '100%'}}
            css={css`
                .elements {
                    gap: 1rem;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                }
                
                .card-error {
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    color: white;
                    z-index: 100;
                    position: fixed;
                    font-size: 12px;
                    padding: 12px 18px;
                    text-align: center;
                    background-color: red;
                }
                
                .card-success {
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    color: white;
                    z-index: 100;
                    position: fixed;
                    font-size: 12px;
                    padding: 12px 18px;
                    text-align: center;
                    background-color: green;
                }
                
                .elements :first-of-type {
                    grid-column: 1 / span 2;
                }
                
                .elements > * {
                    border-radius: 4px;
                    padding: 12px 18px ;
                    box-sizing: border-box;
                    background-color: white;
                    border: 1px solid #D5D5D5;
                }

                .btn {
                    width: 100%;
                    margin-top: 1rem;
                }
            `}>

            <div className={'elements'}>
                <CardNumberElement id="card-number" options={{placeholder: 'Numéro de carte'}} onChange={handleChange}/>
                <CardExpiryElement id="card-expiry" options={{placeholder: 'Expire le'}} onChange={handleChange}/>
                <CardCvcElement id="card-cvc" options={{placeholder: 'Code confidentiel'}} onChange={handleChange}/>
            </div>

            {error && (<div className={'card-error'} role="alert">{error}</div>)}
            {succeeded && (<div className={'card-success'} role="alert">Paiement réussi</div>)}

            <button className="btn btn-primary" disabled={processing || disabled || succeeded}id="submit">
                {processing ? ("...") : ("Acheter")}
            </button>

        </form>
    );
}

export default CheckoutForm;
