<script setup>
import {
  useDeletePlanMutation,
  useGetPlansQuery,
  usePostPlanMutation
} from "./api/subscription_plans.js";
import { reactive } from "vue";
import {useGetUserByIdQuery} from "./api/members.js";
import {usePostSubscriptionMutation} from "./api/subscriptions.js";

const { data: plans } = useGetPlansQuery(true)
const { data: user } = useGetUserByIdQuery(28)
const { mutate } = usePostPlanMutation()
const { mutate: deletePlan } = useDeletePlanMutation()
const { mutate: subscribe } = usePostSubscriptionMutation()

const form = reactive({
  name: "",
  amount: 0,
})

const onSubmit = () => {
  const payload = {
    name: form.name,
    amount: form.amount,
  }
  mutate(payload)
}

const onDeletePlan = (id) => {
  deletePlan(id)
}

const onSubscribe = (plan) => {
  const payload = {
    product_id: plan.product_id,
    subscription_plan_id: plan.plan_id,
    member_id: user.value.data.member.id,
  }
  subscribe(payload)
}
</script>

<template>
  <div style="font-size: .75rem">
    <h3>USER</h3>
    <div v-if="user">
      <div>{{ user.data.member.username }}</div>
      <div>{{ user.data.member.id }}</div>
      <pre>{{ user.data.member }}</pre>
    </div>
    <h3>PLANS</h3>
    <div v-if="plans">
      <div v-for="plan in plans.data.subscription_plans" :key="plan.id" style="margin-bottom: 1rem">
        <div>id: {{ plan.id }}</div>
        <div>plan id: {{ plan.plan_id }}</div>
        <div>product: {{ plan.product_id }}</div>
        <div>price: {{ plan.price_id }}</div>
        <div>name: {{ plan.name }}</div>
        <div>price: {{ plan.amount / 100 }} {{ plan.currency?.toUpperCase() }} / {{ plan.interval }}</div>
        <button @click="onDeletePlan(plan.id)">delete</button>
        <button @click="onSubscribe(plan)">subscribe</button>
      </div>
    </div>
    <h3>CREATE NEW PLAN</h3>
    <form @submit.prevent="onSubmit">
      <input type="text" v-model="form.name">
      <input type="number" v-model="form.amount">
      <input type="submit">
    </form>
  </div>
</template>

<style lang="sass" scoped>

</style>
