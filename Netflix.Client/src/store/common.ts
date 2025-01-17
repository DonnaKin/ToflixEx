import { defineStore } from "pinia";
import { ref } from "vue";

export const CommonStore = defineStore('commonStore', () => {
/***********************************************************************************************************/
/*                                             S T A T E                                                   */
/***********************************************************************************************************/
    const isLoading = ref<boolean>(false);
    const searchText = ref<string>('');
    const searchType = ref<string>('')

/***********************************************************************************************************/
/*                                            A C T I O N                                                  */
/***********************************************************************************************************/
    function ChangeLoading() {
        isLoading.value = !isLoading.value
    }

/***********************************************************************************************************/
/*                                            G E T T E R                                                  */
/***********************************************************************************************************/


/***********************************************************************************************************/
/*                                            R E T U R N                                                  */
/***********************************************************************************************************/
    return { isLoading, searchType, searchText, ChangeLoading }

})