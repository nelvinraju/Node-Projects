const request = require('postman-request');



// request({url:url,json:true},(error,response)=>{
    
//     if(error){
//         console.log('Unable to connect to weather service.')
//     }else if(response.body.error){
//         console.log('Unable to find the location.')
//     }else{
//         console.log(response.body.current.weather_descriptions[0]+' it is currently '+response.body.current.temperature+' degrees out and feels like '+response.body.current.feelslike+' degress out.')
//     }
    
//})

const forecast=(latitude,longitude,callback) =>{

    const url='http://api.weatherstack.com/current?access_key=79b39ed317b1d1f1acf122b0d90315b0&query='+latitude+','+longitude



    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to weather service.',undefined)
        }else if(response.body.error){
            callback('Unable to find the location.',undefined)
        }else{
    
            callback(undefined,{
                weather_descriptions : response.body.current.weather_descriptions[0],
                temperature : response.body.current.temperature,
                feelslike : response.body.current.feelslike
            })
        }
    
    
    })

}

module.exports=forecast