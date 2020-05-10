<template>
  <div class="orderManage">
    <add @childFn="closeAdd" @add="add" :isShow="addCard"></add>
    <edit @childFn="closeEdit" @edit="edit" :isShow="editCard" :obj="editObj" @obj="editObj" ref="edit"></edit>
    <!-- <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px', color: '#fff'}">
      <a-calendar :fullscreen="false" @panelChange="onPanelChange" />
    </div> -->
    <div class="top">
      <a-input-group compact>
      <a-select default-value="id" style="width: 110px" @change="handleChange">
        <a-select-option value="id">
          ID
        </a-select-option>
        <a-select-option value="applyUser">
          申请人
        </a-select-option>
        <a-select-option value="car">
          派遣车辆
        </a-select-option>
        <a-select-option value="driver">
          派遣司机
        </a-select-option>
        <a-select-option @click="searchData = true" value="data">
          出发日
        </a-select-option>
      </a-select>
      <a-date-picker v-if="searchData" @change="onChange" />
      <a-input-search
      v-else
      style="width: 150px"
      @search="onSearch"/>
    <a-button type="primary" @click="clear">
      清空
    </a-button>
    </a-input-group>
      <a-button class="editable-add-btn" @click="handleAdd">添加</a-button>
    </div>
    <a-table :columns="columns" :dataSource="data" class="table" :pagination="pagination" :scroll="{ x: 1500 }">
    <span slot="state" slot-scope="state">
      <a-tag
        :color="state === 2 || state === 1 ? 'blue' : (state === 4 ? 'gray' :( state === 6 ? 'green' :'orange'))"
      >
        {{state === 2 ? '司机确认' : (state === 4 ? '用户取消' : (state === 6 ? '已完成' : (state === 1 ? '已审核' : '司机取消')))}}
      </a-tag>
    </span>
    <a slot="applyPerson" slot-scope="applyPerson">{{applyPerson}}</a>
    <a slot="car" slot-scope="car">{{car}}</a>
    <a slot="driver" slot-scope="driver">{{driver}}</a>
    <span slot="action" slot-scope="item">
      <a v-if="item.state!==4" @click="handleEdit(item)">编辑</a>
      <a-divider v-if="item.state!==4" type="vertical" />
      <a @click="onDelete(item)">删除</a>
    </span>
  </a-table>
  </div>
</template>

