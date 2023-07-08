import axios from "axios";

export default {
    sendConfirmationCode(email) {
        return axios.post('/send_code', { email });
    },

    signUp(userName, email, password, confirmPassword) {
        return axios.post('/registration', {
            userName,
            email,
            password,
            confirmPassword,
        });
    },
}