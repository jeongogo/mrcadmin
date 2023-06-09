import { Routes, Route } from "react-router-dom";
import HomePage from './pages/Home.page';
import LoginPage from './pages/auth/Login.page';
import UserListPage from './pages/user/List.page';
import FeedListPage from './pages/feed/List.page';
import FeedDetailPage from './pages/feed/Detail.page';
import PrivacyPage from './pages/policy/Privacy.page';
import ServicePage from './pages/policy/Service.page';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user" element={<UserListPage />} />
      <Route path="/feed" element={<FeedListPage />} />
      <Route path="/feed/:id" element={<FeedDetailPage />} />
      <Route path="/policy/privacy" element={<PrivacyPage />} />
      <Route path="/policy/service" element={<ServicePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
