import { h, Component } from "preact";
import "./style";

const Header = () => (
  <header class="header">
    <a href="/" class="header__logo">
      Lighthouse Collect
    </a>

    <div class="header__social">
      <a
        href="https://github.com/mutebg/lighthousecollect"
        target="_blank"
        class="social"
      >
        <i class="fab fa-github" />
      </a>
    </div>
  </header>
);
export default Header;
