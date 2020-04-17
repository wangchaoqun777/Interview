<template>
<div>
 <div width="95%" height="180" class="filter_card px-3 py-3">
  <v-text-field label="客户名称" v-model="params.name" @blur="getLsit"></v-text-field>
  <v-menu
    ref="startMenu"
    v-model="startMenu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="dateRangeText"
    transition="scale-transition"
    min-width="290px"
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="dateRangeText"
        class="mt-3"
        label="时间"
        dense
        readonly
        outlined
        hide-details
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="params.created_at"
      no-title
      scrollable
      range
    >
      <v-spacer></v-spacer>
      <v-btn
        text
        color="primary"
        @click="startMenu = false"
      >
        取消
      </v-btn>
        <v-btn
          text
          color="primary"
          @click="$refs.startMenu.save(params.created_at)"
        >
          确认
        </v-btn>
      </v-date-picker>
    </v-menu>
 </div>
  <virtual-list :size="100" :remain="5" :list="userList">
      <v-card
        height="100"
        class="virtual-list mt-3 ml-2"
        slot-scope="{ item }"
        :item="{item}"
        width="95%">
        <v-row>
          <v-col class="pl-5" cols="7">
            <p>{{item.department}}</p>
            <p>创建时间:{{item.created_time}}</p>
            <p>审批状态:{{item.status}}</p>
          </v-col>
          <v-col class="user_item_btn" cols="5">
            <p class="pl-2"><v-btn width="80" height="30">详  情</v-btn></p>
            <p class="pl-2"><v-btn width="80" height="30">审批页</v-btn></p>
          </v-col>
        </v-row>
      </v-card>
      </virtual-list>
</div>
</template>
<script>
export default {
  name: 'users',
  data: () => ({
    isActive: false,
    startMenu: false,
    params: {
      name: '',
      created_at: ['2019-09-10', '2019-09-20'],
    },
    userList: [{
      id: 0,
      department: '光速斑马',
      created_time: '2010-10-02',
      status: '有待审批项'
    }, {
      id: 1,
      department: '光速斑马',
      created_time: '2010-10-03',
      status: '有待审批项'
    }, {
      id: 3,
      department: '光速斑马',
      created_time: '2010-10-05',
      status: '有待审批项'
    }, {
      id: 3,
      department: '光速斑马',
      created_time: '2010-10-05',
      status: '有待审批项'
    }, {
      id: 3,
      department: '光速斑马',
      created_time: '2010-10-05',
      status: '有待审批项'
    }]
  }),
  watch: {
    dateRangeText () {
      this.getLsit()
    }
  },
  components: {
  },
  computed: {
    dateRangeText: {
      get () {
        return this.params.created_at.join(' ~ ')
      },
      set (val) {

      }
    }
  },
  methods: {
    // 获取账户管理列表
    getLsit () {
      console.log('val')
      this.$api.account(this.params).then((data) => {

      })
    }
  }
}
</script>
<style lang="scss">
  .filter_card{
    margin: 0 auto
  }
</style>
