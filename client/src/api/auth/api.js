import axios from "axios";
import useCookie from "@/composables/useCookie";

const { getCookie } = useCookie()

export default {
    async sendConfirmationCode(email) {
        return (await axios.post('/send_code', { email })).data;
    },

    async signUp(userName, email, password, confirmPassword, code) {
        return (await axios.post('/registration', {
            userName,
            email,
            password,
            confirmPassword,
            confirmCode: code
        })).data;
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
    },

    getProfile() {
        return axios.get('/get_user_profile', {
            headers: {
                'authorization': getCookie('token'),
            }
        })
    },

    getAuthStatus() {
        return axios.get('/get_auth_status', {
            headers: {
                'authorization': getCookie('token'),
            }
        })
    }
}