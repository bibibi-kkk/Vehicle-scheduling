<template>
  <div class="carManage">
    <schedule :visible="scheduleCard" @close="close"></schedule>
    <a-table :columns="columns" :dataSource="data" class="table">
      <span slot="state" slot-scope="state">
      <a-tag
        :color="state === 0 ? 'green' : 'geekblue'"
      >
        {{state === 0 ? '正常使用' : '待维修' }}
      </a-tag>
    </span>
    <span slot="schedule">
      <a :style="{marginLeft: '15px'}" @click="scheduleShow"><a-icon type="calendar" theme="twoTone"/></a>
    </span>
    <span slot="action" slot-scope="item">
      <a>编辑</a>
      <a-divider type="vertical" />
      <a-popconfirm title="确定删除?" @confirm="() => onDelete(item)"><a>删除</a></a-popconfirm>
      <a-divider type="vertical" />
    </span>
  </a-table>
  </div>
</template>

<script>
import schedule from '../components/modal/schedule'
const columns = [
  {
    title: '表ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '表名称',
    dataIndex: 'nickName',
    key: 'nickName'
  },
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state'
  }
]

const data = [
  {
    key: '1',
    id: '1001',
    name: '',
    nickName: '人员表',
    state: 0
  },
  {
    key: '2',
    id: '1002',
    name: '',
    nickName: '车辆表',
    state: 0
  },
  {
    key: '3',
    id: '2001',
    name: '',
    nickName: '订单表',
    state: 0
  }
]
export default {
  data () {
    return {
      data,
      columns,
      scheduleCard: false
    }
  },
  components: {
    schedule
  },
  methods: {
    handleAdd () {

    },
    onDelete (obj) {
      console.log(obj)
    },
    close () {
      this.scheduleCard = false
    },
    scheduleShow () {
      this.scheduleCard = true
    }
  }
}
</script>

<style lang='less' scoped>

</style>
