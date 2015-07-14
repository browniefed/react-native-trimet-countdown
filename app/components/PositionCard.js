var React = require('react-native');
var PositionCircles = require('./PositionCircles');
var PositionTitle = require('./PositionTitle');
var {
    View,
    Text
} = React;

var PositionCard = React.createClass({
    getDefaultProps: function() {
        return {
            name: '',
            stopId: '',
            position: -1
        };
    },
    render: function() {
        return (
            <View>
                <PositionTitle 
                    name={this.props.name} 
                    id={this.props.stopId} 
                />
                <PositionCircles
                    position={this.props.position}
                />
            </View>
        );
    }

});

module.exports = PositionCard;