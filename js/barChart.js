(function() {
    angular
        .module('app')
        .directive('barChart', barChart);

    function barChart() {

        return {
            restrict: 'E',
            scope: {
                data: '='
            },
            link: function(scope, elem, attrs) {

                    var margins = {
                            top: 10,
                            left: 10,
                            right: 10,
                            bottom: 10
                        },
                        legendPanel = {
                            width: 180
                        },
                        width = 500 - margins.left - margins.right,
                        height = 100 - margins.top - margins.bottom,
                        dataset = [{
                                data: [{
                                    month: 'Aug',
                                    count: 123
                                }],
                                name: 'Series #1'
                            }, {
                                data: [{
                                    month: 'Aug',
                                    count: 235
                                }],
                                name: 'Series #2'
                            }

                        ],
                        series = dataset.map(function(d) {
                            return d.name;
                        }),
                        dataset = dataset.map(function(d) {
                            return d.data.map(function(o, i) {
                                // Structure it so that your numeric
                                // axis (the stacked amount) is y
                                return {
                                    y: o.count,
                                    x: o.month
                                };
                            });
                        }),
                        stack = d3.layout.stack();

                    stack(dataset);

                    var dataset = dataset.map(function(group) {
                            return group.map(function(d) {
                                // Invert the x and y values, and y0 becomes x0
                                return {
                                    x: d.y,
                                    y: d.x,
                                    x0: d.y0
                                };
                            });
                        }),
                        svg = d3.select(elem[0])
                        .append('svg')
                        .attr('width', width + margins.left + margins.right)
                        .attr('height', height + margins.top + margins.bottom)
                        .append('g')
                        .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')'),
                        xMax = d3.max(dataset, function(group) {
                            return d3.max(group, function(d) {
                                return d.x + d.x0;
                            });
                        }),
                        xScale = d3.scale.linear()
                        .domain([0, xMax])
                        .range([0, width]),
                        months = dataset[0].map(function(d) {
                            return d.y;
                        }),
                        yScale = d3.scale.ordinal()
                        .domain(months)
                        .rangeRoundBands([0, height], .1),
                        colours = d3.scale.category10(),
                        groups = svg.selectAll('g')
                        .data(dataset)
                        .enter()
                        .append('g')
                        .style('fill', function(d, i) {
                            return colours(i);
                        }),
                        rects = groups.selectAll('rect')
                        .data(function(d) {
                            return d;
                        })
                        .enter()
                        .append('rect')
                        .attr('x', function(d) {
                            return xScale(d.x0);
                        })
                        .attr('y', function(d, i) {
                            return yScale(d.y);
                        })
                        .attr('height', function(d) {
                            return yScale.rangeBand();
                        })
                        .attr('width', function(d) {
                            return xScale(d.x);
                        })


                } //end of link
        };
    };
})();