import React from 'react';
import Blogs from '../components/Blogs/blogs';
import S_Banner from '../components/SharedBanner/S_Banner';
import ContactInfo from '../components/Contact/ContactInfo';
import ContactSection from '../components/Contact/ContactSection';


const page = () => {
    return (
        <div>
            <S_Banner title="Contact Us"></S_Banner>
            <ContactInfo></ContactInfo>
            <ContactSection></ContactSection>
            <div className='bg-white'><Blogs></Blogs></div>
        </div>
    );
};

export default page;