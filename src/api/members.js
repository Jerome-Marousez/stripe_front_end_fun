import axios from 'axios'
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query"

const API = import.meta.env.VITE_APP_API
/** ================================================================
 * ========================     KEYS     ===========================
 * ==============================================================**/

const baseUsersKey = 'users'
const usersKey = [baseUsersKey]
const currentUser = ['users', 'user']
const userByIdKey = (userId) => [
    baseUsersKey,
    'byId',
    userId,
]

const usersListKey = [
    baseUsersKey,
    'list',
]

/** ================================================================
 * ========================    QUERIES    ==========================
 * ==============================================================**/

export function useGetUsersQuery(isEnabled = false){
    return useQuery(usersListKey, () => axios.get(API + '/v1/members'), {
        onSuccess: (res) => {
            return res.data
        }, enabled: isEnabled
    })
}

export function useGetUserByIdQuery(id){
    return useQuery(userByIdKey(id), () => axios.get(API + '/v1/members/' + id), {
        onSuccess: (res) => {
            return res.data
        }
    })
}

export function usePostUserMutation(){
    const queryClient = useQueryClient()
    return useMutation((user) => axios.post(API + '/v1/members', user), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: usersListKey })
        }
    })
}

export function useDeleteUserMutation(){
    const queryClient = useQueryClient()
    return useMutation((id) => axios.delete(API + '/v1/members/' + id), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: usersListKey })
        }
    })
}