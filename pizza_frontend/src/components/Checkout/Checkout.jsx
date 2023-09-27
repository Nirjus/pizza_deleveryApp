import React, { useEffect, useState } from "react";
import { State, Country } from "country-state-city";
import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const indianStates = State.getAllStates().filter(
    (state) => state.countryCode === "IN"
  );
  const cartItem = searchParams.get("item");
  const newItem = cart && cart.find((i) => i._id === cartItem);
  const selectedItem = [];
   selectedItem.push(newItem);
  let shipping = 0;
  let subTotalPrice = 0;
  let totalPrice = 0;
//   const submitHandler = () => {};
  if (newItem) {
    subTotalPrice = selectedItem[0].qty * selectedItem[0].price;
    shipping = parseFloat((subTotalPrice * 0.1).toFixed(2));
    totalPrice = shipping + subTotalPrice;
  } else {
    subTotalPrice = cart.reduce((acc, item) => acc + item.qty * item.price, 0);
    shipping = parseFloat((subTotalPrice * 0.1).toFixed(2));
    totalPrice = shipping + subTotalPrice;
  }

  const paymentHandler = () => {
  if(zipCode === null || city === "" || country === "" || state === ""){
    toast.error("Please chose your delevery address");
  }else{
   const shippingAddress = {
      country,
      state,
      city,
      zipCode
   };
   const orderData = {
      cartItem:newItem ? selectedItem : cart,
      totalPrice,
      subTotalPrice,
      shipping,
         shippingAddress,
         user,
   }
   // update our local storage
   localStorage.setItem("foodOrder",JSON.stringify(orderData));
    navigate("/payment");
  }
  }
  const savebutn = () => {
    toast.success("Your credentials are saved");
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className=" w-full min-h-screen h-auto bg-[#e2e2e2]">
      <div className=" text-center w-full 800px:w-[50%] mb-[-10px]">
        <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      </div>
      <div className="w-full flex flex-row max-800px:flex-col justify-center gap-4 mb-10">
        <form
          action=""
          className="w-full 800px:w-[50%] mt-7 p-4 flex flex-col justify-center items-center gap-2 bg-[#d4d4d4] rounded-md"
        >
          <div className=" flex flex-row gap-[80px] w-full max-800px:flex-col max-800px:gap-0">
            <div className=" w-full flex flex-col">
              <label htmlFor="name">Full name</label>
              <input
                type="text"
                placeholder="Name.."
                id="name"
                name="name"
                required
                value={user && user.name}
                className=" w-full outline-none h-10 rounded px-4"
              />
            </div>
            <div className=" w-full flex flex-col">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                placeholder="Address.."
                id="address"
                name="address"
                value={user && user.address}
                required
                className=" w-full outline-none h-10 rounded px-4 "
              />
            </div>
          </div>
          <div className=" flex flex-row gap-[80px] w-full max-800px:flex-col max-800px:gap-0">
            <div className=" w-full flex flex-col relative">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email.."
                id="email"
                name="email"
                value={user && user.email}
                required
                className=" w-full outline-none h-10 rounded px-4"
              />
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="number">Phone Number</label>
              <input
                type="text"
                placeholder="Phone Number.."
                id="number"
                name="phone"
                value={user && user.phone}
                required
                className=" w-full outline-none h-10 rounded px-4 "
              />
            </div>
          </div>
          <div className=" flex flex-row gap-[80px] w-full max-800px:flex-col max-800px:gap-0">
            <div className=" w-full flex flex-col relative">
              <label htmlFor="country">Country</label>
              <select
                name="country"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className=" w-full outline-none h-10 rounded px-4"
              >
                <option value="">--Select country--</option>
                {Country &&
                  Country.getAllCountries().map((i) => (
                    <option value={i.isoCode} key={i.isoCode}>
                      {i.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="number"
                placeholder="Zip code.."
                id="zipCode"
                name="zipCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className=" w-full outline-none h-10 rounded px-4 "
              />
            </div>
          </div>
          <div className=" flex flex-row gap-[80px] w-full max-800px:flex-col max-800px:gap-0">
            <div className=" w-full flex flex-col relative">
              <label htmlFor="state">State</label>
              <select
                name="state"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className=" w-full outline-none h-10 rounded px-4"
              >
                <option value="">--Select State--</option>
                {indianStates.map((i) => (
                  <option value={i.isoCode} key={i.isoCode}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
            <div className=" w-full flex flex-col">
              <label htmlFor="city">City</label>
              <input
                type="text"
                placeholder="City.."
                id="city"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className=" w-full outline-none h-10 rounded px-4 "
              />
            </div>
          </div>
          <button
            type="button"
            className=" w-full border border-black h-[34px] 800px:mt-10 bg-[#ebebeb] transition-all duration-300 hover:bg-[#bbbbbb] active:bg-[#727272]"
            onClick={() => savebutn()}
          >
            Save
          </button>
        </form>
        <div className=" mt-7 p-4 w-full 800px:w-[30%] bg-[#d4d4d4] relative rounded-md">
          <div className="flex justify-between">
            <h3 className="text-[16px] font-[400] text-[#000000a4]">
              subtotal:
            </h3>
            <h5 className="text-[18px] font-[600]">₹{subTotalPrice}</h5>
          </div>
          <br />
          <div className="flex justify-between">
            <h3 className="text-[16px] font-[400] text-[#000000a4]">
              Delevery charge:
            </h3>
            <h5 className="text-[18px] font-[600]">₹{shipping}</h5>
          </div>
          <br />
          <div className="flex justify-between">
            <h3 className="text-[16px] font-[400] text-[#000000a4]">
              Total Price:
            </h3>
            <h5 className="text-[18px] font-[600] ">₹{totalPrice}</h5>
          </div>
          <br />
          <Link to={"/orders"}>
            <button className=" absolute w-[90%] top-[87%] max-800px:top-[80%] right-6 border border-[#2b2b2b] bg-[#f4f4f4] h-[34px] transition-all duration-300 hover:bg-[#bbbbbb] active:bg-[#727272]">
              Back to Cart
            </button>
          </Link>
        </div>
      </div>
      <div className=" mt-[60px] p-4 w-full flex justify-center">
        <button className=" 800px:w-[40%] w-[90%] border border-[#ff7717] bg-[#ffd000] text-white font-semibold text-[20px] h-[45px] transition-all duration-300 hover:bg-[#ffe65b] active:bg-[#ff662a] rounded-[30px]"
        onClick={() => paymentHandler()}
        >
          Payment now
        </button>
      </div>
    </div>
  );
};

export default Checkout;
