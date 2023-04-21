<template>
    <h4 class="title">当前试卷: {{ state.info.className }}-{{ state.info.examName }}</h4>
    <div>
        <el-row>
            <el-col :span="6">
                <v-chart class="chart" :option="classOption" />
            </el-col>
            <el-col :span="18">
                <v-chart :option="generalOption" style="height: 30vh;width: 70vw;" @click="showDetailChart" />
            </el-col>
        </el-row>
        <el-row>
            <v-chart :option="detailOption" style="height: 30vh;width: 80vw;" />
        </el-row>
    </div>
</template>

<script setup>
import axios from '../utils/axios';
import { provide, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart, BarChart } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';

use([
    CanvasRenderer,
    PieChart,
    BarChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
]);

const route = useRoute()
let examId = route.params.exam
let classId = route.params.class

const state = reactive({
    info: {
        className: '',
        examName: '',
    },
    students: [],
})


//获取班级名
axios.get('class/' + classId + '/').then(res => {
    state.info.className = res.data.name
})

//获取试卷名
axios.get('exam/' + examId + '/').then(res => {
    state.info.examName = res.data.title
})

//获取所有学生信息
axios.get('student/', { params: { classes: classId } }).then(res => {
    state.students = res.data
    // console.log(state.students);
})

// 获取班级成绩分布
const classOption = ref(null)
axios.get('class-exam/', { params: { exam: examId, classes: classId } }).then(res => {
    let url = res.data[0].url
    axios.get(url + 'class-grade/', { baseURL: '' }).then(res => {
        let grades = JSON.parse(res.data)
        // console.log(grades);
        classOption.value = {
            title: {
                text: '全班成绩',
                left: 'left',
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)',
            },
            series: [
                {
                    name: '全班成绩',
                    type: 'pie',
                    // roseType:'radious',
                    radius: '60%',
                    center: ['37%', '50%'],
                    data: grades,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                },
            ],
        }
    })
})

//试卷详细题目得分率
const generalOption = ref(null)
const detailOption = ref(null)
let rates = null
axios.get('class-exam/', { params: { exam: examId, classes: classId } }).then(res => {
    let url = res.data[0].url
    axios.get(url + 'score-rate/', { baseURL: '' }).then(res => {
        rates = JSON.parse(res.data)
        console.log(rates);
        let generalData = []
        let types = ['single', 'multiple', 'blank', 'subjective']
        for (let type of types) {
            generalData.push(((rates[type].reduce((accumulator, currentValue) => accumulator + currentValue)) / rates[type].length).toFixed(2))
        }
        console.log(generalData);
        generalOption.value = {
            title: {
                text: '大题得分率',
                left: 'left',
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b} 得分率:  {c} %',
            },
            xAxis: {
                data: ['单项选择', '多项选择', '填空题', '主观题']
            },
            yAxis: {
                axisLabel: {
                    formatter: '{value}%'
                },
            },
            series: [
                {
                    name: '得分率',
                    type: 'bar',
                    data: generalData,
                    colorBy: 'data',
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                    barWidth: '20%'
                }
            ]
        }

    })
})

const showDetailChart = (params) => {
    const name = params.name
    console.log(rates);
    let data = []
    if (name == '单项选择') {
        data = rates.single
    } else if (name == '多项选择') {
        data = rates.multiple
    } else if (name == '填空题') {
        data = rates.blank
    } else {
        data = rates.subjective
    }
    console.log(data);
    let indexes = []
    for (let i = 0; i < data.length; i++) {
        indexes.push(i + 1)
    }
    detailOption.value = {
        title: {
            text: '题目得分率',
            left: 'left',
        },
        tooltip: {
            trigger: 'item',
            formatter: '第{b}题得分率:  {c} %',
        },
        xAxis: {
            data: indexes
        },
        yAxis: {
            axisLabel: {
                formatter: '{value}%'
            },
        },
        series: [
            {
                name: '得分率',
                type: 'bar',
                data: data,
                colorBy: 'data',
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            }
        ]
    }
}
</script>

<style lang="scss" scoped>
.title {
    margin-top: 0;
}

.chart {
    height: 30vh;
    width: 30vw;
}
</style>