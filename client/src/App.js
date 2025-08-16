import './App.css';
import Banner from './components/Banner';
import Menu from './components/Menu';

function App() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>

      <Banner />
      <Menu />
    </div>
  );
}

export default App;
