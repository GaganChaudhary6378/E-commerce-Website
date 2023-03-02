import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart } from 'react-icons/ai';

export default function Navbar(){
    return (
        <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2">
            <div className="logo mx-5">
                <Image width={170} height={40} src="/logoName.png"></Image>
            </div>
            <div className="nav">
                <ul className="flex items-centre  md:-mt-2 gap-4 font-bold mt-4">
                    <Link href={'/'}><li>Tshirts</li></Link>
                    <Link href={'/'}><li>Hoodies</li></Link>
                    <Link href={'/'}><li>Stickers</li></Link>
                    <Link href={'/'}><li>Mugs</li></Link>
                </ul>
            </div>
            <div className="cart absolute right-0 top-2 mx-5 md:mt-2 font-bold">
                <AiOutlineShoppingCart className="text-xl md:text-2xl"/>
            </div>
        </div>
    )
}