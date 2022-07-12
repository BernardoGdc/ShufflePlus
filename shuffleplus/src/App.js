import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './Login';
import HomePage from './HomePage'

const code = new URLSearchParams(window.location.search).get('code')

//if we have code show homepage if we dont have code show log in screen
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
