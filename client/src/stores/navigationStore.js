import {defineStore} from "pinia";
import NavigationSections from "@/const/NavigationSections";

export const useNavigationStore = defineStore('navigation', {
    state: () => ({
        currentSection: NavigationSections.SIGN_IN,
    }),

    getters: {
        showNavigation() {
            return !this.showConfirmation
        },
        showRegForm() {
            return this.currentSection === NavigationSections.SIGN_UP
        },
        showLoginForm() {
            return this.currentSection === NavigationSections.SIGN_IN
        },
        showConfirmation() {
            return this.currentSection === NavigationSections.CONFIRMATION
        },
    },

    actions: {
        setSection(value) {
            this.currentSection = value
        },
    },
})
