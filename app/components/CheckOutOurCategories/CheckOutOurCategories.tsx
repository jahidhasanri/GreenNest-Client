import React from 'react';
import Image from 'next/image';

const CheckOutOurCategories = () => {
    return (
        <div className='bg-white pb-20 lg:pb-31'>
            <div>
                <h5 className="text-[#5a8139] font-semibold text-[16px] md:text-[18px] text-center pt-16 xl:pt-28 mb-2 md:mb-6">Checkout our categories</h5>
                <h1 className='text-[32px] md:text-[40px] font-bold text-black text-center mb-13'>Plants by Styles</h1>
            </div>
            <div className='md:max-w-full lg:max-w-210 xl:max-w-322.5 px-2   mx-auto grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 justify-center gap-6'>
                {/* 1st div */}
                <div className='md:flex lg:grid gap-2 md:mx-16 lg:mx-0'>
                    <div className='relative bg-[#e9ede9] hover:bg-[#2e4e2a] transition-all duration-500 ease-in-out mb-4 md:mb-0 xl:mb-4.75 group'>
                    <Image
                    src='/images/office plants.webp'
                    alt=''
                    width={410}
                    height={270}></Image>
                    <div className="absolute  items-start  text-white -mt-24 ml-8">
                        <h3 className="text-2xl font-bold text-black   group-hover:text-white">Office plants</h3>
                         <h5 className="text-[16px] font-semibold mt-1 text-gray-600  group-hover:text-white">42 items</h5>
                    </div>
                    </div>

                    <div className='relative bg-[#e9ede9] hover:bg-[#2e4e2a] transition-all duration-500 ease-in-out group'>
                    <Image
                    src='/images/cafe plant.webp'
                    alt=''
                    width={410}
                    height={270}></Image>
                    <div className="absolute  items-start  text-white -mt-24 ml-8">
                        <h3 className="text-2xl font-bold text-black   group-hover:text-white">Cafe plants</h3>
                         <h5 className="text-[16px] font-semibold mt-1 text-gray-600  group-hover:text-white">38 items</h5>
                    </div>
                    </div>
                </div>

                {/* 2nd div */}
                <div className='relative md:mx-44 lg:mx-0 hover:bg-[#e9ede9] bg-[#2e4e2a]  transition-all duration-500 ease-in-out group'>
                  <Image
                    src='/images/home plants.webp'
                    alt=''
                    width={410}
                    height={570}></Image>
                    <div className="absolute  items-start  text-black -mt-24 ml-8">
                        <h3 className="text-2xl font-bold text-white   group-hover:text-black">Home plants</h3>
                         <h5 className="text-[16px] font-semibold mt-1 text-white  group-hover:text-black">50 items</h5>
                    </div>
                </div>

                {/* 3rd div */}
                <div className='md:flex lg:block gap-2 md:mx-16 lg:mx-0'>
                    <div className=' bg-[#e9ede9] hover:bg-[#2e4e2a] transition-all duration-500 ease-in-out mb-4 md:mb-0 xl:mb-7 group relative'>
                     <Image
                    src='/images/cactus plants.webp'
                    alt=''
                    width={410}
                    height={270}></Image>  
                    <div className="absolute  items-start  text-white -mt-24 ml-8">
                        <h3 className="text-2xl font-bold text-black   group-hover:text-white">Cactus</h3>
                         <h5 className="text-[16px] font-semibold mt-1 text-gray-600  group-hover:text-white">28 items</h5>
                    </div>
                    </div>

                    <div className='lg:hidden xl:block bg-[#e9ede9] hover:bg-[#2e4e2a] transition-all duration-500 ease-in-out group relative'>
                     <Image
                    src='/images/potted plants.webp'
                    alt=''
                    width={410}
                    height={270}></Image>
                    <div className="absolute  lg:hidden xl:grid items-start  text-white -mt-24 ml-8">
                        <h3 className="text-2xl font-bold text-black   group-hover:text-white">Potted plants</h3>
                         <h5 className="text-[16px] font-semibold mt-1 text-gray-600  group-hover:text-white">20 items</h5>
                    </div>
                    </div>
                </div>

                {/* 4th div */}
                 <div className='hidden lg:block xl:hidden bg-[#e9ede9] hover:bg-[#2e4e2a] transition-all duration-500 ease-in-out group relative'>
                     <Image
                    src='/images/potted plants.webp'
                    alt=''
                    width={410}
                    height={270}></Image>
                    <div className="absolute  hidden lg:block xl:hidden items-start  text-white -mt-24 ml-8">
                        <h3 className="text-2xl font-bold text-black   group-hover:text-white">Potted plants</h3>
                         <h5 className="text-[16px] font-semibold mt-1 text-gray-600  group-hover:text-white">20 items</h5>
                    </div>
                    </div>
            </div>
        </div>
    );
};

export default CheckOutOurCategories;