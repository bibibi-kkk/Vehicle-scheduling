<template>
  <a-modal
      title="编辑订单"
      :width="480"
      @cancel="close()"
      :visible="isShow"
      class="addCard"
      @ok="handleSubmit"
      okText='提交'
      cancelText='取消'
    >
    <a-form>
      <a-form-item label="id" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input v-decorator="['id']" :placeholder="obj.id" :disabled="true"/>
      </a-form-item>
    </a-form>
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">

    <a-row :gutter="8">
      <a-col :span="12">
      <a-form-item label="出发地">
        <a-input v-decorator="['departure']" :placeholder="obj.departure"/>
      </a-form-item>
      </a-col>
      <a-col :span="12">
      <a-form-item label="目的地">
        <a-input v-decorator="['destination']" :placeholder="obj.destination"/>
      </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="12">
      </a-col>
      <a-col :span="12">
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :span="12">
        <a-form-item label="车辆">
          <a-input v-decorator="['car']" :placeholder="obj.car"/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
      <a-form-item label="司机">
        <a-input v-decorator="['driver']" :placeholder="obj.driver"/>
      </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="2">
      <a-col :span="12">
      <a-form-item label="申请人">
        <a-input v-decorator="['applyUser']" :placeholder="obj.applyUser"/>
      </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="人数">
          <a-input v-decorator="['carryNum']" :placeholder="obj.carryNum"/>
        </a-form-item>
      </a-col>
    </a-row>
      <a-form-item label="出发时间">
        <a-date-picker
          :mode="mode1"
          show-time
          @openChange="handleOpenChange1"
          @panelChange="handlePanelChange1"
            v-decorator="['departureTime']"
        />
      </a-form-item>
        <a-form-item label="状态">
      <a-select v-decorator="['state']">
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
        <a-select-option value=6>
          已完成
        </a-select-option>
      </a-select>
    </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  props: ['isShow', 'obj'],
  data () {
    return {
      mode1: 'time',
      form: this.$form.createForm(this),
      birthday: ''
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
    onChange (date, dateString) {
      this.birthday = dateString
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.departureTime = values.departureTime ? values.departureTime.format('YYYY-MM-DD HH:mm:ss') : undefined
          this.$emit('edit', values)
        } else {
        }
      })
    }
  }
}
</script>

<style>

</style>
