const soapRequest = require('easy-soap-request');
const { transform, prettyPrint } = require('camaro');

const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const moment = require('moment');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
customerid = -1;
vendorid = -1;
const sampleHeaders = {
    'user-agent': 'sampleTest',
    'Content-Type': 'text/xml;charset=UTF-8',
    'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
};

//template
const template = {
    custAuth_status: '//SOAP:Body//BAPIRETURN//TYPE'
}

//wsdl url from SOAPUI
const url = 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_NZ&receiverParty=&receiverService=&interface=SI_CUST_LOGIN_NZ&interfaceNamespace=http://namespacenz';


//REQUEST ENV
const genXML = (username, password) => {
    //console.log(username);
    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_CUSTLOGIN_NZ>
          <!--You may enter the following 2 items in any order-->
          <PASSWORD>${password}</PASSWORD>
          <USERNAME>${username}</USERNAME>
       </urn:ZBAPI_CUSTLOGIN_NZ>
    </soapenv:Body>
 </soapenv:Envelope>`;
    // console.log(xml);
    return xml;
}

var xmlData;
const x = async (username, password) => {
    const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: genXML(username, password), timeout: 10000 }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;
    //   console.log(headers);
    //   console.log(body);
    //   console.log(statusCode);

    //RESPONSE ENV
    xmlData = body;

    //PARSING RESPONSE XML
    const result = await transform(xmlData, template);
    return result;
};

app.post('/custLogin', (req, res) => {
    // console.log(req.body);   
    user = req.body.username;
    pass = req.body.password;
    console.log(user);
    console.log(pass);
    let prom = x(user, pass);
    prom.then((dat) => {
        console.log(dat);
        if (dat.custAuth_status == 'S') {
            global.customerid = user;
            console.log(customerid);
        }
        res.send(dat);
    });
})



app.post('/getcustomerid', (req, res) => {
    console.log("id -- " + customerid);
    res.send({ cust_id: customerid });
})


//cust authorisation

app.post('/loggedin', (req, res) => {
    if (customerid == -1) {
        res.send({ status: 'no' });
    } else {
        res.send({ status: 'yes' });
    }
})

//signout

app.post('/signout', (req, res) => {
    customerid = -1;
    res.send({ status: 'successfully logged out' });
})





/////cust view ........................

//template
const template1 = {
    cust_id: '//SOAP:Body//CUST_DET//KUNNR',
    cust_name: '//SOAP:Body//CUST_DET//NAME1',
    cust_name2: '//SOAP:Body//CUST_DET//NAME2',
    cust_street: '//SOAP:Body//CUST_DET//STRAS',
    cust_city: '//SOAP:Body//CUST_DET//ORT01',
    cust_state: '//SOAP:Body//CUST_DET//REGIO',
    cust_country: '//SOAP:Body//CUST_DET//LAND1',
    cust_post: '//SOAP:Body//CUST_DET//PSTLZ',
    //  cust_sort: '//SOAP:Body//CUST_DET//SORTL',
    cust_mobilenumber: '//SOAP:Body//CUST_DET//TELF1'
}

//wsdl url from SOAPUI
const url1 = 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_CUSTOMER_PORTAL_NZ&receiverParty=&receiverService=&interface=SI_CUST_PROFILE_NZ&interfaceNamespace=http://namespacenz';


//REQUEST ENV
const genXML1 = (username) => {
    //console.log(username);
    const xml1 = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_CUSTPROFILE_VIEW_NZ>
          <CUSTOMER_ID>${username}</CUSTOMER_ID>
       </urn:ZBAPI_CUSTPROFILE_VIEW_NZ>
    </soapenv:Body>
 </soapenv:Envelope>`;
    // console.log(xml);
    return xml1;
}

