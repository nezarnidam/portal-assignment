
//employee LeaveType

const employeeLeaveType_url = 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/EMPLEAVETYPENZ';
const employeeLeaveType_xml = (employee) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <ns0:ZBAPI_EMP_LEAVE_TYPE_NZ xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
       <EMP_ID>${employee}</EMP_ID>
    </ns0:ZBAPI_EMP_LEAVE_TYPE_NZ>`
    return xml;
}

const employeeLeaveType = async (employee) => {
    const { response } = await soapRequest({ url: employeeLeaveType_url, headers: sampleHeaders, xml: employeeLeaveType_xml(employee), timeout: 10000 });
    const { headers, body, statusCode } = response;
    result = body.IT_TYPES.item;
    ret = body.RETURN.TYPE;
    return [result, ret];
}

app.post('/employeeLeaveType', (req, res) => {
    employee = employeeid;
    // let employee = req.body.DATA;
    // console.log("employee data collected " + employee);
    arr = [];
    let prom = employeeLeaveType(employee);
    prom.then(([result, ret]) => {
        if (ret == 'S') {
            result.forEach(elm => {
                let obj = `{ 
                    "MOABW": "${elm.MOABW}",
                    "AWART": "${elm.AWART}",
                    "ATEXT": "${elm.ATEXT}"
                  }`;
                arr.push(JSON.parse(obj));

            });
            res.status(200).send({ leave: arr });
        }
        else {
            res.status(401).send("unavailable");
        }
    });
})