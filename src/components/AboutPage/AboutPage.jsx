// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function AboutPage() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: 20,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        {/* <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography>Female Sumac</Typography>
            <img
              src={process.env.PUBLIC_URL + '/female_sumac.jpg'}
              alt="female sumac"
            />
          </Paper>
        </Grid> */}
        {/* <Grid item xs={6}>
          <Paper className={classes.paper}>
            <img
              src={process.env.PUBLIC_URL + '/lots_sumac.jpg'}
              alt="lots of sumac trees"
            />
          </Paper>
        </Grid> */}
        {/* Image  */}
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography className="picture-title">
              Plant Name goes here...
            </Typography>
            <img
              className="picture"
              src={
                'https://bs.plantnet.org/image/o/1a03948baf0300da25558c2448f086d39b41ca30'
              }
              alt="sumac tree"
            />
          </Paper>
        </Grid>
        {/* Description */}
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography>description goes here....</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default AboutPage;
