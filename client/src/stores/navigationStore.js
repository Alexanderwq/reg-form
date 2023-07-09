import {defineStore} from "pinia";
import NavigationSections from "@/const/NavigationSections";

export const useNavigationStore = defineStore('navigation', {
    state: () => ({
        currentSection: NavigationSections.SIGN_UP,
    }),

    actions: {
        setSection(value) {
            this.currentSection = value
        },
    },
})
