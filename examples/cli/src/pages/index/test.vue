<template>
  <view>
    <view v-for="item in list" :key="item.name">
      <slot :name="item.name" :data="item.value"></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
const list = [
  {
    name: 'top0',
    value: 1,
  },
  {
    name: 'top1',
    value: 2,
  },
]
</script>
