import React from 'react';
import S_Banner from '../components/SharedBanner/S_Banner';
import OurServices from '../components/Services/OurServices';
import Plants from '../components/Services/plants';
import Newsletter from '../components/NewsLatter/newslatter';
import VideoSection from '../components/Services/VideoSection';
import BeautifulNature from '../components/BeautifulNature';
import TesTimonial from '../components/Testimonial/TesTimonial';

const Services = () => {
    return (
        <div>
            <S_Banner title='Services'></S_Banner>
            <OurServices></OurServices>
            <Plants></Plants>
            <VideoSection></VideoSection>
            <BeautifulNature></BeautifulNature>
            <TesTimonial></TesTimonial>
            <div className='bg-white py-32'><Newsletter></Newsletter></div>
        </div>
    );
};

export default Services;