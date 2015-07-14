var React = require('react-native');
var _ = require('lodash')
var HomeView = require('./views/HomeView');
var Storage = require('./Storage');

// HACK FOR SOCKET IO
window.navigator.userAgent = 'react-native';

var io = require('socket.io-client/socket.io');

var {
    View,
    Text,
    StyleSheet,
    Navigator,
} = React;

var Application = React.createClass({
    getInitialState: function() {
        return {
            stops: {},
            text: ''
        };
    },
    componentWillMount: function() {
        var socket = io('http://localhost:8080');
        socket.emit('follow_stop', {stop: 8374, routeId: 100});

        socket.on('postion_update', function(data) {
            this.state.stops[data.stopId] = _.extend({},this.state.stops[data.stopId],data);
            this.setState(this.state);
        }.bind(this));

        socket.on('stop_info', function(data) {
            this.state.stops[data.stopId] = _.extend({},this.state.stops[data.stopId],data);
            this.setState(this.state);
        }.bind(this))

    },
    getStops: function() {
        return _.map(this.state.stops, function(stop) {
            return (
                <Text>{stop.stopId} - {stop.name} - {stop.position}</Text>
            );
        });
    },
    render: function() {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center', flex:1 }}>
                {this.getStops()}
            </View>
        );
    }

});

module.exports = Application;