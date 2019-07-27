import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

export default class PetCard extends React.Component{

    render(){
        return(
            <Grid container item xs={12} sm={6} md={4}
                  className='pet-grid'
                  justify="center"
            >
                <Card
                    className='pet-card'
                >
                    <CardActionArea>
                        <img src={this.props.image || ""} alt='' style={{width: '100%'}}/>
                    </CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h6" align="center">
                            {this.props.name || ""}
                        </Typography>
                        <Typography variant="body1" style={{fontSize: '12pt'}}>
                            Breed: {this.props.breed || ""}
                        </Typography>
                        <Typography variant="body1" style={{fontSize: '12pt'}}>
                            Age: {this.props.age || ""}
                        </Typography>
                        <Typography variant="body1" style={{fontSize: '12pt'}}>
                            Gender: {this.props.gender || ""}
                        </Typography>
                        <Typography variant="body1" style={{fontSize: '12pt'}}>
                            Weight: {this.props.weight || ""} kg
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}