<script>
import add from '../components/modal/addOrder'
import edit from '../components/modal/editOrder'
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
    fixed: 'left'
  },
  {
    title: '申请人',
    dataIndex: 'nickname',
    key: 'applyPerson',
    scopedSlots: { customRender: 'applyPerson' }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
    key: 'createTime'
  },
  {
    title: '出行信息',
    children: [
      {
        title: '出发地',
        dataIndex: 'departure',
        key: 'departure'
      },
      {
        title: '目的地',
        dataIndex: 'destination',
        key: 'destination'
      },
      {
        title: '出发日期',
        dataIndex: 'departureTime',
        width: 180,
        key: 'departureTime'
      },
      {
        title: '司机',
        dataIndex: 'driver',
        key: 'driver',
        scopedSlots: { customRender: 'driver' }
      },
      {
        title: '车辆',
        dataIndex: 'car',
        key: 'car',
        scopedSlots: { customRender: 'car' }
      }
    ]
  },
  {
    title: '审核人',
    key: 'approvalUser',
    dataIndex: 'approvalUser'
  },
  {
    title: '审核时间',
    key: 'approvalTime',
    width: 180,
    dataIndex: 'approvalTime'
  },
  {
    title: '状态',
    key: 'state',
    dataIndex: 'state',
    scopedSlots: { customRender: 'state' }
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 130,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  data () {
    return {
      data: [],
      columns,
      addCard: false,
      addObj: {},
      editCard: false,
      editObj: {},
      pagination: {
        current: 1,
        pageSize: 8,
        total: 0,
        showTotal: total => `共 ${total} 条数`,
        onChange: (current, pageSize) => this.pageChange(current, pageSize)
      },
      searchItem: 'id',
      searching: false,
      searchData: false
    }
  },
  components: {
    add,
    edit
  },
  mounted () {
    this.getTotal()
    this.getOrder()
  },
  methods: {
    getTotal () {
      this.$https.post('/order/getOrderTotal', { state: [1, 2, 3, 4, 6] }).then(res => {
        this.pagination.total = res.data.total
      })
    },
    getOrder () {
      this.$https.post('/order/getOrder', { state: [1, 2, 3, 4, 6], current: this.pagination.current, pageSize: this.pagination.pageSize }).then(res => {
        if (res.data.code === 0) {
          res.data.data.forEach((item, index) => {
            item.createTime = `${item.createTime.split('T')[0]} ${item.createTime.split('T')[1].split('.')[0]}`
            item.departureTime = `${item.departureTime.split('T')[0]} ${item.departureTime.split('T')[1].split('.')[0]}`
            item.approvalTime = `${item.approvalTime.split('T')[0]} ${item.approvalTime.split('T')[1].split('.')[0]}`
            item.key = index
          })
          this.data = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    clear () {
      this.searching = false
      this.searchContent = null
      this.pagination.current = 1
      this.getTotal()
      this.getOrder()
    },
    onSearch (value) {
      if (value) {
        this.searchContent = value
      }
      if (this.searchContent !== '' && this.searchContent !== undefined && !this.searchContent.includes(' ')) {
        if (!this.searching) {
          this.pagination.current = 1
        }
        this.$https.post('/order/search', { state: [1, 2, 3, 4, 6], current: this.pagination.current, pageSize: this.pagination.pageSize, item: this.searchItem, data: this.searchContent }).then(res => {
          res.data.data.forEach((item, index) => {
            item.createTime = `${item.createTime.split('T')[0]} ${item.createTime.split('T')[1].split('.')[0]}`
            item.departureTime = `${item.departureTime.split('T')[0]} ${item.departureTime.split('T')[1].split('.')[0]}`
            item.approvalTime = `${item.approvalTime.split('T')[0]} ${item.approvalTime.split('T')[1].split('.')[0]}`
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
    onChange (date, dateString) {
      this.$https.post('/order/search/date', { state: [1, 2, 3, 4, 6], current: this.pagination.current, pageSize: this.pagination.pageSize, date: dateString }).then(res => {
        res.data.data.forEach((item, index) => {
          item.createTime = `${item.createTime.split('T')[0]} ${item.createTime.split('T')[1].split('.')[0]}`
          item.departureTime = `${item.departureTime.split('T')[0]} ${item.departureTime.split('T')[1].split('.')[0]}`
          item.approvalTime = `${item.approvalTime.split('T')[0]} ${item.approvalTime.split('T')[1].split('.')[0]}`
          item.key = index
        })
        this.data = res.data.data
        this.pagination.total = res.data.total
        this.searching = true
      })
    },
    pageChange (current, pageSize) {
      this.pagination.current = current
      if (this.searching) {
        this.onSearch()
      } else {
        this.getOrder()
      }
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
        this.$https.post('/order/update', { id: this.editObj.id, data: val }).then(res => {
          if (res.data.code === 0) {
            this.editCard = false
            this.$message.success('编辑成功')
            this.getOrder()
          } else {
            this.$message.error('编辑失败')
          }
        })
      } else {
        this.editCard = false
      }
    },
    closeEdit () {
      this.editCard = false
    },
    add (values) {
      this.$https.post('/order/add', { data: values }).then(res => {
        if (res.data.code === 0) {
          this.$message.success('增加成功')
          this.addCard = false
          this.getTotal()
          this.getOrder()
        } else {
          this.$message.error('增加失败')
        }
      })
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
          that.$https.post('/order/delete', { id: obj.id }).then(res => {
            if (res.data.code === 0) {
              that.$message.success('删除成功')
              that.getTotal()
              that.getOrder()
            } else {
              that.$message.error('删除失败')
            }
          })
        },
        onCancel () {
        }
      })
    },
    verifyCardShow (obj) {
      this.verifyObj = obj
      this.verifyCard = true
    },
    closeAdd () {
      this.addCard = false
    },
    handleAdd () {
      this.addCard = true
    },
    onPanelChange (value, mode) {
      console.log('bi')
      console.log(value, mode)
    }
  }
}
</script>

<style lang='less' scoped>
.orderManage {
.top {
  display: flex;
  margin-bottom: 10px;
}
  .dataCard {
    width: 300px;
    height: 400px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
  }
}
</style>
