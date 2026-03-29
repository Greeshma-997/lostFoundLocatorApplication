
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginComponent/LoginPage';
import RegisterUser from './Components/LoginComponent/RegisterUser';
import AdminMenu from './Components/LoginComponent/AdminMenu';
import StudentMenu from './Components/LoginComponent/StudentMenu';
import LostItemRegistration from './Components/ItemComponents/LostItemRegistration';

import LostItemReport from './Components/ItemComponents/LostItemReport';
import FoundItemRegistration from './Components/ItemComponents/FoundItemRegistration';
import FoundItemReport from './Components/ItemComponents/FoundItemReport';
import MatchItemReport from './Components/ItemComponents/MatchItemReport';
import MatchItemSearch from './Components/ItemComponents/MatchItemSearch';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/register' element={<RegisterUser />} />
          <Route path='/admin-menu' element={<AdminMenu />} />
          <Route path='/student-menu' element={<StudentMenu />} />
          <Route path='/lost-entry' element={<LostItemRegistration/>}/>
           <Route path='/lost-list' element={<LostItemReport/>}/>
           <Route path='/found-entry' element={<FoundItemRegistration />} />
            <Route path='/found-list' element={<FoundItemReport />} />
             <Route path='/match-list' element={<MatchItemReport />} />
             <Route path='/search/:bid' element={<MatchItemSearch/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
