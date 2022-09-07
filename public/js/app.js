console.log('Java script from public folder')

const weatherForm = document.querySelector('form')
const searchLocation = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent=''
messageTwo.textContent=''

weatherForm.addEventListener('submit',(e)=>{
e.preventDefault()
const  location = searchLocation.value
messageOne.textContent='Loading.....'
messageTwo.textContent=''
fetch('http://localhost:3000/weather?address='+location).then( (response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent=data.error
            console.log(data.error)
        } else {
            messageOne.textContent='location: '+data.location
            messageTwo.textContent='weather_descriptions: '+data.forecast.weather_descriptions + ', temperature: '+
            data.forecast.temperature +', feelslike: '+ data.forecast.feelslike
            console.log(data)
        }

    })
    console.log(response)
})


})