var xmlData1;
const x1 = async (username) => {
    const { response } = await soapRequest({ url: url1, headers: sampleHeaders, xml: genXML1(username), timeout: 10000 }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;
    //   console.log(headers);
    //   console.log(body);
    //   console.log(statusCode);

    //RESPONSE ENV
    xmlData1 = body;

    //PARSING RESPONSE XML
    const result1 = await transform(xmlData1, template1);
    // console.log(result1);
    return result1;
};

app.post('/profileview', (req, res) => {
    // console.log(req.body);   
    // user = req.body.username;
    user = customerid;
    // user = 11;
    //pass = req.body.password;
    console.log(user);
    // console.log(pass);  

    let prom1 = x1(user);
    prom1.then((dat) => {
        console.log(dat);
        res.send(dat);
    });
})


//....................






////cust edit................

const template2 = {
    edit_status: '//SOAP:Body//UPDATESTATUS'
}


const url2 = 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_CUSTOMER_PORTAL_NZ&receiverParty=&receiverService=&interface=SI_CUST_PROFILE_EDIT&interfaceNamespace=https://customerprofileedit';

const genXML2 = (kunnr, land1, name1, name2, ort01, pstlz, regio, stras, telf1) => {
    //console.log(username);
    const xml2 = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_CUST_EDIT_PROFILE_NZ>
   
          <IT_CUST_DET>
           
             <KUNNR>${kunnr}</KUNNR>
     
             <LAND1>${land1}</LAND1>
      
             <NAME1>${name1}</NAME1>
        
             <NAME2>${name2}</NAME2>
   
             <ORT01>${ort01}</ORT01>
      
             <PSTLZ>${pstlz}</PSTLZ>
      
             <REGIO>${regio}</REGIO>
           
             <SORTL></SORTL>
            
             <STRAS>${stras}</STRAS>
            
             <TELF1>${telf1}</TELF1>
          </IT_CUST_DET>
       </urn:ZBAPI_CUST_EDIT_PROFILE_NZ>
    </soapenv:Body>
 </soapenv:Envelope>`;
    // console.log(xml);
    return xml2;
}

var xmlData2;
const x2 = async (kunnr, land1, name1, name2, ort01, pstlz, regio, stras, telf1) => {
    const { response } = await soapRequest({ url: url2, headers: sampleHeaders, xml: genXML2(kunnr, land1, name1, name2, ort01, pstlz, regio, stras, telf1), timeout: 10000 }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;
    //   console.log(headers);
    //   console.log(body);
    //   console.log(statusCode);

    //RESPONSE ENV
    xmlData2 = body;

    //PARSING RESPONSE XML
    const result2 = await transform(xmlData2, template2);
    // console.log(result1);
    return result2;
};


app.post('/profileedit', (req, res) => {
    // console.log(req.body);   
    // user = req.body.username;
    //pass = req.body.password;
    //console.log(user);
    // console.log(pass);  
    kunnr = req.body.kunnr;
    land1 = req.body.land1;
    name1 = req.body.name1;
    name2 = req.body.name2;
    ort01 = req.body.ort01;
    pstlz = req.body.pstlz;
    regio = req.body.regio;
    stras = req.body.stras;
    telf1 = req.body.telf1;

    let prom1 = x2(kunnr, land1, name1, name2, ort01, pstlz, regio, stras, telf1);
    prom1.then((dat) => {
        console.log(dat);
        res.send(dat);
    });
})




//cust inq

const custInq_url = 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/CUSTOMERINQUIRYNZ/';
const custInq_req = (cid) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
   <ns0:ZBAPI_CUST_INQ_NZ xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
      <CUST_ID>${cid}</CUST_ID>
   </ns0:ZBAPI_CUST_INQ_NZ>`;
    return xml;
}

const custInq_res = async (cid) => {
    let resData, ret;

    try {
        const { response } = await soapRequest({ url: custInq_url, headers: sampleHeaders, xml: custInq_req(cid), timeout: 10000 }); // Optional timeout parameter(milliseconds)
        const { headers, body, statusCode } = response;
        resData = body;
        const inq_head = resData.INQ_HEAD.item;
        const inq_item = resData.INQ_ITEM.item;
        ret = 'S';
        return [inq_head, inq_item, ret];
    }
    catch (err) {
        ret = 'E';
        return ['', '', ret];
    }
};

app.post('/customerInquiry', (req, res) => {

    // cid = req.body.customer_id;
    // cid = customerid;
    cid = 18;
    let prom = custInq_res(cid);
    let Head = [];
    let Item = [];
    prom.then(([inq_head, inq_item, ret]) => {
        if (ret === 'S') {
            inq_head.forEach((elm, index) => {
                let obj = `{ 
                    "DOC_NUMBER": "${elm.DOC_NUMBER}",
                    "SOLD_TO": "${elm.SOLD_TO}",
                    "REC_DATE": "${elm.REC_DATE}",
                    "REC_TIME": "${elm.REC_TIME}", 
                    "CREATED_BY": "${elm.CREATED_BY}"
                }`;
                // console.log(obj);
                Head.push(JSON.parse(obj));
            })
            inq_item.forEach((elm) => {
                let obj = `{
                    "DOC_NUMBER": "${elm.DOC_NUMBER}",
                    "MATERIAL": "${elm.MATERIAL}",
                    "MATL_GROUP": "${elm.MATL_GROUP}",
                    "ITM_NUMBER": "${elm.ITM_NUMBER}",
                    "SHORT_TEXT": "${elm.SHORT_TEXT}",
                    "REQ_QTY": "${elm.REQ_QTY}",
                    "NET_PRICE": "${elm.NET_PRICE}",
                    "NET_WEIGHT": "${elm.NET_WEIGHT}"
                }`
                Item.push(JSON.parse(obj));

            })
            //console.log("hu" + arr);
            res.status(200).send({ head: Head, item: Item });
        }
        else {
            res.status(401).send("No inquiry data found");
        }
    });
})




// CUSTOMER SALES ORDER STARTS
const custSal_url = 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/CUSTOMERSALENZ/';
const custSal_req = (cid) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
   <ns0:ZBAPI_CUST_SALESORDER_NZ xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
      <CUST_ID>11</CUST_ID>
   </ns0:ZBAPI_CUST_SALESORDER_NZ>`;
    return xml;
}

const custSal_res = async (cid) => {
    let resData;
    const { response } = await soapRequest({ url: custSal_url, headers: sampleHeaders, xml: custSal_req(cid), timeout: 10000 }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;

    resData = body;
    resData = body.IT_TABLE.item;
    ret = body.RETURN.TYPE;
    return [resData, ret];
};

app.post('/customerSales', (req, res) => {

    // cid = req.body.customer_id;
    cid = customerid;
    let prom = custSal_res(cid);
    let arr = [];

    prom.then(([dat, ret]) => {
        if (ret !== 'E') {
            dat.forEach((elm) => {
                let obj = `{ 
                       "SD_DOC": "${elm.SD_DOC}",
                       "NAME": "${elm.NAME}",
                       "DOC_DATE": "${elm.DOC_DATE}",
                       "ITM_NUMBER": "${elm.ITM_NUMBER}", 
                       "MATERIAL": "${elm.MATERIAL}",
                       "SHORT_TEXT": "${elm.SHORT_TEXT}",
                       "REQ_QTY": "${elm.REQ_QTY}",
                       "NET_PRICE": "${elm.NET_PRICE}",
                       "REQ_DATE": "${elm.REQ_DATE}",
                       "DOC_TYPE": "${elm.DOC_TYPE}"
                     }`;
                arr.push(JSON.parse(obj));
            })
            res.status(200).send({ sales_data: arr });
        }
        else {
            res.status(401).send("No sales data found.");
        }
    });
})
// CUSTOMER SALES ORDER ENDS




// CUSTOMER DELIVERY STARTS
const custDeliv_url = 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/CUSTOMERDELIVERYNZ/';
const custDeliv_req = (cid) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
   <ns0:ZBAPI_CUST_DELIVERY_NZ xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
      <CUST_ID>11</CUST_ID>
   </ns0:ZBAPI_CUST_DELIVERY_NZ>`;
    return xml;
}

