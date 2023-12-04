// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useDispatch, useSelector } from 'react-redux';
import LOGO from '../assets/LOGO.png';
import { RootState } from './store';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@admin/configs';
import { setUser } from '../components/AdminAuth/redux-slice';
import Admin from '../components/AdminAuth';
import { LoadingOverlay } from '@mantine/core';
import CompanyRegistration from '../MIDL/companyProfile';
import { getCompanyProfile } from '../MIDL/companyProfile/form';
import { setCompany } from '../MIDL/companyProfile/reduxSlice';
import { NavBar } from '../components/navbar/Topbar';
import { Route, Routes } from 'react-router-dom';
import Orders from '../MIDL/Order';
import { Payment } from '../MIDL/payment/payment';
import Home from '../MIDL/home/Home';
import { BulkCheckOut } from '../MIDL/Order/bulk/BulkCheckOut';
import {Products} from '../MIDL/products'

export function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { companyProfile } = useSelector((state: RootState) => state.Company);

  useEffect(() => {
    const Unsubscribe = onAuthStateChanged(auth, async (cred) => {
      dispatch(setUser(cred));
      if (cred) {
        const companyProfile = await getCompanyProfile(cred.uid);
        dispatch(setCompany(companyProfile));
      }
    });
    return () => Unsubscribe();
  }, []);

  // if (user === undefined) return <LoadingOverlay visible />;
  // else if (!user) return <Admin />;
  // else if (companyProfile === undefined) return <LoadingOverlay visible />;
  // else if (user && companyProfile) {
    return (
      <div>
        <NavBar>
          <Routes>
            <Route index element={<Home />} />
            <Route
              path="settings"
              element={<CompanyRegistration editMode={true} />}
            />
            <Route path="bulk/checkout/:orderId" element={<BulkCheckOut />} />
            <Route path="bulk/pay/:orderId" element={<Payment />} />
            <Route path="products" element={<Products />} />
            <Route path="CMI" element={<Products />} />
            <Route path="orders" element={<Orders />} />
          </Routes>
        </NavBar>
      </div>
    );
  // } else if (user && !companyProfile) {
  //   return (
  //     <div>
  //       <img src={LOGO} className="m-4 h-16 block mx-auto" alt="" />
  //       <CompanyRegistration />
  //     </div>
  //   );
  // }
}

export default App;
