<template>
    <div class="none_data_box" v-if="filterContents.length == 0">
        <div class="text">
            입력하신 검색어 ' <em class="keyword">{{ searchVal }}</em> '(와)과 일치하는 결과가 없습니다.
        </div>
    </div>
    
    <div class="contents_list_box" v-else>
        <h3 class="contents_title" v-show="searchType == 'search'">' <em class="keyword">{{ searchVal }}</em> '와 관련된 컨텐츠</h3>
        <div class="list_wrap type_list">
            <ul>
                <li class="item" v-for="content in filterContents">
                    <Content :content="content" @SelectContent="SelectContent" />
                </li>
            </ul>
        </div>
    </div>

    <ModalBase :options="modalOptions" />
</template>

<script lang="ts" setup>
/**********************************************************************************************************/
/*                                             I M P O R T                                                 */
/***********************************************************************************************************/
    import { onMounted, reactive, ref, watch } from 'vue';

    import Content from '@/components/atoms/Contents/Content.vue';
    import ModalBase from '@/components/atoms/modal/ModalBase.vue';
    import DetailContent from '@/components/molecules/Contents/DetailContent.vue'

    import { CommonStore } from '@/store';
    import { ContentsStore } from '@/store';
    import { AccountStore } from '@/store';
    import { storeToRefs } from 'pinia';

    import { useRouter } from 'vue-router'
    
    import { AllTrim } from '@/utils/string/Function';
	
/***********************************************************************************************************/
/*                                               D A T A                                                   */
/***********************************************************************************************************/
    const searchVal = ref<string>('');
    const contents = reactive<Array<Content>>([]);
    const filterContents = reactive<Array<Content>>([]);
    const { searchText, searchType } = storeToRefs(CommonStore())
    const { loginInfo } = storeToRefs(AccountStore())
    const router = useRouter();
    const modalOptions = reactive<ModalBaseOptions>(Object.create(null))

/***********************************************************************************************************/
/*                                            C O M P U T E D                                              */
/***********************************************************************************************************/


/***********************************************************************************************************/
/*                                              P R O P S                                                  */
/***********************************************************************************************************/


/***********************************************************************************************************/
/*                                           L I F E C Y C L E                                             */
/***********************************************************************************************************/
   onMounted(() => {
        const contentsState = ContentsStore();
        Object.assign(contents, contentsState.contents);

        FilterContents();
   })

/***********************************************************************************************************/
/*                                             M E T H O D                                                 */
/***********************************************************************************************************/
   function FilterContents() {
        searchVal.value = searchText.value;
        
        if (searchType.value == 'search' && searchVal.value != '') {
            filterContents.splice(0, filterContents.length, ...contents.filter((c: Content) => AllTrim(c.title).includes(AllTrim(searchVal.value))))
        }
        else if (searchType.value == 'serise') {
            filterContents.splice(0, filterContents.length, ...contents.filter((c: Content) => c.category == 'serise'))
        }
        else if (searchType.value == 'movie') {
            filterContents.splice(0, filterContents.length, ...contents.filter((c: Content) => c.category == 'movie'))
        }
        else if (searchType.value == 'favorite') {
            const myFavoriteList = reactive<Array<string>>([]);
            Object.assign(myFavoriteList, loginInfo.value.favoriteList);

            filterContents.splice(0, filterContents.length, ...contents.filter((c: Content) => myFavoriteList.includes(c.code)));
        }
        else {
            router.push({ name: 'home' })
        }
   }

   function SelectContent(content: Content) {
        modalOptions.isShow = true;
        modalOptions.component = DetailContent;
        modalOptions.props = {
            width : 950,
            height: 740,
            content: content
        }
        modalOptions.events = {
            CloseModal: () => {
                modalOptions.isShow = false;
            },
        }
    }

/***********************************************************************************************************/
/*                                               E M I T                                                   */
/***********************************************************************************************************/


/***********************************************************************************************************/
/*                                              W A T C H                                                  */
/***********************************************************************************************************/
   watch(searchText, () => {
        FilterContents();
   })

   watch(searchType, () => {
        FilterContents();
   })

</script>

<style scoped>
</style>