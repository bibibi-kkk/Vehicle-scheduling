<template>
<div class="schedule">
  <a-modal title='安排表' :visible="visible" @cancel="close" :footer="null">
    <div class="ttitle">
      <a @click="() => calendar = !calendar"><a-icon :style="{marginRight: '10px'}" type="calendar" theme="twoTone" twoToneColor="#52c41a"/></a>
      {{data}}
    </div>
  <div v-if="calendar" :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' , position: 'absolute', background: '#fff', zIndex: '2'}" class="calendar">
    <a-calendar :fullscreen="false" @panelChange="onPanelChange" @select="dataChange">
    <!-- <ul class="events" slot="dateCellRender" slot-scope="value">
      <li v-for="item in getListData(value)" :key="item.content">
      </li>
    </ul> -->
  </a-calendar>
  </div>
    <!-- <div class="timelinetitle">今日订单</div> -->
  <a-timeline mode="alternate" class="timeline">
    <a-timeline-item :color="item.state === '已完结' ? 'green' : (item.state === '司机取消' ? 'orange' :( item.state === '用户取消' ? 'gray' :'blue'))" v-for="(item, index) in orders" :key="index" @click="showOrder(item)">{{item.departureTime}} {{item.departure}}-{{item.destination}}</a-timeline-item>

    <!-- <a-timeline-item> -->
      <!-- <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />
      14:00-15:00 南京-喜马拉雅山
    </a-timeline-item>
    <a-timeline-item>16：00-18：00 xx-xx</a-timeline-item>
    <a-timeline-item color="red">
      <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />
      16：00-18：00 xx-xx
    </a-timeline-item> -->
  </a-timeline>
  <a-descriptions v-if="show" title="订单详情" :column='2'>
    <a-descriptions-item label="ID">{{order.id}}
      <a-tag :color="order.state === '已完结'? 'green' : (order.state === '未审核' || order.state === '司机取消'? 'orange' : (order.state === '用户取消' || order.state === '驳回'? '#bdc3c7' : 'blue')) " class="tag" style="margin-left: 10px">{{order.state}}</a-tag></a-descriptions-item>
    <a-descriptions-item label="申请时间">{{order.createTime}}</a-descriptions-item>
    <a-descriptions-item label="出发地">{{order.departure}}</a-descriptions-item>
    <a-descriptions-item label="目的地">{{order.destination}}</a-descriptions-item>
    <a-descriptions-item label="出发时间">{{order.departureTime}}</a-descriptions-item>
    <a-descriptions-item label="申请人">{{order.applyUser}}</a-descriptions-item>
    <a-descriptions-item label="司机">{{order.driver}}</a-descriptions-item>
    <a-descriptions-item label="车辆">{{order.car}}</a-descriptions-item>
    <a-descriptions-item label="审核人">{{order.approvalUser}}</a-descriptions-item>
    <a-descriptions-item label="审核时间">{{order.approvalTime}}</a-descriptions-item>
  </a-descriptions>
  </a-modal>
</div>

</template>

<script>
import moment from 'moment'
export default {
  props: ['visible', 'orders'],
  data () {
    return {
      show: false,
      order: {},
      calendar: false,
      data: '',
      yearMonth: '',
      beginData: moment(20200306).format('YYYY-MM-DD'),
      endData: moment().format()
    }
  },
  mounted () {
    this.data = moment().format('YYYY-MM-DD')
  },
  methods: {
    getListData (value) {
      let listData
      switch (value.date()) {
        case 8:
          listData = [
            { type: 'warning', content: 'This is warning event.' },
            { type: 'success', content: 'This is usual event.' }
          ]
          break
        case 10:
          listData = [
            { type: 'warning', content: 'This is warning event.' },
            { type: 'success', content: 'This is usual event.' },
            { type: 'error', content: 'This is error event.' }
          ]
          break
        case 15:
          listData = [
            { type: 'warning', content: 'This is warning event' },
            { type: 'success', content: 'This is very long usual event。。....' },
            { type: 'error', content: 'This is error event 1.' },
            { type: 'error', content: 'This is error event 2.' },
            { type: 'error', content: 'This is error event 3.' },
            { type: 'error', content: 'This is error event 4.' }
          ]
          break
        default:
      }
      return listData || []
    },
    onPanelChange (value, mode) {
      console.log(value, mode)
      this.yearMonth = value._d
    },
    dataChange (a) {
      this.show = false
      this.data = a.format('YYYY-MM-DD')
      this.$emit('dataChange', a.format('YYYY-MM-DD'))
    },
    close () {
      this.show = false
      this.$emit('close')
    },
    showOrder (val) {
      // console.log(val)
      this.show = true
      this.order = val
    },
    closecalendar () {
      this.calendar = false
    }
  }
}
</script>

<style lang="less">
  .timelinetitle {
    margin-bottom: 20px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
    font-size: 16px;
    line-height: 1.5;
  }
  .ttitle {
    margin-bottom: 20px;
  }
.schedule {
  .timeline {
  }
  .tag {
    margin-left: 10px;
  }
  .calendar {
    position: absolute;
  }
}
  .ant-timeline.ant-timeline-alternate .ant-timeline-item-content {
    cursor: pointer;
  }
</style>
