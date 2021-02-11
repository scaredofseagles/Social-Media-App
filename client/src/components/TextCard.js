import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
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
                            {props.data?.screen_name} {bull} {moment.duration(props.data?.created_at, "days").format("d") === "0" ? "Today" : moment.duration(props.data?.created_at, "days").format( "d [days ago]") }
                        </Typography>
                        <Typography variant="body2" component="p">
                            { props.data?.tweet }
                        </Typography>
                        <br />
                        <Typography className={classes.title} color="textSecondary">
                            tags: 
                            {props.data.tags ?
                                props.data?.tags.map(tag => {
                                    return <>
                                        <a href={`/?tags=${tag}`}> {tag},</a>
                                    </>
                                }) : 
                                
                             <>    
                            <a href="/?tags=#lorem"> #lorem,</a>
                            <a href="/?tags=#ipsum"> #ipsum,</a>
                            <a href="/?tags=#dolor"> #dolor,</a>
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