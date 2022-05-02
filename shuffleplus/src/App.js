import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './Login';
import HomePage from './HomePage'

const code = new URLSearchParams(window.location.search).get('code')

function App() {
  return code? <HomePage code={code}/> : (
    <div className="App">
      <header className="App-header">
        Welcome to SufflePlus
        <Login/>
      </header>
    </div>
  );
}

export default App;
