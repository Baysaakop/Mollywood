import React from 'react';
import SignUpForm from '../components/SignUpForm';

const SignUp = (props) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '60vh' }}>
            <div style={{ width: '500px', background: '#f0f2f5', padding: '20px' }}>
                <h1>Бүртгүүлэх</h1>
                <SignUpForm />
            </div>
        </div>
    );
};

export default SignUp;