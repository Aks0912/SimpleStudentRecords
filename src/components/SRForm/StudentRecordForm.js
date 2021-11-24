import './StudentRecordForm.scss';
import {useForm, Form} from '../useForm';
import Input from '../controls/Input';
import Button from '../../components/controls/Button';
import { useEffect} from 'react';

const initializeFValues = {
    fullName: '',
    rollNo: '',
    studentClass: '',
    totalSubjects: '',
    age: ''
}

const StudentRecordForm = (props) => {
    const {studentRecordForEdit} = props

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('fullName' in fieldValues)
            temp.fullName= fieldValues.fullName ? "" : "This field is required."
        if('rollNo' in fieldValues)
            temp.rollNo= fieldValues.rollNo ? "": "This field is required."
        if('studentClass' in fieldValues)
            temp.studentClass= fieldValues.studentClass ? "": "This field is required."
        if('totalSubjects' in fieldValues)
            temp.totalSubjects= fieldValues.totalSubjects ? "": "This field is required."
        if('age' in fieldValues)
            temp.age= fieldValues.age ? "": "This field is required."
        
        setErrors({
            ...temp
        })

        if(fieldValues == values)
            return Object.values(temp).every(x=> x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        restForm
    } = useForm(initializeFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()

        if(validate()){
            props.saveStudentRecord(values);
            restForm();
        }
    }

    useEffect(()=>{
        if(studentRecordForEdit != null){
                setValues({...studentRecordForEdit
            })
        }
           
    }, [studentRecordForEdit])

    return(
        <Form onSubmit = {handleSubmit}>
            <Input
                name= "fullName"
                label= "Full Name:"
                value= {values.fullName}
                error= {errors.fullName}
                onChange= {handleInputChange} />

            <Input
                name= "rollNo"
                label= "Rollno:"
                value= {values.rollNo}
                error= {errors.rollNo}
                onChange= {handleInputChange} />
                
            <Input
                name= "studentClass"
                label= "Student Class:"
                value= {values.studentClass}
                error= {errors.studentClass}
                onChange= {handleInputChange} />

            <Input
                name= "totalSubjects"
                label= "Total Subjects:"
                value= {values.totalSubjects}
                error= {errors.totalSubjects}
                onChange= {handleInputChange} />

            <Input
                name= "age"
                label= "Age:"
                value= {values.age}
                error= {errors.age}
                onChange= {handleInputChange} />

            <div>
                <Button text = "Submit"  type="submit" />
            </div>
        </Form>
    )
}

export default StudentRecordForm;