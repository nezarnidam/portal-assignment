//EMPLOYEE PAYSLIP
const employeePayslip_url = 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/EMPPAYSLIPNZ';
const employeePayslip_xml = (employee) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <ns0:ZBAPI_EMP_PAYSLIP_NZ xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
       <EMP_ID>${employee}</EMP_ID>
    </ns0:ZBAPI_EMP_PAYSLIP_NZ>`;
    return xml;
}
employeePayslip = async (employee) => {
    let resData;
    const { response } = await soapRequest({ url: employeePayslip_url, headers: sampleHeaders, xml: employeePayslip_xml(employee), timeout: 10000 }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;
    ret = body.RETURN.TYPE;
    Data = body.IT_TABLE.item;
    return [Data, ret];
}


app.post('/employeePayslip', (req, res) => {

    employee = employeeid;
    let prom = employeePayslip(employee);
    let arr = [];
    // console.log("works");
    prom.then(([data, ret]) => {
        if (ret != 'E') {
            // console.log("inside if")
            data.forEach((elm) => {
                let obj = `{ 
                       "SEQUENCENUMBER": "${elm.SEQUENCENUMBER}",
                       "FPBEGIN": "${elm.FPBEGIN}",
                       "FPEND": "${elm.FPEND}",
                       "PAYDATE": "${elm.PAYDATE}"
                     }`;
                arr.push(JSON.parse(obj));
            })
            res.status(200).send({ payslip: arr });
            console.log("array: " + arr);
        }
        else {
            res.status(401).send("No data available");
        }
    });
})

