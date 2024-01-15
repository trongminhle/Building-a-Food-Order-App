import { useContext } from "react";

import Modal from "./UI/Modal.jsx";
import CartContext from "../Store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Input from "./UI/Input.jsx";
import Button from "../components/UI/Button.jsx";
import { UserProgressContext } from "../Store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.js";

const requestConfig = {
   method: "POST",
   headers: {
      "Content-Type": "application/json",
   },
};

function Checkout() {
   const { progress, showCart, hideCheckout, clearCart } = useContext(UserProgressContext);
   const cartCtx = useContext(CartContext);
   const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
      return totalPrice + item.quantity * item.price;
   }, 0);

   const {
      data,
      isLoading: isSending,
      error,
      clearData,
      sendRequest,
   } = useHttp("http://localhost:3000/orders", requestConfig);

   const handleFinish = () => {
      hideCheckout();
      clearCart();
      clearData();
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const fd = new FormData(e.target);
      const dataForm = Object.fromEntries(fd.entries());

      sendRequest(
         JSON.stringify({
            order: {
               items: cartCtx.items,
               customer: dataForm,
            },
         })
      );

      fetch("http://localhost:3000/orders", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            order: {
               items: cartCtx.items,
               customer: dataForm,
            },
         }),
      });
   };

   let actions = (
      <>
         <Button onClick={showCart} type="button" textOnly>
            Close
         </Button>
         <Button>Submit Order</Button>
      </>
   );

   if (isSending) {
      actions = <span> Sending order data...</span>;
   }

   if (data && !error) {
      return (
         <Modal open={progress === "checkout"} onClose={hideCheckout}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully.</p>
            <p>We will get back to you with more details via email within the next few minutes.</p>
            <p className="modal-actions">
               <Button onClick={handleFinish}>Okay</Button>
            </p>
         </Modal>
      );
   }

   return (
      <Modal open={progress === "checkout"} onClose={progress === "checkout" ? hideCheckout : null}>
         <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

            <Input label="Full Name" type="text" id="name" />
            <Input label="E-Mail Address" type="email" id="email" />
            <Input label="Street" type="text" id="street" />

            <div className="control-row">
               <Input label="Postal Code" type="text" id="postal-code" />
               <Input label="City" type="text" id="city" />
            </div>

            {error && <Error title="Failed to submit order" message={error} />}

            <p className="modal-actions">{actions}</p>
         </form>
      </Modal>
   );
}

export default Checkout;
