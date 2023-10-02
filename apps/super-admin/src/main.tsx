import { Notifications } from '@mantine/notifications';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { MantineProvider, createEmotionCache } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const myCache = createEmotionCache({
  key: 'mantine',
  prepend: true,
});

root.render(
  <Provider store={store}>
    <MantineProvider
      emotionCache={myCache}
      theme={{
        colors: {
          // Add your color
          primary: [
            '#e9ebff',
            '#c1c6f3',
            '#9aa0e5',
            '#727ada',
            '#4a54ce',
            '#313ab5',
            '#29329C',
            '#1a2066',
            '#0e1340',
            '#03051a',
          ],
          secondary: [
            '#d7ffff',
            '#aaf8ff',
            '#7bf3ff',
            '#49ecfe',
            '#1ce7fd',
            '#02cde3',
            '#02CBE1',
            '#00737f',
            '#00454e',
            '#00191d',
          ],
        },

        primaryColor: 'primary',
        fontFamily: "'Epilouge', sans-serif",
        defaultRadius: 8,
        components: {
          Modal: {
            defaultProps: {
              transitionProps: { transition: 'slide-down' },
            },
          },
        },
      }}
      withGlobalStyles
    >
      <Notifications />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </Provider>
);
