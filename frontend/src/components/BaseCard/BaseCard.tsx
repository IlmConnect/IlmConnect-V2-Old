import Card from '../UI/Card/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function BaseCard(props) {
  return (
    <Card styles={{ maxWidth: 345, margin: '2rem auto' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.header}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.body}
        </Typography>
      </CardContent>
      <CardActions>
        {props.buttons.map((buttonTxt) => (
            <Button key={buttonTxt} size="small">{buttonTxt}</Button>
        ))}
      </CardActions>
    </Card>
  );
}