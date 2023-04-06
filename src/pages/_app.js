import "@/styles/globals.css";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import dynamic from "next/dynamic";
import React from "react";
import LoadingBar from 'react-top-loading-bar'



const App = ({ Component, pageProps }) => {
  const [cart, setCart] = React.useState({});
  const [subTotal, setSubTotal] = React.useState(0);
  const [user,setUser]=React.useState({value:null})
  const [key,setKey]=React.useState(0)
  const router=useRouter();
  const [progress, setProgress] = React.useState(0)

  //routerChangeComplete
  // in next line means in useEffect hum kya kar rahe hain ki jab bhi router change hoga top loading bar chal jayega
 
  React.useEffect(() => {
    router.events.on('routerChangeStart',()=> {
      setProgress(40)
      //isse starting mein 40 rahega fir baad mein 100 ho jayega
    })
    router.events.on('routeChangeComplete',()=> {
      setProgress(100)
    })
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart"))) // so that the cart subtotal will update each time when we reload the site and it will not set it to 0 again 
      }
    } catch (error) {
      console.log(error)
      localStorage.clear()
    }
    const token=localStorage.getItem('token')
    if(token){
      setUser({value:token})
      setKey(Math.random())
    }
  }, [router.query]);
  
  function logout(){
    localStorage.removeItem('token')
    setUser({value: null})
    setKey(Math.random)
    router.push('/')
  }
  function saveCart(myCart) {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt=0;
    let keys= Object.keys(myCart);
    for(let i=0;i<keys.length;i++){
      subt+=myCart[keys[i]].price* myCart[keys[i]].qty;
    }setSubTotal(subt);
  }

  function addToCart(itemCode, qty, price, name, size, variant) {
    let newCart = cart;
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
  function buyNow(itemCode, qty, price, name, size, variant){
    let newCart = {itemcode : {qty: 1, price, name, size, variant }};
    saveCart({})
    setCart(newCart);
    saveCart(newCart);
    router.push('/checkout')
  }

  return (
    <>
    <LoadingBar
        color='#f11946'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar logout={logout} user={user} key={key} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}/>
      <Component buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
      <Footer />
    </>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
