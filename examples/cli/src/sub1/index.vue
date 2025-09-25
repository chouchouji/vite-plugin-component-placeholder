<template>
  <view>
    <view>
      <text>sub1</text>
      <test></test>
    </view>
  </view>
</template>

<script setup>
import test from "./test.vue";

defineOptions({
  componentPlaceholder: {
    test: "view",
  },
});
</script>
