import { h, Component } from "preact";
import { Router } from "preact-router";

import Header from "./header";
import Footer from "./footer";
import Projects from "../routes/projects";
import List from "../routes/list";
import View from "../routes/view";
import Chart from "../routes/chart";

if (module.hot) {
  require("preact/debug");
}

export default class App extends Component {
  handleRoute = e => {
    this.currentUrl = e.url;
    window.scrollTo({ top: 0 });
  };

  render() {
    return (
      <div id="app">
        <Header />
        <main class="container">
          <Router>
            <Projects path="/" />
            <List path="/list/" />
            <View path="/view/:id" />
            <Chart path="/chart/" />
          </Router>
        </main>
        <Footer />
      </div>
    );
  }
}
