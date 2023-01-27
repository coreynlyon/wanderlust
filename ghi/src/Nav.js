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
import { useAuthContext } from './Auth';

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

function Nav() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const { token } = useAuthContext();


  return (
    <Box>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}>
            <NavLink to="/" className={classes.link}>
              {" "}
              Home{" "}
            </NavLink>
            {token ? (
              <NavLink to="/trips" className={classes.link}>
                View Trips
              </NavLink>
            ) : null}
          </Group>

          <Group className={classes.hiddenMobile}>
            <NavLink to={token ? "/logout" : "/login"}>
              <Button to={token ? "/logout" : "/login"} variant="default">
                {token ? "Logout" : "Log In"}
              </Button>
            </NavLink>
            {token ? null : (
              <NavLink to="/signup">
                <Button color="indigo">Sign up</Button>
              </NavLink>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}>
        <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <NavLink to="/" className={classes.link}>
            {" "}
            Home{" "}
          </NavLink>
          {token ? (
            <NavLink to="/trips" className={classes.link}>
              View Trips
            </NavLink>
          ) : null}

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="center" grow pb="xl" px="md">
            <NavLink to={token ? "/logout" : "/login"}>
              <Button to={token ? "/logout" : "/login"} variant="default">
                {token ? "Logout" : "Log In"}
              </Button>
            </NavLink>
            {token ? null : (
              <NavLink to="/signup">
                <Button color="indigo">Sign up</Button>
              </NavLink>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
export default Nav;
