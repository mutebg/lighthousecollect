import { h, Component } from "preact";
import "./style";
import { getChart } from "../../utils/api";
import LineChart from "./linechart";

export default class Chart extends Component {
  state = {
    data: []
  };

  constructor(props) {
    super(props);
    const { project, url } = props;
    getChart({ project, url }).then(data => {
      this.setState({ data });
    });
  }

  render({ project, url }, { data }) {
    return (
      <div>
        <h1>Chart for project: {project}</h1>
        <h3>{decodeURIComponent(url)}</h3>
        <LineChart data={data} />
      </div>
    );
  }
}
