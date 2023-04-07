import logo from './logo.svg';
import './App.css';
import CreateAccount from './components/createAccount';
import IndexFile from './components';
import Routing from './routes/routing';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Sidebar from './components/sidebar';
import NewSidebar from './components/sidebar';
import Layout from './Layout/layout';



function App() {
  return (
    <div className="App">
      <Layout >
        <Routing />
      </Layout>
      <ToastContainer theme='dark' />
    </div>
  );
}

export default App;
