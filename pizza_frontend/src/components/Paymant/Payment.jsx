import React, { useEffect, useState } from "react";
import {server} from "../../server";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Payment = () => {
 
  const {user} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
 const [orderData, setOrderData] = useState([]);
 const [select, setSelect] = useState(1);

 useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("foodOrder"));
    setOrderData(orderData);
    window.scrollTo(0, 0);
  }, []);
 
  const order = {
    cart: orderData?.cartItem,
    shippingAddress: orderData?.shippingAddress,
    user: orderData?.user,
    totalPrice:orderData?.totalPrice,
    shippingCharge:orderData?.shipping,
    subtotalPrice: orderData?.subTotalPrice,
  }
  const stripePaymentHandler = async (e) => {
    e.preventDefault();
   try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${server}/payment/process`,
      {orderData},{withCredentials:true}
    );
    // console.log(data.payload.client_secret);
    const client_secret = data.payload.client_secret;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });
      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            paymentType: "Credit Card",
          };
      
          await axios
            .post(`${server}/order/create`, order, config)
            .then((res) => {
              navigate("/success");
              toast.success("Order successful!");
              localStorage.setItem("foodCart", JSON.stringify([]));
              localStorage.setItem("foodOrder", JSON.stringify([]));
              window.location.reload();
            }).catch((error) => {
              navigate("/cancel");
              toast.error("Order canceled!");
            })
        }
      }
   } catch (error) {
    toast.error(error);
   }
    
  }
  const cashOnDeliveryHandler = async(e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    order.paymentInfo = {
      
      paymentType:"Cash On Delivery",
    };

    await axios
    .post(`${server}/order/create`, order, config)
    .then((res) => {
      navigate("/success");
      toast.success("Order successful!");
      localStorage.setItem("foodCart", JSON.stringify([]));
      localStorage.setItem("foodOrder", JSON.stringify([]));
      window.location.reload();
    }).catch((error) => {
      navigate("/cancel");
      toast.error("Order canceled!");
    })
  }

  return (
    <div className=" w-full min-h-screen h-auto bg-[#e2e2e2]">
      <div className=" text-center w-full 800px:w-[50%] mb-[-10px]">
        <h5 className="text-[18px] font-[500]">Payment methods</h5>
      </div>
      <div className="w-full flex flex-row max-800px:flex-col justify-center gap-4 mb-10">
        <div
          className="w-full 800px:w-[50%] mt-7 p-4 flex flex-col justify-center items-center gap-2 bg-[#d4d4d4] rounded-md"
        >
       
            {/*  implement stripe here */}
            <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(1)}
          >
            {select === 1 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Debit/credit card
          </h4>
        </div>

        {/* pay with card */}
        {select === 1 ? (
          <div className="w-full flex border-b">
            <form className="w-full" onSubmit={stripePaymentHandler}>
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Name On Card</label>
                  <input
                    required
                    placeholder={user && user.name}
                    className={`p-1 bg-white outline-none h-[35px] rounded w-[95%]`}
                    value={user && user.name}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Exp Date</label>
                  <CardExpiryElement
                    className={` p-1 bg-white outline-none h-[35px] rounded w-[95%]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#B3B3B3",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Card Number</label>
                  <CardNumberElement
                    className={` p-1 bg-white outline-none h-[35px] rounded w-[95%]`} 
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#B3B3B3",
                          },
                        },
                      },
                    }}
                    />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">CVV</label>
                  <CardCvcElement
                    className={` p-1 bg-white outline-none h-[35px] rounded w-[95%]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#B3B3B3",
                          },
                        },
                      },
                    }}
                     />
                </div>
              </div>
              <input
                type="submit"
                value="Submit"
                className={`p-2 px-3 bg-[#ff9900] text-[#fff] h-[45px] rounded-[5px] hover:bg-[#fec666] transition-all duration-200 cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>
      <br />
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(2)}
          >
            {select === 2 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Cash on Delivery
          </h4>
        </div>

        {/* cash on delivery */}
        {select === 2 ? (
          <div className="w-full flex">
            <form className="w-full" onSubmit={cashOnDeliveryHandler}>
              <input
                type="submit"
                value="Confirm"
                className={`p-2 px-3 bg-[#ff9204] text-[#fff] h-[45px] rounded-[5px] hover:bg-[#fbb752] transition-all duration-200 cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>
        </div>
        <div className=" mt-7 p-4 w-full 800px:w-[30%] bg-[#d4d4d4] relative rounded-md">
          <div className="flex justify-between">
            <h3 className="text-[16px] font-[400] text-[#000000a4]">
              subtotal:
            </h3>
            <h5 className="text-[18px] font-[600]">₹{orderData?.subTotalPrice}</h5>
          </div>
          <br />
          <div className="flex justify-between">
            <h3 className="text-[16px] font-[400] text-[#000000a4]">
              Delevery charge:
            </h3>
            <h5 className="text-[18px] font-[600]">₹{orderData?.shipping}</h5>
          </div>
          <br />
          <div className="flex justify-between">
            <h3 className="text-[16px] font-[400] text-[#000000a4]">
              Total Price:
            </h3>
            <h5 className="text-[18px] font-[600] ">₹{orderData?.totalPrice}</h5>
          </div>
          <br />
         
        </div>
      </div>
     
    </div>
  );
};

export default Payment