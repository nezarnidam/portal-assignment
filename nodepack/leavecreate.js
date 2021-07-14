// Employee leave create

const employeeLeaveCreate_url = 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/EMPLEAVECREATENZ';
const employeeLeaveCreate_xml = (employee) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <ns0:ZBAPI_EMP_LEAVE_CREATE_NZ xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
       <EMP_ID>${employee.empid}</EMP_ID>
       <END_DATE>${employee.endDate}</END_DATE>
       <END_TIME>${employee.endTime}</END_TIME>
       <LEAVE_TYPE>${employee.leaveType}</LEAVE_TYPE>
       <START_DATE>${employee.startDate}</START_DATE>
       <START_TIME>${employee.startTime}</START_TIME>
       <TOTAL_HOURS>${employee.hours}</TOTAL_HOURS>
    </ns0:ZBAPI_EMP_LEAVE_CREATE_NZ>`
    return xml;
}

const employeeLeaveCreate = async (employee) => {
    const { response } = await soapRequest({ url: employeeLeaveCreate_url, headers: sampleHeaders, xml: employeeLeaveCreate_xml(employee), timeout: 10000 });
    const { headers, body, statusCode } = response;
    resData = body.RETURN.TYPE;
    return resData;
}

app.post('/employeeLeaveCreate', (req, res) => {
    employee = req.body.data;
    // let employee = req.body.DATA;
    // console.log("employee data collected " + employee);
    let prom = employeeLeaveCreate(employee);
    prom.then(data => {
        if (data == 'S') {
            res.send({ status: 'Successful' });
        }
        else {
            res.send({ status: 'Unsuccessful' });
        }
    });
})
