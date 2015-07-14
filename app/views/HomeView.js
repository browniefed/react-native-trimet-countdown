var React = require('react-native');
var PositionCard = require('./../components/PositionCard');
var _ = require('lodash');
var {
    View,
    Text,
    ScrollView
} = React;

var HomeView = React.createClass({
    getDefaultProps: function() {
        return {
            stops: {}
        };
    },
    getStops() {
        return _.map(this.props.stops, function(stop) {
            return (
                <PositionCard {...stop} />
            )
        })
    },
    render: function() {
        return (
            <View>
                {this.getStops()}
            </View>
        );
    }

});

module.exports = HomeView;