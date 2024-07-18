<template>
    <ModalLayout>
        <template v-slot:content>
            <button type="button" class="btn_close" @click="emit('CloseModal')">닫기</button>
            <div class="preview_img_box">
                <img :src="imgSrc" :alt="content.title">
            </div>

            <div class="preview_info_box" >
                <h2 class="title">{{ content.title }}</h2>
                <button type="button" class="btn_heart" :class="[ isFavoriteContent ? 'active' : '' ]">찜</button>
                
                <div class="tag_box">
                    <img :src="limitAge" />

                    <!-- <img src="/assets/image/icon_top_10.png" alt="TOP10">
                    <img src="/assets/image/icon_age_all.png" alt="전체 관람가">
                    <img src="/assets/image/icon_age_12.png" alt="12세 관람가">
                    <img src="/assets/image/icon_age_15.png" alt="15세 관람가">
                    <img src="/assets/image/icon_age_19.png" alt="19세 관람가">
                    <img src="/assets/image/icon_tag_01.png" alt="폭력성">
                    <img src="/assets/image/icon_tag_02.png" alt="대사">
                    <img src="/assets/image/icon_tag_03.png" alt="모방위험">
                    <img src="/assets/image/icon_tag_04.png" alt="약물">
                    <img src="/assets/image/icon_tag_05.png" alt="주제">
                    <img src="/assets/image/icon_tag_06.png" alt="공포"> -->
                </div>
                <p class="desc">{{ content.description }}</p>
                <div class="detail">
                    <ul>
                        <li>
                            <span>출연 : </span>
                            위노나 라이더, 데이비드 하버, 밀리 바비 브라운, 핀 울프하드, 게이튼 마타라조, 케일럽 맥러플린, 노아 슈냅, 세이디 싱크, 너탈리아 다이어
                        </li>
                        <li>
                            <span>장르 : </span>
                            {{ content.genre }}
                        </li>
                        <li>
                            <span>시리즈 특징 : </span>
                            향수 자극, 불길한, 무서운
                        </li>
                        <li>
                            <span>감독 : </span>
                            더퍼형제
                        </li>
                    </ul>
                </div>
            </div>
        </template>
    </ModalLayout>
</template>

<script setup lang="ts">

/**********************************************************************************************************/
/*                                             I M P O R T                                                 */
/***********************************************************************************************************/
    import ModalLayout from '@/components/templates/ModalLayout.vue';
    import { computed, toRefs } from 'vue';
    import { AccountStore } from '@/store/account'
	
/***********************************************************************************************************/
/*                                               D A T A                                                   */
/***********************************************************************************************************/
    const accountState = AccountStore();


/***********************************************************************************************************/
/*                                            C O M P U T E D                                              */
/***********************************************************************************************************/
    const imgSrc = computed(() => {
        return `/assets/image/contentImages/${ content.value.category }/${ content.value.mainImg }`;
    })

    const limitAge = computed(() => {
        if (content.value.limitAge == 0)
            return '/assets/image/icon_age_all.png';
        else
            return `/assets/image/icon_age_${ content.value.limitAge }.png`;
    })

    const isFavoriteContent = computed(() => {
        return accountState.loginInfo.favoriteList.includes(content.value.code)
    })

/***********************************************************************************************************/
/*                                              P R O P S                                                  */
/***********************************************************************************************************/
    const props = withDefaults(defineProps<{ content: Content }>(), { content: Object.create(null) });
    const { content } = toRefs(props);

/***********************************************************************************************************/
/*                                           L I F E C Y C L E                                             */
/***********************************************************************************************************/


/***********************************************************************************************************/
/*                                             M E T H O D                                                 */
/***********************************************************************************************************/


/***********************************************************************************************************/
/*                                               E M I T                                                   */
/***********************************************************************************************************/
    const emit = defineEmits(['CloseModal'])

/***********************************************************************************************************/
/*                                              W A T C H                                                  */
/***********************************************************************************************************/


</script>

<style scoped>
</style>