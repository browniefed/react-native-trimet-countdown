var React = require('react-native');
var PositionCard = require('./PositionCard');
var StopMap = require('../StopMap');

var {
    View,
    ListView,
    StyleSheet
} = React;

var StopsList = React.createClass({

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
    render: function() {
        return (
            <ListView 
                dataSource={this.props.dataSource}
                style={styles.list}
                renderRow={this.renderRow}
            />
        );
    }

});

var styles = StyleSheet.create({
    list: {
        flex: 1
    }
})

module.exports = StopsList;