<template>
  <div class="carManage">
    <addCar @childFn="closeAdd" @add="add" :isShow="addCard" :carClass="carClass"></addCar>
    <editCar @childFn="closeEdit" @edit="edit" :isShow="editCard" :obj="editObj" :carClass="carClass"></editCar>
    <schedule ref="scheduleCard" :visible="scheduleCard" @close="close" @dataChange="dataChange" :orders="dayOrder"></schedule>
    <div class="top">
      <a-input-group compact>
      <a-select default-value="id" style="width: 90px" @change="handleChange">
        <a-select-option value="id">
          编号
        </a-select-option>
        <a-select-option value="carId">
          车牌号
        </a-select-option>
      </a-select>
      <a-input-search
      style="width: 150px"
      @search="onSearch"/>
    <a-button type="primary" @click="clear">
      清空
    </a-button>
    </a-input-group>
      <a-button class="editable-add-btn" @click="handleAdd">添加</a-button>
    </div>
    <a-table :columns="columns" :dataSource="data" class="table" :pagination="pagination">
      <span slot="state" slot-scope="state">
      <a-tag
        :color="state === 0 ? 'green' : 'geekblue'"
      >
        {{state === 0 ? '正常使用' : '待维修' }}
      </a-tag>
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
import addCar from '../components/modal/addCar'
import editCar from '../components/modal/editcar'
import schedule from '../components/modal/schedule'
const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '车牌号',
    dataIndex: 'carId',
    key: 'carId'
  },
  {
    title: '分类',
    dataIndex: 'class',
    key: 'class'
  },
  {
    title: '品牌类型',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '承载人数',
    dataIndex: 'carryNum',
    key: 'carryNum'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    scopedSlots: { customRender: 'state' }
  },
  {
    title: '安排表',
    key: 'schedule',
    scopedSlots: { customRender: 'schedule' }
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
      addCard: false,
      editCard: false,
      editObj: {},
      scheduleCard: false,
      pagination: {
        current: 1,
        pageSize: 8,
        total: 0,
        showTotal: total => `共 ${total} 条数`,
        onChange: (current, pageSize) => this.pageChange(current, pageSize)
      },
      dayOrder: [],
      item: {},
      date: '',
      searchItem: 'id',
      carClass: {},
      searching: false
    }
  },
  components: {
    schedule,
    addCar,
    editCar
  },
  mounted () {
    this.getTotal()
    this.getCar()
    this.getCarClass()
  },
  methods: {
    clear () {
      this.searching = false
      this.searchContent = null
      this.pagination.current = 1
      this.getTotal()
      this.getCar()
    },
    getTotal () {
      this.$https.post('/car/getCarTotal').then(res => {
        this.pagination.total = res.data.total
      })
    },
    getCarClass () {
      this.$https.get('/car/getClass').then(res => {
        if (res.data.code === 0) {
          this.carClass = res.data.data
        } else {
          this.$message.warning('获取车辆类别失败')
        }
      })
    },
    getCar () {
      this.$https.post('/car/getCar', { current: this.pagination.current, pageSize: this.pagination.pageSize }).then(res => {
        if (res.data.code === 0) {
          res.data.data.forEach((item, index) => {
            this.carClass.forEach((carClass, index) => {
              if (item.class === carClass.id) {
                item.class = carClass.name
              }
            })
            item.key = index
            item.createTime = `${item.createTime.split('T')[0]} ${item.createTime.split('T')[1].split('.')[0]}`
          })
          this.data = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    onSearch (value) {
      if (value) {
        this.searchContent = value
      }
      if (this.searchContent !== '' && this.searchContent !== undefined && !this.searchContent.includes(' ')) {
        if (!this.searching) {
          this.pagination.current = 1
        }
        this.$https.post('/car/search', { current: this.pagination.current, pageSize: this.pagination.pageSize, item: this.searchItem, data: this.searchContent }).then(res => {
          res.data.data.forEach((item, index) => {
            this.carClass.forEach((carClass, index) => {
              if (item.class === carClass.id) {
                item.class = carClass.name
              }
            })
            item.key = index
            item.createTime = `${item.createTime.split('T')[0]} ${item.createTime.split('T')[1].split('.')[0]}`
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
        this.getCar()
      }
    },
    edit (val) {
      let edit = false
      for (const i in val) {
        if (val[i]) {
          edit = true
        }
      }
      if (edit) {
        this.$https.post('/car/update', { id: this.editObj.id, data: val }).then(res => {
          if (res.data.code === 0) {
            this.editCard = false
            this.$message.success('编辑成功')
            this.getCar()
          } else {
            this.$message.error('编辑失败')
          }
        })
      } else {
        this.editCard = false
      }
    },
    add (values) {
      console.log(values)
      this.$https.post('/car/add', { data: values }).then(res => {
        if (res.data.code === 0) {
          this.$message.success('增加成功')
          this.addCard = false
          this.getTotal()
          this.getCar()
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
          that.$https.post('/car/delete', { id: obj.id }).then(res => {
            if (res.data.code === 0) {
              that.$message.success('删除成功')
              that.getTotal()
              that.getCar()
            } else {
              that.$message.error('删除失败')
            }
          })
        },
        onCancel () {
        }
      })
    },
    handleAdd () {
      this.addCard = true
    },
    handleEdit (item) {
      this.editObj = item
      this.editCard = true
    },
    close () {
      this.scheduleCard = false
    },
    closeAdd () {
      this.addCard = false
    },
    closeEdit () {
      this.editCard = false
    },
    scheduleShow (item) {
      this.item = item
      this.date = moment().format('YYYY-MM-DD')
      this.getdayders(item)
      this.scheduleCard = true
    },
    dataChange (newDay) {
      this.dayOrder = []
      this.date = newDay
      this.$refs.scheduleCard.closecalendar()
      this.getdayders(this.item)
    },
    // getArrange () {
    //   this.$https.post('/order/getOrder/car ', { car: this.item.id }).then(res => {

    //   })
    // },
    getdayders () {
      this.$https.post('/order/getOrder/car/date ', { car: this.item.id, date: this.date }).then(res => {
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
