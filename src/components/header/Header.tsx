import './header.css';
export default function Header() {
  return (
    <header className="navbar">
      <nav className="nav-container">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="logo"
          style={{
            height: '50px',
            objectFit: 'cover',
          }}
        />
        <ul
          style={{
            display: 'flex',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <a href="#about">.about()</a>
          </li>
          <li>
            <a href="#resume">.resume()</a>
          </li>
          {/* <li>
            <a href="#projects">.projects()</a>
          </li> */}
          {/* <li>
            <a href="/blog">.blog()</a>
          </li> */}
          <li>
            <a href="#contact">.contact()</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
