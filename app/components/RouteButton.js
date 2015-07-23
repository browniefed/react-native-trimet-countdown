var React = require('react-native');
var StopMap = require('../StopMap');

var {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    LayoutAnimation
} = React;


var RouteButton = React.createClass({
    getDefaultProps: function() {
        return {
            onPress: function() {},
        };
    },
    componentWillMount: function() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    },
    handlePress: function() {
        this.props.onPress(this.props.locid, this.props.route);
    },
    render: function() {
        var route = this.props.route;

        return (
            <TouchableOpacity onPress={this.handlePress}>
                <View style={styles.routeResult}>
                    <Text style={styles.routeResultText}>{(StopMap[route] && StopMap[route].text) || 'Route ' + route}</Text>
                </View>
            </TouchableOpacity>
        );
    }

});


var styles = StyleSheet.create({
    routeResult: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 5,
        height: 50
    },
    routeResultText: {
        fontSize: 15
    },
})

module.exports = RouteButton;