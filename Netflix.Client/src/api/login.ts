import { get, post } from '@/api'

export default {
    TryLogin(param: LoginParameter): Promise<CommonResponse<LoginInfo>> {
        return post<CommonResponse<LoginInfo>>({
            url: '/netflix/api/account/login',
            data: param
        })
    },

    TryCheck(): Promise<CommonResponse<LoginInfo>> {
        return get<CommonResponse<LoginInfo>>({
            url: '/netflix/api/account/check'
        })
    }
}