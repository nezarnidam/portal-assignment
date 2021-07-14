//EMPLOYEE PAYSLIP PDF

const employeePayslipPdf_url = 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/EMPPAYSLIPPDFNZ';
const employeePayslipPdf_xml = (employee, seqno, variant) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <ns0:ZBAPI_EMP_PAYSLIP_PDF_NZ xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
       <EMP_ID>${employee}</EMP_ID>
       <SEQ_NO>${seqno}</SEQ_NO>
       <VARIANT>${variant}</VARIANT>
    </ns0:ZBAPI_EMP_PAYSLIP_PDF_NZ>`;
    return xml;
}
employeePayslipPdf = async (employee, seqno, variant) => {
    let resData;
    const { response } = await soapRequest({ url: employeePayslipPdf_url, headers: sampleHeaders, xml: employeePayslipPdf_xml(employee, seqno, variant), timeout: 10000 }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;


    resData = body.PDF.item;
    return resData;
}


app.post('/employeePayslipPdf', (req, res) => {

    employee = employeeid;
    seqno = req.body.seqno;
    variant = 'RAMACO_PAYSLIP';
    console.log(seqno);
    console.log(variant);
    let prom = employeePayslipPdf(employee, seqno, variant);

    prom.then((dat) => {
        let obj = `{"PDF": "${dat}"}`;

        obj = JSON.parse(obj);
        res.status(200).send(obj);

    });

})