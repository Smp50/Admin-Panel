import react from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './assets/main.scss';
// import Header from './componets/Header';
// import Footer from './componets/Footer';
import AdminDashboard from './Admin-Panel/Dashboard';
import Page from './pages/page';
import SideMenu from './Admin-Panel/sidebar';
import MenuManager from './Admin-Panel/pages/MenuManager';
import AdminPage from './Admin-Panel/pages/page';
import Module from './Admin-Panel/pages/modules';

const PageManage = () =>{
  const Location = useLocation();
  const AdminRoute = Location.pathname.startsWith('/admin-panel');
  const NotAdmin = Location.pathname.startsWith('/admin-panel');
  return(
    <>
        {/* {!AdminRoute && <Header />} */}
        {NotAdmin && <SideMenu />}
        <Routes>
          {/* Admin Path */}
          <Route path="/admin-panel" element={<AdminDashboard />} />
          <Route path="/admin-panel/menus" element={<MenuManager />} />
          <Route path='/admin-panel/pages' element={<AdminPage />} />
          <Route path='/admin-panel/modules' element={<Module />} />

          {/* Front Path */}
          <Route path="/:slug" element={<Page />} />
          {/* <Route path='/product' element={<Product />} />
          <Route path='/product-detail/:title' element={<ProductDetail />} />
          <Route path='/cart-page' element={<Cart />} /> */}
        </Routes>
        {/* {!AdminRoute && <Footer />} */}
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