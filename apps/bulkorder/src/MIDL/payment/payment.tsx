import React, { useEffect, useState } from 'react';
import { loadRZP, loadScript } from './loadScript';
import {
  Button,
  Col,
  Container,
  Grid,
  LoadingOverlay,
  Paper,
  Text,
} from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { BulkOrderProduct } from '../Order/bulk/bulkOrderUtils';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '@admin/configs';

export function Payment() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<BulkOrderProduct | null>(null);
  useEffect(() => {
    getDoc(doc(collection(db, 'bulkOrder'), orderId)).then((orderDocRef) => {
      if (!orderDocRef.exists()) {
        navigate('/orders');
        return;
      }
      setOrder(orderDocRef.data() as BulkOrderProduct);
    });
  }, [orderId]);
  if (!order) return <LoadingOverlay visible />;
  return (
    <Container>
      <Paper
        p="lg"
        shadow="xs"
        radius="md"
        style={{ maxWidth: '400px', margin: '0 auto' }}
      >
        <Text
          size="xl"
          weight={700}
          align="center"
          style={{ marginBottom: '1rem' }}
        >
          Payment Details
        </Text>
        <Grid gutter="md">
          <Col span="auto">
            <Text weight={500}>Order ID:</Text>
          </Col>
          <Col span="auto">
            <Text>{orderId}</Text>
          </Col>
        </Grid>
        <Grid gutter="md">
          <Col span="auto">
            <Text weight={500}>Amount:</Text>
          </Col>
          <Col span="auto">
            <Text>₹{order.amount}</Text>
          </Col>
        </Grid>
        <Grid gutter="md">
          <Col span="auto">
            <Text weight={500}>Order Name:</Text>
          </Col>
          <Col span="auto">
            <Text>{order.product?.name}</Text>
          </Col>
        </Grid>
        <Button
          className="my-8"
          loading={loading}
          onClick={() =>{
            setLoading(true)
            loadRZP(order.paymentId as string, () => setLoading(false))
          }}
          fullWidth
          color="blue"
        >
          Pay Now
        </Button>
      </Paper>
    </Container>
  );
}
