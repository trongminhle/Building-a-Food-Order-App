import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./Store/CartContext.jsx";
import UserProgressContextProvider from "./Store/UserProgressContext.jsx";

function App() {
   return (
      <UserProgressContextProvider>
         <CartContextProvider>
            <Header />
            <Meals />
            <Cart />
            <Checkout />
         </CartContextProvider>
      </UserProgressContextProvider>
   );
}

export default App;
