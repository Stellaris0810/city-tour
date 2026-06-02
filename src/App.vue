<script setup>
//引入RouterView來使用
import {RouterView, RouterLink} from 'vue-router';
</script>

<template>

  <!-- <a href="/" title="回首頁">回首頁(a標籤版)</a>-->
  <!-- <a href="/news" title="前往最新消息頁">前往最新消息頁(a標籤版)</a>  -->


  <!-- 在 vue 中換頁則是使用 RouterLink 來切換JS頁面 -->
  <!-- 對外網站連結則不能使用 RouterLink  -->
  <!-- RouterLink 的路徑寫在 to -->
  <!-- <RouterLink to="/" title="回首頁">
  回首頁(RouterLink版)
  </RouterLink>

  <RouterLink to="/news" title="前往最新消息頁">
  前往最新消息頁(RouterLink版)
  </RouterLink>

  <RouterLink to="/products/1" title="前往商品頁">
  前往最新商品頁
  </RouterLink>

  <RouterLink to="/user/9527" title="前往員工識別介面">
  前往員工識別介面
  </RouterLink>

  <RouterLink to="/search" title="前往查詢參數">
  查詢參數
  </RouterLink> -->
  <!-- RouterView讓這裡成為所有頁面的入口 -->
  <RouterView></RouterView>
</template>

<style scoped></style>