const custDeliv_res = async (cid) => {
    let resData, ret;

    try {
        const { response } = await soapRequest({ url: custDeliv_url, headers: sampleHeaders, xml: custDeliv_req(cid), timeout: 10000 }); // Optional timeout parameter(milliseconds)
        const { headers, body, statusCode } = response;
        resData = body;
        const deliv_head = resData.IT_DLVHEAD.item;
        const deliv_item = resData.IT_DLVITEM.item;
        ret = 'S';
        if (deliv_head.length < 1 || deliv_item.length < 1) {
            ret = 'E'
        }
        return [deliv_head, deliv_item, ret];
    }
    catch (err) {
        ret = 'E';
        return ['', '', ret];
    }
};

app.post('/customerDelivery', (req, res) => {

    // cid = req.body.customer_id;
    cid = customerid;
    let prom = custDeliv_res(cid);
    let Head = [];
    let Item = [];

    prom.then(([deliv_head, deliv_item, ret]) => {
        if (ret === 'S') {
            deliv_head.forEach((elm, index) => {
                let obj = `{ 
                       "DOC_NUMBER": "${elm.VBELN}",
                       "CREATED_BY": "${elm.ERNAM}",
                       "ENTRY_TIME": "${elm.ERZET}",
                       "CREATED_ON": "${elm.ERDAT}", 
                       "LOADING_DATE": "${elm.LDDAT}",
                       "DELIVERY_DATE": "${elm.LFDAT}",
                       "SHIPPING_POINT": "${elm.VSTEL}",
                       "PICKING_DATE": "${elm.KODAT}",
                       "UNLOADING_POINT": "${elm.ABLAD}"
                     }`;
                Head.push(JSON.parse(obj));
            })

            deliv_item.forEach((elm) => {
                let obj = `{
                    "DOC_NUMBER": "${elm.VBELN}",
                    "DELIVERY_ITEM": "${elm.POSNR}",
                    "MATERIAL_NO": "${elm.MATNR}",
                    "MATERIAL_ENTERED": "${elm.MATWA}",
                    "SHORT_TEXT": "${elm.ARKTX}",
                    "DELIVERY_QTY": "${elm.LFIMG}"
                }`
                Item.push(JSON.parse(obj));
            })

            res.status(200).send({ head: Head, item: Item });

        }
        else {
            res.status(401).send("No delivery data available");
        }
    });
})
// CUSTOMER DELIVERY ENDS



