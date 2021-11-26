<!-- 细柱状图 -->
<template>
  <div class="chart" ref="chartEl"/>
</template>

<script>
import {
  bmapstyle, loading
} from '../utils'
require('echarts/extension/bmap/bmap.js')
export default {
  name: 'map',
  data() {
    return {
      myChart: {},
      allPoint: []
    }
  },
  methods: {
    loading() {
      this.myChart.clear()
      this.myChart.showLoading(loading);
    },
    hideLoading() {
      this.myChart.hideLoading()
    },
    drawEchart(data) {
      this.loading()
      let {
        citys,
        moveLines,
      } = data
    
      
      moveLines.forEach(item => {
        item['label'] = {
          'show': true,
          'position': 'middle'
        }
      })

      this.allPoint = citys
      function getSeries() {
        var arr = [
          {
            type: 'lines',
            coordinateSystem: 'bmap',
            zlevel: 1,
            // polyline: true,
            effect: {
              show: true,
              period: 6,
              trailLength: 0,
              symbol: 'arrow',
              symbolSize: 8
            },
            lineStyle: {
              normal: {
                width: '2',
                color: '#27d38a',
                curveness: 0,
              }
            },
            silent: true,
            data: moveLines
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            zlevel: 1,
            symbolSize: 8,
            label: {
              normal: {
                show: true,
                // fontWeight: 400,
                fontSize: 12,
                position: 'right',
                formatter: '{b}',
                textBorderWidth: 0,
                textBorderColor: 'transparent',
                // formatter: (params)=> {
                //   const { data } = params
                //   const len = data.name.length
                //   if (len < 6) return data.name
                //   let str = ''
                //   let strs = data.name.split('')
                //   for(var i = 0, s; s = strs[i++];) { //遍历字符串数组
                //     str += s;
                //     if(!(i % 6)) str += '\n';
                //   }
                //   return str
                // },
              }
            },
            labelLayout: {
              hideOverlap: true
            },
            // symbol: 'image://https://zhiyupro.zebra-c.com/static/images/4sshadow.png',
            // symbol: "path://M24,2.27373675e-13 C37.254834,2.27373675e-13 48,10.745166 48,24 C48,37.254834 37.254834,48 24,48 C10.745166,48 0,37.254834 0,24 C0,10.745166 10.745166,2.27373675e-13 24,2.27373675e-13 Z M30.961875,12.249375 L17.521875,12.249375 C16.081875,12.249375 15.121875,13.209375 14.881875,14.409375 L13.921875,20.169375 L13.681875,20.169375 C12.241875,20.169375 11.281875,21.129375 11.041875,22.569375 L10.321875,29.289375 C10.321875,30.009375 10.561875,30.729375 11.041875,31.449375 C11.521875,31.929375 12.241875,32.409375 12.961875,32.409375 L13.681875,32.409375 L13.681875,35.049375 C13.681875,35.769375 14.401875,36.489375 15.121875,36.489375 L17.761875,36.489375 C18.481875,36.489375 19.201875,35.769375 19.201875,35.049375 L19.201875,32.409375 L29.761875,32.409375 L29.761875,35.049375 C29.761875,35.769375 30.481875,36.489375 31.201875,36.489375 L33.841875,36.489375 C34.561875,36.489375 35.281875,35.769375 35.281875,35.049375 L35.281875,32.409375 L36.001875,32.409375 C36.721875,32.409375 37.441875,32.169375 37.921875,31.449375 C38.161875,30.729375 38.401875,30.009375 38.161875,29.289375 L37.441875,22.569375 C37.201875,21.129375 36.241875,20.169375 34.801875,20.169375 L34.561875,20.169375 L33.601875,14.409375 C33.361875,12.969375 32.161875,12.249375 30.961875,12.249375 Z M17.521875,24.489375 C18.721875,24.489375 19.441875,25.449375 19.441875,26.409375 C19.681875,27.369375 18.721875,28.329375 17.521875,28.329375 C16.321875,28.329375 15.601875,27.369375 15.601875,26.409375 C15.601875,25.209375 16.561875,24.489375 17.521875,24.489375 Z M30.721875,24.249375 C31.921875,24.249375 32.641875,25.209375 32.641875,26.169375 C32.641875,27.369375 31.681875,28.089375 30.721875,28.089375 C29.761875,28.329375 28.801875,27.369375 28.801875,26.169375 C28.801875,24.969375 29.761875,24.249375 30.721875,24.249375 Z M30.481875,14.889375 C30.721875,14.889375 31.201875,15.129375 31.201875,15.609375 L31.681875,19.689375 C31.681875,19.929375 31.681875,20.169375 31.441875,20.169375 C31.201875,20.409375 31.201875,20.409375 30.961875,20.409375 L17.521875,20.409375 C17.281875,20.409375 17.041875,20.409375 17.041875,20.169375 C16.801875,19.929375 16.801875,19.929375 16.801875,19.689375 L17.521875,15.609375 C17.521875,15.369375 17.761875,14.889375 18.241875,14.889375 L30.481875,14.889375 Z",
            rippleEffect: {
              // period: 8,
              // scale: 2,
              // brushType: 'stroke',
              number: 0
            },
            showEffectOn: 'emphasis',
            itemStyle: {
              normal: {
                fontSize: 12,
                fontWeight: 400,
                color: '#27d38a'
              }
            },
            data: citys,
          }
        ]
        return arr
      }

      this.option = {
        bmap: {
          // zoom: 0,
          roam: true,
          enableMapClick: false,
          mapStyle: {
            styleJson: bmapstyle
          }
        },
        tooltip: {
          show: true,
          triggerOn: 'click',
          className: 'myCharts',
          enterable: true,
          position: function (point, params, dom, rect, size) {
            const obj = {};
            obj.top = point[1] - size.contentSize[1] - rect.height / 2 - 5
            obj.top = Math.max(obj.top, 5)
            obj.left = point[0] - size.contentSize[0] / 2
            obj.left = Math.max(obj.left, 5)
            obj.left = Math.min(obj.left, size.viewSize[0] - size.contentSize[0] - 5)
            return obj;
          },
          overflow: 'hidden',
          formatter: (params) => {
            const {data} = params
            return `<div>
              <p class="echartToolName">${data.engineer_name}</p>
              <p class="echartToolName">工程师ID：${data.engineer}</p>
              <p class="echartTooltext">时间：${data.time}</p>
              <p class="echartTooltext">经纬度：${data.value[0]}, ${data.value[1]}</p>
              <p class="echartTooltext">通勤时长：${data.time_span}</p>
              <p class="echartTooltext">服务时长：${data.service_duration}</p>
              <p class="echartTooltext">房型面积：${data.area_size}</p>
              <p class="echartTooltext">订单编号：${data.order_no}</p>
              <p class="echartTooltext">靶标：${data.products}</p>
              <p class="echartTooltext">服务次数：${data.service_times}</p>
            </div>`
          }
        },
        // geo: {
        //   map: 'beijing',
        //   label: {
        //     show: true
        //   },
        //   scaleLimit:{
        //     min: 1,
        //     max: 10
        //   },
        //   roam: true, //是否允许缩放
        //   itemStyle: {
        //     normal: {
        //         color: 'rgba(51, 69, 89, .5)', //地图背景色
        //         borderColor: '#516a89', //省市边界线00fcff 516a89
        //         borderWidth: 1,
        //     },
        //     emphasis: {
        //         color: 'rgba(37, 43, 61, .5)', //悬浮背景
        //     },
        //   },
        // },
        series: getSeries()
      };
      this.hideLoading()
      this.myChart.setOption(this.option)
      setTimeout(this.init, 0)
    },
    init() {
      var top_right_navigation = new BMap.NavigationControl({
        enbleMapClick: false
      });

      var map = this.myChart.getModel().getComponent('bmap').getBMap();
      map.disableDoubleClickZoom();
      map.addControl(top_right_navigation);
      let pointArray = []
      this.allPoint.forEach(({ value })=> {
        pointArray.push(new BMap.Point(value[0], value[1]));
      })
      map.setViewport(pointArray)
      return map;
    }
  },
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.chartEl)
    // this.$echarts.registerMap("beijing", beijing_json)
    this.loading()
    window.addEventListener("resize", () => {
      this.myChart.resize();
    });
  },
  watch: {
    isFull() {
      this.$nextTick(() => {
        this.myChart.resize();
        this.option.bmap.roam = this.isFull
        this.myChart.setOption(this.option)
      })
    }
  }
}
</script>
<style lang="less" scoped>

.chart {
  width: 100%;
  height: 100%;
}
</style>
