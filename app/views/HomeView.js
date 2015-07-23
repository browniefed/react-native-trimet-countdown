var React = require('react-native');
var PositionCard = require('./../components/PositionCard');
var AddRoute = require('./../components/AddRoute');
var StopsList = require('./../components/StopsList');
var EmptyStops = require('./../components/EmptyStops');
var EmptyResults = require('./../components/EmptyResults');
var SearchResults = require('./../components/SearchResults');

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
    TouchableOpacity,
    ActivityIndicatorIOS
} = React;

var HomeView = React.createClass({
    getDefaultProps: function() {
        return {
            stops: null,
            onAdd: function() {}
        };
    },
    getInitialState: function() {
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (r1, r2) => r1 !== r2
        });

        return {
          dataSource: ds.cloneWithRowsAndSections(this.props.stops),
          value: '',
          results: {},
          search: false
        };
    },
    componentWillMount: function() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.stops)
        });
    },
    handleChangeText: function(text) {
        this.setState({
            value: text
        });

        if (!text) {
            this.setState({
                results: null,
                search: false
            })
        }
    },
    handleSearch: function() {
        if ((this.state.value || '').length > 0) {

            this.setState({
                loading: true
            });


            Api.search(this.state.value).then(_.bind(function(json) {
                this.setState({
                    results: json,
                    search: true,
                    loading: false
                });
            }, this)).catch(_.bind(function(err) {
                this.setState({
                    loading: false,
                    search: false
                })
            }, this));
        } 
    },
    addStopAndRoute: function(stopId, routeId) {
        this.props.onAdd(stopId, routeId);
        this.setState({
            results: {},
            value: ''
        });
        this.refs.add_route.blur();
    },
    handleEmptyViewPress: function() {
        this.refs.add_route.focus();
    },
    getLowerView: function() {
        if (this.state.loading) {
            return this.getLoading()
        }

        if (this.state.value && _.isEmpty(this.state.results) && this.state.search) {
            return this.getEmptyResults();
        }

        if (this.props.stops !== null && _.isEmpty(this.props.stops) && _.isEmpty(this.state.results)) {
            return this.getEmptyStops();
        }
        
        if (!_.isEmpty(this.state.results) && this.state.value) {
            return this.getSearchResults();
        }

        return this.getStopList();
    },
    getEmptyResults: function() {
        return (
            <View style={styles.centerAll}>
                <EmptyResults onViewPress={this.handleEmptyViewPress} />
            </View>
        )
    },
    getEmptyStops: function() {
        return (
            <View style={styles.centerAll}>
                <EmptyStops onViewPress={this.handleEmptyViewPress} />
            </View>
        )
    },
    getLoading: function() {
        return (
            <View style={[styles.lower, styles.center]}>
                <ActivityIndicatorIOS 
                    animating={true} 
                    size="large"
                />
            </View>
        );
    },
    getSearchResults: function() {
        return (
            <View style={styles.lower}>
                <SearchResults
                    addStopAndRoute={this.addStopAndRoute}
                    results={this.state.results}
                />
            </View>
        )
    },
    getStopList: function() {

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
                {this.getLowerView()}
                <View style={styles.addRoute}>
                    <AddRoute 
                        ref="add_route"
                        onAdd={this.props.onAdd}
                        onChangeText={this.handleChangeText}
                        onSubmitEditing={this.handleSearch}
                        value={this.state.value}
                        placeholder="Search by Stop ID or Name"
                        returnKeyType="search"
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
        paddingTop: 50
    },
    centerAll: {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center'
    },
    addRoute: {
        height: 60,
        paddingTop: 20,
        backgroundColor: '#3A9DC4',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        borderBottomWidth: 2,
        borderBottomColor: '#3288aa'
    },

    stops: {
        flex: 1
    },
    lower: {
        flex: 1,
        marginTop: 10,
        flexDirection: 'column'
    },
    center: {
        alignItems: 'center'
    }
})

module.exports = HomeView;