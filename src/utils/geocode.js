const request = require('request')

const geocode = (address, callback) => {
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoiam9hZGhpdHlhaCIsImEiOiJja2NnOGd3NjYwYmpnMnpxeWZ3NGZnanY5In0.nke_shZ-nPqefJ--2Ps-cA&limit=1';
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('error, data', undefined)
            // console.log('Someting went wrong')
        } else if (body.features.length === 0) {
            callback('Please try another location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })

}


module.exports = geocode