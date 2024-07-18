import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
import api from '@/api/login'
import { CommonStore } from ".";

export const AccountStore = defineStore('accountStore', () => {
/***********************************************************************************************************/
/*                                             S T A T E                                                   */
/***********************************************************************************************************/
    const loginInfo = reactive<LoginInfo>(Object.create(null));

/***********************************************************************************************************/
/*                                            A C T I O N                                                  */
/***********************************************************************************************************/
    async function TryLogin(loginParameter: LoginParameter): Promise<boolean> {
        const CommonState = CommonStore();

        const result = ref<boolean>(false);
        CommonState.ChangeLoading();

        await api.TryLogin(loginParameter).then((res: CommonResponse<LoginInfo>) => {
            if (res && res.errorCode == "0000") {
                Object.assign(loginInfo, res.data);
                console.log("@@stroe@ ", loginInfo)
                result.value = true;
            }
            else {
                alert(res.errorMessage);
            }
        })
        .catch((error: Error) => {
            console.log("%cError Name : %s", "background: red;", error.name);
            console.log("%cError Stack : %s", "background: red;", error.stack);
            console.log("%cError Message : %s", "background: red;", error.message);
        })
        .finally(() => {
            CommonState.ChangeLoading()
        })

        return result.value;
    }

    async function TryCheck(): Promise<boolean> {
        const result = ref<boolean>(false);

        await api.TryCheck().then((res: CommonResponse<LoginInfo>) => {
            Object.assign(loginInfo, res.data);
            result.value = true;
        })
        .catch((error: Error) => {
            console.log("%cError Name : %s", "background: red;", error.name);
            console.log("%cError Stack : %s", "background: red;", error.stack);
            console.log("%cError Message : %s", "background: red;", error.message);
        })

        return result.value;
    }

/***********************************************************************************************************/
/*                                            G E T T E R                                                  */
/***********************************************************************************************************/


/***********************************************************************************************************/
/*                                            R E T U R N                                                  */
/***********************************************************************************************************/
    return { loginInfo, TryLogin, TryCheck }

})