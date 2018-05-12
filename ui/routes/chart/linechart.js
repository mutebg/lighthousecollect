import { h, render } from "preact";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "precharts";

const colros = [
  "red",
  "blue",
  "purple",
  "green",
  "orange",
  "violet",
  "salmon",
  "olive"
];

const LineChart = ({ data }) => {
  const chartData = data.map(item => {
    let row = {
      datetime: item.generatedTime
    };

    row = item.overview.reduce((prev, next) => {
      row[next.label] = next.value;
      return row;
    }, row);
    return row;
  });

  if (!data.length) {
    return null;
  }

  const keys = Object.keys(chartData[0]);

  return (
    <ResponsiveContainer minHeight={400} height="80%">
      <ComposedChart width={500} height={200} data={chartData}>
        <XAxis dataKey="datetime" orientation="bottom" height={20} />
        <YAxis
          domain={[-10, 110]}
          ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
        />
        <CartesianGrid strokeDasharray="3 3" />
        {keys.map((key, index) => (
          <Line
            type="monotone"
            dataKey={key}
            stroke={colros[index]}
            activeDot={{ r: 3 }}
          />
        ))}
        <Tooltip />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
