import { useContext } from "react";

import Modal from "./UI/Modal.jsx";
import CartContext from "../Store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Input from "./UI/Input.jsx";
import Button from "../components/UI/Button.jsx";
import { UserProgressContext } from "../Store/UserProgressContext.jsx";

function Checkout() {
   const { progress, showCart, hideCheckout } = useContext(UserProgressContext);
   const cartCtx = useContext(CartContext);
   const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
      return totalPrice + item.quantity * item.price;
   }, 0);

   const handleSubmit = async (e) => {
      e.preventDefault();

      const fd = new FormData(e.target);
      const dataForm = Object.fromEntries(fd.entries());

      const response = fetch("http://localhost:3000/orders", {
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

      console.log(response.ok);
   };

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

            <p className="modal-actions">
               <Button onClick={showCart} type="button" textOnly>
                  Close
               </Button>
               <Button>Submit Order</Button>
            </p>
         </form>
      </Modal>
   );
}

export default Checkout;
