import axios from "axios";

export default {
    sendConfirmationCode(email) {
        return axios.post('/send_code', { email });
    },

    signUp(userName, email, password, confirmPassword, code) {
        return axios.post('/registration', {
            userName,
            email,
            password,
            confirmPassword,
            confirmCode: code
        });
    },

    signIn(email, password) {
        return axios.post('/login', {
            email,
            password,
        });
    },
}