const request = require('postman-request');

const geocode=(address,callback) =>{

    const geocodeURL ='http://api.positionstack.com/v1/forward?access_key=da8e0d910bd4ee54a05a3286148fc717&query='+address+'&limit=1'


    request({url:geocodeURL,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to Gelocation service.',undefined)
        }else if(response.body.error){
            callback('Unable to find the lattitude and longitude for the location.',undefined)
        }else{
    
            callback(undefined,{
                latitude : response.body.data[0].latitude,
                longitude : response.body.data[0].longitude,
                location : response.body.data[0].name
            })
        }
    
    
    })

}

module.exports= geocode