import styles from './app.module.css'
import Banner from './components/Banner';
import Menu from './components/Menu';
import Nav from './components/Nav';
import AboutUs from './components/AboutUs'

function App() {
  return (<>
    <div className={styles.navContainer}>
      <Nav />
      <div className={styles.navLine}/>
    </div>

    <div className={styles.pageContainer}>
      <Banner />
      <Menu />
      <h1 className={styles.aboutUsHeading}>AboutUs</h1>
      <AboutUs />
    </div>
  </>
  );
}

export default App;
