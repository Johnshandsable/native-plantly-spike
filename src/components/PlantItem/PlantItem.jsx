// MATERIAL UI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function PlantItem({ plant }) {
  /*
      -------Display Order-------
      Kingdom: Plantae
      Phylum
      Class: Liliopsida
      Order: Liliales
      Family: Liliaceae
      Genus: Pine, Wattles, Milkvetch, Dandelion, etc.
      Species: Common water Hyacinth, Yellow star-thistle, Purple loosestrife, Kudzu, etc.
    */
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          image={process.env.PUBLIC_URL + '/sumac.jpg'}
          title={plant.primaryCommonName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {plant.primaryCommonName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Scientific Name: {plant.scientificName} <br />
            Phylum: {plant.phylum} <br />
            Class: {plant.class} <br />
            Order: {plant.order} <br />
            Family: {plant.family} <br />
            Genus: {plant.genus} <br />
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Add to List
        </Button>
      </CardActions>
    </Card>
  );
}

export default PlantItem;
