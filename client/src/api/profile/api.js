import axios from "axios";
import useCookie from "@/composables/useCookie";

const { getCookie } = useCookie()

export default {
    uploadProfilePhoto(file) {
        const formData = new FormData()
        formData.append('file', file)

        return axios.post('/upload_profile_photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': getCookie('token'),
            }
        })
    },
}