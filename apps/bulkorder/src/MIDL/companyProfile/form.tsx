import { db } from '@admin/configs';
import { collection, doc, getDoc } from 'firebase/firestore';
import * as yup from 'yup';
import { environment } from '../../environment';
import { defaultErrorMessage } from '../../constants';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
export const indianState = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

export interface addressType {
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  // email: string;
  city: string;
  state: string;
  phoneNumber: string;
  pincode: string;
}
// Regular expression for phone number validation. You might need to adjust this based on the specific format you expect.
export const phoneRegExp = /^[6-9]\d{9}$/; // This is an example for Indian mobile numbers. Adjust according to your target country's phone number format.

// Regular expression for pincode validation. You might need to adjust this based on the specific format you expect.
export const pincodeRegExp = /^[1-9][0-9]{5}$/; // This is an example for Indian pin codes. Adjust according to your target format.

// Define the validation schema
export const addressSchema = yup.object().shape({
  addressLine1: yup.string().required('Address Line 1 is required'),
  addressLine2: yup.string(), // This field is optional; remove .required() if this field is not mandatory.
  landmark: yup.string(), // This field is optional; you can add further restrictions.
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone number is required'),
  pincode: yup
    .string()
    .matches(pincodeRegExp, 'Pincode is not valid')
    .required('Pincode is required'),
});

export interface CompanyProfile {
  userName: string;
  email: string;
  organisationName: string;
  address: addressType[];
  phoneNumber: string;
}

export const companyProfileSchema = yup.object().shape({
  userName: yup.string().required('Username is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  organisationName: yup.string().required('Organisation name is required'),
  address: yup.array().of(
    yup.object().shape({
      addressLine1: yup.string().required('Address Line 1 is required'),
      addressLine2: yup.string(),
      landmark: yup.string(),
      city: yup.string().required('City is required'),
      state: yup.string().required('State is required'),
      phoneNumber: yup.string().required('Phone number is required'),
    })
  ),
  phoneNumber: yup.string().required('Phone number is required'),
});

export const initialValues: CompanyProfile = {
  address: [
    {
      addressLine1: '',
      addressLine2: '',
      city: '',
      phoneNumber: '',
      state: '',
      landmark: '',
      pincode:""
    },
  ],
  email: '',
  organisationName: '',
  phoneNumber: '',
  userName: '',
};

export const getCompanyProfile = async (uid: string) => {
  try {
    const docRef = await getDoc(doc(collection(db, 'reseller'), uid));
    if(!docRef.exists()) return null
    return docRef.data() as CompanyProfile;
  } catch (error: any) {
    console.log(error);
    
    showNotification({
      id: `reg-err-${Math.random()}`,
      autoClose: 5000,
      title: 'Error',
      message: environment.production ? defaultErrorMessage : error.message,
      color: 'red',
      icon: <IconX />,
      loading: false,
    });
  }
};
