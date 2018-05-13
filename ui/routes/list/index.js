import { h, Component } from "preact";
import Filter from "./filter";
import "./style";
import { getList } from "../../utils/api";
import { getFIlter } from "../../utils/url";

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
    this.loadData(props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadData(nextProps);
  }

  loadData = props => {
    const filter = getFIlter(props);
    getList(filter).then(list => {
      this.setState({ list });
    });
  };

  render(props, { list }) {
    const filter = getFIlter(props);

    const renerTask = ({ task, generatedTime, urls }) => {
      const result = [
        <tr class="table-secondary">
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
              href={`/chart/?uri=${encodeURIComponent(url)}&project=${
                props.project
              }`}
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
        <Filter {...filter} />
        <h1>List</h1>
        <table class="table result-table">{list.map(renerTask)}</table>
      </div>
    );
  }
}