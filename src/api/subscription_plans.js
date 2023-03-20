import axios from 'axios'
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query"

const API = import.meta.env.VITE_APP_API
/** ================================================================
 * ========================     KEYS     ===========================
 * ==============================================================**/

const basePlansKey = 'plans'
const plansKey = [basePlansKey]
const currentPlan = ['plans', 'plan']
const planByIdKey = (planId) => [
    basePlansKey,
    'byId',
    planId,
]

const plansListKey = [
    basePlansKey,
    'list',
]

/** ================================================================
 * ========================    QUERIES    ==========================
 * ==============================================================**/

export function useGetPlansQuery(isEnabled = false){
    return useQuery(plansListKey, () => axios.get(API + '/v1/subscription_plans'), {
        onSuccess: (res) => {
            return res.data
        }, enabled: isEnabled
    })
}

export function usePostPlanMutation(){
    const queryClient = useQueryClient()
    return useMutation((plan) => axios.post(API + '/v1/subscription_plans', plan), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: plansListKey })
        }
    })
}

export function useDeletePlanMutation(){
    const queryClient = useQueryClient()
    return useMutation((id) => axios.delete(API + '/v1/subscription_plans/' + id), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: plansListKey })
        }
    })
}