import React from 'react';
import S_Banner from '../components/SharedBanner/S_Banner';
import OurServices from '../components/Services/OurServices';
import Plants from '../components/Services/plants';

const Services = () => {
    return (
        <div>
            <S_Banner title='Services'></S_Banner>
            <OurServices></OurServices>
            <Plants></Plants>
        </div>
    );
};

export default Services;