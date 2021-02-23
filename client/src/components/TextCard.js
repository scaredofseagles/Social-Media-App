import { makeStyles } from '@material-ui/core/styles'
import Moment from 'react-moment'
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

export default function TextCard(props){
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
                    image={props.data?.profile_image}
                    />
                </Grid>
            
                <Grid item xs={8}>
                    <CardContent>
                        <Typography className={classes.pos} color="textSecondary" gutterBottom>
                            {/* TODO: create a function for duration since */}
                            {props.data.screen_name} {bull} <Moment format="MMMM Do YYYY HH:mm">{props.data.created_at}</Moment>
                        </Typography>
                        <Typography variant="body2" component="p">
                            { props.data.tweet }
                        </Typography>
                        <br />
                        <Typography className={classes.title} color="textSecondary">
                            tags: 
                            {props.data.tags ?
                                props.data.tags.map(tag => {
                                    return <span key={tag}>
                                        <a href={`/?tags=${tag}`}> {tag},</a>
                                    </span>
                                }) : 
                                
                             <>    
                            <a href="/tags=#lorem"> #lorem,</a>
                            <a href="/tags=#ipsum"> #ipsum,</a>
                            <a href="/tags=#dolor"> #dolor,</a>
                            </>}
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