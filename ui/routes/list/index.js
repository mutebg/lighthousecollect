import { h, Component } from "preact";
import Filter from "./filter";
import "./style";
import { getList } from "../../utils/api";

const getFIlter = props =>
  ["project", "task", "uri", "dateFrom", "dateTo"].reduce((prev, next) => {
    if (props[next]) {
      prev[next] = props[next];
    }
    return prev;
  }, {});

const reportStatus = value => {
  if (value > 75) return "pass";
  else if (value > 45) return "average";
  else return "fail";
};

const createPill = ({ label, value }) => (
  <span class={"pill pill--" + reportStatus(value)}>
    {label} <span class="badge">{value}</span>
  </span>
);

export default class List extends Component {
  state = {
    list: []
  };

  constructor(props) {
    super(props);
    const filter = getFIlter(this.props);
    getList(filter).then(list => {
      this.setState({ list });
    });
  }

  render(props, { list }) {
    const filter = getFIlter(props);

    const renerTask = ({ task, generatedTime, urls }) => {
      const result = [
        <tr>
          <td colSpan="2">{task}</td>
          <td>{generatedTime}</td>
        </tr>
      ];

      const urlsTrs = urls.map(({ id, url, total, data }) => [
        <tr>
          <td>{url}</td>
          <td>{createPill({ label: "Total", value: total })}</td>
          <td>
            <a href={`/view/${id}`} class="button button-outline">
              View report
            </a>
            <a
              href={`/chart/${props.project}/${encodeURIComponent(url)}`}
              class="button button-outline"
            >
              View Chart
            </a>
          </td>
        </tr>,
        <tr>
          <td colSpan="3">{data.map(createPill)}</td>
        </tr>
      ]);

      return result.concat(urlsTrs);
    };

    return (
      <div>
        <h1>Filter</h1>
        <Filter {...filter} />
        <h1>List</h1>
        <table class="table result-table">{list.map(renerTask)}</table>
      </div>
    );
  }
}
