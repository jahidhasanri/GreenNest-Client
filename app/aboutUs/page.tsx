import React from 'react';
import AboutUs from '../components/About us/Inspiration';
import S_Banner from '../components/SharedBanner/S_Banner';
import Newsletter from '../components/NewsLatter/newslatter';
import OurTeam from '../components/About us/OurTeam';



const page = () => {
    return (
        <div>
           <S_Banner title="About Us"></S_Banner>
            <AboutUs></AboutUs>
           <OurTeam></OurTeam>
           <div className='bg-white'> <Newsletter></Newsletter></div>
        </div>
    );
};

export default page;