<template>
  <div class="driverMange">
    <addCard @childFn="closeAdd"  @add="handleAdd" :isShow="addCard" title="添加司机"></addCard>
    <editDriver @childFn="closeEdit" @edit="edit" :isShow="editCard" :obj="editObj"></editDriver>
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
    <schedule ref="scheduleCard" :visible="scheduleCard" @close="close" @dataChange="dataChange" :orders="dayOrder"></schedule>
    <a-table :dataSource="data" :columns="columns" :pagination="pagination" :scroll="{ x: 1400 }">
      <span slot="gender" slot-scope="gender">
        {{gender === 0 ? '女' : '男'}}
    </span>
    <span slot="schedule" slot-scope="item">
      <a :style="{marginLeft: '15px'}" @click="scheduleShow(item)"><a-icon type="calendar" theme="twoTone"/></a>
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
import moment from 'moment'
import addCard from '../components/modal/addDriver'
import schedule from '../components/modal/schedule'
import editDriver from '../components/modal/editDriver'

const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
    width: 100,
    fixed: 'left',
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'customRender'
    },
    onFilter: (value, record) => record.name.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus()
        }, 0)
      }
    }
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
    key: 'tel',
    scopedSlots: {
      customRender: 'customRender'
    }
  },
  {
    title: '出生年月日',
    dataIndex: 'birthday',
    key: 'birthday',
    width: 130,
    scopedSlots: {
      customRender: 'customRender'
    }
  },
  {
    title: '家庭住址',
    dataIndex: 'address',
    width: 200,
    key: 'address',
    scopedSlots: {
      customRender: 'customRender'
    }
  },
  // {
  //   title: '驾照',
  //   dataIndex: 'license',
  //   key: 'license',
  //   scopedSlots: {
  //     customRender: 'customRender'
  //   }
  // },
  // {
  //   title: '驾照有效时段',
  //   dataIndex: 'licensePeriod',
  //   key: 'licensePeriod',
  //   scopedSlots: {
  //     customRender: 'customRender'
  //   }
  // },
  {
    title: '创建时间',
    dataIndex: 'createtime',
    key: 'createtime',
    width: 180,
    scopedSlots: {
      customRender: 'customRender'
    }
  },
  {
    title: '安排表',
    key: 'schedule',
    scopedSlots: { customRender: 'schedule' }
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
      editObj: {},
      editCard: false,
      scheduleCard: false,
      data: [],
      searchText: '',
      searchInput: null,
      pagination: {
        current: 1,
        pageSize: 8,
        total: 0,
        showTotal: total => `共 ${total} 条数`,
        onChange: (current, pageSize) => this.pageChange(current, pageSize)
      },
      columns,
      item: {},
      dayOrder: [],
      date: '',
      searchItem: 'id',
      searching: false
    }
  },
  components: {
    schedule,
    addCard,
    editDriver
  },
  mounted () {
    this.getTotal()
    this.getDriver()
  },
  methods: {
    getDriver () {
      this.$https.post('/user/getUser', { role: 3, current: this.pagination.current, pageSize: this.pagination.pageSize }).then(res => {
        if (res.data.code === 0) {
          res.data.data.forEach((item, index) => {
            item.key = index
            item.createtime = `${item.createtime.split('T')[0]} ${item.createtime.split('T')[1].split('.')[0]}`
            item.birthday = item.birthday ? `${item.birthday.split('T')[0]} ` : ''
          })
          this.data = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getTotal () {
      this.$https.post('/user/getUserTotal', { role: 3 }).then(res => {
        this.pagination.total = res.data.total
      })
    },
    add () {
      this.addCard = true
    },
    closeAdd () {
      this.addCard = false
    },
    handleAdd (values) {
      this.$https.post('/user/add', { data: values }).then(res => {
        if (res.data.code === 0) {
          this.$message.success('增加成功')
          this.addCard = false
          this.getTotal()
          this.getDriver()
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
            this.getDriver()
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
              that.getDriver()
            } else {
              that.$message.error('删除失败')
            }
          })
        },
        onCancel () {
        }
      })
    },
    handleChange (val) {
      this.searchItem = val
    },
    onSearch (value) {
      if (value) {
        this.searchContent = value
      }
      if (this.searchContent !== '' && this.searchContent !== undefined && !this.searchContent.includes(' ')) {
        if (!this.searching) {
          this.pagination.current = 1
        }
        this.$https.post('/user/search', { current: this.pagination.current, pageSize: this.pagination.pageSize, item: this.searchItem, data: this.searchContent, role: 3 }).then(res => {
          res.data.data.forEach((item, index) => {
            item.createtime = `${item.createtime.split('T')[0]} ${item.createtime.split('T')[1].split('.')[0]}`
            item.birthday = item.birthday ? `${item.birthday.split('T')[0]} ` : ''
          })
          this.data = res.data.data
          this.pagination.total = res.data.total
          this.searching = true
        })
      }
    },
    clear () {
      this.searching = false
      this.searchContent = null
      this.pagination.current = 1
      this.getTotal()
      this.getDriver()
    },
    pageChange (current, pageSize) {
      this.pagination.current = current
      if (this.searching) {
        this.onSearch()
      } else {
        this.getDriver()
      }
    },
    dataChange (newDay) {
      this.dayOrder = []
      this.date = newDay
      this.$refs.scheduleCard.closecalendar()
      this.getdayders(this.item)
    },
    getdayders () {
      this.$https.post('/order/getOrder/driver/date ', { driver: this.item.id, date: this.date }).then(res => {
        res.data.data.forEach((item, index) => {
          item.departureTime = `${item.departureTime.split('T')[0]} ${item.departureTime.split('T')[1].split('.')[0]}`
          item.createTime = `${item.createTime.split('T')[0]} ${item.createTime.split('T')[1].split('.')[0]}`
          item.approvalTime = `${item.approvalTime.split('T')[0]} ${item.approvalTime.split('T')[1].split('.')[0]}`
          switch (item.state) {
            case 1:
              item.state = '已审核'
              break
            case 2:
              item.state = '司机确认'
              break
            case 3:
              item.state = '司机取消'
              break
            case 4:
              item.state = '用户取消'
              break
            case 6:
              item.state = '已完结'
              break
          }
        })
        this.dayOrder = res.data.data
      })
    },
    close () {
      this.scheduleCard = false
    },
    closeEdit () {
      this.editCard = false
    },
    scheduleShow (item) {
      this.item = item
      this.date = moment().format('YYYY-MM-DD')
      this.getdayders(item)
      this.scheduleCard = true
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
