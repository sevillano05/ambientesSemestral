const awsconfig = {
    "UserAgent": "aws-amplify-cli/2.x.x",
    /*"Auth": {
        "region": "us-east-1",
        "userPoolId": "us-east-1_cWoQwwfbA",
        "userPoolWebClientId": "YOUR_COGNITO_USER_POOL_CLIENT_ID",
        "mandatorySignIn": true,
        "authenticationFlowType": "USER_SRP_AUTH"
    },*/
    "DataStore": {
        "region": "arn:aws:dynamodb:us-east-1:211125447368:table/tasks",
        "syncInterval": 1000
    }
};

export default awsconfig;