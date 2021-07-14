
//employee leave

const employeeLeave_url = 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/EMPLEAVENZ';
const employeeLeave_xml = (employee) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <ns0:ZBAPI_EMP_LEAVE_NZ xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
       <EMP_ID>${employee}</EMP_ID>
    </ns0:ZBAPI_EMP_LEAVE_NZ>`
    return xml;
}

const employeeLeave = async (employee) => {
    const { response } = await soapRequest({ url: employeeLeave_url, headers: sampleHeaders, xml: employeeLeave_xml(employee), timeout: 10000 });
    const { headers, body, statusCode } = response;
    ret = body.RETURN.TYPE;
    abs = body.IT_ABSENCE.item;
    rem = body.IT_REMAINING.item;
    return [ret, abs, rem];
}

app.post('/employeeLeave', (req, res) => {
    employee = req.body.data;
    // let employee = req.body.DATA;
    // console.log("employee data collected " + employee);
    let prom = employeeLeave(employee);
    Leavearr = [];
    Remearr = [];
    prom.then((ret, abs, rem) => {
        if (ret != 'E') {
            abs.array.forEach(element => {
                let obj = `{ 
                    "SUBTYPE": "${element.SUBTYPE}",
                    "VALIDEND": "${element.VALIDEND}",
                    "VALIDBEGIN": "${element.VALIDBEGIN}",
                    "ABSENCETYPE": "${element.ABSENCETYPE}", 
                    "NAMEOFABSENCETYPE": "${element.NAMEOFABSENCETYPE}",
                    "ABSENCEDAYS": "${element.ABSENCEDAYS}",
                    "ABSENCEHOURS": "${element.ABSENCEHOURS}",
                    "INVOICE_STATUS": "${element.INVOICE_STATUS}"
                  }`;
                Leavearr.push(JSON.parse(obj));
            });
            rem.forEach(element => {
                let obj = `{ 
                    "QUOTATYPE": "${element.QUOTATYPE}",
                    "LEAVETYPE": "${element.LEAVETYPE}",
                    "QUOTATEXT": "${element.QUOTATEXT}",
                    "QUOTAEND": "${element.QUOTAEND}", 
                    "QUOTABEG": "${element.QUOTABEG}",
                    "ENTITLE": "${element.ENTITLE}",
                    "DEDUCT": "${element.DEDUCT}",
                    "ORDERED": "${element.ORDERED}",
                    "QUOTANUM": "${element.QUOTANUM}",
                    "TIUNITEXT": "${element.TIUNITEXT}"
                  }`;
                Remearr.push(JSON.parse(obj));
            });
            res.status(200).send({ Leave: Leavearr, Remaining: Remearr });
            console.log("array: " + arr);
        }
        else {
            res.status(401).send("No data available");
        }

    });
})