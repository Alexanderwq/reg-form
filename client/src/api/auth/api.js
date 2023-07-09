import axios from "axios";
import {getCookie} from "@/helpers/getCookie";

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

    updateProfile(userName, email, password, confirmPassword) {
        return axios.post('/update_user_profile', {
            userName,
            email,
            password,
            confirmPassword,
        },
        {
                headers: {
                    'authorization': getCookie('token'),
                }
            }
        )
    }
}