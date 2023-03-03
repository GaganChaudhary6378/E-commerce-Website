import "@/styles/globals.css";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import dynamic from "next/dynamic";
import React from "react";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
