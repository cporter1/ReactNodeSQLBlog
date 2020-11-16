import app from '../config/axiosConfig.js'

const API_URL = 'http://10.0.0.164:3001/';

function login(email, password) {
    return app
        .post(API_URL + "users/login", {
            email,
            password
        })
        .then(response => {
            if(response.data) {
                sessionStorage.setItem("user", JSON.stringify(response.data));
            }
            
            return response;
        })
        .catch((err) => {
            console.log('Error: ', err);
        })
}

function logout() {
    localStorage.removeItem("user");
}

function register(username, email, password) {
    return app.post(API_URL + "users/createaccount", {
        username,
        email,
        password
    });
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}


export {login,logout,register,getCurrentUser};