<template>
	<van-address-list
  v-model="chosenAddressId"
  :list="list"
  disabled-text="以下地址超出配送范围"
  default-tag-text="默认"
  @add="onAdd"
  @edit="onEdit"
/>
</template>

<script>
export default {
	data() {
    return {
      chosenAddressId: '1',
      list: [
        {
          id: '1',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
        },
        {
          id: '2',
          address: '浙江省杭州市拱墅区莫干山路 50 号'
        }
      ]
    }
	},
	methods: {
    onAdd() {
      Toast('新增地址');
    },
    onEdit(item, index) {
      Toast('编辑地址:' + index);
    }
  }
}
</script>

<style lang="less" scoped>
.van-address-list__disabled-text {
	display: none;
}
.van-address-item__name {
	display: none;
}
.van-address-list__add {
	background: #3867d6;
	border: none;
}
</style>