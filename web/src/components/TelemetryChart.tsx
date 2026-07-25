import ReactECharts from "echarts-for-react";

type TelemetryPoint = {
    timestamp: Date;
    value: number;
};

type TelemetryChartProps = {
    points: TelemetryPoint[];
    label: string;
    unit?: string;
    minValue?: number;
    maxValue?: number;
};

export function TelemetryChart({
    points,
    label,
    unit,
    minValue,
    maxValue,
}: TelemetryChartProps) {
    const option = {
        xAxis: {
            type: "category",
            data: points.map((point) =>
                point.timestamp.toLocaleTimeString("pt-PT"),
            ),
        },
        yAxis: {
            type: "value",
            name: unit,
            min: minValue,
            max: maxValue,
            axisLabel: {
                formatter: (value: number) => value.toFixed(1),
            },
        },
        series: [
            {
                name: label,
                type: "line",
                data: points.map((point) => point.value),
                smooth: true,
            },]
    };

    return <ReactECharts option={option} />;
}