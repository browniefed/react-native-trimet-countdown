var React = require('react-native');
var PositionCircles = require('./PositionCircles');
var PositionTitle = require('./PositionTitle');
var {
    View,
    Text,
    StyleSheet
} = React;

var PositionCard = React.createClass({
    getDefaultProps: function() {
        return {
            name: '',
            stopId: '',
            position: -1,
            circleColor: '#000'
        };
    },
    render: function() {
        return (
            <View style={styles.container}>
                <PositionTitle 
                    name={this.props.name} 
                    id={this.props.stopId} 
                />
                <PositionCircles
                    circleColor={this.props.circleColor}
                    position={this.props.position}
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

module.exports = PositionCard;