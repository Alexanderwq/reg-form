import { defineStore } from "pinia";
import api from "@/api/auth/api";
import {useUserStore} from "@/stores/userStore";

export const useProfileStore = defineStore('profile', {
    state: () => ({
        emailIsDisabled: true,
        userNameIsDisabled: true,
        passwordIsDisabled: true,
        confirmPasswordIsDisabled: true,
    }),

    actions: {
        setEmailIsDisabled(value) {
            this.emailIsDisabled = value;
        },
        setUserNameIsDisabled(value) {
            this.userNameIsDisabled = value;
        },
        setPasswordIsDisabled(value) {
            this.passwordIsDisabled = value;
        },
        setConfirmPasswordIsDisabled(value) {
            this.confirmPasswordIsDisabled = value;
        },

        updateProfile() {
            const userStore = useUserStore()

            return api.updateProfile(
                userStore.userName,
                userStore.email,
                userStore.password,
                userStore.confirmPassword
            )
        },
    },
})