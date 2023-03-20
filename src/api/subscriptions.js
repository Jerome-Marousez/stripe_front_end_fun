import axios from 'axios'
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query"

const API = import.meta.env.VITE_APP_API
/** ================================================================
 * ========================     KEYS     ===========================
 * ==============================================================**/

const baseSubscriptionsKey = 'subscriptions'
const subscriptionsKey = [baseSubscriptionsKey]
const currentSubscription = ['subscriptions', 'subscription']
const subscriptionByIdKey = (subscriptionId) => [
    baseSubscriptionsKey,
    'byId',
    subscriptionId,
]

const subscriptionsListKey = [
    baseSubscriptionsKey,
    'list',
]

/** ================================================================
 * ========================    QUERIES    ==========================
 * ==============================================================**/

export function useGetSubscriptionsQuery(isEnabled = false){
    return useQuery(subscriptionsListKey, () => axios.get(API + '/v1/subscriptions'), {
        onSuccess: (res) => {
            return res.data
        }, enabled: isEnabled
    })
}

export function usePostSubscriptionMutation(){
    const queryClient = useQueryClient()
    return useMutation((subscription) => axios.post(API + '/v1/subscriptions', subscription), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: subscriptionsListKey })
        }
    })
}

export function useDeleteSubscriptionMutation(){
    const queryClient = useQueryClient()
    return useMutation((id) => axios.delete(API + '/v1/subscriptions/' + id), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: subscriptionsListKey })
        }
    })
}