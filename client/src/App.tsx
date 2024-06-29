import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Layout from './components/Layout/Layout';
import RequireAuth from './features/auth/RequireAuth';
import User from './pages/User/User';
import PersistLogin from './features/auth/PersistLogin';

function App() {
  return (
    <Layout>
      <Routes>
        {/* public routes*/}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* protected routes*/}

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/user" element={<User />} />
          </Route>
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
