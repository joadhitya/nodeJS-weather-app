const request = require('request')

const forecast = (longitude, latitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=6f0fb135d1448afabf8fd34a19fb44ef&query=' + latitude + ',' + longitude + '&units=s'
    request({
        url: url,
        json: true
    }, (error, {
        body
    }) => {

        if (error) {
            callback('error, data', undefined)
        } else if (body.error) {
            callback('Please select location correctly', undefined)
        } else {
            console.log(body)
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feels: body.current.feelslike,                
                summary : 'The humidity around '+ body.current.feelslike + '%'
            })

            // message = response.body.current.weather_descriptions[0] + '. It currently ' + response.body.current.temperature + " degree but it feels like " + response.body.current.feelslike + " degree";
            // console.log(message)
        }
    })

}


module.exports = forecast