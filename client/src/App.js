import react from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './assets/main.scss';
import Header from './componets/header';
import Footer from './componets/footer';
import AdminDashboard from './Admin-Panel/Dashboard';
import Page from './pages/page';
import SideMenu from './Admin-Panel/sidebar';
import MenuManager from './Admin-Panel/pages/MenuManager';
import AdminPage from './Admin-Panel/pages/page';
import Module from './Admin-Panel/pages/modules';

const PageManage = () =>{
  const Location = useLocation();
  const AdminRoute = Location.pathname.startsWith('/admin-panel');
  return(
    <>
        {!AdminRoute && <Header />}
        {AdminRoute && <SideMenu />}
        <Routes>
          {/* Admin Path */}
          <Route path="/admin-panel" element={<AdminDashboard />} />
          <Route path="/admin-panel/menus" element={<MenuManager />} />
          <Route path='/admin-panel/cms-page' element={<AdminPage />} />
          <Route path='/admin-panel/cms-page/edit/:id' element={<AdminPage />} />
          <Route path='/admin-panel/modules' element={<Module />} />

          {/* Front Path */}
          <Route path="/:slug" element={<Page />} />
        </Routes>
        {!AdminRoute && <Footer />}
    </>
  )
}

function App(){
  
  return(
    <>
      <BrowserRouter>
        <PageManage />
      </BrowserRouter>
    </>
  )
}

export default App;