<template>
  <a-modal
      title="编辑车辆"
      :width="480"
      @cancel="close()"
      :visible="isShow"
      class="addCard"
      @ok="handleSubmit"
      okText='提交'
      cancelText='取消'
    >
      <a-form-item label="id" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input v-decorator="['id']" :placeholder="obj.id" :disabled="true"/>
      </a-form-item>
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
      <a-form-item label="车牌号" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input v-decorator="['carId']" :placeholder="obj.carId"/>
      </a-form-item>
      <a-form-item label="品牌型号" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input v-decorator="['type']" :placeholder="obj.type"/>
      </a-form-item>
      <a-form-item label="类别">
      <a-select style="width: 120px" v-decorator="['class']">
      <a-select-option :value="item.id" v-for="(item, index) in carClass" :key="index">
        {{item.name}}
      </a-select-option>
    </a-select>
    </a-form-item>
      <a-form-item label="承载人数" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input v-decorator="['carryNum']" :placeholder="obj.carryNum"/>
      </a-form-item>
      <a-form-item label="状态" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-radio-group v-decorator="['state']">
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
  props: ['isShow', 'obj', 'carClass'],
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
