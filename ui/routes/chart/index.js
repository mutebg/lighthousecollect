import { h, Component } from "preact";
import "./style";
import { getChart } from "../../utils/api";

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
        <h1>
          Chart for {project} - {decodeURIComponent(url)}
        </h1>
        {JSON.stringify(data)}
      </div>
    );
  }
}
