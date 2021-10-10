 const fetch = require('node-fetch')
const {google} = require('googleapis');
const keys = require("./keys.json");

const client= new google.auth.JWT(
    keys.client_email, 
    null, 
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets.readonly']
);

client.authorize(function(err, tokens){

    if(err){
        console.log(err);
        return;
    }
    else{
        gsrun(client)
    }
});

var codechefURLs = [];
function makeURLs(dataArray){
    codechefURLs = [];
    for(var i = 0; i<dataArray.length; i++)
    {
        if(dataArray[i]!="####" && dataArray[i]!='')
        {
            var username = dataArray[i][0];
            var url = "https://competitive-coding-api.herokuapp.com/api/codechef/" + username;
            codechefURLs.push(url);
        }
    }
}
// const getData = async () => {
//     fetch('https://competitive-coding-api.herokuapp.com/api/codechef/saranshkhulbe7')
//     .then(response => response.json())
//     .then(data => console.log(data));
// }
function getData(){
    fetch(codechefURLs[0])
    .then(response => response.json())
    .then(data => console.log(data));
}

async function gsrun(cl){
    const gsapi = google.sheets({version: 'v4', auth: cl});
    const opt = {
        spreadsheetId: '19tFsHN-_ivGVE6bC4zjiQUQd6qLku9071FTdimcHMlM',
        range: 'Sheet1!I2:I100'
    };
    let data = await gsapi.spreadsheets.values.get(opt);
    let dataArray = data.data.values;
    makeURLs(dataArray);
    getData();
}
