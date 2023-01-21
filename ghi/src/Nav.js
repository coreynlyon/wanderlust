import {
  createStyles,
  Header,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavLink } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: 42,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

export default function Nav() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  return (
    <Box>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          {/* <MantineLogo size={30} /> */}

          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            {/* <a href="/" className={classes.link}>
              Old Home
            </a> */}
            <NavLink to="/"> Home </NavLink>
            {/* <a href="/trips" className={classes.link}>
              View Trips
            </a> */}
            <NavLink to="/trips"> View Trips </NavLink>
          </Group>

          <Group className={classes.hiddenMobile}>
            <Button variant="default">Log in</Button>
            <Button color="indigo">Sign up</Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          {/* <a href="/" className={classes.link}>
            Old Home
          </a> */}
          <NavLink to="/" className={classes.link}> Home </NavLink>
          {/* <a href="/trips" className={classes.link}>
            View Trips
          </a> */}
          <NavLink to="/trips" className={classes.link}> View Trips </NavLink>

          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Group position="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button color="indigo">Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

// Update href's to NavLinks or links from ReactRouter. Commenting out links on homepage isn't working. Demo lines 11 and 12 in App.js. That sets basename to add 'wanderlust' to routes. Routes break in production. Clicking on links breaks route. Changing label doesn't actually change the label.
