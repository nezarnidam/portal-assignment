

// START OF EMPLOYEE FULL AND FINAL
const employeeFullandFinal_url = 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/EMPFINALSETTLEMENTNZ';
const employeeFullandFinal_xml = (employee) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <ns0:ZBAPI_EMP_FINAL_SETTLEMENT_NZ xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
       <EMP_ID>${employee}</EMP_ID>
    </ns0:ZBAPI_EMP_FINAL_SETTLEMENT_NZ>`;
    return xml;
}

const employeeFullandFinal = async (employee) => {
    let resData, ret, fullandFinalData, ppbwla, wagetype;

    try {
        const { response } = await soapRequest({ url: employeeFullandFinal_url, headers: sampleHeaders, xml: employeeFullandFinal_xml(employee), timeout: 10000 }); // Optional timeout parameter(milliseconds)
        const { headers, body, statusCode } = response;
        resData = body;
        fullandFinalData = resData;
        ppbwla = resData.PPBWLA.item;
        wagetype = resData.WAGETYPES.item;
        ret = body.RETURN.TYPE;
        if (wagetype.length < 1) {
            ret = 'E';
        }
    }
    catch (err) {
        ret = 'E';
    }

    return [fullandFinalData, ppbwla, wagetype, ret];
};




app.post('/employeeFullandFinal', (req, res) => {

    employee = employeid;
    let prom = employeeFullandFinal(employee);
    let arr = [];

    prom.then(([fullandFinalData, ppbwla, wagetype, ret]) => {
        if (ret === 'S') {

            let obj = `{​​​​​​​​​ 
                        "APPROVER": "${fullandFinalData.APPROVER}​​​​​​​​​",
                        "COMPANY": "${fullandFinalData.COMPANY}​​​​​​​​​",
                        "COMPANYCODE": "${fullandFinalData.COMPANYCODE}​​​​​​​​​",
                        "COSTCENTER": "${fullandFinalData.COSTCENTER}​​​​​​​​​",
                        "COSTCENTRE_DESC": "${fullandFinalData.COSTCENTRE_DESC}​​​​​​​​​",
                        "CURRENCY": "${fullandFinalData.CURRENCY}​​​​​​​​​",
                        "DEPARTMENT": "${fullandFinalData.DEPARTMENT}​​​​​​​​​",
                        "DIVISION": "${fullandFinalData.DIVISION}​​​​​​​​​",
                        "FNAME": "${fullandFinalData.FNAME}​​​​​​​​​",
                        "LNAME": "${fullandFinalData.LNAME}​​​​​​​​​",
                        "JOB": "${fullandFinalData.JOB}​​​​​​​​​",
                        "JOINING_DATE": "${fullandFinalData.JOINING_DATE}​​​​​​​​​",
                        "LEAVING_DATE": "${fullandFinalData.LEAVING_DATE}​​​​​​​​​",
                        "TENURE_PERIOD": "${fullandFinalData.TENURE_PERIOD}​​​​​​​​​",
                        "NUM_OF_LEAVES": "${fullandFinalData.NUM_OF_LEAVES}​​​​​​​​​",
                        "GROSS_SAL": "${fullandFinalData.GROSS_SAL}​​​​​​​​​",
                        "ADDITIONAL_PAY": "${fullandFinalData.ADDITIONAL_PAY}​​​​​​​​​",
                        "DEDUCT_AMT": "${fullandFinalData.DEDUCT_AMT}​​​​​​​​​",
                        "NET_SAL": "${fullandFinalData.NET_SAL}​​​​​​​​​",
                        "EMPID": "${employeeid}​​​​​​​​​"
                     }​​​​​​​​​`;
            obj = JSON.parse(obj);
            arr = obj;

            let arr1 = [];
            ppbwla.forEach((elm) => {
                let obj = `{ 
                    "WAGE_TYPE": "${elm.LGART}",
                    "CURRENCY": "${elm.WAERS}",
                    "AMOUNT": "${elm.BETRG}"
                  }`;
                arr.push(JSON.parse(obj));

            })

            let arr2 = [];
            wagetype.forEach((elm) => {
                let obj = `{​​​​​​​​​ 
                            "WAGE_TYPE": "${elm.WAGETYPE}​​​​​​​​​",
                            "NAMEOFWAGETYPE": "${elm.NAMEOFWAGETYPE}​​​​​​​​​"
                        }​​​​​​​​​`;
                arr2.push(JSON.parse(obj));
            })

            res.status(200).send({ fullandFinal_data: arr, ppwla: arr1, wagetype: arr2 });
        }
        else {
            res.status(401).send("No Full and Final data found here");
        }
    });
})


