import {defineStore} from "pinia";

export const useAlertStore = defineStore('alert', {
    state: () => ({
        text: '',
        visibleAlert: false,
    }),

    actions: {
        setVisibleAlert(value) {
            this.visibleAlert = value
        },
        setText(value) {
            this.text = value
        },
        showAlert(text) {
            this.setText(text)
            this.setVisibleAlert(true)
        },
    },
})
