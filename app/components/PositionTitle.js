var React = require('react-native');
var {
    View,
    Text,
    StyleSheet
} = React;

var PositionTitle = React.createClass({
    getDefaultProps: function() {
        return {
            id: '',
            name: '',
            route: ''
        };
    },
    render: function() {
        return (
            <View style={styles.view}>
                <Text style={styles.text}>{this.props.name}</Text>
            </View>
        );
    }

});

var styles = StyleSheet.create({
    view: {
        flex: 1
    },
    text: {
        fontSize: 12
    }
})

module.exports = PositionTitle;