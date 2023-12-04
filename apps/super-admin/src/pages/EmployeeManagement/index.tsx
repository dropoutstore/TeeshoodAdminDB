import {
  Button,
  Checkbox,
  LoadingOverlay,
  Modal,
  Popover,
  Switch,
  Text,
  Title,
} from '@mantine/core';
import { randomId, useListState, useMediaQuery } from '@mantine/hooks';
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import * as yup from 'yup';
import 'react-medium-image-zoom/dist/styles.css';
//   import { conditionalRowStyles } from './conditionalStyle';
//   import { ExpandedComponent } from './expandedComponent';
import { IconEdit, IconFilter, IconX } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';
import { useForm, yupResolver } from '@mantine/form';
import { staffCollection } from './constants';
import AddEmployee from './addEmployee';
import EditEmployee from './editEmployee';
import { FilterComponent } from './FilterComponent';
import { db } from '@admin/configs';
import { environment } from '../../environment';
import { defaultErrorMessage } from '../../constants';
//   import { Filter } from './Filter';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export default function Employee({}: Props) {
  const [data, setData] = useState<staffType[] | undefined>(undefined);
  const [filterOpen, setFilterOpen] = useState(false);
  const [editData, setEditData] = useState<staffType | null>(null);
  const [loading, setloading] = useState(false);
  const mediaQuery = useMediaQuery('(min-width: 768px)');
  // const [filterText, setFilterText] = useState<null|string>(null)
  const q = query(staffCollection);
  useEffect(() => {
    const unsub = onSnapshot(q, (docs) => {
      const data = docs.docs.map((d) => ({ ...d.data(), id: d.id })) as any;
      setData(data);
      // const result = data.map((a:any) => ({ ...a, access: JSON.parse(a.access) }))
      // setData(result)
    });
    return () => unsub();
  }, []);

  const [values, handlers] = useListState(employeeAccesses);
  const allChecked = values.every((value: any) => value.checked);
  const indeterminate =
    values.some((value: any) => value.checked) && !allChecked;

  const items = values.map((value: any, index: any) => (
    <Checkbox
      mt="xs"
      ml={33}
      label={value.label}
      key={value.key}
      checked={value.checked}
      onChange={(event) =>
        handlers.setItemProp(index, 'checked', event.currentTarget.checked)
      }
    />
  ));

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      access: [],
    },
    validate: yupResolver(
      yup
        .object()
        .shape({
          name: yup
            .string()
            .min(3, 'minimum 3 charecters required')
            .max(50, 'Name cannot exceed 25 charecters')
            .required('Name cannot be empty'),
          email: yup
            .string()
            .email('wrong email')
            .required('subject cannot be empty'),
          description: yup.array().required(),
        })
        .required()
    ),
  });

  const columns = [
    {
      name: 'Enable',
      cell: (row: any) => (
        <Switch
          maxLength={20}
          checked={row.enabled}
          onChange={async () => {
            const docref = doc(db, 'employees', row.id);
            await updateDoc(docref, {
              enabled: !row.enabled,
              dashboardAction:"reload"
            });
          }}
        />
      ),
      grow: 0.2,
    },
    {
      name: 'Name',
      cell: (row: any) => row.name,
    },
    {
      name: 'Email',
      cell: (row: any) => row.email,
    },
    {
      name: 'Access',
      cell: (row: any) =>
        // <div className='grid grid-cols-2 gap-y-1'>
        // {
        row.access.map((a: string) => (
          <>
            {/* <Chip key={a} size="xs"> */}
            {a},&ensp;
            {/* </Chip> */}
          </>
          // ))}
          // </div>
        )),
    },

    {
      name: 'Action',
      cell: (row: any) => {
        return (
          <div className="flex gap-3 justify-center">
            <Button
              className={`${mediaQuery ? 'w-34' : 'w-12'}`}
              size={mediaQuery ? 'sm' : 'xs'}
              variant="outline"
              onClick={() => setEditData(row)}
            >
              <IconEdit />
              {mediaQuery && <>Edit Access</>}
            </Button>
          </div>
        );
      },
    },
  ];
  // console.log(values);

  if (!data) return <LoadingOverlay visible />;
  return (
    <div className={`bg-white${mediaQuery ? ' p-10' : ' py-4'} rounded-lg`}>
      <div>
        <Title align="center" order={3} className="text-gray-700">
          Employees
        </Title>
      </div>
      <div className="grid lg:grid-cols-2 gap-5 my-5">
        <div>
          <FilterComponent
            setData={setData}
            loading={loading}
            setLoading={setloading}
          />
        </div>
        <div className="flex justify-evenly">
          <Popover
            opened={filterOpen}
            onClose={() => setFilterOpen(false)}
            width={200}
            position="bottom"
            withArrow
            shadow="md"
          >
            <button
              onClick={() => setFilterOpen(true)}
              className="flex gap-2 p-2 bg-slate-100 hover:bg-slate-200 active:bg-slate-100 w-fit rounded-lg text-gray-500 col-span-2 cursor-pointer border-none "
            >
              <Text>Filter</Text>
              <IconFilter />
            </button>

            <Popover.Dropdown>
              <div className="space-y-2">
                <div className="text-right">
                  <Button
                    size="xs"
                    onClick={async () => {
                      try {
                        const arr = [] as any;
                        const docRef = collection(db, 'employees');
                        const data = values.filter((a) => a.checked === true);
                        data.forEach((a) => arr.push(a.value));
                        const q = query(
                          docRef,
                          where('access', 'array-contains-any', arr)
                        );
                        const docs = await getDocs(q);
                        const data2 = docs.docs.map((d) => ({
                          ...d.data(),
                          id: d.id,
                        })) as any;
                        setData(data2);
                      } catch (error: any) {
                        showNotification({
                          id: `reg-err-${Math.random()}`,
                          autoClose: 5000,
                          title: 'Error',
                          message: environment.production
                            ? defaultErrorMessage
                            : error.message,
                          color: 'red',
                          icon: <IconX />,
                          loading: false,
                        });
                      }
                      setFilterOpen(false);
                    }}
                  >
                    Apply
                  </Button>
                </div>
                <Checkbox
                  label="Select all"
                  checked={allChecked}
                  indeterminate={indeterminate}
                  transitionDuration={0}
                  onChange={() =>
                    handlers.setState((current) =>
                      current.map((value) => ({
                        ...value,
                        checked: !allChecked,
                      }))
                    )
                  }
                />
                {items}
              </div>
            </Popover.Dropdown>
          </Popover>
          <div className="justify-self-center col-span-4">
            <AddEmployee />
          </div>
        </div>
      </div>
      {/* <Filter
            selectedSubs={selectedSubs}
            setSelectedSubs={setSelectedSubs}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            values1={values1}
            handlers1={handlers1}
            filterFunction={filterFunction}
            popup={popup}
            setPopup={setPopup}
            getInitialData={getInitialData}
          /> */}

      {/* <div>
          <TextInput placeholder='Filter Name here' onChange={ (e) => setFilterText(e.target.value)}/>
          </div> */}
      <DataTable
        customStyles={{ headRow: { style: { color: '#A1A1A1' } } }}
        columns={
          mediaQuery
            ? columns
            : columns.filter((_, index: number) => {
                if ([0, 1, 4].includes(index)) {
                  return true;
                }
                return false;
              })
        }
        data={data}
        pagination
      />
      {editData && <EditEmployee data={editData} setData={setEditData} />}
    </div>
  );
}

