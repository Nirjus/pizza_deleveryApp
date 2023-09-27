import React from 'react'
import CheckoutSteps from '../components/Checkout/CheckoutSteps'
import Payment from '../components/Paymant/Payment'

const PaymantPage = () => {
  return (
    <div>
         <CheckoutSteps active={2}/>
         <Payment />
    </div>
  )
}

export default PaymantPage