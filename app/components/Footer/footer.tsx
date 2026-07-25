import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SiVisa } from 'react-icons/si';
import { FaCcPaypal, FaStripe, FaYoutube } from 'react-icons/fa6';
import { FaFacebookSquare } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';
import { IoLogoInstagram } from 'react-icons/io';
const Footer = () => {
    return (
        <div className='bg-[#fafafa] '>
            <div className='max-w-322.5  mx-auto  grid grid-cols-1 md:grid-cols-2 md:pl-20 lg:pl-4 xl:pl-0 lg:grid-cols-4 md:gap-14 lg:gap-4 xl:gap-24 xl:pt-21 lg:mb-16 xl:mb-23 '>
                {/* 1st div */}
                <div className='ml-4 mb-10 md:mb-0 md:ml-0'>
                     <Link href={'/'}>
                     <Image
                                src="/images/color logo.png"
                                alt="Green Nest Logo"
                                width={100}
                                height={40}
                                priority
                              /></Link>
                   <p className='text-[16px] font-normal text-[#8E98A0] mb-1'>Phone: (+63) 555 1212</p>
                   <p className='text-[16px] font-normal text-[#8E98A0] mb-5'>Fax: (+63) 555 0100</p>
                   <p className='text-[16px] font-normal text-[#8E98A0] mb-5'>Email: info@mail.com</p>
                   <p className='text-[16px] font-normal text-[#8E98A0] mb-1'>Address: 304 North Cardinal St.</p>
                   <p className='text-[16px] font-normal text-[#8E98A0]'>Dorchester Center, MA 02124</p>
                </div>

                {/* 2nd div */}
                <div className='ml-4 mb-8 md:mb-0 md:ml-0 md:mt-6'>
                    <h1 className='text-[20px] text-[#192C27] font-bold mb-7'>Main Menu</h1>
                    <p className='mb-2'><Link href={'/'} className='text-[16px] font-normal text-[#8E98A0]  '>Home</Link></p>
                    <p className='mb-2'> <Link href={'/'} className='text-[16px] font-normal text-[#8E98A0]  '>Products</Link></p>
                    <p className='mb-2'><Link href={'/'} className='text-[16px] font-normal text-[#8E98A0] '>About us</Link></p>
                    <p className='mb-2'><Link href={'/'} className='text-[16px] font-normal text-[#8E98A0]  '>Blog</Link></p>
                    <p className='mb-2'> <Link href={'/'} className='text-[16px] font-normal text-[#8E98A0]'>Contact</Link></p>
                    <p className='mb-2'><Link href={'/'} className='text-[16px] font-normal text-[#8E98A0]  '>Terms & Conditions</Link></p>
                </div>
                


                {/* 3rd div */}
              <div className='ml-4 mb-8 md:mb-0 md:ml-0 lg:mt-6'>
                    <h1 className='text-[20px] text-[#192C27] font-bold mb-7'>Account</h1>
                    <p className='mb-2'><Link href={'#'} className='text-[16px] font-normal text-[#8E98A0] '>My Account</Link></p>
                    <p className='mb-2'><Link href={'#'} className='text-[16px] font-normal text-[#8E98A0] '>My Wishlist</Link></p>
                    <p className='mb-2'><Link href={'#'} className='text-[16px] font-normal text-[#8E98A0] '>My Cart</Link></p>
                    <p className='mb-2'><Link href={'#'} className='text-[16px] font-normal text-[#8E98A0] '>Sign In</Link></p>
                    <p className='mb-2'><Link href={'#'} className='text-[16px] font-normal text-[#8E98A0] '>Specials</Link></p>
                    <p className='mb-2'><Link href={'#'} className='text-[16px] font-normal text-[#8E98A0] '>Support Center</Link></p>
                </div>
                

                {/* 4th div */}
                 <div className='ml-4 md:ml-0 lg:mt-6'>
                    <h1 className='text-[20px] text-[#192C27] font-bold mb-7'>Shipping and Payments</h1>
                    <p className='mb-2'><Link href={'#'} className='text-[16px] font-normal text-[#8E98A0] '>Best Sellers</Link></p>
                    <p className='mb-2'><Link href={'#'} className='text-[16px] font-normal text-[#8E98A0] '>Manufacturers</Link></p>
                    <p className='mb-8 lg:mb-2'><Link href={'#'} className='text-[16px] font-normal text-[#8E98A0] '>Suppliers</Link></p>
                     <h1 className='text-[20px] text-[#192C27] font-bold mb-5'>Payment Methods</h1>
                     <div className='flex gap-5'>
                        <SiVisa  size={50} className='text-black'/>
                        <FaCcPaypal size={50} className='text-black' />
                        <FaStripe size={50} className='text-black' />
                     </div>
                </div>

            </div>
            <hr className='pb-11 max-w-322.5 mx-auto ' />

            <div className="max-w-322.5 mx-auto md:flex items-center justify-between pb-12.5 px-4 md:px-20 xl:px-0">
  <div>
    <h6 className="text-[#434F58] mb-2 text-[12px] md:text-[15px] font-normal">
      Copyright © 2025 Green Nest. All Rights Reserved.
    </h6>
  </div>

  <div className="flex gap-3 text-black">
    <Link href="#"><FaFacebookSquare size={20} /></Link>
    <Link href="#"><RiTwitterXFill size={20} /></Link>
    <Link href="#"><IoLogoInstagram size={20} /></Link>
    <Link href="#"><FaYoutube size={20} /></Link>
  </div>
</div>

        </div>
    );
};

export default Footer;