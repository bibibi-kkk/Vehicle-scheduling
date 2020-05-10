<template>
  <a-modal title="审批处理" :visible="visible" @cancel="close" closable class="modal"
      @ok="handleSubmit"
      okText='提交'
      cancelText='取消'>
    <a-descriptions title="订单" bordered :column="2">
      <a-descriptions-item label="申请人">{{data.applyUser}}</a-descriptions-item>
      <a-descriptions-item label="出发时间">{{data.departureTime}}</a-descriptions-item>
      <a-descriptions-item label="出发地">{{data.departure}}</a-descriptions-item>
      <a-descriptions-item label="目的地">{{data.destination}}</a-descriptions-item>
    </a-descriptions>
      <a-form :form="form">
        <a-row :gutter="12">
          <a-col :span="8">
          <a-form-item label="司机">
            <a-select
              v-decorator="[
                'driver',
                { rules: [{ required: true, message: '请选择司机' }] },
              ]"
            >
              <a-select-option :value="item.id" v-for="(item, index) in driver" :key="index">
                {{item.nickname}}
              </a-select-option>
            </a-select>
          </a-form-item>
          </a-col>
          <a-col :span="8">
          <a-form-item label="车辆">
            <a-select
              v-decorator="[
                'car',
                { rules: [{ required: true, message: '请选择车辆' }] },
              ]"
            >
              <a-select-option :value="item.id" v-for="(item, index) in car" :key="index">
                {{item.carId}}
              </a-select-option>
            </a-select>
          </a-form-item>
          </a-col>
        </a-row>
      </a-form>
  </a-modal>
</template>

<script>
import moment from 'moment'
export default {
  props: ['visible', 'data'],
  data () {
    return {
      car: [],
      driver: [],
      form: this.$form.createForm(this)
    }
  },

  mounted () {
    this.getCar()
    this.getDriver()
  },
  methods: {
    getDriver () {
      this.$https.post('/user/getUser/role', { role: 3 }).then(res => {
        this.driver = res.data.data
      })
    },
    getCar () {
      this.$https.post('/car/getCar/all').then(res => {
        this.car = res.data.result
      })
    },
    handleSubmit (e) {
      // e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.state = 1
          values.approvalUser = sessionStorage.getItem('userId')
          values.approvalTime = moment().format('YYYY-MM-DD HH:mm:ss')
          this.$emit('arrange', values)
        }
      })
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less">
.modal {
  .ant-select {
    width: 100px;
  }
}
</style>