// CUSTOMER CREDIT MEMO STARTS
const custCredit_url = 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/CUSTOMERCREDITNZ/';
const custCredit_req = (cid) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
   <ns0:ZBAPI_CUST_CREDIT_NZ xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
      <CUST_ID>1</CUST_ID>
   </ns0:ZBAPI_CUST_CREDIT_NZ>`;
    return xml;
}

const custCredit_res = async (cid) => {
    let resData;
    const { response } = await soapRequest({ url: custCredit_url, headers: sampleHeaders, xml: custCredit_req(cid), timeout: 10000 }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;

    resData = body;
    try {
        resData = body.IT_CUSTCREDIT.item;
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
};

app.post('/customerCredit', (req, res) => {

    // cid = req.body.customer_id;
    console.log("inside credit");
    cid = customerid;
    // cid = 11;
    let prom = custCredit_res(cid);
    let arr = [];

    prom.then(([dat, ret]) => {
        if (ret === 'S') {
            console.log("credit success");
            dat.forEach((elm) => {
                let obj = `{ 
                       "DOC_NO": "${elm.DOC_NO}",
                       "DOC_TYPE": "${elm.DOC_TYPE}",
                       "COMP_CODE": "${elm.COMP_CODE}",
                       "ENTRY_DATE": "${elm.ENTRY_DATE}", 
                       "ITEM_NUM": "${elm.ITEM_NUM}",
                       "CURRENCY": "${elm.CURRENCY}",
                       "AMNT_LOCAL": "${elm.LC_AMOUNT}",
                       "BLINE_DATE": "${elm.BLINE_DATE}",
                       "ALLOC_NUM": "${elm.ALLOC_NMBR}"
                     }`;
                arr.push(JSON.parse(obj));
            })
            res.status(200).send({ credit_data: arr });
        }
        else {
            res.status(401).send("No Credit data available");
        }
    });
})
// CUSTOMER CREDIT MEMO ENDS


// CUSTOMER DEBIT MEMO STARTS 
const custDebit_url = 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/CUSTOMERDEBITNZ/';
const custDebit_req = (cid) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
   <ns0:ZBAPI_CUST_DEBIT_NZ xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
      <CUST_ID>1</CUST_ID>
   </ns0:ZBAPI_CUST_DEBIT_NZ>`;
    return xml;
}

