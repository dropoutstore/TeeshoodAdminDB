import { useEffect } from 'react';
import { NavBar } from '../components/navbar/Topbar';
import Orders from '../pages/Orders';
import { showNotification } from '@mantine/notifications';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@admin/configs';
import { IconX } from '@tabler/icons-react';
import { setUser } from '../components/auth/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { LoadingOverlay } from '@mantine/core';
import Admin from '../components/AdminAuth';
import { Route, Routes } from 'react-router-dom';
import Test from './test';
import Products from '../pages/products';
import Employee from '../pages/EmployeeManagement';

export function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    const Unsubscribe = onAuthStateChanged(auth, async (cred) => {
      if (cred) {
        const idToken = await cred?.getIdTokenResult();
        if (!idToken?.claims['admin']) {
          showNotification({
            id: `reg-err-${Math.random()}`,
            autoClose: 5000,
            title: 'Not Authorised!',
            message: "You're not authorized!",
            color: 'red',
            icon: <IconX />,
            loading: false,
          });

          await signOut(auth);
          return;
        }
        dispatch(setUser(cred));
      } else dispatch(setUser(null));
    });
    return () => Unsubscribe();
  }, []);
if(user === undefined) return <LoadingOverlay visible />
else if(!user) return <Admin />
  return (
    <NavBar>
          <Routes>
            {/* <Route path='/' element={<Test />} /> */}
            <Route path='/' element={<Employee />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/products' element={<Products />} />
      </Routes>
    </NavBar>
  );
}

export default App;
