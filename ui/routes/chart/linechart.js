import { h, Component } from "preact";
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
import { format as dateFormat } from "../../utils/date";

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

export default class LineChart extends Component {
  state = {
    hidden: []
  };

  constructor(props) {
    super(props);
  }

  toggleLine(line) {
    const { hidden } = this.state;
    const index = hidden.indexOf(line);
    if (index >= 0) {
      hidden.splice(index, 1);
    } else {
      hidden.push(line);
    }
    this.setState({
      hidden
    });
  }

  render({ data }, { hidden }) {
    const chartData = data.map(item => {
      let row = {
        datetime: dateFormat(item.generatedTime)
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
      <div class="LineChart">
        <ResponsiveContainer minHeight={400} height="80%">
          <ComposedChart width={500} height={200} data={chartData}>
            <XAxis dataKey="datetime" orientation="bottom" height={20} />
            <YAxis
              domain={[-10, 110]}
              ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            />
            <CartesianGrid strokeDasharray="3 3" />
            {keys
              .filter(key => hidden.indexOf(key) < 0)
              .map((key, index) => (
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
        <div class="Chart__filter">
          {keys.filter(key => key !== "datetime").map((key, index) => {
            const style =
              hidden.indexOf(key) < 0
                ? {
                    background: colros[index],
                    borderColor: "var(--primary)"
                  }
                : {
                    background: "none",
                    borderColor: colros[index],
                    color: colros[index]
                  };

            return (
              <button style={style} onClick={() => this.toggleLine(key)}>
                {key}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}
