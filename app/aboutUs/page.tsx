import React from 'react';
import AboutUs from '../components/About us/AboutUs';
import S_Banner from '../components/SharedBanner/S_Banner';

const page = () => {
    return (
        <div>
           <S_Banner title="About Us"></S_Banner>
            <AboutUs></AboutUs>
        </div>
    );
};

export default page;