var React = require('react-native');
var PositionCard = require('./PositionCard');
var StopMap = require('../StopMap');
var _ = require('lodash');

var {
    View,
    ListView,
    StyleSheet,
    Text
} = React;

var StopsList = React.createClass({
    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps.dataSource != this.props.dataSource;
    },
    renderRow(rowData, sectionID, rowID) {
        var circleColor;


        if (StopMap[rowData.routeId]) {
            circleColor = StopMap[rowData.routeId].color;
        }

        return (
            <PositionCard
                {...rowData}
                circleColor={circleColor}
            />
        )
    },
    renderSectionHeader(headerData) {
        return (
                <View style={styles.header}>
                    <Text style={styles.headerText}>{_.first(headerData).stopName}</Text>
                </View>
            );
    },
    render: function() {
        return (
            <ListView 
                automaticallyAdjustContentInsets={false}
                dataSource={this.props.dataSource}
                style={styles.list}
                renderRow={this.renderRow}
                renderSectionHeader={this.renderSectionHeader}
            />
        );
    }

});

var styles = StyleSheet.create({
    list: {
        flex: 1
    },
    headerText: {
        fontSize: 14,
        color: '#555'
    },
    seperator: {
        height: 2,
        flex: 1,
        flexDirection: 'row',
    },
    header: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        backgroundColor: '#EEEEEE'
    }
})

module.exports = StopsList;