<template>
    <div class="login_wrap">
        <div class="form_group">
            <h2>LOGIN</h2>
            <form>
                <div class="form_floating">
                    <input type="text" id="id" class="form_input valid" :class="[isValidforUid ? 'error' : '']" v-model="uid" @blur="validUid">
                    <label for="id">이메일 주소 또는 휴대폰 번호</label>
                    <div class="error_message" v-show="isValidforUid">정확한 이메일 주소나 전화번호를 입력하세요.</div>
                </div>
                <div class="form_floating">
                    <input type="password" id="password" class="form_input" :class="[isValidforPassword ? 'error' : '']" v-model="password" @blur="validPassword" @keyup.enter="TryLogin">
                    <label for="password">비밀번호</label>
                    <div class="error_message" v-show="isValidforPassword">비밀번호는 4~60자 사이여야 합니다.</div>
                </div>
                <a class="btn btn_primary" @click="TryLogin">로그인</a>
                <div class="form_check">
                    <input type="checkbox" id="saveCheck">
                    <label for="saveCheck">로그인 정보 저장</label>
                </div>
            </form>

            <div id="loading" class="loginScoped" v-show="commonstate.isLoading" />
        </div>
    </div>
</template>

<script setup lang="ts">
/**********************************************************************************************************/
/*                                             I M P O R T                                                 */
/***********************************************************************************************************/
    import { reactive, ref } from 'vue'
    import { CommonStore } from '@/store';
    import { AccountStore } from '@/store/account'
    import { useRouter } from 'vue-router';
	
/***********************************************************************************************************/
/*                                               D A T A                                                   */
/***********************************************************************************************************/
    const uid = ref<string>('');
    const isValidforUid = ref<boolean>(false);
    const password = ref<string>('');
    const isValidforPassword = ref<boolean>(false);
    const commonstate = CommonStore();
    const accountState = AccountStore();
    const router = useRouter();

/***********************************************************************************************************/
/*                                            C O M P U T E D                                              */
/***********************************************************************************************************/


/***********************************************************************************************************/
/*                                              P R O P S                                                  */
/***********************************************************************************************************/


/***********************************************************************************************************/
/*                                           L I F E C Y C L E                                             */
/***********************************************************************************************************/


/***********************************************************************************************************/
/*                                             M E T H O D                                                 */
/***********************************************************************************************************/
    function validUid() {
        if (uid.value == '')
            isValidforUid.value = true
        else
            isValidforUid.value = false
    }

    function validPassword() {
        if (password.value == '')
            isValidforPassword.value = true
        else
            isValidforPassword.value = false
    }

    function TryLogin() {
        const loginParameter = reactive<LoginParameter>({
            uid: uid.value,
            password: password.value
        });

        accountState.TryLogin(loginParameter).then((res: boolean) => {
            if (res) {
                router.push({ name: 'home' })
            }
        });
    }

/***********************************************************************************************************/
/*                                               E M I T                                                   */
/***********************************************************************************************************/


/***********************************************************************************************************/
/*                                              W A T C H                                                  */
/***********************************************************************************************************/
</script>

<style scoped>
    a {
        cursor: pointer;
        text-align: center;
    }

    .loginScoped {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        background-color: rgba(0, 0, 0, 0.5) !important;
        display: flex;
        align-items: center !important;
        z-index: 9999 !important;
    }
</style>