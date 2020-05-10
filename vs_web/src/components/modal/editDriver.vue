<template>
  <a-modal
      title="编辑司机"
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
      <a-input v-decorator="['nickname']"/>
    </a-form-item>
    <a-form-item label="性别">
      <a-radio-group v-decorator="['gender']">
        <a-radio value=0>
          女
        </a-radio>
        <a-radio value=1>
          男
        </a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="手机号">
      <a-input v-decorator="['tel']" />
    </a-form-item>
    <a-form-item label="身份证号">
      <a-input v-decorator="['guid']"/>
    </a-form-item>
    <a-form-item label="家庭住址">
      <a-input v-decorator="['address']"/>
    </a-form-item>
    <a-form-item label="出生年月">
      <a-date-picker format="YYYY-MM-DD" v-decorator="['birthday']" @change="onChange"/>
    </a-form-item>
  </a-form>
  </a-modal>
</template>

<script>
export default {
  props: ['isShow', 'obj'],
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
          values.birthday = this.birthday
          values.gender = values.gender ? parseInt(values.gender) : undefined
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
