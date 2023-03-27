import "@/styles/globals.css";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import dynamic from "next/dynamic";
import React from "react";

const App = ({ Component, pageProps }) => {
  const [cart, setCart] = React.useState({});
  const [subTotal, setSubTotal] = React.useState(0);

  React.useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart"))) // so that the cart subtotal will update each time when we reload the site and it will not set it to 0 again 
      }
    } catch (error) {
      console.log(error)
      localStorage.clear()
    }
  }, []);
  
  function saveCart(myCart) {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt=0;
    let keys= Object.keys(myCart);
    for(let i=0;i<keys.length;i++){
      subt+=myCart[keys[i]].price* myCart[keys[i]].qty;
    }setSubTotal(subt);
  }

  function addToCart(itemCode, qty, price, name, size, variant) {
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }
    setCart(newCart);
    saveCart(newCart);
  }
  function clearCart() {
    setCart({}); // Its a request it will take some time to run
    saveCart({});
  }
  function removeFromCart(itemCode, qty, price, name, size, variant) {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }   
    setCart(newCart);
    saveCart(newCart);
  }

  return (
    <>
      <Navbar cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}/>
      <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
      <Footer />
    </>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
