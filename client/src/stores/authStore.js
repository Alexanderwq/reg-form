import {defineStore} from "pinia";
import api from "@/api/auth/api";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        email: '',
        userName: '',
        password: '',
        confirmPassword: '',
        code: '',
    }),

    getters: {
        userNameIsEmpty() {
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
            return this.confirmPassword === this.password
        },
        codeIsEmpty() {
            return this.code.length === 0
        },
    },

    actions: {
        signIn() {
            return api.signIn(this.email, this.password)
        },
        sendConfirmationCode() {
            return api.sendConfirmationCode(this.email)
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
        setCode(value) {
            this.code = value
        },
    },
})
