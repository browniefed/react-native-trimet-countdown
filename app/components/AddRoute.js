var React = require('react-native');

var {
    View,
    Text,
    TextInput,
    StyleSheet
} = React;

var AddRoute = React.createClass({
    getInitialState: function() {
        return {
            value: '' 
        };
    },
    handleChangeText: function(text) {
        this.setState({
            value: text
        })
    },
    render: function() {
        return (
            <View style={styles.container}>
                <Text style={styles.searchText}>Search...</Text>
                <TextInput 
                    style={styles.input} 
                    value={this.state.value}
                    onChangeText={this.handleChangeText}
                    placeholder="Search by Stop ID"
                    returnKeyType="search"
                    keyboardType="numeric"
                />
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1
    },
    searchText: {
        flex: 1
    },
    input: {
        borderColor: '#000',
        borderWidth: 1,
        height: 40,
        flex: 1,
        padding: 5
    }
})

module.exports = AddRoute;