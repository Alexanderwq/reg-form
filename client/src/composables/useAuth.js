import api from "@/api/auth/api";

export default function useAuth() {
    function signIn(email, password) {
        return api.signIn(email, password)
    }

    function sendConfirmationCode(email) {
        return api.sendConfirmationCode(email)
    }

    return {
        signIn,
        sendConfirmationCode,
    }
}