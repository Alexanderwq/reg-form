import { defineStore } from "pinia";
import api from "@/api/auth/api";

export const useUserStore = defineStore('user', {
    state: () => ({
        authStatus: false,
        userName: '',
        password: '',
        email: '',
        confirmPassword: '',
        code: '',
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
        codeIsEmpty() {
            return this.code.length === 0
        },
        emailIsValid() {
            const regExp = new RegExp('[a-z0-9]+@[a-z]+\\.[a-z]{2,3}');
            return regExp.test(this.email)
        },
        passwordsMatch() {
            return this.password === this.confirmPassword
        },
    },

    actions: {
        setUserName(value) {
            this.userName = value;
        },
        setPassword(value) {
            this.password = value;
        },
        setEmail(value) {
            this.email = value;
        },
        setConfirmPassword(value) {
            this.confirmPassword = value;
        },
        setCode(value) {
            this.code = value;
        },

        resetUserData() {
            this.setUserName('')
            this.setEmail('')
            this.setPassword('')
            this.setConfirmPassword('')
            this.setCode('')
        },

        signUp() {
            return api.signUp(
                this.userName,
                this.email,
                this.password,
                this.confirmPassword,
                this.code
            );
        },

        async setAuthStatus() {
            try {
                const res = await api.getAuthStatus()
                this.authStatus = res.data.authorization
            } catch (e) {
                if (e.response?.status === 401) {
                    this.authStatus = false
                } else {
                    console.log(e)
                }
            }
        },
    },
})