/* eslint-disable react/prop-types */
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import emailjs from "@emailjs/browser";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(!open);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      "service_jrhwhij",
      "template_u3w9hko",
      e.target,
      "YWQox3-SqRsDgsXYm"
    );
  };

  return (
    <>
      <Button
        type="button"
        onClick={handleOpen}
        className=" playfair w-full px-4 py-3 text-center text-gray-100 bg-[#dd3333] border border-transparent dark:border-gray-700 hover:border-[#ff4444] hover:text-white hover:bg-[#ff4444] rounded-xl"
      >
        Confirm Order
      </Button>
      <Dialog open={open} handler={handleOpen} className=" bg-[#f9f9f9]">
        <DialogBody className="">
          <form onSubmit={sendEmail}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                value={addressInfo.name}
                onChange={(e) => {
                  setAddressInfo({
                    ...addressInfo,
                    name: e.target.value,
                  });
                }}
                placeholder="Enter Your Name"
                className="bg-[#f9f9f9] border border-[#dd3333] px-2 py-2 w-full rounded-md outline-none text-gray-800 placeholder-gray-500"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="address"
                value={addressInfo.address}
                onChange={(e) => {
                  setAddressInfo({
                    ...addressInfo,
                    address: e.target.value,
                  });
                }}
                placeholder="Enter Your Address"
                className="bg-[#f9f9f9] border border-[#dd3333] px-2 py-2 w-full rounded-md outline-none text-gray-800 placeholder-gray-500"
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="mobileNumber"
                value={addressInfo.mobileNumber}
                onChange={(e) => {
                  setAddressInfo({
                    ...addressInfo,
                    mobileNumber: e.target.value,
                  });
                }}
                placeholder="Enter Your Mobile Number"
                className="bg-[#f9f9f9] border border-[#dd3333] px-2 py-2 w-full rounded-md outline-none text-gray-800 placeholder-gray-500"
              />
            </div>

            <div className="">
              <Button
                type="submit"
                onClick={() => {
                  buyNowFunction();
                  dispatch(clearCart());
                  handleOpen();
                }}
                className="w-full px-4 py-3 text-center text-gray-100 bg-[#dd3333] hover:bg-[#ff4444] border border-transparent dark:border-gray-700 rounded-lg"
              >
                Buy Now
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default BuyNowModal;
