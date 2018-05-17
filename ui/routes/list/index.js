import { h, Component } from "preact";
import Filter from "./filter";
import "./style";
import { getList, reLunch } from "../../utils/api";
import { getFIlter } from "../../utils/url";
import { format as dateFormat } from "../../utils/date";
import Badge from "../../components/badge";

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
      const restartTask = e =>
        this.reLunch(e, { project: props.project, task });

      return (
        <div class="card">
          <div class="card__title">
            {dateFormat(generatedTime)}, Task #{task}
          </div>

          <div class="card__actions">
            <button onClick={restartTask}>
              <i class="fas fa-retweet" /> Restart
            </button>
          </div>

          <div class="card__list">
            {urls.map(({ id, url, total, data }) => {
              const restartURL = e =>
                this.reLunch(e, { project: props.project, _id: id });
              const viewChartURL = `/chart/?uri=${encodeURIComponent(
                url
              )}&project=${props.project}`;
              return (
                <div class="row">
                  <div class="row__actions">
                    <a href={`/view/${id}`} class="button button-outline">
                      <i class="fas fa-file-alt" /> View report
                    </a>
                    <a href={viewChartURL}>
                      <i class="fas fa-chart-line" /> View Chart
                    </a>
                    <button onClick={restartURL}>
                      <i class="fas fa-retweet" /> Restart
                    </button>
                  </div>
                  <div class="row__url">{url}</div>
                  <div class="row__metrics">
                    <Badge label="Total" value={total} />
                    {data.map(metric => <Badge {...metric} />)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    return (
      <div>
        <Filter {...filter} />
        <div class="card-list">{list.map(renderTask)}</div>
      </div>
    );
  }
}
