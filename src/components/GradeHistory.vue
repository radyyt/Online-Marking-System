<template>
    <div>
        <v-chart :option="gradeOption" class="chart" />
    </div>
</template>

<script setup>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';
import { ref } from 'vue';

use([
    CanvasRenderer,
    LineChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
]);

const props = defineProps(['scores'])
const titles = props.scores.map(item => item.title)
const scores = props.scores.map(item => item.score)


const gradeOption = ref({
    xAxis: {
        data: titles
    },
    yAxis: {},
    tooltip: {
        trigger: 'item',
        formatter: '{c} 分',
    },
    series: [
        {
            data: scores,
            type: 'line',
            smooth: true,
        }
    ]
})

</script>

<style lang="scss" scoped>
.chart {
    height: 35vh;
    width: 90vw;
}
</style>