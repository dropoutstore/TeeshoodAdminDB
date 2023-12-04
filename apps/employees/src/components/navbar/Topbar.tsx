import { AppShell, Burger, Header } from '@mantine/core';
import React, { useState } from 'react';
import LeftBar from './leftBar';
import { useMediaQuery } from '@mantine/hooks';
import logo from '../../assets/LOGO.png';

export function NavBar({ children }: { children: React.ReactNode }) {
  const [tooglesize, setTooglesize] = useState(true);
  const [open, setOpen] = useState(false);
  const mediaQuery = useMediaQuery('(min-width: 768px)');
  return (
    <AppShell
      padding={0}
      navbar={
        <LeftBar
          tooglesize={tooglesize}
          setTooglesize={setTooglesize}
          open={open}
          setOpen={setOpen}
        />
      }
      header={
        <Header
          className=" text-left flex justify-between"
          height={60}
          p="xs"
        >
          <div />
          <img src={logo} height={40} alt='logo' />
          {!mediaQuery && (
            <Burger
              opened={open}
              onClick={() => setOpen((o) => !o)}
              color="white"
            />
          )}
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors['dark'][8]
              : theme.colors['gray'][0],
        },
      })}
    >
      <div>
        {children}
      </div>
    </AppShell>
  );
}
