import { useContext } from "react";

import Modal from "./UI/Modal.jsx";
import CartContext from "../Store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Button from "./UI/Button.jsx";
import { UserProgressContext } from "../Store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

function Cart() {
   const { items, addItem, removeItem } = useContext(CartContext);
   const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

   const cartTotal = items.reduce((totalPrice, item) => {
      return totalPrice + item.quantity * item.price;
   }, 0);

   const handleGoToCheckout = () => {
      showCheckout();
   };

   return (
      <Modal className="cart" open={progress === "cart"} onClose={progress === "cart" ? hideCart : null}>
         <h2>Your Cart</h2>
         <ul>
            {items.map((item) => (
               <CartItem
                  onIncrease={() => addItem(item)}
                  onDecrease={() => removeItem(item.id)}
                  key={item.id}
                  {...item}
               />
            ))}
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
               <Button onClick={hideCart} textOnly>
                  Close
               </Button>
               {items.length > 0 && <Button onClick={handleGoToCheckout}>Go to Checkout</Button>}
            </p>
         </ul>
      </Modal>
   );
}

export default Cart;
