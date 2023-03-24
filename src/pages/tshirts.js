import React from "react";
import Link from "next/link";
import Product from "../../models/Product";
import mongoose from "mongoose";
import connectDb from "../../middleware/mongoose";
export default function tshirts({ products }) {
  return (
    <div className="md:ml-12 ">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {products.map((item) => {
              return (
            <Link key={item._id}
                passHref={true}
              href={`/products/${item.slug}`}
              className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-7"
            >
              <div>
                <a className="block relative  rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="flex content-center items-center h-[33vh] w-[36vh] md:h-[36vh] md:block"
                    src={item.img}
                  />
                </a>
                <div className="flex justify-center items-center mt-4 flex-col md:mt-4 md:flex md:justify-start md:items-start">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    T-shirts
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {item.title}
                  </h2>
                  <p className="mt-1">{item.price}</p>
                  <p className="mt-1">S,M,L,XL,XXL</p>
                </div>
              </div>
            </Link>)})}
          </div>
        </div>
      </section>
    </div>
  );
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({category:"Tshirts"});
  return {
    props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
  };
}
