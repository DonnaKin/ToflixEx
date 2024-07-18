<template>
     <div class="main_visual">
        <div class="img_box">
            <img src="/assets/image/img_visual.jpg" alt="기묘한 이야기">
        </div>
        <div class="text_box">
            <h2 class="title">기묘한 이야기</h2>
            <p class="desc">친구네 집에서 자신의 집으로 돌아가던 중 윌은 무언가 이상한 것을 보게 되고, 윌이 있는 곳에서 가까운 정부의 비밀 실험실에서는 끔찍한 일이 벌어진다.</p>
            <div class="btn_box">
                <button type="button" class=""></button>
            </div>
        </div>
    </div>

    <div class="contents_list_box" v-for="(contentList, index) in ContentListArr">
        <SliderContents :title="contentList.title" :contents="contentList.list" :idx="index" @SelectContent="SelectContent" />
    </div>

    <ModalBase :options="modalOptions" />
</template>

<script setup lang="ts">
/***********************************************************************************************************/
/*                                             I M P O R T                                                 */
/***********************************************************************************************************/
    import SliderContents from '@/components/molecules/Contents/SliderContents.vue';
    import { onMounted, reactive } from 'vue';
    import { AccountStore } from '@/store';
    import { ContentsStore } from '@/store';
    import ModalBase from '@/components/atoms/modal/ModalBase.vue';
    import DetailContent from '@/components/molecules/Contents/DetailContent.vue'

/***********************************************************************************************************/
/*                                               D A T A                                                   */
/***********************************************************************************************************/
    const accountState = AccountStore();

    const contents = reactive<Array<Content>>([]);
    const watchingContents = reactive<Array<Content>>([]);
    const recommendContents = reactive<Array<Content>>([]);
    const topContents = reactive<Array<Content>>([]);
    const favoriteContents = reactive<Array<Content>>([]);

    const myFavoriteList = reactive<Array<string>>([])
    const myWatchingList = reactive<Array<string>>([])

    const ContentListArr = reactive<Array<ContentList>>(
        [
            { title: '시청중인 컨텐츠', list: watchingContents },
            { title: '추천 컨텐츠', list: recommendContents },
            { title: '인기 컨텐츠', list: topContents },
            { title: '내가 찜한 컨텐츠', list: favoriteContents }
        ]
    )

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
    onMounted(async () => {
        const contentsState = ContentsStore();

        await contentsState.LoadData();

        Object.assign(contents, contentsState.contents);
        Object.assign(myFavoriteList, accountState.loginInfo.favoriteList);
        Object.assign(myWatchingList, accountState.loginInfo.watchingList);

        Object.assign(recommendContents, contents.filter((c: Content) => c.isRecommend ));
        Object.assign(topContents, contents.filter((c: Content) => c.isTop ));
        Object.assign(favoriteContents, contents.filter((c: Content) => myFavoriteList.includes(c.code)));
        Object.assign(watchingContents, contents.filter((c: Content) => myWatchingList.includes(c.code)));
    })

/***********************************************************************************************************/
/*                                             M E T H O D                                                 */
/***********************************************************************************************************/
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
</script>