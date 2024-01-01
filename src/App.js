import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Index from './layouts/Index';

function App() {
  return (
    <BrowserRouter>
      <Index/>
    </BrowserRouter>
  );
}

export default App;
