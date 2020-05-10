<template>
  <a-modal
      :title="title"
      :width="480"
      @cancel="close()"
      :visible="isShow"
      class="addCard"
      @ok="handleSubmit"
      okText='提交'
      cancelText='取消'
    >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
    <a-form-item label="姓名">
      <a-input v-decorator="['nickname', {rules: [ { required: true, message: '请填写姓名' } ] } ]"/>
    </a-form-item>
    <a-form-item label="性别">
      <a-radio-group v-decorator="['gender', {rules: [ { required: true, message: '请选择性别' } ] } ]">
        <a-radio value=0>
          女
        </a-radio>
        <a-radio value=1>
          男
        </a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="手机号">
      <a-input v-decorator="['tel', {rules: [ { required: true, message: '请填写手机号' } ] } ]" />
    </a-form-item>
    <a-form-item label="身份证号">
      <a-input v-decorator="['guid', {rules: [ { required: true, message: '请填写身份证号' } ] } ]"/>
    </a-form-item>
    <a-form-item label="家庭住址">
      <a-input v-decorator="['address', {rules: [ { required: true, message: '请填写家庭住址' } ] } ]"/>
    </a-form-item>
    <a-form-item label="出生年月">
      <a-date-picker @change="onChange" format="YYYY-MM-DD" v-decorator="['birthday', {rules: [ { required: true, message: '请选择出生年月日' } ] } ]"/>
    </a-form-item>
  </a-form>
  </a-modal>
</template>

<script>
export default {
  props: ['isShow', 'title'],
  data () {
    return {
      form: this.$form.createForm(this),
      birthday: ''
    }
  },
  methods: {
    close () {
      this.$emit('childFn')
    },
    onChange (date, dateString) {
      this.birthday = dateString
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.role = 3
          values.birthday = this.birthday
          values.gender = parseInt(values.gender)
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