export type staffType = {
  email: string;
  name: string;
  access: string[];
  id: string;
  enabled: boolean;
};

export const EditAccess = ({
  editId,
  setEditId,
}: {
  editId: staffType | null;
  setEditId: React.Dispatch<React.SetStateAction<staffType | null>>;
}) => {
  const [access, setAccess] = useState<string[] | undefined>([]);
  useEffect(() => {
    setAccess(editId?.access);
  }, [editId]);

  const [loading, setLoading] = useState(false);
  return (
    <Modal
      opened={Boolean(editId)}
      onClose={() => setEditId(null)}
      centered
      size={'80%'}
      title="Edit Access"
    >
      <div>
        <div className="my-8">
          <Checkbox.Group
            value={access}
            label="Select All the access you want to give"
            description="This can be edited later"
            withAsterisk
            onChange={(v) => setAccess(v)}
          >
            <div className="grid grid-cols-2"></div>
          </Checkbox.Group>
        </div>
        <Button
          onClick={async () => {
            if (access) {
              try {
                setLoading(true);
                await updateDoc(doc(staffCollection, editId?.id), {
                  access: Array(...new Set([...access, 'employee'])),
                });
                setLoading(false);
                setEditId(null);
                window.location.reload();
              } catch (error: any) {
                setLoading(false);
                showNotification({
                  id: `reg-err-${Math.random()}`,
                  autoClose: 5000,
                  title: 'Error',
                  message: environment.production
                    ? defaultErrorMessage
                    : error.message,
                  color: 'red',
                  icon: <IconX />,
                  loading: false,
                });
              }
            }
          }}
          loading={loading}
        >
          Update
        </Button>
      </div>
    </Modal>
  );
};

export const employeeAccesses = [
  { label: 'Product', checked: false, key: randomId(), value: 'product' },
  { label: 'Orders', checked: false, key: randomId(), value: 'orders' },
];
