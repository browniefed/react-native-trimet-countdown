var React = require('react-native');

var {
    AsyncStorage
} = React;


var Storage = {

    getStops: function(cb) {
        AsyncStorage.getItem('stops').then(function(stops) {
            cb && cb(JSON.parse(stops));
        }).catch(function() {
            console.warn('error');
        })
    },

    saveStops: function(stops, cb) {
        AsyncStorage.setItem('stops', JSON.stringify(stops)).then(function() {
            cb && cb();
        }).catch(function() {
            console.warn('stops not saved');
        })
    },

    removeStop: function() {
        //This should just be save stops?
    }
}


module.exports = Storage;