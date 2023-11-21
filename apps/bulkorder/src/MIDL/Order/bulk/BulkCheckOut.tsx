/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductCard, bulkOrderType } from './BulkOrder';
import {
  ActionIcon,
  Button,
  Card,
  Divider,
  LoadingOverlay,
  Text,
} from '@mantine/core';
import { collection, doc, getDoc, onSnapshot, or } from 'firebase/firestore';
import { db, functions } from '@admin/configs';
import { showNotification } from '@mantine/notifications';
import { environment } from '../../../environment';
import { defaultErrorMessage } from '../../../constants';
import { IconArrowLeft, IconX } from '@tabler/icons-react';
import { AddressComponent, AddressGetter } from './addressGetter';
import { httpsCallable } from 'firebase/functions';
import { loadRZP } from '../../payment/loadScript';

export function BulkCheckOut() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<bulkOrderType | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('');
  const navigate = useNavigate(); // Creating the navigate instance
  useEffect(() => {
    let unsubscribe: any;
    const fetchOrder = async () => {
      const docRef = doc(collection(db, 'bulkOrder'), orderId);
      unsubscribe = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            // Document exists in the cache (Snapshot exists)
            setOrder(docSnap.data() as bulkOrderType); // Setting the state with the existing data
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
  const { address } = order;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <LoadingOverlay visible={loading} />
      <Card withBorder className="my-4">
        <Card
          className={`border-solid border flex items-center border-gray-400 my-4 rounded-lg`}
        >
          <div className="flex-grow">
            <Text color="blue" weight={700} size={18}>
              Delivering to
            </Text>
            {/* <AddressGetter selectedAddress={order.address} selectAddress={()} /> */}
            <Text>
              {address.addressLine1},{address.addressLine2}
            </Text>
            <Text>
              {address.city},{address.state}
            </Text>
          </div>
        </Card>
        <Divider />
        <Text color="blue" className="pt-10" weight={700} size={18}>
          Items
        </Text>
        {order.products.map((product) => (
          <ProductCard product={product} />
        ))}
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
                const bulkOrderFunc = httpsCallable(
                  functions,
                  'bulkOrdersPaymentSet'
                );

                try {
                  (await bulkOrderFunc({ orderId, mode })).data as {
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
  );
}
