import { h, Component } from "preact";
import Filter from "./filter";
import "./style";
import { getList, reLunch } from "../../utils/api";
import { getFIlter } from "../../utils/url";
import { format as dateFormat } from "../../utils/date";

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

  reLunch = (e, data) => {
    e.target.innerText = "Loading...";
    e.target.disabled = true;
    reLunch(data);
  };

  render(props, { list }) {
    const filter = getFIlter(props);

    const renderTask = ({ task, generatedTime, urls }) => {
      const result = [
        <tr class="table-secondary">
          <td colSpan="2">{task}</td>
          <td>
            {dateFormat(generatedTime)}

            <button
              onClick={e => this.reLunch(e, { project: props.project, task })}
              class="button button-outline"
            >
              Restart
            </button>
          </td>
        </tr>
      ];

      const urlsTrs = urls.map(({ id, url, total, data }) => [
        <tr class="top-item">
          <td width="60%">{url}</td>
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
            <button
              onClick={e =>
                this.reLunch(e, { project: props.project, _id: id })
              }
              class="button button-outline"
            >
              Restart
            </button>
          </td>
        </tr>,
        <tr class="bottom-item">
          <td colSpan="3">{data.map(createPill)}</td>
        </tr>
      ]);

      return result.concat(urlsTrs);
    };

    return (
      <div>
        <Filter {...filter} />
        <table class="table result-table">{list.map(renderTask)}</table>
      </div>
    );
  }
}
