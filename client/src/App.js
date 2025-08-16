import './App.css';
import Banner from './components/Banner';
import Menu from './components/Menu';
import Nav from './components/Nav';

function App() {
  return (<>
      <Nav />
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <Banner />
      <Menu />
    </div>
  </>
  );
}

export default App;
