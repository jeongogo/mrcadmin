import { Routes, Route } from "react-router-dom";
import userStore from './store/store';
import HomePage from './pages/Home.page';
import UserListPage from './pages/user/List.page';
import FeedListPage from './pages/feed/List.page';
import LoginPage from './pages/auth/Login.page';
import './App.css';

function App() {
  const user = userStore((state) => state.user);

  return (
    <Routes>
      {user
        ?
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/user" element={<UserListPage />} />
            <Route path="/feed" element={<FeedListPage />} />
          </>
        :
          <>
            <Route path="/*" element={<LoginPage />} />
          </>
      }
    </Routes>
  );
}

export default App;
