
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import Messenger from './components/AccountManage/Messenger';
import Profile from './components/AccountManage/Profile';
import Settings from './components/AccountManage/Settings';
import UpdateEmail from './components/AccountManage/Settings/Email';
import UpdateFio from './components/AccountManage/Settings/Fio';
import Index from './components/AccountManage/Settings/Index/index';
import UpdatePassword from './components/AccountManage/Settings/Password';
import UpdatePhone from './components/AccountManage/Settings/Phone';
import RemoveProfile from './components/AccountManage/Settings/RemoveProfile';
import UpdateSkills from './components/AccountManage/Settings/Skills';
import Sociallink from './components/AccountManage/Settings/Sociallink';
import VerifyEmail from './components/AccountManage/Settings/VerifyEmail';
import VerifyProfile from './components/AccountManage/Settings/VerifyProfile';
import Workstudy from './components/AccountManage/Settings/Workstudy';
import LoginUser from './components/LoginUser';
import NotFound from './components/NotFound';
import RegisterUser from './components/RegisterUser';
import Rights from './components/Rights';
import Terms from './components/Terms';
import Welcome from './components/Welcome';
import DefaultLayout from './Layout/DefaultLayout';
import ProtectedMiddleware from './Layout/ProtectedMiddleware';
import UnprotectedMiddleware from './Layout/UnprotectedMiddleware';

function App() {



  return (
    <>
      <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Welcome />} />
            <Route path="" element={<UnprotectedMiddleware />}>
              <Route path="register" element={<RegisterUser />} />
              <Route path="login" element={<LoginUser />} />
            </Route>
            <Route path="profile" element={<ProtectedMiddleware />}>
                <Route index element={<Profile />} />
                <Route path="messenger" element={<Messenger />} ></Route>
                <Route path="settings" element={<Settings />} >
                <Route index element={<Index />} />
                <Route path="fio" element={<UpdateFio />} />
                <Route path="phone" element={<UpdatePhone />} />
                <Route path="workstudy" element={<Workstudy />} />
                <Route path="skills" element={<UpdateSkills />} />

                <Route path="sociallinks" element={<Sociallink />} />
                
                <Route path="verifyemail" element={<VerifyEmail />} />
                <Route path="verifyprofile" element={<VerifyProfile />} />

                <Route path="email" element={<UpdateEmail />} />
                <Route path="password" element={<UpdatePassword />} />
                <Route path="removeaccount" element={<RemoveProfile />} />
              </Route>
            </Route>
            <Route path="about" element={<About />} />
            <Route path="terms" element={<Terms />} />
            <Route path="privacy" element={<Rights />} />
            <Route path="protected" element={<Rights />} />
          </Route>
          <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
