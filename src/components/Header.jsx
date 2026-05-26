import { NavLink } from "react-router";

export default function Header() {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <NavLink to="/" className="nav-link">
          Forside
        </NavLink>
        <NavLink to="/create" className="nav-link">
          Opret et event
        </NavLink>
      </nav>
    </header>
  );
}
