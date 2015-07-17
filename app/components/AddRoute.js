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
            onAdd: function() {}
        };
    },
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
    handleAdd: function() {
        this.props.onAdd(this.state.value);

        this.setState({
            value: ''
        });
    },
    render: function() {
        return (
            <View style={styles.container}>
                <View style={{flex: 3}}>
                    <TextInput 
                        ref="input"
                        style={styles.input} 
                        value={this.state.value}
                        onChangeText={this.handleChangeText}
                        placeholder="Search by Stop ID"
                        returnKeyType="search"
                        keyboardType="numeric"
                        onSubmitEditing={this.handleAdd}
                    />
                </View>
                <TouchableOpacity onPress={this.handleAdd}>
                    <View style={styles.addButton}>
                        <Text style={styles.addButtonText}>
                            Add Stop
                        </Text>
                    </View>
                </TouchableOpacity>

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
    addButton: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        borderWidth
        : 1,
        borderColor: '#000'
    },
    input: {
        borderColor: '#000',
        borderWidth: 1,
        flex: 1,
        padding: 5
    }
})

module.exports = AddRoute;