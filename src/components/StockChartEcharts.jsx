import { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function StockChartEcharts() {
    const chartRef = useRef(null);

    useEffect(() => {
        const myChart = echarts.init(chartRef.current, null, {
            backgroundColor: 'transparent',
        });

        let now = new Date(2025, 9, 3, 0, 0, 0);
        let oneDay = 60 * 1000;
        let value = Math.random() * 1000;

        function randomData() {
            now = new Date(+now + oneDay);
            value = value + Math.random() * 50 - 25;
            return {
                name: now.toString(),
                value: [now.getTime(), Math.round(value)],
            };
        }

        let data = [];
        for (let i = 0; i < 1440; i++) {
            data.push(randomData());
        }

        const option = {
            backgroundColor: "transparent",
            // title: {
            //     text: "Dynamic Data & Time Axis",
            //     textStyle: { color: '#333' }
            // },
            tooltip: {
                trigger: "axis",
                formatter: function (params) {
                    params = params[0];
                    var date = new Date(params.name);
                    return (
                        date.getHours() +
                        ":" +
                        (date.getMinutes() + 1) +
                        " — " +
                        params.value[1]
                    );
                },
                axisPointer: {
                    animation: false,
                },
            },
            xAxis: {
                type: "time",
                splitLine: { show: false },
            },
            yAxis: {
                type: "value",
                boundaryGap: [0, "0.3"],
                splitLine: { show: false },
                axisLine: { show: true },
                min: 0,
                max: function (val) {
                    return Math.round(val.max * 1.3);
                },
            },
            animation: true,
            animationDuration: 2000,
            animationEasing: "linear",
            series: [
                {
                    name: "Fake Data",
                    type: "line",
                    showSymbol: false,
                    data: data,
                    lineStyle: {
                        color: "#46A758",
                    },
                },
            ],
        };

        myChart.setOption(option);

        return () => {
            myChart.dispose();
        };
    }, []);

    return (
        <div
            ref={chartRef}
            className="mt-8 mx-4 rounded-lg shadow-lg h-96 w-[750px]"
        />
    );
}
