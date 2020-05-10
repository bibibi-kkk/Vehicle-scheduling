<template>
	<div class="orderForm">
		<van-form @submit="onSubmit">
			<van-cell title="出发地" icon="location-o" />
			<van-field
				readonly
				clickable
				name="area"
				:value="area"
				label="地区选择"
				placeholder="点击选择省市区"
				:rules="[{ required: true, message: '请选择省市区' }]"
				@click="showArea = true"
			/>
			<van-popup v-model="showArea" position="bottom">
				<van-area
					:area-list="areaList"
					@confirm="confirmArea"
					@cancel="showArea = false"
				/>
			</van-popup>
			<van-field
				v-model="detailposition"
				name="address"
				label="详细地址"
				placeholder="详细地址"
				:rules="[{ required: true, message: '请填写详细地址' }]"
			/>
			<van-cell title="目的地" icon="location-o" />
			<van-field
				readonly
				clickable
				name="area2"
				:value="area2"
				label="地区选择"
				placeholder="点击选择省市区"
				:rules="[{ required: true, message: '请选择省市区' }]"
				@click="showArea2 = true"
			/>
			<van-popup v-model="showArea2" position="bottom">
				<van-area
					:area-list="areaList"
					@confirm="confirmArea2"
					@cancel="showArea = false"
				/>
			</van-popup>
			<van-field
				v-model="detailposition2"
				name="address2"
				label="详细地址"
				placeholder="目的地详细地址"
				:rules="[{ required: true, message: '请填写详细地址' }]"
			/>
			<div class="num">
				<div class="title">人数</div>
				<van-stepper v-model="num" />
			</div>
			<van-field
				v-model="tel"
				name="tel"
				label="联系方式"
				placeholder="联系方式"
				:rules="[{ required: true, message: '请填写联系方式' }]"
			/>
			<van-field
				readonly
				clickable
				name="date"
				:value="date"
				label="出行日期"
				placeholder="点击选择日期"
				:rules="[{ required: true, message: '请选择日期' }]"
				@click="showCalendar = true"
			/>
			<van-calendar v-model="showCalendar" @confirm="confirmdate" />
			<van-field
				readonly
				clickable
				name="time"
				:value="time"
				label="时间选择"
				placeholder="点击选择时间"
				@click="showPicker = true"
				:rules="[{ required: true, message: '请选择时间' }]"
			/>
			<van-popup v-model="showPicker" position="bottom">
				<van-datetime-picker
					type="time"
					@confirm="confirmTime"
					@cancel="showPicker = false"
				/>
			</van-popup>
			<div style="margin: 16px;">
				<van-button round block type="info" native-type="submit">
					提交
				</van-button>
		</div>
		</van-form>
	</div>
</template>

<script>
import { Dialog } from 'vant';
import areaList from '../../static/area'
export default {
	data() {
    return {
			type: '',
			area: '',
			area2: '',
			detailposition: '',
			detailposition2: '',
			num: 1,
			tel: '',
      showArea2: false,
      showArea: false,
			areaList: {}, // 数据格式见 Area 组件文档
			time: '',
			date: '',
      showPicker: false,
      showCalendar: false
    };
	},
	onLoad: function (option) {
			this.type = option.type
	},
	mounted () {
		this.areaList = areaList
	},
	methods: {
		// 确认省
		confirmArea(values) {
      this.area = values.map((item) => item.name).join(' ');
      this.showArea = false;
		},
		confirmArea2(values) {
      this.area2 = values.map((item) => item.name).join(' ');
      this.showArea2 = false;
		},
		// 确认时间
		confirmTime(time) {
      this.time = time;
      this.showPicker = false;
		},
		confirmdate (date) {
			let month = ''
			let day = ''
			if (date.getMonth() + 1 < 10) {
				month = `0${date.getMonth() + 1}`
			} else {
				month = date.getMonth() + 1
			}
			if (date.getDate() < 10) {
				day = `0${date.getDate()}`
			} else {
				day = date.getDate()
			}
			this.date = `${date.getFullYear()}-${month}-${day}`;
      this.showCalendar = false;
		},
		onSubmit(values) {
			let obj = {}
			obj.type = this.type
			obj.tel = values.tel
			obj.carryNum = this.num
			obj.applyUser = uni.getStorageSync('user_id')
			obj.departure = values.area + ' ' + values.address
			obj.destination = values.area2 + ' ' + values.address2
			obj.state = 0
			obj.departureTime = values.date + ' ' + values.time
			this.$axios.post('/order/add', {data:obj}).then(res => {
				if (res.data.code === 0) {
					Dialog.alert({
					message: '申请成功，请等待调度员审核',
				}).then(() => {
				});
				} else {
					Dialog.alert({
					message: '申请失败，请重试',
				}).then(() => {
					// on close
				});
				}
			})
      console.log(obj);
    },
  }
}
</script>

<style lang="less">
.orderForm {
	width: 100%;
	height: 100%;
	background: #fff;
	.van-picker {
    // position: absolute;
    // bottom: 0;
		width: 100%;
	}
	.area {
		position: absolute;
    bottom: 0;
    z-index: 1;
	}
	.item {
		padding: 20upx 0 20upx 50upx;
		.title {
			font-size: 26upx;
			color: rgb(109, 108, 109);
		}
		.input {
			margin: 0 20px;
			border-bottom: 1px solid rgb(228, 228, 228);
			display: flex;
			align-items: center;
			input {
				caret-color: transparent;
				margin-left: 10upx;
			}
		}
	}
	.num {
		display: flex;
		justify-content: space-between;
		padding: 10px 16px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
		.stepper {
			margin-right: 40upx;
			.van-stepper__input {
				background: #fff;
			}
		}
	}
}
</style>