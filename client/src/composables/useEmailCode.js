import {computed, ref} from "vue";

export default function useEmailCode() {
    const emailCode = ref('')

    const emailCodeIsEmpty = computed(() => code.value.length === 0)

    return {
        emailCode,
        emailCodeIsEmpty,
    }
}