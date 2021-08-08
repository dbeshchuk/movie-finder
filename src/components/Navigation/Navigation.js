import { NavLink } from "react-router-dom";

const Navigation = () => (
  <nav>
    <NavLink
      exact
      to="/"
      className={"nav-link"}
      activeClassName={"active-nav-link"}
    >
      Home
    </NavLink>

    <NavLink
      to="/movies"
      className={"nav-link"}
      activeClassName={"active-nav-link"}
    >
      Movies
    </NavLink>
  </nav>
);

export default Navigation;
