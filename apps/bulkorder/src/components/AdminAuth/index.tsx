import { Button, Center, Container, Grid, LoadingOverlay } from '@mantine/core';
import React from 'react';
import LOGINIMG from '../../assets/auth.png';
import GOOGLEIMG from '../../assets/google.svg';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { environment } from '../../environment';
import { defaultErrorMessage } from '../../constants';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { auth, functions } from '@admin/configs';

const provider = new GoogleAuthProvider();
// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export default function Admin({}: Props) {
  return (
    <React.Suspense fallback={<LoadingOverlay visible />}>
      <Container fluid className="m-0 p-0">
        {/* <button onClick={async () => {
          try {
            const addMessage = httpsCallable(functions, 'addAdmin');
            await addMessage({ email: "miuractech@gmail.com" })
            console.log("success");
          } catch (error) {
            console.log(error);
          }
        }}>add</button> */}
        <Grid m={0} p={0}>
          <Grid.Col xs={12} md={6} m={0} p={0}>
            <div className="flex h-screen min-h-[450px] m-0 p-0">
              <img
                src={LOGINIMG}
                className=" h-screen block object-fill"
                alt="Edufeat-signup"
              />
            </div>
          </Grid.Col>
          <Grid.Col xs={12} md={6} m={0} p={0}>
            <Center className="h-full text-center">
              <div>
                <h1>Teeshood</h1>
                <Button
                  size="lg"
                  className="bg-slate-100 hover:bg-slate-300 text-black"
                  leftIcon={<img src={GOOGLEIMG} alt="google sign in" />}
                  onClick={async () => {
                    try {
                      await signInWithPopup(auth, provider);
                    } catch (error: any) {
                      showNotification({
                        id: `reg-err-${Math.random()}`,
                        autoClose: 5000,
                        title: 'Not Authorised!',
                        message: environment.production
                          ? defaultErrorMessage
                          : error.message,
                        color: 'red',
                        icon: <IconX />,
                        loading: false,
                      });
                    }
                  }}
                >
                  Reseller Sign In
                </Button>
              </div>
            </Center>
          </Grid.Col>
        </Grid>
      </Container>
    </React.Suspense>
  );
}
