// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const crypto = require("crypto");
const axios = require("axios");

const sharedKey = "Qc8EdU7DY-gMI87-JMueZWXdtJ0Ek_hS6dGC_SwusO8",
    apiKey = "afce72fb-9fba-406e-8d19-ffde5b0a7cad",
    productCode = "PR",
    baseURL = "https://api.licensespring.com/api/v3/webhook";

const GenerateHeaders = () => {
    const signingDate = new Date().toUTCString(),
        signingString = `licenseSpring\ndate: ${signingDate}`;

    const signature = crypto
        .createHmac("sha256", sharedKey)
        .update(signingString)
        .digest("base64");

    console.log("signing string", signingString);

    return {
        "Content-Type": "application/json",
        Date: signingDate,
        Authorization: `algorithm="hmac-sha256",headers="date",signature="${signature}",apikey="${apiKey}"`
    };
}

const getLicenses = async productQuantity => {
    const headers = GenerateHeaders();

    const response = await axios.get(
        baseURL + "/license" + `?product=${productCode}&quantity=${productQuantity}`,
        {
            headers: headers
        }
    );
    console.log("/license response", response);
};

const orderLicenses = async () => {
    const headers = GenerateHeaders();

    const response = await axios.post(
        baseURL + "/order", 
        {
            "id": "id_1546606209296",
            "items": [{
                "product_code": "TT",
                "licenses": [{
                    "user": {
                        "email": "end-user@gmail.com"
                    }
                }]
            }]
        },
        {
            headers: headers
        });

    console.log("/order response", response);
};

getLicenses(2);
orderLicenses();
