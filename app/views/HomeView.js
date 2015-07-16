var React = require('react-native');
var PositionCard = require('./../components/PositionCard');
var AddRoute = require('./../components/AddRoute');
var StopsList = require('./../components/StopsList');

var _ = require('lodash');
var {
    View,
    Text,
    ScrollView,
    StyleSheet,
    ListView
} = React;

var HomeView = React.createClass({
    getDefaultProps: function() {
        return {
            stops: {}
        };
    },
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
          dataSource: ds.cloneWithRows(this.getRows()),
        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.stops)
        });
    },
    getRows: function() {
        return this.props.stops;
    },
    render: function() {
        return (
            <View style={styles.container}>
                <View style={styles.addRoute}>
                    <AddRoute />
                </View>
                <View style={styles.activeStops}>
                    <StopsList 
                        dataSource={this.state.dataSource}
                    />
                </View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        padding: 20,
        paddingTop: 50
    },
    addRoute: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20
    },

    activeStops: {
        flex: 10,
        flexDirection: 'column'
    }
})

module.exports = HomeView;