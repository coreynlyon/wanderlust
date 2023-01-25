import { Title, Paper, Grid, Text, Container, Button, Flex, Overlay, createStyles } from '@mantine/core';
import { useState, useEffect } from 'react';
import UpdateTrip from './UpdateTrip';
import { useParams } from 'react-router-dom';
import ItineraryForm from './ItineraryForm';
import Reservation from './ReservationComponent';

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        paddingTop: 180,
        paddingBottom: 130,
        backgroundImage:
        'url(https://images.ctfassets.net/itrs3p223g0s/2RbOacx6d1RYNCLOtDmvg/f71f77059110c404db7874ad0d5d6fb6/canadians-travel_1920x1280.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',

        '@media (max-width: 520px)': {
        paddingTop: 80,
        paddingBottom: 50,
        },
    },

    inner: {
        position: 'relative',
        zIndex: 1,
    },

    title: {
        fontWeight: 800,
        fontSize: 55,
        letterSpacing: -1,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        color: theme.white,
        marginBottom: theme.spacing.xs,
        textAlign: 'center',
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    description: {
        color: theme.colors.gray[0],
        textAlign: 'center',
    },

    controls: {
        marginTop: theme.spacing.xl * 1,
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,

        '@media (max-width: 520px)': {
        flexDirection: 'column',
        },
    }
}));

export default function Itinerary() {
  const tripId = useParams();
  const id = Number(tripId.id);
  const [itinerary, setItinerary] = useState([]);
  const { classes } = useStyles();

  useEffect(() => {
    const fetchItinerary = async () => {
      const url = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/itineraries/trip/${id}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setItinerary(data[0]);
      }
    };
    fetchItinerary();
  }, [id]);

  const deleteTrip = (id) => async () => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      try {
        const url = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/trips/${id}`;
        const deleteResponse = await fetch(url, {
          method: "delete",
        });

        if (deleteResponse.ok) {
          window.location.href = "/trips";
        }
      } catch (err) {}
    }
  };

  return (
    <div>
      {itinerary ? (
        <>
          <div className={classes.wrapper}>
            <Overlay color="#000" opacity={0.65} zIndex={1} />

            <div className={classes.inner}>
              <Title className={classes.title}>
                Trip to {' '}
                <Text component="span" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
                  {itinerary.destination}
                </Text>
                {' '} with {' '}
                <Text component="span" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
                  {itinerary.attendees}
                </Text>
              </Title>

              <Container size={640}>
                <Text size="lg" className={classes.description}>
                  {new Date(itinerary.start_date).toLocaleDateString('en-US')} - {new Date(itinerary.end_date).toLocaleDateString('en-US')}
                </Text>
              </Container>
            <Container className="mb-3 mt-3" >
              <Flex justify="center" gap="sm" align="center" className={classes.controls}>
                <div><UpdateTrip /></div>
                <Button onClick={deleteTrip(id)}
                  variant="light"
                  size="md"
                  radius="sm"
                  color="red"
                  // style = {{backgroundColor: 'rgba(255, 255, 255, .4)'}}
                  >
                  Delete Trip
                </Button>
                </Flex>
            <Grid gutter="lg" justify="center" className={classes.controls}>
              <Grid.Col span="auto">
                <Paper shadow="sm" p="xl">
                  <Title color="indigo" order={4}>Flight Details</Title>
                  <Text>
                    Departing Flight: {itinerary.depart_flight_airline} {itinerary.depart_flight_num}
                    <br /> {new Date(itinerary.depart_flight_date).toLocaleString('en-US', { year: "numeric", month:"numeric", day:"numeric", hour: "2-digit", minute: "2-digit" })}
                    <br />
                    <br /> Return Flight: {itinerary.return_flight_airline} {itinerary.return_flight_num}
                    <br /> {new Date(itinerary.return_flight_date).toLocaleString('en-US', { year: "numeric", month:"numeric", day:"numeric", hour: "2-digit", minute: "2-digit" })}
                  </Text>
                </Paper>
              </Grid.Col>
              <Grid.Col span="auto">
                <Reservation />
              </Grid.Col>
            </Grid>
          </Container>
            </div>
          </div>
          </>
      ) : (
          <ItineraryForm />
      )}
      </div>
    );
}
