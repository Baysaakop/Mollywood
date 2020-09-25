import React from 'react';
import SignInForm from '../components/SignInForm';

const SignIn = (props) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '60vh' }}>
            <div style={{ width: '500px', background: '#f0f2f5', padding: '20px' }}>
                <h1>Нэвтрэх</h1>
                <SignInForm />
            </div>
        </div>
    );
};

export default SignIn;