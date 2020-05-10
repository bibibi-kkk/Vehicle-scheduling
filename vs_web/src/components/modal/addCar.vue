<template>
  <a-modal
      title="添加车辆"
      :width="480"
      @cancel="close()"
      :visible="isShow"
      class="addCard"
      @ok="handleSubmit"
      okText='提交'
      cancelText='取消'
    >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
    <a-form-item label="车牌">
      <a-input v-decorator="['carId', {rules: [ { required: true, message: '请填写车牌号' } ] } ]"/>
    </a-form-item>
    <a-form-item label="品牌型号">
      <a-input v-decorator="['type', {rules: [ { required: true, message: '请填写品牌型号' } ] } ]" />
    </a-form-item>
    <a-form-item label="类别">
      <a-select default-value="lucy" style="width: 120px" v-decorator="['class', {rules: [ { required: true, message: '请填写分类' } ] } ]">
      <a-select-option :value="item.id" v-for="(item, index) in carClass" :key="index">
        {{item.name}}
      </a-select-option>
    </a-select>
    </a-form-item>
    <a-form-item label="承载人数">
      <a-input v-decorator="['carryNum', {rules: [ { required: true, message: '请填写承载人数' } ] } ]"/>
    </a-form-item>
    <a-form-item label="状态">
      <a-radio-group v-decorator="['state', {rules: [ { required: true, message: '请选择状态' } ] } ]">
        <a-radio value=0>
          正常使用
        </a-radio>
        <a-radio value=1>
          待检修
        </a-radio>
      </a-radio-group>
    </a-form-item>
  </a-form>
  </a-modal>
</template>

<script>
export default {
  props: ['isShow', 'carClass'],
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    close () {
      this.$emit('childFn')
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.state = parseInt(values.state)
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
