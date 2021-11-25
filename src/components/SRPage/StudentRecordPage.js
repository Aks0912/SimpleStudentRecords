import { useState } from 'react';
import './StudentRecordPage.scss';
import '@material/react-layout-grid/index.scss';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import {Paper, makeStyles, Divider} from '@material-ui/core';
import StudentRecordForm from '../SRForm/StudentRecordForm';
import StudentRecordList from '../SRList/StudentRecordList';
import * as services from '../../services/studentARecordService'

const useStyles = makeStyles(theme => ({
    PageContent: {
        width:'80%',
        margin: '0 auto',
        padding: theme.spacing(3)
    }
}))

const StudentRecordPage = () => {
    const classes = useStyles();
    const [newRecordAdded, setNewRecordAdded] = useState(false);

    const saveStudentRecordHandler = (studentRecord) => {
        services.insertStudentRecord(studentRecord);
        setNewRecordAdded(true)
    }

    return(
        <Paper className={classes.PageContent}>
            <p className="title">Simple Student Records</p>
            <Divider/>
            <Grid>
                <Row>
                    <Cell columns={5}>
                        <StudentRecordForm saveStudentRecord={saveStudentRecordHandler} />
                    </Cell>
                    <Cell columns={7}>
                        <StudentRecordList />
                    </Cell>
                </Row>
            </Grid>
        </Paper>
    )
}

export default StudentRecordPage