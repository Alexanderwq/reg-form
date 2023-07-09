import {defineStore} from "pinia";
import NavigationSections from "@/const/NavigationSections";

export const useNavigationStore = defineStore('navigation', {
    state: () => ({
        currentSection: NavigationSections.SIGN_IN,
    }),

    getters: {
        showNavigation() {
            return NavigationSections.CONFIRMATION !== this.currentSection &&
                NavigationSections.PROFILE !== this.currentSection
        },
    },

    actions: {
        setSection(value) {
            this.currentSection = value
        },
    },
})
