var React = require('react-native');
var PositionCard = require('./../components/PositionCard');
var AddRoute = require('./../components/AddRoute');
var StopsList = require('./../components/StopsList');
var Api = require('../Api');
var _ = require('lodash');
var StopMap = require('../StopMap');

var {
    View,
    Text,
    ScrollView,
    StyleSheet,
    ListView,
    LayoutAnimation,
    TouchableOpacity
} = React;

var HomeView = React.createClass({
    getDefaultProps: function() {
        return {
            stops: {},
            onAdd: function() {}
        };
    },
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
          dataSource: ds.cloneWithRows(this.props.stops),
          value: '',
          results: {}
        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.stops)
        });
    },
    handleChangeText: function(text) {
        this.setState({
            value: text
        });

        if ((text || '').length > 1) {
            Api.search(text).then(_.bind(function(json) {
                this.setState({
                    results: json
                });
            }, this)).catch(function(err) {

            })
        }
    },
    addStopAndRoute: function(stopId, routeId) {
        this.props.onAdd(stopId, routeId);
        this.setState({
            results: {},
            value: ''
        });
    },
    getLowerView: function() {
        if (!_.isEmpty(this.state.results) && this.state.value) {
            return (
                <View style={styles.lower} key="results">
                    <Text style={styles.title}>{this.state.results.desc}</Text>
                    <View style={styles.results}>
                        {
                            _.map(this.state.results.routes, function(route) {
                                return (
                                    <TouchableOpacity onPress={_.bind(this.addStopAndRoute, this, this.state.results.locid, route)}>
                                        <View style={styles.routeResult}>
                                            <Text style={styles.routeResultText}>{StopMap[route] || 'Route ' + route}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }, this)
                        }
                    </View>
                </View>
            )

        }

        return (
            <View style={styles.lower} key="active_stops">
                <StopsList 
                    dataSource={this.state.dataSource}
                />
            </View>
        );
    },
    render: function() {
        return (
            <View style={styles.container}>
                <View style={styles.addRoute}>
                    <AddRoute 
                        onAdd={this.props.onAdd}
                        onChangeText={this.handleChangeText}
                        value={this.state.value}
                        placeholder="Search by Stop ID"
                        returnKeyType="search"
                    />
                </View>
                {this.getLowerView()}
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
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
    results: {
        flexDirection: 'column',
        flex: 1
    },

    lower: {
        flex: 10,
        flexDirection: 'column'
    }
})

module.exports = HomeView;