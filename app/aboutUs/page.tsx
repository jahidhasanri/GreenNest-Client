import React from 'react';
import AboutUs from '../components/About us/Inspiration';
import S_Banner from '../components/SharedBanner/S_Banner';
import Newsletter from '../components/NewsLatter/newslatter';
import OurTeam from '../components/About us/OurTeam';
import CounterSection from '../components/About us/CounterSection';



const page = () => {
    return (
        <div>
           <S_Banner title="About Us"></S_Banner>
            <AboutUs></AboutUs>
           <OurTeam></OurTeam>
           <CounterSection></CounterSection>
           <div className='bg-white py-10 md:py-16 lg:py-32'> <Newsletter></Newsletter></div>
        </div>
    );
};

export default page;