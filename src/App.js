import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Index from './layouts/Index';
import Login from './pages/auth/Login';

function App() {
  const isAuthenticated = localStorage.getItem('Token');

  return (
    <BrowserRouter>
      {
        isAuthenticated ? (
          <Index/>
        ) : (
          <Login/>
        )
      }
    </BrowserRouter>
  );
}

export default App;
