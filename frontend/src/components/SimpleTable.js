import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


class SimpleTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0
        }
        this.formatAMPM = this.formatAMPM.bind(this);
        this.formatRepeat = this.formatRepeat.bind(this);
        this.renderRows = this.renderRows.bind(this);
    }

    formatAMPM = (date) => {
        date = new Date(date);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    formatRepeat = (toRepeat) => {
        if(toRepeat){
            return 'Daily'
        }
        else {
            return 'One off'
        }
    }

    renderRows = () => {
        let rows = [];
        let items = this.props.items;
        
        for (let key in items) {
            rows.push(
                <TableRow>
                    <TableCell align="left">
                        {this.formatAMPM(items[key].time)}
                    </TableCell>
                    <TableCell align="left">{items[key].weight}</TableCell>
                    <TableCell align="left">{this.formatRepeat(items[key].repeat)}</TableCell>
                </TableRow>
            );
        }

        return rows;
    }

    render() {
        let rows = this.renderRows();
        return (
            <Paper className="root">
                <Table className="table">
                    <TableHead>
                        <TableRow >
                            <TableCell>Time</TableCell>
                            <TableCell align="left">Weight (g)</TableCell>
                            <TableCell align="left">Repeat</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

const styles = (theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

export default withStyles(styles)(SimpleTable);
