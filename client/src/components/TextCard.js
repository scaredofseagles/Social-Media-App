import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  CardMedia,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
    },
    cover: {
        width: 100,
        marginRight: '0px'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
})

export default function TextCard(){
    const classes = useStyles()
    const bull = <span className={classes.bullet}>.</span>

    return(
        <Card className={classes.root} variant="outlined" style={{marginTop: "20px"}}>
            <Grid container >
                <Grid item xs={4}>
                    <CardMedia 
                    component="img"
                    alt="avatar"
                    height="100"
                    className={classes.cover}
                    image="https://robohash.org/65.60.11.210.png"
                    />
                </Grid>
            
                <Grid item xs={8}>
                    <CardContent>
                        <Typography className={classes.pos} color="textSecondary" gutterBottom>
                            username {bull} 2 days ago
                        </Typography>
                        <Typography variant="body2" component="p">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultricies hendrerit sapien, a euismod dolor aliquet eget. Nunc magna diam, tincidunt vitae iaculis dignissim, sodales et ante.
                        </Typography>
                        <br />
                        <Typography className={classes.title} color="textSecondary">
                        tags: 
                            <a href="/"> #lorem,</a>
                            <a href="/"> #ipsum,</a>
                            <a href="/"> #dolor,</a>
                        </Typography>
                    </CardContent>
                </Grid>
                
                <CardActions>
                    <Button size="small">Reply</Button>
                    <Button size="small">Like</Button>
                </CardActions>
            </Grid>
            
        </Card>
    )
}