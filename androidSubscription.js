import { google } from 'googleapis';

const publisher = google.androidpublisher('v3');
const OAuth2 = google.auth.OAuth2;

const SERVICE_ACCOUNT_FILE_PATH = require('./subscription.json');

const jwtClient = new google.auth.JWT(
	'service account@app.iam.gserviceaccount.com', //SERVICE_ACCOUNT_EMAIL
	null,
	SERVICE_ACCOUNT_FILE_PATH.private_key,
	['https://www.googleapis.com/auth/androidpublisher'],
	null,
);

google.options({ auth: jwtClient });

const receipt = {
    packageName, // com.xxxxxxxx.app
    subscriptionId, // xxxx_basic_monthly
    token, // purchase token
}

export default receipt => new Promise((resolve, reject) => {
	publisher.purchases.subscriptions.get(receipt).then(response => resolve(response.data))
		.catch(err => reject(err));
});


/*
SUCCESS RESPONSE DATA
{
        "startTimeMillis": "1625202245385",
        "expiryTimeMillis": "1625202528166",
        "autoRenewing": false,
        "priceCurrencyCode": "USD",
        "priceAmountMicros": "9990000",
        "countryCode": "IN",
        "developerPayload": "",
        "cancelReason": 1,
        "orderId": "GPA.XXXX-XXXX-XXXX-XXXX",
        "purchaseType": 0,
        "acknowledgementState": 0,
        "kind": "androidpublisher#subscriptionPurchase"
    }


*/