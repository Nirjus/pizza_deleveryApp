import React from 'react'
import Checkout from '../components/Checkout/Checkout'
import CheckoutSteps from '../components/Checkout/CheckoutSteps'

const CheckoutPage = () => {
  return (
    <div>
      <CheckoutSteps active={1}/>
        <Checkout />
    </div>
  )
}

export default CheckoutPage