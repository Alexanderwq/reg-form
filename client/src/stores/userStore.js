import { defineStore } from "pinia";
import api from "@/api/auth/api";

export const useUserStore = defineStore('user', {
    state: () => ({
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
        // setCode(value) {
        //     this.code = value;
        // },
        async sendConfirmationCode() {
            try {
                await api.sendConfirmationCode(this.email)
            } catch (e) {
                console.log(e)
            }
        },
        //
        // async signUp() {
        //     try {
        //         await api.signUp(this.userName, this.email, this.password, this.confirmPassword);
        //     } catch (e) {
        //     }
        // },
    },
})