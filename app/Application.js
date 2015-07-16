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
        var socket = io('http://localhost:5000');
        socket.emit('follow_stop', {stop: 8374, routeId: 100});
        socket.emit('follow_stop', {stop: 8336, routeId: 100});
        socket.emit('follow_stop', {stop: 8336, routeId: 90});
        socket.on('postion_update', this.updateStopInfo);
        socket.on('stop_info', this.updateStopInfo);

        
        Storage.getStops(function(stops) {

        });
    },
    updateStopInfo(data) {
        this.state.stops[data.routeId + '_' + data.stopId] = _.extend({}, this.state.stops[data.routeId + '_' + data.stopId], data);
        this.setState(this.state);
    },
    render: function() {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center', flex:1 }}>
                <HomeView stops={this.state.stops} />
            </View>
        );
    }

});

module.exports = Application;