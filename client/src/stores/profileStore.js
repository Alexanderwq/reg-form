import { defineStore } from "pinia";
import api from "@/api/auth/api";

export const useProfileStore = defineStore('profile', {
    state: () => ({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        emailIsDisabled: true,
        userNameIsDisabled: true,
        passwordIsDisabled: true,
        confirmPasswordIsDisabled: true,
        imgName: '',
    }),

    getters: {
        userNameIsEmpty(){
            return this.userName.length === 0
        },
        emailIsEmpty() {
            return this.email.length === 0
        },
        passwordIsEmpty() {
            return this.password.length === 0
        },
        confirmPasswordIsEmpty() {
            return this.confirmPassword.length === 0
        },
        emailIsValid() {
            const regExp = new RegExp('[a-z0-9]+@[a-z]+\\.[a-z]{2,3}');
            return regExp.test(this.email)
        },
        passwordsMatch() {
            return this.password === this.confirmPassword
        },
        showOptionsPanel() {
            return !this.emailIsDisabled ||
                !this.userNameIsDisabled ||
                !this.passwordIsDisabled ||
                !this.confirmPasswordIsDisabled
        },
    },

    actions: {
        setUserName(value) {
            this.userName = value
        },
        setEmail(value) {
            this.email = value
        },
        setPassword(value) {
            this.password = value
        },
        setConfirmPassword(value) {
            this.confirmPassword = value
        },
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
        setImg(value) {
            this.imgName = value;
        },

        disableFields() {
            this.setUserNameIsDisabled(true)
            this.setEmailIsDisabled(true)
            this.setPasswordIsDisabled(true)
            this.setConfirmPasswordIsDisabled(true)
        },

        updateProfile() {
            return api.updateProfile(
                this.userName,
                this.email,
                this.password,
                this.confirmPassword
            )
        },

        resetUserData() {
            this.setUserName('')
            this.setEmail('')
            this.setPassword('')
            this.setConfirmPassword('')
        },

        async getProfile() {
            const { email, userName, img } = await api.getProfile()
            this.setEmail(email)
            this.setUserName(userName)
            this.imgName = img
        },

        async resetProfile() {
            this.disableFields()
            this.resetUserData()
            await this.getProfile()
        }
    },
})