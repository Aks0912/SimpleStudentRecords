const KEYS = {
    studentRecords: 'studentRecords',
    studentRecordId: 'studentRecordId'
}

export const getAllStudentRecords = () => {
   if(localStorage.getItem(KEYS.studentRecords) == null)
        localStorage.setItem(KEYS.studentRecords, JSON.stringify([]))
    
    let records = JSON.parse(localStorage.getItem(KEYS.studentRecords))

    return records;
}

export const insertStudentRecord = (data) => {
    let records = getAllStudentRecords()
    data['id'] = generateStudentRecordId()
    records.push(data)
    localStorage.setItem(KEYS.studentRecords, JSON.stringify(records))
}

export const updateStudentRecord = (data) => {
    let records = getAllStudentRecords()
    let recordIndex = records.findIndex(x => x.id == data.id)
    records[recordIndex] = {...data}
    localStorage.setItem(KEYS.studentRecords, JSON.stringify(records))
}

export const deleteStudentRecord = (data) => {
    let records = getAllStudentRecords()
    records = records.filter(x => x.id != data.id)
    localStorage.setItem(KEYS.studentRecords, JSON.stringify(records))
}

export const generateStudentRecordId = () => {
    if(localStorage.getItem(KEYS.studentRecordId) == null)
        localStorage.setItem(KEYS.studentRecordId, '0')

    let id = parseInt(localStorage.getItem(KEYS.studentRecordId))
    localStorage.setItem(KEYS.studentRecordId, (++id).toString())
    
    return id;
}