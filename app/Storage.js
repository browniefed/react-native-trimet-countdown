var React = require('react-native');
var _ =  require('lodash');
var {
    AsyncStorage
} = React;



    function getStops(cb) {
        AsyncStorage.getItem('stops').then(function(stops) {
            cb && cb(JSON.parse(stops));
        }).catch(function() {
            console.warn('error');
        })
    }

    function saveStops(stops, cb) {
        AsyncStorage.setItem('stops', JSON.stringify(stops)).then(function() {
            cb && cb();
        }).catch(function() {
            console.warn('stops not saved');
        })
    }

    function addStop(data) {
        getStops(function(stops) {
            var _stops = stops || [];
            _stops.push(data);
            saveStops(_stops);
        })
    }

var Storage = {
    getStops: getStops,
    saveStops: saveStops,
    addStop: addStop,
    removeStop: function() {
        //This should just be save stops?
    }
}


module.exports = Storage;