import Homepage from '../components/Homepage';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        auth : state.auth,
        pet_profiles : state.pet_profiles
    }
};


const HomepageContainer = connect(
    mapStateToProps,
    null
)(Homepage);

export default HomepageContainer