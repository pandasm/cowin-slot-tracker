
const https = require('https')

var district_id = 294
var searchdate = '26-05-2021'
var searchage = 18
var searchdose = 'dose1' //'dose2

const options = {
  hostname: 'cdn-api.co-vin.in',
  port: 443,
  path: '/api/v2/appointment/sessions/calendarByDistrict?district_id='+district_id+'&date='+searchdate,
  method: 'GET',
  json: true
}

const req = https.request(options, res => {
let body = ''

res.on("data", (chunk) => {
    body += chunk;
});

res.on("end", () => {
    try {
        let json = JSON.parse(body);
        for (var i=0;i<json.centers.length;i++){
            if(json.centers[i].sessions.length > 0){
                for(var j=0;j<json.centers[i].sessions.length;j++){
                    if(json.centers[i].sessions[j].min_age_limit == searchage){ 
                        if(searchdose=='dose1'){
                            if(json.centers[i].sessions[j].available_capacity_dose1 > 0)
                                console.log(json.centers[i].pincode + ":" + json.centers[i].sessions[j].available_capacity_dose1 + ":" + json.centers[i].name)
                        }
                        if(searchdose=='dose2'){
                            if(json.centers[i].sessions[j].available_capacity_dose2 > 0)
                                console.log(json.centers[i].pincode + ":" + json.centers[i].sessions[j].available_capacity_dose2 + ":" + json.centers[i].name)
                        }
                    }
                } 
            }
        }
    } catch (error) {
        console.error(error.message);
    };
});
});

req.end()


function sleep(seconds){
    var waitUntil = new Date().getTime() + seconds*1000;
    while(new Date().getTime() < waitUntil) true;
}