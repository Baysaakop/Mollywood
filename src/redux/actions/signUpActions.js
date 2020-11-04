import axios from 'axios';

export const signUpUser = (name, email, password) => {
    return function(dispatch) {
        dispatch(signUpUserStart());
        const data = {
            name, 
            email, 
            password
        };

        axios({ 
            method: 'POST',
            url: 'http://192.168.0.103:8000/api/v1/users/register',
            data: data
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    };
};

export const signUpUserStart = () => {
    return {
        type : "SIGNUP_USER_START"
    };
};

export const signUpUserSuccess = () => {
    return {
        type : "SIGNUP_USER_SUCCESS"
    };
};

export const signUpUserError = () => {
    return {
        type : "SIGNUP_USER_ERROR"
    };
};