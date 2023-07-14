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

    async signIn(email, password) {
        return (await axios.post('/login', {
            email,
            password,
        })).data;
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

    async getProfile() {
        return (await axios.get('/get_user_profile', {
            headers: {
                'authorization': getCookie('token'),
            }
        })).data
    },

    getAuthStatus() {
        return axios.get('/get_auth_status', {
            headers: {
                'authorization': getCookie('token'),
            }
        })
    }
}