const custDebit_res = async (cid) => {
    let resData;
    const { response } = await soapRequest({ url: custDebit_url, headers: sampleHeaders, xml: custDebit_req(cid), timeout: 10000 }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;

    resData = body;
    try {
        resData = body.IT_CUSTDEBIT.item;
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
};

app.post('/customerDebit', (req, res) => {

    // cid = req.body.customer_id;
    cid = customerid;
    // cid = 11;
    let prom = custDebit_res(cid);
    let arr = [];

    prom.then(([dat, ret]) => {
        if (ret === 'S') {
            dat.forEach((elm) => {
                let obj = `{ 
                       "DOC_NO": "${elm.DOC_NO}",
                       "DOC_TYPE": "${elm.DOC_TYPE}",
                       "COMP_CODE": "${elm.COMP_CODE}",
                       "ENTRY_DATE": "${elm.ENTRY_DATE}", 
                       "ITEM_NUM": "${elm.ITEM_NUM}",
                       "CURRENCY": "${elm.CURRENCY}",
                       "AMNT_LOCAL": "${elm.LC_AMOUNT}",
                       "BLINE_DATE": "${elm.BLINE_DATE}",
                       "ALLOC_NUM": "${elm.ALLOC_NMBR}"
                     }`;
                arr.push(JSON.parse(obj));
            })
            res.status(200).send({ debit_data: arr });
        }
        else {
            res.status(401).send("No Debit data available");
        }
    });
})
// CUSTOMER DEBIT MEMO ENDS


// START OF CUSTOMER PAYMENT AGING
const custPayag_url = 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/CUSTOMERPAYAGINGNZ/';
const custPayag_req = (cid) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
   <ns0:ZBAPI_CUST_PAYAGING_NZ xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
      <CUST_ID>11</CUST_ID>
   </ns0:ZBAPI_CUST_PAYAGING_NZ>`;
    return xml;
}

const custPayag_res = async (cid) => {
    let resData;
    const { response } = await soapRequest({ url: custPayag_url, headers: sampleHeaders, xml: custPayag_req(cid), timeout: 10000 }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;

    resData = body;
    try {
        resData = body.IT_FINAL.item;
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
};

app.post('/customerPaymentAging', (req, res) => {

    // cid = req.body.customer_id;
    cid = customerid;
    // cid = 11;
    let prom = custPayag_res(cid);
    let arr = [];

    prom.then(([dat, ret]) => {
        if (ret === 'S') {
            dat.forEach((elm) => {
                let startDate = moment(elm.PSTNG_DATE, "YYYY/MM/DD");
                let todayDate = moment(new Date()).format("YYYY/MM/DD");
                let endDate = moment(todayDate, "YYYY/MM/DD");
                let payage = endDate.diff(startDate, 'days');
                let obj = `{ 
                       "COMP_CODE": "${elm.COMP_CODE}",
                       "CUSTOMER": "${elm.CUSTOMER}",
                       "ALLOC_NUM": "${elm.ALLOC_NMBR}",
                       "FISC_YEAR": "${elm.FISC_YEAR}", 
                       "ITEM_NUM": "${elm.ITEM_NUM}",
                       "BILL_DOC": "${elm.BILL_DOC}",
                       "POSTING_DATE": "${elm.PSTNG_DATE}",
                       "PAYMENT_TERMS": "${elm.PMNTTRMS}",
                       "AMNT_LOCAL": "${elm.LC_AMOUNT}",
                       "AMNT_DOC": "${elm.AMT_DOCCUR}",
                       "PAY_AGING": "${payage}",
                       "TAX_LOCAL": "${elm.LC_TAX}"
                     }`;
                arr.push(JSON.parse(obj));
            })
            res.status(200).send({ payaging_data: arr });
        }
        else {
            res.status(401).send("No Payment Aging data available");
        }
    });
})
// END OF CUSTOMER PAYMNET AGING


// CUSTOMER MASTER STARTS
const customerMaster_url = 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/CUSTOMERMASTERNZ/';
const customerMaster_req = (obj) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <ns0:ZBAPI_CUST_MASTER_NZ xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
    <CITY>${obj.CITY}</CITY>
    <COUNTRY>${obj.COUNTRY}</COUNTRY>
    <CUSTID>${obj.CUSTID}</CUSTID>
    <DISTCHANNEL>${obj.DISTCHANNEL}</DISTCHANNEL>
    <DIVISION>${obj.DIVISION}</DIVISION>
    <FNAME>${obj.FNAME}</FNAME>
    <LANGUAGE>${obj.LANGUAGE}</LANGUAGE>
    <LNAME>${obj.LNAME}</LNAME>
    <PINCODE>${obj.PINCODE}</PINCODE>
    <REGION>${obj.REGION}</REGION>
    <SALESORG>${obj.SALESORG}</SALESORG>
    <STREET>${obj.STREET}</STREET>
    <TELEPHONE>${obj.TELEPHONE}</TELEPHONE>
    </ns0:ZBAPI_CUST_MASTER_NZ>`;
    return xml;
}

const customerMaster_res = async (obj) => {
    let resData;
    const { response } = await soapRequest({ url: customerMaster_url, headers: sampleHeaders, xml: customerMaster_req(obj), timeout: 10000 }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;

    resData = body.CUSTOMERID;
    ret = body.RETURN;
    return [resData, ret];
};

app.post('/customerMaster', (req, res) => {

    let arr = [];
    let obj = req.body.data;

    obj.forEach((elm, index) => {
        let prom = customerMaster_res(elm);
        prom.then(([refId, ret]) => {
            if (ret.TYPE !== "E") {
                arr.push({ row: `${index + 1}`, ref_custId: `${refId}`, status: 'Created' });
            }
            else {
                arr.push({ row: `${index + 1}`, ref_custId: `${refId}`, status: 'Not Created' });
            }

            if (arr.length === obj.length) {
                res.status(200).send(arr);
            }

        });
    })

})
//CUSTOMER MASTER ENDS


//VENDOR LOGIN

const vendorLogin_url = 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/VENDORLOGINNZ';
const vendorLogin_xml = (vendor, password) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <ns0:ZBAPI_VENDOR_LOGIN_NZ xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
       <PASSWORD>${password}</PASSWORD>
       <USERNAME>${vendor}</USERNAME>
    </ns0:ZBAPI_VENDOR_LOGIN_NZ>`
    return xml;
}

const vendorlogin = async (vendor, password) => {
    let resData;
    const { response } = await soapRequest({ url: vendorLogin_url, headers: sampleHeaders, xml: vendorLogin_xml(vendor, password), timeout: 10000 }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;

    resData = body.RESULT;


    return resData;
};

app.post('/vendorLogin', (req, res) => {

    vendor = req.body.vendorid;
    password = req.body.password;
    let prom = vendorlogin(vendor, password);
    prom.then((dat) => {
        // console.log(vendor);
        // console.log(dat);
        if (dat.RESULT == 'S') {
            global.vendorid = vendor;
            // console.log(vendor);
        }
        res.send(dat);
    });
})

// VENDOR LOGIN ENDS

//GET VENDOR ID
app.post('/getVendorid', (req, res) => {
    // console.log("id -- " + vendorid);
    res.send({ vendor_id: vendorid });
})


//VENDOR AUTHORIZATION

app.post('/vendorLoggedin', (req, res) => {
    if (vendorid == -1) {
        res.send({ status: 'no' });
    } else {
        res.send({ status: 'yes' });
    }
})

//VENDOR SIGN OUT

app.post('/vendorSignout', (req, res) => {
    vendorid = -1;
    res.send({ status: 'successfully logged out' });
})

//VENDOR PROFILE VIEW 

const vendorProfile_url = 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/VENDORPROFILENZ';
const vendorProfile_xml = (vendor) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <ns0:ZBAPI_VENDOR_PROFILE_NZ xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
       <VENDORID>${vendor}</VENDORID>
    </ns0:ZBAPI_VENDOR_PROFILE_NZ>`;
    return xml;
}

const vendorProfile = async (vendor) => {
    let resultData;
    let ret;
    const { response } = await soapRequest({ url: vendorProfile_url, headers: sampleHeaders, xml: vendorProfile_xml(vendor), timeout: 10000 }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;
    resultData = response.body.IT_DET.item;
    ret = response.body.RETURN;
    return [resultData, ret];
    // if(resData.RETURN.TYPE=='E')

}

app.post('/vendorProfile', (req, res) => {
    const vendor = vendorid;
    // console.log('vendor-' + vendor);
    let prom = vendorProfile(vendor);
    prom.then(([resData, ret]) => {
        //  if(ret.TYPE!='E'){
        //  }
        // console.log(resData);
        res.send(resData);
    });
})


//VENDOR PROFILE EDIT

const vendorProfileedit_url = 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/VENDORPROFILEEDITNZ';
const vendorProfileedit_xml = (vendor) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <ns0:ZBAPI_VENDOR_PROFILE_EDIT_NZ xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
       <CITY>${vendor.city}</CITY>
       <COUNTRY>${vendor.country}</COUNTRY>
       <DISTRICT>${vendor.district}</DISTRICT>
       <FAXNUMBER></FAXNUMBER>
       <FIRSTNAME>${vendor.fname}</FIRSTNAME>
       <LASTNAME>${vendor.sname}</LASTNAME>
       <PINCODE>${vendor.postcode}</PINCODE>
       <STREET>${vendor.street}</STREET>
       <TELEPHONE>${vendor.telephone}</TELEPHONE>
       <TITLE></TITLE>
       <VENDORID>${vendor.ID}</VENDORID>
    </ns0:ZBAPI_VENDOR_PROFILE_EDIT_NZ>`
    return xml;
}

const vendorProfileedit = async (vendor) => {
    const { response } = await soapRequest({ url: vendorProfileedit_url, headers: sampleHeaders, xml: vendorProfileedit_xml(vendor), timeout: 10000 });
    const { headers, body, statusCode } = response;
    resData = body.RETURN.TYPE;
    return resData;
}

app.post('/vendorProfileedit', (req, res) => {
    vendor = req.body.data;
    // let vendor = req.body.DATA;
    // console.log("vendor data collected " + vendor);
    let prom = vendorProfileedit(vendor);
    prom.then(data => {
        if (data == 'S') {
            res.send({ edit_status: 'Successfully Updated' });
        }
        else {
            res.send({ edit_status: 'Update unsuccessful' });
        }
    });
})

//VENDOR RFQ

const vendorRFQ_url = 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/VENDORRFQNZ';
const vendorRFQ_xml = (vendor) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <ns0:ZBAPI_VENDOR_RFQ_NZ xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
       <VENDORID>10036</VENDORID>
    </ns0:ZBAPI_VENDOR_RFQ_NZ>`;
    return xml;
}

const vendorRFQ = async (vendor) => {
    let resData, ret;

    try {
        const { response } = await soapRequest({ url: vendorRFQ_url, headers: sampleHeaders, xml: vendorRFQ_xml(vendor), timeout: 10000 }); // Optional timeout parameter(milliseconds)
        const { headers, body, statusCode } = response;
        resData = body;
        const rfq_head = resData.IT_HEAD.item;
        const rfq_item = resData.IT_ITEM.item;
        ret = 'S';
        return [rfq_head, rfq_item, ret];
    }
    catch (err) {
        ret = 'E';
        return ['', '', ret];
    }
}

app.post('/vendorRFQ', (req, res) => {

    // cid = req.body.customer_id;
    // cid = customerid;
    vendor = vendorid;
    let prom = vendorRFQ(vendor);
    let Head = [];
    let Item = [];
    // console.log("inside");
    prom.then(([rfq_head, rfq_item, ret]) => {
        if (ret === 'S') {
            rfq_head.forEach((elm, index) => {
                let obj = `{ 
                    "DOC_NUMBER": "${elm.DOC_NUMBER}",
                    "CO_CODE": "${elm.CO_CODE}",
                    "CREATED_ON": "${elm.CREATED_ON}",
                    "CREATED_BY": "${elm.CREATED_BY}",
                    "CURRENCY": "${elm.CURRENCY}"
                    }`;
                // console.log(obj);
                Head.push(JSON.parse(obj));
            })

            rfq_item.forEach((elm) => {
                let obj = `{
                    "DOC_NUMBER": "${elm.DOC_NUMBER}",
                    "DOC_ITEM": "${elm.DOC_ITEM}",
                    "SHORT_TEXT": "${elm.SHORT_TEXT}",
                    "MATERIAL": "${elm.MATERIAL}",
                    "PLANT": "${elm.PLANT}",
                    "QUANTITY": "${elm.QUANTITY}",
                    "NET_PRICE": "${elm.NET_PRICE}"
                }`
                Item.push(JSON.parse(obj));
            })
            //console.log("hu" + arr);
            res.status(200).send({ head: Head, item: Item });
        }
        else {
            res.status(401).send("No rfq data found");
        }
    });
})

// VENDOR PO

const vendorPO_url = 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/VENDORPONZ';
const vendorPO_xml = (vendor) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <ns0:ZBAPI_VENDOR_PO_NZ xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
       <VENDORID>10036</VENDORID>
    </ns0:ZBAPI_VENDOR_PO_NZ>`;
    return xml;
}
const vendorPO = async (vendor) => {
    let data, ret;
    try {
        const { response } = await soapRequest({ url: vendorPO_url, headers: sampleHeaders, xml: vendorPO_xml(vendor), timeout: 10000 });
        const { headers, body, statusCode } = response;
        data = body;
        const head = data.IT_HEAD.item;
        const item = data.IT_ITEM.item;
        ret = 'S';
        return [head, item, ret];

    }
    catch (err) {
        ret = 'E';
        return ['', '', ret];
    }
}

app.post('/vendorPO', (req, res) => {
    vendor = vendorid;

    let Headarr = [];
    let Itemarr = [];
    let prom = vendorPO(vendor);
    prom.then(([head, item, ret]) => {
        if (ret == 'S') {
            head.forEach((elm) => {
                let obj = `{
                    "PO_NUMBER": "${elm.PO_NUMBER}",
                    "CREATED_ON": "${elm.CREATED_ON}",
                    "CREATED_BY": "${elm.CREATED_BY}",
                    "CURRENCY": "${elm.CURRENCY}"
                }`
                Headarr.push(JSON.parse(obj));
            })
            item.forEach((elm) => {
                let obj = `{
                    "PO_NUMBER": "${elm.PO_NUMBER}",
                    "SHORT_TEXT": "${elm.SHORT_TEXT}",
                    "PLANT": "${elm.PLANT}",
                    "QUANTITY": "${elm.QUANTITY}",
                    "NET_PRICE": "${elm.NET_PRICE}"
                }`
                Itemarr.push(JSON.parse(obj));
            })
            res.status(200).send({ head_data: Headarr, item_data: Itemarr });
        }
        else {
            res.status(401).send("No PO data found");
        }
    });
})


//  VENDOR GOODS RECEIPT



const vendorGoodsreceipt_url = 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/VENDORGOODSRECEIPTNZ';
const vendorGoodsreceipt_xml = (vendor) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <ns0:ZBAPI_VENDOR_GOODS_RECEIPT_NZ xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
       <VENDORID>10036</VENDORID>
    </ns0:ZBAPI_VENDOR_GOODS_RECEIPT_NZ>`;
    return xml;
}
const vendorGoodsreceipt = async (vendor) => {
    let data, ret;
    try {
        const { response } = await soapRequest({ url: vendorGoodsreceipt_url, headers: sampleHeaders, xml: vendorGoodsreceipt_xml(vendor), timeout: 10000 });
        const { headers, body, statusCode } = response;
        data = body;
        const head = data.IT_HEAD.item;
        const item = data.IT_ITEM.item;
        ret = 'S';
        return [head, item, ret];

    }
    catch (err) {
        ret = 'E';
        return ['', '', ret];
    }
}

