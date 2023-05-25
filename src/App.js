import logo from './logo.svg';
import './App.css';

import IndexFile from './components';
import Routing from './routes/routing';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Sidebar from './components/sidebar';
import NewSidebar from './components/sidebar';
import Layout from './Layout/layout';
import Swal from 'sweetalert2';
import useIdle from './useIdleTimer';
import { useEffect,useContext } from 'react';
import {  useNavigate } from 'react-router-dom';
import appContext from './context/globalContext';




function App() {
  let contextData = useContext(appContext);
  let navigate=useNavigate()
  const logout = () => {

    if (isIdle) {
      contextData.setToken('')
      localStorage.clear()
      navigate('/login')
      Swal.fire('',"Your session is expired please login again.","info")
    }
  }
  const { isIdle, getLastActiveTime, getRemainingTime } = useIdle({ onIdle: logout, idleTime: 5 })
  
  useEffect(() => {
    logout()

  }, [isIdle]);
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
