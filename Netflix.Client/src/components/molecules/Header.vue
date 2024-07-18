<template>
    <header id="header">
        <h1 id="logo">
            <a @click="GoHome">NETFLIX</a>
        </h1>
        <div class="left_nav">
            <ul>
                <li><a @click="GoHome">홈</a></li>
                <li><a @click="GoPage('serise')">시리즈</a></li>
                <li><a @click="GoPage('movie')">영화</a></li>
                <li><a @click="GoPage('favorite')">내가 찜한 리스트</a></li>
            </ul>
        </div>
        <div class="right_nav">
            <div class="search_box">
                <input type="text" id="search" placeholder="제목, 사람, 장르" autocomplete="off" v-model="searchVal" @keyup.enter="Search">
                <label for="search">
                    <span class="icon_search"></span>
                </label>
            </div>
            <div class="user_box">
                <span class="profile"><img src="/assets/image/img_profile.png" alt="프로필"></span>
                <div class="drop_menu">
                    <div class="link_box">
                        <a>로그아웃</a>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
/**********************************************************************************************************/
/*                                             I M P O R T                                                 */
/***********************************************************************************************************/
    import { ref } from 'vue';
    import { useRouter } from 'vue-router'
    import { CommonStore } from '@/store';
    import { AllTrim } from '@/utils/string/Function';
	
/***********************************************************************************************************/
/*                                               D A T A                                                   */
/***********************************************************************************************************/
    const searchVal = ref<string>('');
    const router = useRouter();
    const CommonState = CommonStore();

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
    function Search() {
        const trimSearchVal = ref<string>('');
        trimSearchVal.value = AllTrim(searchVal.value);

        if (trimSearchVal.value != '') {
            CommonState.searchText = searchVal.value;
            CommonState.searchType = "search";
            
            router.push({ name: 'search' })
        }
        else {
            alert("검색어를 입력해주세요.")
        }
    }

    function GoHome() {
        router.push({ name: 'home' })
    }

    function GoPage(type: string) {
        CommonState.searchType = type;
        router.push({ name: 'search' })
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
    }
</style>