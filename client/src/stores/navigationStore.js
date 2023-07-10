import {defineStore} from "pinia";
import LoginForm from "@/components/LoginForm.vue";
import ConfirmationForm from "@/components/ConfirmationForm.vue";
import ProfileSection from "@/components/ProfileSection/ProfileSection.vue";
import RegForm from "@/components/RegForm.vue";

export const useNavigationStore = defineStore('navigation', {
    state: () => ({
        currentSection: {},
    }),

    getters: {
        showNavigation() {
            return this.currentSection.name !== this.profileSection.name &&
                this.currentSection.name !== this.confirmationSection.name
        },
        regForm() {
            return {
                name: 'RegForm',
                component: RegForm,
            }
        },
        loginForm() {
            return {
                name: 'LoginForm',
                component: LoginForm,
            }
        },
        confirmationSection() {
            return {
                name: 'ConfirmationSection',
                component: ConfirmationForm,
            }
        },
        profileSection() {
            return {
                name: 'ProfileSection',
                component: ProfileSection,
            }
        },
        loginSectionIsActive() {
            return this.currentSection.name === this.loginForm.name
        },
        regSectionIsActive() {
            return this.currentSection.name === this.regForm.name
        }
    },

    actions: {
        setSection(value) {
            this.currentSection = value
        },
    },
})