app.post('/vendorGoodsreceipt', (req, res) => {
    vendor = vendorid;

    let Headarr = [];
    let Itemarr = [];
    let prom = vendorGoodsreceipt(vendor);
    console.log("in");
    prom.then(([head, item, ret]) => {
        if (ret == 'S') {
            console.log("if");
            head.forEach((elm) => {
                let obj = `{
                    "MAT_DOC": "${elm.MAT_DOC}",
                    "DOC_YEAR": "${elm.DOC_YEAR}",
                    "DOC_DATE": "${elm.DOC_DATE}",
                    "PSTNG_DATE": "${elm.PSTNG_DATE}",
                    "ENTRY_DATE": "${elm.ENTRY_DATE}",
                    "ENTRY_TIME": "${elm.ENTRY_TIME}"
                }`
                Headarr.push(JSON.parse(obj));
            })
            item.forEach((elm) => {
                let obj = `{
                    "MAT_DOC": "${elm.MAT_DOC}",
                    "MATDOC_ITM": "${elm.MATDOC_ITM}",
                    "MATERIAL": "${elm.MATERIAL}",
                    "PLANT": "${elm.PLANT}",
                    "ENTRY_QNT": "${elm.ENTRY_QNT}",
                    "PO_NUMBER": "${elm.PO_NUMBER}",
                    "PO_ITEM": "${elm.PO_ITEM}",
                    "AMOUNT_LC": "${elm.AMOUNT_LC}"
                }`
                Itemarr.push(JSON.parse(obj));
            })
            res.status(200).send({ Headdata: Headarr, Itemdata: Itemarr });
        }
        else {
            res.status(401).send("No PO data found");
        }
    });
})



