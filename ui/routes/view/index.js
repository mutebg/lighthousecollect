import { h, Component } from "preact";
import "./style";

export default class View extends Component {
  render({ id }) {
    const iframeSrc = process.env.API_URL + "view/" + id + "/html";
    return (
      <div>
        <iframe src={iframeSrc} class="report-iframe" />
      </div>
    );
  }
}
