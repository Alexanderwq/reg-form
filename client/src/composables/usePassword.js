import {computed, ref} from "vue";

export default function usePassword() {
    const password = ref('')
    const passwordIsEmpty = computed(() => password.value.length === 0)

    function setPassword(value) {
        password.value = value
    }

    return {
        password,
        passwordIsEmpty,
        setPassword,
    }
}