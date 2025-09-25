<template>
  <view class="content">
    <wd-button>主要按钮</wd-button>
    <wd-button type="success" @click="goToSub1">前往分包 sub1</wd-button>
    <wd-button type="info" @click="goToSub2">前往分包 sub2</wd-button>
    <wd-button type="warning">警告按钮</wd-button>
    <wd-button type="error">危险按钮</wd-button>
  </view>
</template>

<script setup lang="ts">
function goToSub1() {
  uni.navigateTo({
    url: '/sub1/index',
  })
}

function goToSub2() {
  uni.navigateTo({
    url: '/sub2/index',
  })
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
