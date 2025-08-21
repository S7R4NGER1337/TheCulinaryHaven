import styles from './app.module.css'
import Banner from './components/Banner';
import Menu from './components/Menu';
import Nav from './components/Nav';
import AboutUs from './components/AboutUs'
import { useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import Admin from './admin/Admin';
import AdminForm from './admin/AdminForm';

function App() {
  const bannerRef = useRef(null)
  const menuRef = useRef(null)
  const aboutUsRef = useRef(null)

  return (<>

    <Routes>
      <Route path='/admin' element={<Admin />} />
      <Route path='/admin/edit/:id' element={<AdminForm />} />
      <Route path='/' element={<>
        <div className={styles.navContainer}>
          <Nav bannerRef={bannerRef} menuRef={menuRef} aboutUsRef={aboutUsRef} />
          <div className={styles.navLine} />
        </div>
        <div className={styles.pageContainer}>
          <div ref={bannerRef}>
            <Banner menuRef={menuRef} />
          </div>
          <div ref={menuRef}>
            <Menu />
          </div>
          <h1 className={styles.aboutUsHeading}>AboutUs</h1>
          <div style={{ width: '100%' }} ref={aboutUsRef}>
            <AboutUs />
          </div>
        </div>
        <p className={styles.footer}>© 2025 The Culinary Haven. All rights reserved</p>
      </>
      } />
      <Route path='*' element={<h1>Page Not Found</h1>} />
    </Routes>
  </>
  );
}

export default App;
