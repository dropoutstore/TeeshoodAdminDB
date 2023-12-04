import {
  ActionIcon,
  Box,
  Button,
  Drawer,
  Group,
  Navbar,
  ScrollArea,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconChevronLeft,
  IconChevronRight,
  IconClock,
  IconCreditCard,
  IconFolder,
  IconHome,
  IconLogout,
  IconMenuOrder,
  IconNotes,
  IconSchool,
  IconSettings,
  IconShoppingBag,
  IconTestPipe,
  IconTimeline,
  IconUser,
  IconUsers,
} from '@tabler/icons-react';
import React, { useState } from 'react';
import LeftLink from './LeftLink';
import logo from '../../assets/LOGO.png';
import { signOut } from 'firebase/auth';
import { auth } from '@admin/configs';

type Props = {
  tooglesize: boolean;
  setTooglesize: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LeftBar({
  tooglesize,
  setTooglesize,
  open,
  setOpen,
}: Props) {
  const theme = useMantineTheme();
  const mediaQuery = useMediaQuery('(min-width: 768px)');
  return (
    <div
    // onMouseEnter={()=>setTooglesize(false)}
    // onMouseLeave={()=>setTooglesize(true)}
    >
      {mediaQuery ? (
        <Navbar
          sx={{
            background: '#0A2540',
            color: theme.white,
            top: 59,
            transition: 'width 0.3s',
          }}
          width={{ base: tooglesize ? 80 : 250 }}
          height={'calc(100% - 60px)'}
          p="md"
        >
          {!tooglesize && <img src={logo} alt="" />}
          <NavSections tooglesize={tooglesize} setTooglesize={setTooglesize} />
        </Navbar>
      ) : (
        <Drawer
          position="right"
          // transition={"rotate-left"}
          sx={{ background: 'black', color: 'black', top: 59 }}
          opened={open}
          onClose={() => setOpen(false)}
        >
          <img src={logo} height={40} alt="logo" />
          <NavSections
            tooglesize={tooglesize}
            setTooglesize={setTooglesize}
            setOpen={setOpen}
          />
        </Drawer>
      )}
      ;
    </div>
  );
}

type NavSectionsType = {
  tooglesize: boolean;
  setTooglesize: any;
  setOpen?: any;
};

export function NavSections({
  tooglesize,
  setTooglesize,
  setOpen,
}: NavSectionsType) {
  const mediaQuery = useMediaQuery('(min-width: 768px)');
  return (
    <>
      <Navbar.Section grow component={ScrollArea} mx="-xs" px={'xs'}>
        <Box py="md">
          <LeftLink
            path={'/'}
            icon={<IconUser size={16} color="black" />}
            color="#e0e0e0"
            tooglesize={tooglesize}
            label={'Employees'}
            setOpen={setOpen}
            name="Employees"
          />
          <LeftLink
            path={'/orders'}
            icon={<IconShoppingBag size={16} color="black" />}
            color="#e0e0e0"
            tooglesize={tooglesize}
            label={'Orders'}
            setOpen={setOpen}
            name="Orders"
          />
           <LeftLink
            path={'/products'}
            icon={<IconClock size={16} color="black" />}
            color="#e0e0e0"
            tooglesize={tooglesize}
            label={'Products'}
            setOpen={setOpen}
            name="Products"
          />
         {/* <LeftLink
            path={'/department'}
            icon={<IconFolder size={16} color="black" />}
            color="#e0e0e0"
            tooglesize={tooglesize}
            label={'Department'}
            setOpen={setOpen}
            name="Department"
          />
          <LeftLink
            path={'/payment'}
            icon={<IconCreditCard size={16} color="black" />}
            color="#e0e0e0"
            tooglesize={tooglesize}
            label={'Payment'}
            setOpen={setOpen}
            name="Payment"
          />
          <LeftLink
            path={'/timetool'}
            icon={<IconClock size={16} color="black" />}
            color="#e0e0e0"
            tooglesize={tooglesize}
            label={'Time Tool'}
            setOpen={setOpen}
            name="timetool"
          />
          <LeftLink
            path={'/settings'}
            icon={<IconSettings size={16} color="black" />}
            color="#e0e0e0"
            tooglesize={tooglesize}
            label={'Settings'}
            setOpen={setOpen}
            name="Settings"
          /> */}
        </Box>
      </Navbar.Section>
      {mediaQuery && (
        <Navbar.Section mx="-xs" px={'xs'}>
          <Box
            sx={(theme) => ({
              paddingLeft: theme.spacing.xs,
              paddingRight: theme.spacing.xs,
              paddingTop: theme.spacing.lg,
              borderTop: `1px solid ${
                theme.colorScheme === 'dark'
                  ? theme.colors['dark'][4]
                  : theme.colors['gray'][2]
              }`,
            })}
          >
            <Group position="apart">
              <div />
              <ActionIcon
                variant="default"
                onClick={() => {
                  setTooglesize(!tooglesize);
                  if (setOpen) setOpen(false);
                }}
                size={30}
                sx={() => ({
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'black',
                  },
                })}
              >
                <ThemeIcon color={'#1e1e20'} variant="light">
                  {tooglesize ? (
                    <IconChevronRight color="white" size={16} />
                  ) : (
                    <IconChevronLeft color="white" size={16} />
                  )}
                </ThemeIcon>
              </ActionIcon>
            </Group>
          </Box>
          <br />
          <Button leftIcon={<IconLogout />} onClick={()=>{
            signOut(auth)
          }} variant="white" fullWidth>
            Logout
          </Button>
        </Navbar.Section>
      )}
    </>
  );
}
