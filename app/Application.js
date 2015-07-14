var React = require('react-native');

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
            stops: [],
            text: ''
        };
    },
    componentWillMount: function() {
        var socket = io('http://localhost:8080');
        socket.emit('follow_stop', {stop: 8374, routeId: 100});
        socket.on('postion_update', function(data) {
            this.setState({
                text: data
            })
        }.bind(this))
        //get stuff from storage
        Storage.getStops(function(stops) {
            this.setState({
                stops: stops || []
            });
        }.bind(this));
    },
    render: function() {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center', flex:1 }}>
                <Text>{this.state.text}</Text>
            </View>
        );
    }

});

module.exports = Application;