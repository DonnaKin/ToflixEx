import { get } from '@/api'

export default {
    GetContentItems(): Promise<CommonResponse<Array<Content>>> {
        return get<CommonResponse<Array<Content>>>({
            url: '/netflix/api/content/items'
        })
    }
}