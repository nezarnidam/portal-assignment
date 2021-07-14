//EMPLOYEE SETTLEMENT

const employeeSettlement_url = 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/EMPFINALSETTLEMENTNZ';
const employeeSettlement_xml = (employee) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<ns0:ZBAPI_EMP_FINAL_SETTLEMENT_NZ xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
   <EMP_ID>${employee}</EMP_ID>
</ns0:ZBAPI_EMP_FINAL_SETTLEMENT_NZ>`;
    return xml;
}
employeeSettlement = async (employee) => {
    let resData;
    const { response } = await soapRequest({ url: employeeSettlement_url, headers: sampleHeaders, xml: employeeSettlement_xml(employee), timeout: 10000 }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;

    resData = body;
    try {
        resData = body.IT_HEAD.item;
        if (resData.length < 1) {
            ret = 'E';
        }
        else {
            ret = 'S';
        }
    }
    catch (err) {
        ret = 'E';
    }

    return [resData, ret];
}


app.post('/employeeSettlement', (req, res) => {

    employee = employeeid;
    let prom = employeeSettlement(employee);
    let arr = [];
    // console.log("works");
    prom.then(([dat, ret]) => {
        if (ret === 'S') {
            // console.log("inside if")
            dat.forEach((elm) => {
                let obj = `{ 
                       "INV_DOC_NO": "${elm.INV_DOC_NO}",
                       "FISC_YEAR": "${elm.FISC_YEAR}",
                       "PSTNG_DATE": "${elm.PSTNG_DATE}",
                       "ENTRY_DATE": "${elm.ENTRY_DATE}", 
                       "COMP_CODE": "${elm.COMP_CODE}",
                       "GROSS_AMNT": "${elm.GROSS_AMNT}",
                       "CURRENCY": "${elm.CURRENCY}",
                       "INVOICE_STATUS": "${elm.INVOICE_STATUS}"
                     }`;
                arr.push(JSON.parse(obj));
            })
            res.status(200).send({ Settlement: arr });
            console.log("array: " + arr);
        }
        else {
            res.status(401).send("No data available");
        }
    });
})

