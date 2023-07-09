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