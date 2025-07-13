import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Header() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/menus/header`)
      .then(res => setMenus(res.data));
  }, []);

  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex align-items-center">
            <nav>
              <ul className='d-flex align-items-center gap-3 list-unstyled mb-0'>
                <li><Link to=''>Home</Link></li>
              {menus.map((menu, index) => (
                <li><Link key={index} to={`/${menu.slug}`}>{menu.label}</Link></li>
              ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;