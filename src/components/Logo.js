import React from 'react';
import Icon from '@ant-design/icons';

const LogoSvg = (props) => (
    <svg {...props} width="50" height="50" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="97.5" stroke="#FFFEFE" stroke-width="5"/>
        <circle cx="96.5" cy="40.5" r="22.5" fill="#FFFEFE"/>
        <circle cx="154.5" cy="82.5" r="22.5" fill="#FFFEFE"/>
        <circle cx="39.5" cy="82.5" r="22.5" fill="#FFFEFE"/>
        <circle cx="61.5" cy="150.5" r="22.5" fill="#FFFEFE"/>
        <circle cx="133.5" cy="150.5" r="22.5" fill="#FFFEFE"/>
        <circle cx="100" cy="102" r="6" fill="#FFFEFE"/>
        <circle cx="92" cy="113" r="4" fill="#FFFEFE"/>
        <circle cx="109" cy="112" r="4" fill="#FFFEFE"/>
        <circle cx="114" cy="96" r="4" fill="#FFFEFE"/>
        <circle cx="101" cy="87" r="4" fill="#FFFEFE"/>
        <circle cx="86" cy="97" r="4" fill="#FFFEFE"/>
    </svg>
);

const Logo = (props) => {
    
    return (
        <Icon component={LogoSvg} />
    );
};

export default Logo;