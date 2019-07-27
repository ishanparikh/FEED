import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import 'typeface-roboto'
import Chimchar from "../assets/images/Chimchar.png";
import Fade from "@material-ui/core/Fade";
import '../styles/index.css';
import Divider from "@material-ui/core/Divider";
import PetCard from './PetCard';


class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.getDefaultPetCard = this.getDefaultPetCard.bind(this);
        this.petCardFactory = this.petCardFactory.bind(this);
        this.getAge = this.getAge.bind(this);
    }

    getDefaultPetCard() {
         return (
            <PetCard
                key="0"
                name="Chimchar"
                image={Chimchar}
                age="3"
                weight="3"
                gender="Male"
                breed="Fire type"
            />
         );
    }

    getAge(date){
         let difference;
         let age;
         let currentDate = new Date();

         difference = currentDate - date;
         age =  Math.floor(difference /31536000000);

        if(age === 0){
            let months;
            months = (currentDate.getFullYear() - date.getFullYear()) * 12 ;
            months += currentDate.getMonth() - date.getMonth();

            if (currentDate.getDate() < date.getDate())
            {
                months-- ;
            }
            age = months + ' months' ;
        }
        else {
            age = age + ' years' ;
        }

        return(age);


    }

    petCardFactory(profile) {

        let image = null;
        
        if (profile.image_uploaded) {
            image = URL.createObjectURL(profile.image)
        }

        return (
            <PetCard
                key={profile.id}
                name={profile.name}
                image={image}
                age={this.getAge(profile.dateOfBirth)}
                weight={profile.weight}
                gender={profile.gender}
                breed={profile.breed}
            />
        );
    }
  
    render(){
        
        let profiles = [];
        for (let key in this.props.pet_profiles) {
            if (this.props.pet_profiles[key].name !== "") {
                profiles.push(this.petCardFactory(this.props.pet_profiles[key]));
            }
        }
        
        if (profiles.length === 0) {
            profiles.push(this.getDefaultPetCard());
        }

        return (
            <Fade
                in={true}
            >
                <div style={{flexGrow: 1}}>
                    <Grid
                        container
                        justify='center'
                        alignItems='center'
                        direction="row"
                    >
                        <Grid container item justify="center" alignItems="center">
                            {profiles}
                        </Grid>
                    </Grid>
                    <Divider variant="middle"/>
                    <Typography variant="body1" align="center" gutterBottom>
                        &copy; FE.ED
                    </Typography>
                </div>
            </Fade>
        )
    }
}

export default Homepage;
