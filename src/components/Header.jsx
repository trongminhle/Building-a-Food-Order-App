import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button.jsx";
import CartContext from "../Store/CartContext.jsx";
import { UserProgressContext } from "../Store/UserProgressContext.jsx";

function Header() {
   const { items } = useContext(CartContext);
   const { showCart } = useContext(UserProgressContext);

   const totalCartItem = items.reduce((total, item) => {
      return total + item.quantity;
   }, 0);

   return (
      <header id="main-header">
         <div id="title">
            <img src={logoImg} />
            <h1>ReactFood</h1>
         </div>
         <nav>
            <Button onClick={showCart} textOnly>
               Cart ({totalCartItem})
            </Button>
         </nav>
      </header>
   );
}

export default Header;
