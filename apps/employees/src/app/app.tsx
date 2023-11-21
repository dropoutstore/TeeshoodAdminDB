import { useEffect } from 'react';
import { NavBar } from '../components/navbar/Topbar';
import { showNotification } from '@mantine/notifications';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '@admin/configs';
import { IconX } from '@tabler/icons-react';
import { setUser } from '../components/auth/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { LoadingOverlay } from '@mantine/core';
import Admin from '../components/AdminAuth';
import { Route, Routes } from 'react-router-dom';
import Test from './test';
import { deleteField, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { employeeClaimToken } from '../constants';
import { Orders } from '@admin/orders';
import { Products } from '@admin/products';
import OrderComponent from '../pages/order';
import ProductComponent from '../pages/product';

export function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    let unsub: any = () => void 0;
    const Unsubscribe = onAuthStateChanged(auth, async (cred) => {
      if (cred?.email) {
        const ref = doc(db, 'employees', cred.email);
        const idToken = await cred?.getIdTokenResult();
        console.log("idToken",idToken.claims);
        if (!idToken?.claims[employeeClaimToken]) {
          await updateDoc(ref, { dashboardAction: deleteField() });
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

        await auth.currentUser?.getIdToken(true);
        dispatch(setUser({ user: cred, claims: idToken.claims }));
 
        const getEmployeeAccessListner = async () => {
          if (cred.email) {
            unsub = onSnapshot(ref, async (doc: any) => {
              const data = doc.data();
              if (data.dashboardAction === 'reload') {
                setTimeout(async () => {
                  await auth.currentUser?.getIdToken(true);
                  await updateDoc(ref, { dashboardAction: deleteField() });
                  window.location.reload();
                }, 1000);
              }
            });
          }
        };
        getEmployeeAccessListner();
      } else dispatch(setUser({ user: null, claims: {} }));
    });
    return () => {
      Unsubscribe();
      unsub();
    };
  }, []);
if(user === undefined) return <LoadingOverlay visible />
else if(!user) return <Admin />
  return (
    <NavBar>
          <Routes>
            <Route path='/orders' element={<OrderComponent />} />
            <Route path='/products' element={<ProductComponent />} />
            {/* <Route path='/' element={<Test />} /> */}
      </Routes>
    </NavBar>
  );
}

export default App;
