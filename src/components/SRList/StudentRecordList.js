import { useState} from 'react';
import { Table, TableHead, TableBody, TableCell, TableRow, List } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import StudentRecordForm from '../SRForm/StudentRecordForm';
import Popup from '../Popup';
import ConfirmDialog from '../ConfirmDialog';
import ActionButton from '../../components/controls/ActionButton';
import * as services from '../../services/studentARecordService'

const StudentRecordList = () => {
    const [openPopup, setOpenPopup] = useState(false);    
    const [confirmDialog, setConfirmDialog] = useState({ isOpen:false, title:'', subTitle:''});
    const [studentRecordForEdit, setStudentRecordForEdit] = useState(null);
    
    const openInPopup = (item) => {      
        setStudentRecordForEdit(item)
        setOpenPopup(true)
    }
    
    const onDelete = studentRecord => {
        setConfirmDialog({
            ...confirmDialog, isOpen:false
        })
        handleRemoveItem(studentRecord);        
    }
    
    const updateStudentRecordHandler = (studentRecord) => {
        services.updateStudentRecord(studentRecord)
        setOpenPopup(false)
    }
    
    const handleRemoveItem = (studentRecord) => {
        services.deleteStudentRecord(studentRecord)
    }

    return(
        <div>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>FullName</TableCell>
                        <TableCell align="right">Roll No.</TableCell>
                        <TableCell align="right">Student Class</TableCell>
                        <TableCell align="right">Total Subjects</TableCell>
                        <TableCell align="right">Age</TableCell>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {services.getAllStudentRecords().map((row) => (
                        <TableRow key={row.rollNo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            <TableCell component="th" scope="row">
                                {row.fullName}
                            </TableCell>
                            <TableCell align="right">{row.rollNo}</TableCell>
                            <TableCell align="right">{row.studentClass}</TableCell>
                            <TableCell align="right">{row.totalSubjects}</TableCell>
                            <TableCell align="right">{row.age}</TableCell>
                            <TableCell>
                                <ActionButton
                                    color = "primary"
                                    onClick = {() => openInPopup(row)} >
                                    <EditOutlinedIcon fontSize="small"/>
                                </ActionButton>
                            </TableCell>
                            <TableCell>
                                <ActionButton
                                    color = "secondary"
                                    onClick={()=> {setConfirmDialog({
                                        isOpen:true,
                                        title:"Delete Student Record",
                                        subTitle:"Do you want to delete Student Record?",
                                        onConfirm:()=>{onDelete(row)}
                                    })}}>
                                    <CloseIcon fontSize="small"/>
                                </ActionButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Popup title="Edit Student Record" 
                    openPopup = {openPopup} 
                    setOpenPopup = {setOpenPopup} >
                <StudentRecordForm saveStudentRecord={updateStudentRecordHandler}
                                studentRecordForEdit={studentRecordForEdit} />
            </Popup>
            <ConfirmDialog confirmDialog= {confirmDialog}
                            setConfirmDialog= {setConfirmDialog}/>
        </div>
    )
}

export default StudentRecordList