//VENDOR CREDIT

const vendorCredit_url = 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/VENDORCREDITNZ';
const vendorCredit_xml = (vid) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <ns0:ZBAPI_VENDOR_CREDIT_NZ xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
       <VENDORID>10067</VENDORID>
    </ns0:ZBAPI_VENDOR_CREDIT_NZ>`;
    return xml;
}

const vendorCredit = async (vid) => {
    let resData;
    const { response } = await soapRequest({ url: vendorCredit_url, headers: sampleHeaders, xml: vendorCredit_xml(vid), timeout: 10000 }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;

    resData = body;
    try {
        resData = body.IT_TABLE.item;
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
};

app.post('/vendorCredit', (req, res) => {

    vid = vendorid;
    let prom = vendorCredit(vid);
    let arr = [];
    // console.log("works");
    prom.then(([dat, ret]) => {
        if (ret === 'S') {
            // console.log("inside if")
            dat.forEach((elm) => {
                let obj = `{ 
                       "MANDT": "${elm.MANDT}",
                       "BUKRS": "${elm.BUKRS}",
                       "GJAHR": "${elm.GJAHR}", 
                       "BELNR": "${elm.BELNR}",
                       "BUDAT": "${elm.BUDAT}",
                       "BLDAT": "${elm.BLDAT}",
                       "WAERS": "${elm.WAERS}",
                       "DMBTR": "${elm.DMBTR}",
                       "ZFBDT": "${elm.ZFBDT}"
                     }`;
                arr.push(JSON.parse(obj));
            })
            res.status(200).send({ credit_data: arr });
        }
        else {
            res.status(401).send("No Credit data available");
        }
    });
})


//VENDOR DEBIT

const vendorDebit_url = 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/VENDORDEBITNZ';
const vendorDebit_xml = (vendor) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <ns0:ZBAPI_VENDOR_DEBIT_NZ xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
       <VENDORID>10067</VENDORID>
    </ns0:ZBAPI_VENDOR_DEBIT_NZ>`;
    return xml;
}
const vendorDebit = async (vendor) => {
    let resData;
    const { response } = await soapRequest({ url: vendorDebit_url, headers: sampleHeaders, xml: vendorDebit_xml(vendor), timeout: 10000 }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;

    resData = body;
    try {
        resData = body.IT_TABLE.item;
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
};

app.post('/vendorDebit', (req, res) => {

    vendor = vendorid;
    let prom = vendorDebit(vendor);
    let arr = [];
    // console.log("works");
    prom.then(([dat, ret]) => {
        if (ret === 'S') {
            // console.log("inside if")
            dat.forEach((elm) => {
                let obj = `{ 
                       "MANDT": "${elm.MANDT}",
                       "BUKRS": "${elm.BUKRS}",
                       "GJAHR": "${elm.GJAHR}", 
                       "BELNR": "${elm.BELNR}",
                       "BUDAT": "${elm.BUDAT}",
                       "BLDAT": "${elm.BLDAT}",
                       "WAERS": "${elm.WAERS}",
                       "DMBTR": "${elm.DMBTR}",
                       "ZFBDT": "${elm.ZFBDT}"
                     }`;
                arr.push(JSON.parse(obj));
            })
            res.status(200).send({ debit_data: arr });
        }
        else {
            res.status(401).send("No debit data available");
        }
    });
})

//VENDOR PAYMENT AGING

const vendorPaymentaging_url = 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/VENDORPAYMENTAGINGNZ';
const vendorPaymentaging_xml = (vendor) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <ns0:ZBAPI_VENDOR_PAY_AGE_NZ xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
       <VENDORID>10036</VENDORID>
    </ns0:ZBAPI_VENDOR_PAY_AGE_NZ>`;
    return xml;
}
vendorPaymentaging = async (vendor) => {
    let resData;
    const { response } = await soapRequest({ url: vendorPaymentaging_url, headers: sampleHeaders, xml: vendorPaymentaging_xml(vendor), timeout: 10000 }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;

    resData = body;
    try {
        resData = body.IT_FINAL.item;
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


app.post('/vendorPaymentaging', (req, res) => {

    vendor = vendorid;
    let prom = vendorPaymentaging(vendor);
    let arr = [];
    // console.log("works");
    prom.then(([dat, ret]) => {
        if (ret === 'S') {
            // console.log("inside if")
            dat.forEach((elm) => {
                let obj = `{ 
                       "COMP_CODE": "${elm.COMP_CODE}",
                       "FISC_YEAR": "${elm.FISC_YEAR}",
                       "DOC_NO": "${elm.DOC_NO}", 
                       "ITEM_NUM": "${elm.ITEM_NUM}",
                       "PSTNG_DATE": "${elm.PSTNG_DATE}",
                       "DOC_DATE": "${elm.DOC_DATE}",
                       "CURRENCY": "${elm.CURRENCY}",
                       "LC_AMOUNT": "${elm.LC_AMOUNT}",
                       "BLINE_DATE": "${elm.BLINE_DATE}"
                     }`;
                arr.push(JSON.parse(obj));
            })
            res.status(200).send({ paymentaging_data: arr });
        }
        else {
            res.status(401).send("No data available");
        }
    });
})


app.listen(port, () => {
    console.log('server running');
})