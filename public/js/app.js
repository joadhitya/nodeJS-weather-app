// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data.puzzle)
//     })
// })

// function fetchWeather(location){
// }


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#location')
const message2 = document.querySelector('#forecast')

message1.textContent = ''
message2.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()    
    message1.textContent = 'Please waiting for get weather data.......'    
    message2.textContent = ''
    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
                message1.textContent = data.error
            }else{                
                message1.textContent = data.location
                message2.textContent = 'The weather is '+data.forecast.description+ '. It is ' +data.forecast.temperature+ ' F , but it feels like ' +data.forecast.feels+ ' F.'
            }
        })
    })
})