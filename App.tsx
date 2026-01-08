
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  MessageCircle, 
  BookOpen, 
  Wind, 
  Library, 
  Users, 
  Activity, 
  LogOut, 
  User as UserIcon,
  Calendar,
  Settings,
  Bell,
  CheckCircle2,
  DollarSign,
  Briefcase
} from 'lucide-react';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import StudentHome from './pages/student/StudentHome';
import AiraChat from './pages/student/AiraChat';
import Journaling from './pages/student/Journaling';
import Relaxation from './pages/student/Relaxation';
import ResourceLibrary from './pages/student/ResourceLibrary';
import Counselling from './pages/student/Counselling';
import Community from './pages/student/Community';
import Trackers from './pages/student/Trackers';

import CounsellorHome from './pages/counsellor/CounsellorHome';
import ScheduleManager from './pages/counsellor/ScheduleManager';
import AppointmentHistory from './pages/counsellor/AppointmentHistory';
import SessionHandler from './pages/counsellor/SessionHandler';

import { User, UserRole } from './types';

// Moved Layout component outside to avoid closure issues and properly type children
interface LayoutProps {
  children: React.ReactNode;
  currentUser: User | null;
  handleLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentUser, handleLogout }) => {
  const location = useLocation();
  const isStudent = currentUser?.role === UserRole.STUDENT;

  const navItems = isStudent ? [
    { path: '/home', icon: <Home size={20} />, label: 'Home' },
    { path: '/aira', icon: <MessageCircle size={20} />, label: 'Aira AI' },
    { path: '/journal', icon: <BookOpen size={20} />, label: 'Journal' },
    { path: '/relax', icon: <Wind size={20} />, label: 'Relax' },
    { path: '/resources', icon: <Library size={20} />, label: 'Library' },
    { path: '/counselling', icon: <CheckCircle2 size={20} />, label: 'Support' },
    { path: '/community', icon: <Users size={20} />, label: 'Peer' },
    { path: '/trackers', icon: <Activity size={20} />, label: 'Track' },
  ] : [
    { path: '/c-home', icon: <Home size={20} />, label: 'Dashboard' },
    { path: '/c-schedule', icon: <Calendar size={20} />, label: 'Schedule' },
    { path: '/c-history', icon: <Briefcase size={20} />, label: 'Sessions' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
          <span className="hidden md:block font-bold text-xl text-slate-800">SafeSpace</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 py-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                location.pathname === item.path 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {item.icon}
              <span className="hidden md:block font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="hidden md:block mb-4 p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-400 font-semibold uppercase">Profile</p>
            <p className="text-sm font-medium text-slate-700 truncate">
              {isStudent ? currentUser?.anonymousName : currentUser?.fullName}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span className="hidden md:block font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative custom-scrollbar">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-bottom border-slate-200 p-4 px-8 flex justify-between items-center">
           <h2 className="text-lg font-semibold text-slate-700">
             {navItems.find(n => n.path === location.pathname)?.label || 'SafeSpace'}
           </h2>
           <div className="flex items-center gap-4">
             <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
               <Bell size={20} />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
             </button>
             <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
               <UserIcon size={18} />
             </div>
           </div>
        </header>
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Simple session persistence simulator
  useEffect(() => {
    const savedUser = localStorage.getItem('safespace_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('safespace_user');
    setCurrentUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={setCurrentUser} />} />
        <Route path="/register" element={<Register onRegister={setCurrentUser} />} />
        
        {/* Student Routes */}
        <Route path="/home" element={currentUser?.role === UserRole.STUDENT ? <Layout currentUser={currentUser} handleLogout={handleLogout}><StudentHome user={currentUser} /></Layout> : <Navigate to="/login" />} />
        <Route path="/aira" element={currentUser?.role === UserRole.STUDENT ? <Layout currentUser={currentUser} handleLogout={handleLogout}><AiraChat user={currentUser} /></Layout> : <Navigate to="/login" />} />
        <Route path="/journal" element={currentUser?.role === UserRole.STUDENT ? <Layout currentUser={currentUser} handleLogout={handleLogout}><Journaling user={currentUser} /></Layout> : <Navigate to="/login" />} />
        <Route path="/relax" element={currentUser?.role === UserRole.STUDENT ? <Layout currentUser={currentUser} handleLogout={handleLogout}><Relaxation /></Layout> : <Navigate to="/login" />} />
        <Route path="/resources" element={currentUser?.role === UserRole.STUDENT ? <Layout currentUser={currentUser} handleLogout={handleLogout}><ResourceLibrary /></Layout> : <Navigate to="/login" />} />
        <Route path="/counselling" element={currentUser?.role === UserRole.STUDENT ? <Layout currentUser={currentUser} handleLogout={handleLogout}><Counselling user={currentUser} /></Layout> : <Navigate to="/login" />} />
        <Route path="/community" element={currentUser?.role === UserRole.STUDENT ? <Layout currentUser={currentUser} handleLogout={handleLogout}><Community user={currentUser} /></Layout> : <Navigate to="/login" />} />
        <Route path="/trackers" element={currentUser?.role === UserRole.STUDENT ? <Layout currentUser={currentUser} handleLogout={handleLogout}><Trackers user={currentUser} /></Layout> : <Navigate to="/login" />} />
        
        {/* Counsellor Routes */}
        <Route path="/c-home" element={currentUser?.role === UserRole.COUNSELLOR ? <Layout currentUser={currentUser} handleLogout={handleLogout}><CounsellorHome user={currentUser} /></Layout> : <Navigate to="/login" />} />
        <Route path="/c-schedule" element={currentUser?.role === UserRole.COUNSELLOR ? <Layout currentUser={currentUser} handleLogout={handleLogout}><ScheduleManager user={currentUser} /></Layout> : <Navigate to="/login" />} />
        <Route path="/c-history" element={currentUser?.role === UserRole.COUNSELLOR ? <Layout currentUser={currentUser} handleLogout={handleLogout}><AppointmentHistory user={currentUser} /></Layout> : <Navigate to="/login" />} />
        <Route path="/c-session/:id" element={currentUser?.role === UserRole.COUNSELLOR ? <Layout currentUser={currentUser} handleLogout={handleLogout}><SessionHandler user={currentUser} /></Layout> : <Navigate to="/login" />} />

        {/* Fallback */}
        <Route path="/" element={<Navigate to={currentUser ? (currentUser.role === UserRole.STUDENT ? '/home' : '/c-home') : '/login'} />} />
      </Routes>
    </Router>
  );
};

export default App;
