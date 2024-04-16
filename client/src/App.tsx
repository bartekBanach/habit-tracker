import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Layout from './components/Layout/Layout';
import RequireAuth from './features/auth/RequireAuth';

/*import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;*/

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
