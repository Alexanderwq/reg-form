import {computed, ref} from "vue";

export default function useEmail() {
    const email = ref('')

    const emailIsEmpty = computed(() => email.value.length === 0)
    const emailIsValid = computed(() => {
        const regExp = new RegExp('[a-z0-9]+@[a-z]+\\.[a-z]{2,3}');
        return regExp.test(email.value)
    })

    function setEmail(value) {
        email.value = value
    }

    return {
        email,
        emailIsEmpty,
        emailIsValid,
        setEmail,
    }
}