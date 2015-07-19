var React = require('react-native');
var _ = require('lodash');
var {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity
} = React;

var AddRoute = React.createClass({
    getDefaultProps: function() {
        return {
            onChangeText: function() {}
        };
    },
    blur: function() {
        this.refs.input.blur();
    },
    render: function() {
        return (
            <View style={styles.container}>
                <View style={styles.inputWrap}>
                    <TextInput 
                        ref="input"
                        style={styles.input}
                        {..._.omit(this.props, 'ref')}
                    />
                </View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center'
    },
    inputWrap: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC'
    },
    input: {
        flex: 1,
        padding: 5
    }
})

module.exports = AddRoute;