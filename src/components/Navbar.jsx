export default function Navbar() {
  return (
    <nav className="navbar bg-blue-600">
      <div className="container">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="/about" className="nav-link">
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
