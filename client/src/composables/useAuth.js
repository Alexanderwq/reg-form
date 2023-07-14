import api from "@/api/auth/api";

export default function useAuth() {
    function signIn(email, password) {
        return api.signIn(email, password)
    }

    return {
        signIn,
    }
}