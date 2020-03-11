<template>
  <div class="orderManage">
    <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px', color: '#fff'}">
      <a-calendar :fullscreen="false" @panelChange="onPanelChange" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onPanelChange (value, mode) {
      console.log('bi')
      console.log(value, mode)
    }
  }
}
</script>

<style lang='less' scoped>
.orderManage {
  .dataCard {
    width: 300px;
    height: 400px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
  }
}
</style>
