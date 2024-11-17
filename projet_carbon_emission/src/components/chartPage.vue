<template>
    <div ref="chart" id="chart"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    name: 'chart-page',
    props: {
      options: {
        type: Object,
        required: true
      }
    },
    mounted() {
      this.chart = echarts.init(this.$refs.chart);
      this.chart.setOption(this.options);
      window.addEventListener('resize', this.chart.resize);
    },
    watch: {
        options: {
            handler(newOptions) {
                this.chart.setOption(newOptions);
            },
            deep: true
        },
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.chart.resize);
      if (this.chart) {
        this.chart.dispose();
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  