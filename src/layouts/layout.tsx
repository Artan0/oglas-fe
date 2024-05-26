import React, { ReactNode } from 'react';
import CustomHeader from '../components/CustomHeader';
import CustomFooter from '../components/CustomFooter';


interface CustomLayoutProps {
    children: ReactNode;
}

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
    return (
        <div>
            <CustomHeader />
            <>{children}</>
            <CustomFooter />
        </div>
    );
};

export default CustomLayout;
