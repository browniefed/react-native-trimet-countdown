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
            position: [],
            circleColor: '#000',
            routeId: ''
        };
    },
    render: function() {
        return (
            <View style={styles.container}>
                <PositionTitle 
                    name={this.props.name} 
                    id={this.props.stopId} 
                    route={this.props.routeId}
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
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 5
    }
})

module.exports = PositionCard;