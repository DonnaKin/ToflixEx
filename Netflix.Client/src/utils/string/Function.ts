import { ref } from "vue";

function AllTrim(text: string) {
    const result = ref<string>('');
    
    result.value = text.split(" ").join("");

    return result.value;
}

export { AllTrim }