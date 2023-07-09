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

    getters: {
        showOptionsPanel() {
            return !this.emailIsDisabled ||
                !this.userNameIsDisabled ||
                !this.passwordIsDisabled ||
                !this.confirmPasswordIsDisabled
        },
    },

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

        disableFields() {
            this.setUserNameIsDisabled(true)
            this.setEmailIsDisabled(true)
            this.setPasswordIsDisabled(true)
            this.setConfirmPasswordIsDisabled(true)
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

        async getProfile() {
            const userStore = useUserStore()
            const res = await api.getProfile()
            userStore.setEmail(res.data.email)
            userStore.setUserName(res.data.userName)
        },

        async resetProfile() {
            const userStore = useUserStore()

            this.disableFields()
            userStore.resetUserData()
            await this.getProfile()
        }
    },
})