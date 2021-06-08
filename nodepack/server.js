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
    user = req.body.username;
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
    let arr = [];

    prom.then(([inq_head, inq_item, ret]) => {
        if (ret === 'S') {
            inq_head.forEach((elm, index) => {
                let obj = `{ 
                       "SOLD_TO": "${elm.SOLD_TO}",
                       "DOC_NUMBER": "${elm.DOC_NUMBER}",
                       "REC_DATE": "${elm.REC_DATE}",
                       "REC_TIME": "${elm.REC_TIME}", 
                       "CREATED_BY": "${elm.CREATED_BY}",
                       "MATERIAL": "${inq_item[index].MATERIAL}",
                       "MATL_GROUP": "${inq_item[index].MATL_GROUP}",
                       "ITM_NUMBER": "${inq_item[index].ITM_NUMBER}",
                       "SHORT_TEXT": "${inq_item[index].SHORT_TEXT}",
                       "REQ_QTY": "${inq_item[index].REQ_QTY}",
                       "NET_PRICE": "${inq_item[index].NET_PRICE}",
                       "NET_WEIGHT": "${inq_item[index].NET_WEIGHT}"
                     }`;
                // console.log(obj);
                arr.push(JSON.parse(obj));
            })
            //console.log("hu" + arr);
            res.status(200).send({ inquiry_data: arr });
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
    let arr = [];

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
                       "UNLOADING_POINT": "${elm.ABLAD}",
                       "DELIVERY_ITEM": "${deliv_item[index].POSNR}",
                       "MATERIAL_NO": "${deliv_item[index].MATNR}",
                       "MATERIAL_ENTERED": "${deliv_item[index].MATWA}",
                       "MATERIAL_GROUP": "${deliv_item[index].MATKL}",
                       "DELIVERY_QTY": "${deliv_item[index].LFIMG}"
                     }`;
                arr.push(JSON.parse(obj));
            })
            res.status(200).send({ delivery_data: arr });
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
    cid = customerid;
    let prom = custCredit_res(cid);
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
        console.log(vendor);
        console.log(dat);
        if (dat.RESULT == 'S') {
            global.vendorid = vendor;
            console.log(vendor);
        }
        res.send(dat);
    });
})

// VENDOR LOGIN ENDS

//GET VENDOR ID
app.post('/getVendorid', (req, res) => {
    console.log("id -- " + vendorid);
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


app.listen(port, () => {
    console.log('server running');
})