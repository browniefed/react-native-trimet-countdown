var React = require('react-native');

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

    render: function() {
        return (
            <View style={styles.container}>
                <View style={styles.inputWrap}>
                    <TextInput 
                        style={styles.input}
                        {...this.props}
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
        flex: 1
    },
    input: {
        borderColor: '#000',
        borderWidth: 1,
        flex: 1,
        padding: 5
    }
})

module.exports = AddRoute;