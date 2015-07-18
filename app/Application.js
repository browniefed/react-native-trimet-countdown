var React = require('react-native');
var _ = require('lodash')
var HomeView = require('./views/HomeView');
var Storage = require('./Storage');
var Colors = require('./Colors');

// HACK FOR SOCKET IO
window.navigator.userAgent = 'react-native';

var io = require('socket.io-client/socket.io');
var Immutable = require('immutable');
var _ = require('lodash');
var {
    View,
    Text,
    StyleSheet,
    Navigator,
} = React;

var Application = React.createClass({
    getInitialState: function() {
        return {
            stops: Immutable.Map({}),
            text: ''
        };
    },
    componentWillMount: function() {
        this.socket = io('http://localhost:5000');
        this.socket.on('postion_update', this.updateStopInfo);
        this.socket.on('stop_info', this.updateStopInfo);

        Storage.getStops(_.bind(function(_stops) {
            var stops = _stops || [];
            _.each(stops, function(stop) {
                this.registerStop(stop.stop, stop.route);
            }, this);

        }, this))
    },
    updateStopInfo: function(data) {
        var map = this.state.stops.get(data.routeId + '_' + data.stopId);
        var stops;

        if (map) {
            stops = this.state.stops.set(data.routeId + '_' + data.stopId, map.merge(data));
        } else {
            stops = this.state.stops.set(data.routeId + '_' + data.stopId, Immutable.Map(data));
        }
        
        this.state.stops = stops;
        this.setState(this.state);
    },
    registerStop: function(stopId, routeId) {
        this.socket.emit('follow_stop', {stop: stopId, routeId: routeId});
    },
    handleAdd: function(stopId, routeId) {
        this.registerStop(stopId, routeId);
        Storage.addStop({
            stop: stopId,
            route: routeId
        });
    },
    render: function() {
        return (
            <View style={styles.container}>
                <HomeView 
                    stops={this.state.stops.toJS()} 
                    onAdd={this.handleAdd}
                />
            </View>
        );
    }

});

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

module.exports = Application;