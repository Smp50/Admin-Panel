import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Footer() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/menus/footer`)
      .then(res => setMenus(res.data));
  }, []);

  return (
    <footer>
      <nav>
        {menus.map(menu => (
          <Link key={menu.id} to={`/${menu.slug}`}>{menu.label}</Link>
        ))}
      </nav>
      <p>© 2025 My CMS Project</p>
    </footer>
  );
}
export default Footer;