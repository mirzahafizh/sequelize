import '@fortawesome/fontawesome-free/css/all.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AddTeamMember from './components/AddTeamMember';
import EditProject from './components/EditProject';
import EditTeamMember from './components/EditTeamMember';
import ManageProject from './components/manage_project';
import ManageTeam from './components/manage_team';
import DashboardLayout from './pages/DashboardLayout';
import Home from './pages/home';
import Login from './pages/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* Wrap all dashboard-related pages in DashboardLayout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="manage_project" element={<ManageProject />} />
          <Route path="edit_project/:id" element={<EditProject />} />
          <Route index element={<ManageProject />} /> {/* Default dashboard content */}
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="manage_team" element={<ManageTeam />} />
          <Route path="add_team_member" element={<AddTeamMember />} />
          <Route path="edit_team/:id" element={<EditTeamMember />} />
          <Route index element={<ManageProject />} /> {/* Default dashboard content */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
