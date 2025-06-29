import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Outlet, Routes } from 'react-router-dom';
import MenuManager from './pages/MenuManager';
import AdminPage from './pages/page';

function SideMenu() {
  
  return (
    <>
        <div className="side-menu">
            <ul>
                <li><Link to='/admin-panel'>Dashboard</Link></li>
                <li><Link to='/admin-panel/menus'>Menus</Link></li>
                <li><Link to='/admin-panel/pages'>Pages</Link></li>
                <li><Link to='/admin-panel/modules'>Modules</Link></li>
            </ul>
        </div>
    </>
  );
}
export default SideMenu;
