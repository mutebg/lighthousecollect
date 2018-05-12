import { h, Component } from "preact";
import "./style";
import { getProjects } from "../../utils/api";

export default class Projects extends Component {
  state = {
    projects: []
  };

  constructor() {
    super();
    getProjects().then(projects => {
      this.setState({ projects });
    });
  }

  render(_, { projects }) {
    return (
      <div>
        <h1>Projects</h1>
        <table class="table table-striped project-table">
          {projects.map(p => (
            <tr>
              <td>
                <a href={`/list?project=${p}`}>{p}</a>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
