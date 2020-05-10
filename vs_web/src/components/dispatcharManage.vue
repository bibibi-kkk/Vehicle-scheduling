<template>
  <div class="dispatcharManage">
    <addCard @childFn="close"  @add="handleAdd" :isShow="addCard" title="添加调度员"></addCard>
    <editUser @childFn="closeEdit" @edit="edit" :isShow="editCard" :obj="editObj"></editUser>
    <div class="top">
      <a-input-group compact>
      <a-select default-value="id" style="width: 90px" @change="handleChange">
        <a-select-option value="id">
          编号
        </a-select-option>
        <a-select-option value="nickName">
          姓名
        </a-select-option>
      </a-select>
      <a-input-search
      style="width: 150px"
      @search="onSearch"/>
    <a-button type="primary" @click="clear">
      清空
    </a-button>
    </a-input-group>
      <a-button class="editable-add-btn" @click="add">添加</a-button>
    </div>
    <a-table :columns="columns" :dataSource="data" class="table" :pagination="pagination" :scroll="{ x: 1300 }">
      <span slot="gender" slot-scope="gender">
        {{gender === 0 ? '女' : '男'}}
    </span>
    <span slot="action" slot-scope="item">
      <a @click="handleEdit(item)">编辑</a>
      <a-divider type="vertical" />
      <a @click="onDelete(item)">删除</a>
    </span>
  </a-table>
  </div>
</template>

<script>
import addCard from '../components/modal/addUser'
import editUser from '../components/modal/editUser'
const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
    width: 100,
    fixed: 'left'
  },
  {
    title: '姓名',
    dataIndex: 'nickname',
    key: 'nickname',
    width: 100,
    fixed: 'left'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    scopedSlots: { customRender: 'gender' }
  },
  {
    title: '身份证号',
    dataIndex: 'guid',
    width: 180,
    key: 'guid'
  },
  {
    title: '联系方式',
    dataIndex: 'tel',
    width: 150,
    key: 'tel'
  },
  {
    title: '出生年月日',
    dataIndex: 'birthday',
    width: 130,
    key: 'birthday'
  },
  {
    title: '家庭住址',
    dataIndex: 'address',
    width: 200,
    key: 'address'
  },
  {
    title: '创建时间',
    dataIndex: 'createtime',
    width: 180,
    key: 'createtime'
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  data () {
    return {
      addCard: false,
      data: [],
      columns,
      editObj: {},
      editCard: false,
      pagination: {
        current: 1,
        pageSize: 3,
        total: 0,
        showTotal: total => `共 ${total} 条数`,
        onChange: (current, pageSize) => this.pageChange(current, pageSize)
      },
      searchItem: 'id',
      searching: false
    }
  },
  components: {
    addCard,
    editUser
  },
  mounted () {
    this.getTotal()
    this.getDispatchar()
  },
  methods: {
    getTotal () {
      this.$https.post('/user/getUserTotal', { role: 1 }).then(res => {
        this.pagination.total = res.data.total
      })
    },
    getDispatchar () {
      this.$https.post('/user/getUser', { role: 1, current: this.pagination.current, pageSize: this.pagination.pageSize }).then(res => {
        if (res.data.code === 0) {
          res.data.data.forEach((item, index) => {
            // item.
            item.createtime = `${item.createtime.split('T')[0]} ${item.createtime.split('T')[1].split('.')[0]}`
            item.birthday = item.birthday ? item.birthday = `${item.birthday.split('T')[0]}` : ''
            item.key = index
          })
          this.data = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    add () {
      this.addCard = true
    },
    close () {
      this.addCard = false
    },
    handleAdd (values) {
      console.log(values)
      this.$https.post('/user/add', { data: values }).then(res => {
        if (res.data.code === 0) {
          this.$message.success('增加成功')
          this.addCard = false
          this.getTotal()
          this.getDispatchar()
        } else {
          this.$message.error('增加失败')
        }
      })
    },
    handleEdit (item) {
      this.editObj = item
      this.editCard = true
    },
    edit (val) {
      let edit = false
      for (const i in val) {
        if (val[i] !== undefined && val[i] !== '') {
          edit = true
        }
      }
      if (edit) {
        this.$https.post('/user/update', { id: this.editObj.id, data: val }).then(res => {
          if (res.data.code === 0) {
            this.editCard = false
            this.$message.success('编辑成功')
            this.getDispatchar()
          } else {
            this.$message.error('编辑失败')
          }
        })
      } else {
        this.editCard = false
      }
    },
    onDelete (obj) {
      const that = this
      this.$confirm({
        title: '提示',
        content: '确定删除?',
        okText: '确定',
        cancelText: '取消',
        centered: true,
        onOk () {
          that.$https.post('/user/delete', { id: obj.id }).then(res => {
            if (res.data.code === 0) {
              that.$message.success('删除成功')
              that.getTotal()
              that.getDispatchar()
            } else {
              that.$message.error('删除失败')
            }
          })
        },
        onCancel () {
        }
      })
    },
    closeEdit () {
      this.editCard = false
    },
    clear () {
      this.searching = false
      this.searchContent = null
      this.pagination.current = 1
      this.getTotal()
      this.getDispatchar()
    },
    onSearch (value) {
      if (value) {
        this.searchContent = value
      }
      if (this.searchContent !== '' && this.searchContent !== undefined && !this.searchContent.includes(' ')) {
        if (!this.searching) {
          this.pagination.current = 1
        }
        this.$https.post('/user/search', { current: this.pagination.current, pageSize: this.pagination.pageSize, item: this.searchItem, data: this.searchContent, role: 1 }).then(res => {
          res.data.data.forEach((item, index) => {
            item.createtime = `${item.createtime.split('T')[0]} ${item.createtime.split('T')[1].split('.')[0]}`
            item.birthday = item.birthday ? item.birthday = `${item.birthday.split('T')[0]}` : ''
            item.key = index
          })
          this.data = res.data.data
          this.pagination.total = res.data.total
          this.searching = true
        })
      }
    },
    handleChange (val) {
      this.searchItem = val
    },
    pageChange (current, pageSize) {
      this.pagination.current = current
      if (this.searching) {
        this.onSearch()
      } else {
        this.getDispatchar()
      }
    }
  }
}
</script>

<style lang='less' scoped>
.top {
  margin-bottom: 10px;
  display: flex;
}
</style>
