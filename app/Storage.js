var React = require('react-native');

var {
    AsyncStorage
} = React;


var Storage = {

    getStops: function(cb) {
        AsyncStorage.getItem('stops').then(function(stops) {
            cb(JSON.parse(stops));
        }).catch(function() {
            console.warn('error');
        })
    },

    addStop: function() {

    },

    removeStop: function() {

    }
}


module.exports = Storage;