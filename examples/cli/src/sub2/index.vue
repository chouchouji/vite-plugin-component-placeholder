<template>
  <view>
    <view>
      <text>sub2</text>
      <test></test>
    </view>
  </view>
</template>

<script setup>
import test from "../sub1/test.vue";

defineOptions({
  componentPlaceholder: {
    test: "view",
  },
});
</script>
