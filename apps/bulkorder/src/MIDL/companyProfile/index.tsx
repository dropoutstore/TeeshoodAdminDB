import { useForm, yupResolver } from '@mantine/form';
import {
  CompanyProfile,
  companyProfileSchema,
  getCompanyProfile,
  indianState,
  initialValues,
} from './form';
import {
  Autocomplete,
  Button,
  Select,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { camelToNormal, defaultErrorMessage } from '../../constants';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { db } from '@admin/configs';
import { showNotification } from '@mantine/notifications';
import { environment } from '../../environment';
import { IconCheck, IconCircleCheckFilled, IconX } from '@tabler/icons-react';
import { useEffect } from 'react';
import { setCompany } from './reduxSlice';

export default function CompanyRegistration({
  editMode,
}: {
  editMode?: boolean;
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const form = useForm<CompanyProfile>({
    initialValues: { ...initialValues, email: user?.email as string },
    validate: yupResolver(companyProfileSchema),
  });
  //   const { companyProfile } = useSelector((state: RootState) => state.Company);
  useEffect(() => {
    if (editMode) {
      getCompanyProfile(user?.uid as string).then((companyProfile) => {
        if (companyProfile) form.setValues(companyProfile);
      });
    }
  }, [editMode]);
  console.log(form.errors);

  return (
    <div className="p-2 md:p-6 max-w-lg mx-auto">
      <form
        className="grid grid-cols-2 "
        onSubmit={form.onSubmit(async (values) => {
          try {
            const target = {
              ...values,
              resellerId: user?.uid,
              uid: user?.uid,
            };
            await setDoc(doc(collection(db, 'reseller'), user?.uid), target);
            dispatch(setCompany(target));
            showNotification({
              id: `reg-err-${Math.random()}`,
              autoClose: 5000,
              title: 'Success',
              message: 'profile successFully updated',
              color: 'green',
              icon: <IconCircleCheckFilled />,
              loading: false,
            });
          } catch (error: any) {
            showNotification({
              id: `reg-err-${Math.random()}`,
              autoClose: 5000,
              title: 'Failed',
              message: environment.production
                ? defaultErrorMessage
                : error.message,
              color: 'red',
              icon: <IconX />,
              loading: false,
            });
          }
        })}
      >
        <Title order={4} align="center" className="col-span-2">
          Company Profile
        </Title>
        {/* {Object.keys(initialValues).map(
          (formVal) =>
            `<TextInput
                className="m-2"
                name={"${formVal}"}
                label={"${camelToNormal(formVal)}"}
                {...form.getInputProps("${formVal}")}
            />`
        )} */}
        <TextInput
          className="m-2 col-span-2"
          name={'userName'}
          label={'User Name'}
          {...form.getInputProps('userName')}
        />
        <TextInput
          className="m-2 col-span-2"
          name={'organisationName'}
          label={'Organisation Name'}
          {...form.getInputProps('organisationName')}
        />
        <TextInput
          className="m-2 col-span-2"
          name={'phoneNumber'}
          label={'Phone Number'}
          {...form.getInputProps('phoneNumber')}
        />
        <TextInput
          className="m-2 col-span-2"
          disabled
          name={'email'}
          label={'Email'}
          {...form.getInputProps('email')}
        />
        <div className="p-2 mt-4 bg-slate-100 grid col-span-2 rounded-xl">
          <Text align="center" className="py-4 col-span-2">
            Default delivery address
          </Text>
          <TextInput
            className="m-2 col-span-2"
            name={'addressLine1'}
            label={'Address Line1'}
            {...form.getInputProps('address.0.addressLine1')}
          />
          <TextInput
            className="m-2 col-span-2"
            name={'addressLine2'}
            label={'Address Line2'}
            {...form.getInputProps('address.0.addressLine2')}
          />

          <TextInput
            className="m-2 col-span-2"
            name={'landmark'}
            label={'Landmark'}
            {...form.getInputProps('address.0.landmark')}
          />
          <TextInput
            className="m-2 col-span-2 md:col-span-1"
            name={'city'}
            label={'City'}
            {...form.getInputProps('address.0.city')}
          />
          <Autocomplete
            className="m-2 col-span-2 md:col-span-1"
            data={indianState}
            name={'state'}
            label={'State'}
            {...form.getInputProps('address.0.state')}
          />
          <TextInput
            className="m-2 col-span-2"
            name={'phoneNumber'}
            label={'Phone Number'}
            {...form.getInputProps('address.0.phoneNumber')}
          />
          <TextInput
            className="m-2 col-span-2"
            name={'pincode'}
            label={'pincode'}
            {...form.getInputProps('address.0.pincode')}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
