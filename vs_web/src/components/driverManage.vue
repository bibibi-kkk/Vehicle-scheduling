<template>
  <div class="driverMange">

    <a-table :dataSource="data" :columns="columns">
    <div
      slot="filterDropdown"
      slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
      style="padding: 8px"
    >
      <a-input
        v-ant-ref="c => searchInput = c"
        :placeholder="`Search ${column.dataIndex}`"
        :value="selectedKeys[0]"
        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
        @pressEnter="() => handleSearch(selectedKeys, confirm)"
        style="width: 188px; margin-bottom: 8px; display: block;"
      />
      <a-button
        type="primary"
        @click="() => handleSearch(selectedKeys, confirm)"
        icon="search"
        size="small"
        style="width: 90px; margin-right: 8px"
        >Search</a-button
      >
      <a-button @click="() => handleReset(clearFilters)" size="small" style="width: 90px"
        >Reset</a-button
      >
    </div>
    <a-icon
      slot="filterIcon"
      slot-scope="filtered"
      type="search"
      :style="{ color: filtered ? '#108ee9' : undefined }"
    />
    <div slot="customRender" slot-scope="text">
      <span v-if="searchText">
        <div v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
        :key="i"
          >
          <mark
            v-if="fragment.toLowerCase() === searchText.toLowerCase()"
            :key="i"
            class="highlight"
            >{{fragment}}</mark
          >
          <div v-else
            >{{fragment}}</div
          >
        </div>
      </span>
      <div v-else
        >{{text}}</div
      >
    </div>
  </a-table>
  </div>
</template>

<script>
const data = [
  {
    key: '1',
    id: '640204111154468795',
    workId: '110',
    name: '比比比',
    age: 18,
    address: '珠穆朗玛峰',
    license: '1234567890',
    entryTime: '2019-10-13'
  }
]
export default {
  data () {
    return {
      data,
      searchText: '',
      searchInput: null,
      columns: [
        {
          title: '编号',
          dataIndex: 'workId',
          key: 'workId',
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
          dataIndex: 'name',
          key: 'name',
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
          title: '身份证号',
          dataIndex: 'id',
          key: 'id',
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
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
          scopedSlots: {
            customRender: 'customRender'
          }
        },
        {
          title: '家庭住址',
          dataIndex: 'address',
          key: 'address',
          scopedSlots: {
            customRender: 'customRender'
          }
        },
        {
          title: '驾照',
          dataIndex: 'license',
          key: 'license',
          scopedSlots: {
            customRender: 'customRender'
          }
        },
        {
          title: '入职时间',
          dataIndex: 'entryTime',
          key: 'entryTime',
          scopedSlots: {
            customRender: 'customRender'
          }
        }
      ]
    }
  }
}
</script>

<style lang='less' scoped>

</style>
