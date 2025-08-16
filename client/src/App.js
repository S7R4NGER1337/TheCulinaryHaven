import styles from './app.module.css'
import Banner from './components/Banner';
import Menu from './components/Menu';
import Nav from './components/Nav';

function App() {
  return (<>
    <div className={styles.navContainer}>
      <Nav />
      <div className={styles.navLine}/>
    </div>

    <div className={styles.pageContainer}>
      <Banner />
      <Menu />
    </div>
  </>
  );
}

export default App;
