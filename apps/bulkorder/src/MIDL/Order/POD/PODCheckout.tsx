import React from 'react';
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ActionIcon,
  Button,
  Card,
  LoadingOverlay,
  Text,
  Title,
} from '@mantine/core';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db, functions } from '@admin/configs';
import { showNotification } from '@mantine/notifications';
import { environment } from '../../../environment';
import { defaultErrorMessage } from '../../../constants';
import { IconArrowLeft, IconX } from '@tabler/icons-react';
import { httpsCallable } from 'firebase/functions';
import { loadRZP } from '../../payment/loadScript';
import { PODOrderType } from './types';

export function PODCheckout() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<PODOrderType | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('');
  const navigate = useNavigate(); // Creating the navigate instance
  useEffect(() => {
    let unsubscribe: any;
    const fetchOrder = async () => {
      const docRef = doc(collection(db, 'POD'), orderId);
      unsubscribe = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            // Document exists in the cache (Snapshot exists)
            setOrder(docSnap.data() as PODOrderType); // Setting the state with the existing data
          } else {
            // Document did not exist in the cache. Handle accordingly (maybe setOrder to null or show a message)
            navigate('/orders');
            // setOrder(null); // or handle it as per your logic
          }
        },
        (error) => {
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
          // Handle the error accordingly
        }
      );
    };

    fetchOrder();

    return () => {
      unsubscribe();
      setOrder(null);
    };
  }, []);
  if (!order) return <LoadingOverlay visible />;
  //   const { address } = order;
  return (
    <div>
      <Title order={4} className="p-4 text-center">
        Print On Demand
      </Title>
      <Title order={6} className="p-2 text-center">
        Order - {orderId}
      </Title>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <LoadingOverlay visible={loading} />
        <Card withBorder>
          <Text color="blue" weight={700} size={18}>
            Items
          </Text>
          <Text size={'lg'}>Total : {order.orders.length} orders</Text>
          <br />
          <br />
          <div className="grid grid-cols-4 shadow-sm align-middle gap-2">
            <div className="mb-4 font-bold">design</div>
            <div className="mb-4 font-bold">product</div>
            <div className="mb-4 font-bold">quantity</div>
            <div className="mb-4 font-bold">customer</div>
            {order.orders.map((ord) => (
              <>
                <div>
                  <img
                    src={ord.design?.previews ? ord.design.previews[0] : ''}
                    className="w-24"
                    alt=""
                  />
                </div>
                <Text>{ord.LineitemName}</Text>
                <Text>{ord.LineitemQuantity}</Text>
                <Text>{ord.BillingName}</Text>
              </>
            ))}
          </div>
        </Card>

        {selectedPaymentMode ? (
          <Card withBorder className="my-4 text-center relative">
            <ActionIcon
              className="absolute"
              onClick={() => setSelectedPaymentMode('')}
            >
              <IconArrowLeft />
            </ActionIcon>
            <Text>Pay {selectedPaymentMode}</Text>
            <Text color="blue" size={48} weight={700}>
              <span className="text-3xl font-normal">₹</span>{' '}
              {/* 
            @ts-ignore */}
              {order.payment[selectedPaymentMode].amount.toFixed(2)}
            </Text>
            <Button
              onClick={() => {
                try {
                  // @ts-ignore
                  loadRZP(order.payment[selectedPaymentMode].orderId, () => {
                    navigate('/orders');
                  });
                } catch (error) {
                  console.log(error);
                  showNotification({
                    id: `reg-err-${Math.random()}`,
                    autoClose: 5000,
                    title: 'Failed',
                    message: defaultErrorMessage,
                    color: 'red',
                    icon: <IconX />,
                    loading: false,
                  });
                }
              }}
            >
              Pay
            </Button>
          </Card>
        ) : (
          <Card withBorder className="my-4">
            <Text>Choose Payment</Text>
            {['partial', 'full'].map((mode) => (
              <Button
                fullWidth
                onClick={async () => {
                  setLoading(true);
                  const PODPaymentFunc = httpsCallable(
                    functions,
                    'PODOrdersPaymentSet'
                  );
                  try {
                    (await PODPaymentFunc({ orderId, mode })).data as {
                      id: string;
                    };
                    setSelectedPaymentMode(mode);
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
                  } finally {
                    setLoading(false);
                  }
                }}
                className="p-4 h-20 my-4 relative bg-blue-100 hover:bg-blue-200 text-blue-800 border border-solid border-blue-800 cursor-pointer"
              >
                <div className="flex w-full items-center justify-between">
                  <div className="text-xs">{mode.toUpperCase()} &ensp; </div>
                  <div className="text-lg font-semibold">
                    {/* 
                      @ts-ignore */}
                    ₹{order.payment[mode].amount.toFixed(2)}
                  </div>
                </div>
              </Button>
            ))}
          </Card>
        )}
      </div>
    </div>
  );
}
