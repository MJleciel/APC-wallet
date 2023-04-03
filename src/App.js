import logo from './logo.svg';
import './App.css';
import CreateAccount from './components/createAccount';
import IndexFile from './components';
import Routing from './routes/routing';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



function App() {
  return (
    <div className="App">
     <Routing/>
     <ToastContainer theme='dark' />
    </div>
  );
}

export default App;
