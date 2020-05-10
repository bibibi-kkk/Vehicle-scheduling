<template>
  <a-modal
      title="添加订单"
      :width="480"
      @cancel="close()"
      :visible="isShow"
      class="addCard"
      @ok="handleSubmit"
      okText='提交'
      cancelText='取消'
    >
    <a-form :form="form" :label-col="{ span: 10 }" :wrapper-col="{ span: 12 }">
    <a-row :gutter="16">
      <a-col :span="12">
    <a-form-item label="出发地">
      <a-input v-decorator="['departure', {rules: [ { required: true, message: '请填写出发地' } ] } ]" />
    </a-form-item>
      </a-col>
      <a-col :span="12">
    <a-form-item label="目的地">
      <a-input v-decorator="['destination', {rules: [ { required: true, message: '请填写目的地' } ] } ]"/>
    </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="12">
    <a-form-item label="申请人">
      <a-input v-decorator="['applyUser', {rules: [ { required: true, message: '请填写申请人' } ] } ]"/>
    </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="人数">
          <a-input v-decorator="['carryNum', {rules: [ { required: true, message: '请填写人数' } ] } ]"/>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="12">
    <a-form-item label="司机">
      <a-input v-decorator="['driver', {rules: [ { required: true, message: '请填写司机' } ] } ]"/>
    </a-form-item>
      </a-col>
      <a-col :span="12">
    <a-form-item label="车辆">
      <a-input v-decorator="['car', {rules: [ { required: true, message: '请填写车辆' } ] } ]"/>
    </a-form-item>
      </a-col>
    </a-row>
    <a-form-item label="出发时间">
      <a-date-picker
        :mode="mode1"
        show-time
        @openChange="handleOpenChange1"
        @panelChange="handlePanelChange1"
          v-decorator="['departureTime', {rules: [ { required: true, message: '请选择出发时间' } ] } ]"
      />
    </a-form-item>
    <a-row>
    <a-form-item label="状态">
      <a-select v-decorator="['state', {rules: [ { required: true, message: '请选择状态' } ] } ]">
        <a-select-option value=1>
          已审核
        </a-select-option>
        <a-select-option value=2>
          司机确认
        </a-select-option>
        <a-select-option value=3>
          司机取消
        </a-select-option>
        <a-select-option value=4>
          用户取消
        </a-select-option>
        <a-select-option value=5>
          驳回
        </a-select-option>
        <a-select-option value=6>
          已完成
        </a-select-option>
      </a-select>
    </a-form-item>
    </a-row>
  </a-form>
  </a-modal>
</template>

<script>
import moment from 'moment'
export default {
  props: ['isShow'],
  data () {
    return {
      mode1: 'time',
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleOpenChange1 (open) {
      if (open) {
        this.mode1 = 'time'
      }
    },
    handlePanelChange1 (value, mode) {
      this.mode1 = mode
    },
    close () {
      this.$emit('childFn')
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.departureTime = values.departureTime.format('YYYY-MM-DD HH:mm:ss')
          values.approvalUser = sessionStorage.getItem('userId')
          values.approvalTime = moment().format('YYYY-MM-DD HH:mm:ss')
          this.$emit('add', values)
        } else {
        }
      })
    }
  }
}
</script>

<style>

</style>
