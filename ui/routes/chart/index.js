import { h, Component } from "preact";
import "./style";
import { getChart } from "../../utils/api";
import LineChart from "./linechart";
import { getFIlter } from "../../utils/url";

export default class Chart extends Component {
  state = {
    data: []
  };

  constructor(props) {
    super(props);
    const filter = getFIlter(props);
    getChart(filter).then(data => {
      this.setState({ data });
    });
  }

  render({ project, uri }, { data }) {
    return (
      <div>
        <h1>Chart for project: {project}</h1>
        <h3>{decodeURIComponent(uri)}</h3>
        <LineChart data={data} />
      </div>
    );
  }
}
