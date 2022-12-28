import BaseCard from "../BaseCard/BaseCard";
import NavBar from "../UI/NavBar/NavBar";
import Card from '../UI/Card/Card';
import * as React from 'react';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const allPages = ["tab1", "tab2", "tab3"]
const randomCard1 = {header: 'header1', body: 'somebody1', buttons: ['button1','button2']}

export default function Page(props) {
  return (
    <Card styles={{ border: "1px solid", height: "90vh", width: "90vw", justifyContent: 'center', alignContent: 'center', background: '#eaecee' }}>
      <h1>{props.pageName}</h1>
      <span>test</span>
      <span>test3</span>
      <Card styles={{ minWidth: 275, maxWidth: 400}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    <Card styles={{ minWidth: 275, maxWidth: 400}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
      <div>
        <NavBar
          sx={{
            height: "35px",
            width: "100%",
            display: "flex",
            position: "relative",
          }}
          menuItems={allPages}
        ></NavBar>
      </div>
      <div>
        <Card styles={{ border: "1px solid" }}>
          <h2>Some text</h2>
        </Card>
      </div>
      <div>
        <BaseCard {...randomCard1}></BaseCard>
      </div>
    </Card>
  );
}






