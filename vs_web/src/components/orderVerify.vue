<template>
  <div class="orderVerify">
    <verifyCom :visible="verifyCard" @edit="edit" @arrange="arrange" @close="close" :data="verifyObj"></verifyCom>
    <edit @childFn="closeEdit" @edit="edit" :isShow="editCard" :obj="editObj" @obj="editObj" ref="edit"></edit>
    <div class="top">
      <a-input-group compact>
      <a-select default-value="id" style="width: 90px" @change="handleChange">
        <a-select-option value="id">
          ID
        </a-select-option>
        <a-select-option value="applyUser">
          申请人
        </a-select-option>
      </a-select>
      <a-input-search
      style="width: 150px"
      @search="onSearch"/>
    <a-button type="primary" @click="clear">
      清空
    </a-button>
    </a-input-group>
    </div>
    <a-table :columns="columns" :dataSource="data" class="table" :pagination="pagination">
    <span slot="state" slot-scope="state">
      <a-tag
        :color="state === 0 ? 'geekblue' : (state === 1 ? 'green' : 'volcano')"
      >
        {{state === 0 ? '未审核' :  (state === 1 ? '已审核' : '已驳回')}}
      </a-tag>
    </span>
    <!-- <a slot="applyUser" slot-scope="applyUser">{{applyUser}}</a> -->
    <span slot="action" slot-scope="item">
      <a @click="handleEdit(item)">编辑</a>
      <a-divider v-if="item.state===0" type="vertical" />
      <a v-if="item.state===0" @click="verifyCardShow(item)">审批</a>
      <a-divider type="vertical" />
      <a @click="onDelete(item)">删除</a>
    </span>
  </a-table>
  </div>
</template>

<script>
import verifyCom from '../components/modal/verify'
import edit from '../components/modal/editVerify'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '申请人',
    dataIndex: 'applyUser',
    key: 'applyUser',
    scopedSlots: { customRender: 'applyUser' }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },
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
    key: 'departureTime'
  },
  {
    title: '人数',
    dataIndex: 'carryNum',
    key: 'carryNum'
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
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  data () {
    return {
      data: [],
      columns,
      verifyCard: false,
      editCard: false,
      verifyObj: {},
      editObj: {},
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
    verifyCom,
    edit
  },
  mounted () {
    this.getTotal()
    this.getOrder()
  },
  methods: {
    getTotal () {
      this.$https.post('/order/getOrderTotal', { state: [0, 5] }).then(res => {
        this.pagination.total = res.data.total
      })
    },
    getOrder () {
      this.$https.post('/order/getOrder', { state: [0, 5], current: this.pagination.current, pageSize: this.pagination.pageSize }).then(res => {
        if (res.data.code === 0) {
          res.data.data.forEach((item, index) => {
            item.departureTime = `${item.departureTime.split('T')[0]} ${item.departureTime.split('T')[1].split('.')[0]}`
            item.createTime = `${item.createTime.split('T')[0]} ${item.createTime.split('T')[1].split('.')[0]}`
            item.key = index
          })
          this.data = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    arrange (val) {
      this.$https.post('/order/update', { id: this.verifyObj.id, data: val }).then(res => {
        if (res.data.code === 0) {
          this.verifyCard = false
          this.$message.success('编辑成功')
          this.getOrder()
        } else {
          this.$message.error('编辑失败')
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
        this.$https.post('/order/search', { state: [0, 5], current: this.pagination.current, pageSize: this.pagination.pageSize, item: this.searchItem, data: this.searchContent }).then(res => {
          res.data.data.forEach((item, index) => {
            item.departureTime = `${item.departureTime.split('T')[0]} ${item.departureTime.split('T')[1].split('.')[0]}`
            item.createTime = `${item.createTime.split('T')[0]} ${item.createTime.split('T')[1].split('.')[0]}`
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
        this.getOrder()
      }
    },
    verifyCardShow (obj) {
      this.verifyObj = obj
      this.verifyCard = true
    },
    close () {
      this.verifyCard = false
    }
  }
}
</script>

<style lang='less' scoped>
.orderVerify {
  .top {
    margin-bottom: 10px;
    display: flex;
  }
  .table {
    color: #fff;
  }
}
</style>
