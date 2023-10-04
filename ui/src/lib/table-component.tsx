/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react';
import DataTable, { ConditionalStyles, TableProps, TableStyles } from 'react-data-table-component';
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  getCountFromServer,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  startAfter,
  Unsubscribe,
  where,
} from 'firebase/firestore';
import { db } from '@admin/configs';
import { Button, Loader } from '@mantine/core';
import "./style.css"
export const TableComponent = ({
  loading,

  setData,
  setLoading,
  setLinkPaymentModal,
conditionalRowStyles,
  environment,
  customStyles,
  tableProps,
}: {
  environment: {
    production: boolean;
  };
  tableProps: TableProps<any>;
  loading: boolean;
  setData: React.Dispatch<React.SetStateAction<any[] | null>>;

  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setLinkPaymentModal: React.Dispatch<
    React.SetStateAction<{
      modal: boolean;
      data: any;
      type: 'link' | 'invoice';
    }>
  >;

  customStyles?: TableStyles;
  conditionalRowStyles?:ConditionalStyles<any>[]
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastVisibleRecords, setlastVisibleRecords] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const [totalCount, setTotalCount] = useState(0);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       // let q:any;
  //       // if (filterQueries.status.length > 0) {
  //       //   q = query(
  //       //     collection(db, 'payments'),
  //       //     where('status', 'in', filterQueries.status)
  //       //     // orderBy("createdTime",'desc')
  //       //   );
  //       // } else {
  //       // @ts-ignore
  //       const q = query(
  //         collection(db, 'payments')
  //         // orderBy("createdTime",'desc')
  //       );
  //       // }
  //       const countDoc = await getCountFromServer(q);
  //       setTotalCount(countDoc.data().count);
  //     } catch (error) {
  //       console.log('error', error);
  //     }
  //   })();
  // }, []);

  const handlePageChange = (page: number, total: number) => {
    setLoading(true);
    setCurrentPage(page);
  };
  return (
    <DataTable
      style={{  }}

      {...tableProps}
      selectableRows
      progressPending={loading}
      progressComponent={<Loader />}
      pagination
      onChangePage={handlePageChange}
      paginationTotalRows={totalCount}
      paginationServer
      paginationComponentOptions={{ noRowsPerPage: true }}
      fixedHeader
      // expandOnRowClicked
      expandableRows
      conditionalRowStyles={conditionalRowStyles}
      customStyles={customStyles??defaultCustomStyles}
    />
  );
};

const defaultCustomStyles:TableStyles  = {
  table:{style:{minHeight:"100vh"}},
  rows: {
    style: {
      minHeight: '60px',
      paddingLeft: '15px',
    },
  },
  headCells: {
    style: {
      minHeight: '80px',
      paddingLeft: '20px',
      paddingRight: '8px',
      textAlign: 'center',
    },
  },
  cells: {
    style: {
      paddingLeft: '10px',
      paddingRight: '10px',
      textAlign: 'center',
    },
  },
};
