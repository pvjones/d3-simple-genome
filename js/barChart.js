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

                    var width = 500;
                    var height = 40;

                    var dataset = [{
                        data: [{
                            id: 1,
                            length: 249250621
                        }],
                        name: 'chromosome1'
                    }, {
                        data: [{
                            id: 2,
                            length: 243199373
                        }],
                        name: 'chromosome2'
                    }, {
                        data: [{
                            id: 3,
                            length: 198022430
                        }],
                        name: 'chromosome3'
                    }, {
                        data: [{
                            id: 4,
                            length: 191154276
                        }],
                        name: 'chromosome4'
                    }, {
                        data: [{
                            id: 5,
                            length: 180915260
                        }],
                        name: 'chromosome5'
                    }, {
                        data: [{
                            id: 6,
                            length: 171115067
                        }],
                        name: 'chromosome6'
                    }, {
                        data: [{
                            id: 7,
                            length: 159138663
                        }],
                        name: 'chromosome7'
                    }, {
                        data: [{
                            id: 8,
                            length: 146364022
                        }],
                        name: 'chromosome8'
                    }, {
                        data: [{
                            id: 9,
                            length: 141213431
                        }],
                        name: 'chromosome9'
                    }, {
                        data: [{
                            id: 10,
                            length: 135534747
                        }],
                        name: 'chromosome10'
                    }, {
                        data: [{
                            id: 11,
                            length: 135006516
                        }],
                        name: 'chromosome11'
                    }, {
                        data: [{
                            id: 12,
                            length: 133851895
                        }],
                        name: 'chromosome12'
                    }, {
                        data: [{
                            id: 13,
                            length: 115169878
                        }],
                        name: 'chromosome13'
                    }, {
                        data: [{
                            id: 14,
                            length: 107349540
                        }],
                        name: 'chromosome14'
                    }, {
                        data: [{
                            id: 15,
                            length: 102531392
                        }],
                        name: 'chromosome15'
                    }, {
                        data: [{
                            id: 16,
                            length: 90354753
                        }],
                        name: 'chromosome16'
                    }, {
                        data: [{
                            id: 17,
                            length: 81195210
                        }],
                        name: 'chromosome17'
                    }, {
                        data: [{
                            id: 18,
                            length: 78077248
                        }],
                        name: 'chromosome18'
                    }, {
                        data: [{
                            id: 19,
                            length: 59128983
                        }],
                        name: 'chromosome19'
                    }, {
                        data: [{
                            id: 20,
                            length: 63025520
                        }],
                        name: 'chromosome20'
                    }, {
                        data: [{
                            id: 21,
                            length: 48129895
                        }],
                        name: 'chromosome21'
                    }, {
                        data: [{
                            id: 22,
                            length: 51304566
                        }],
                        name: 'chromosome22'
                    }, {
                        data: [{
                            id: 23,
                            length: 155270560
                        }],
                        name: 'chromosome23'
                    }, ]
                    var series = dataset.map(function(d) {
                        return d.name;
                    });
                    var dataset = dataset.map(function(d) {
                        return d.data.map(function(o, i) {
                            // Structure it so that your numeric
                            // axis (the stacked amount) is y
                            return {
                                y: o.length,
                                x: o.id
                            };
                        });
                    });
                    var stack = d3.layout.stack();

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
                    });

                    let svg = d3.select(elem[0])
                        .append('svg')
                        .attr('width', width)
                        .attr('height', height)
                        .append('g');

                    let xMax = d3.max(dataset, function(group) {
                        return d3.max(group, function(d) {
                            return d.x + d.x0;
                        });
                    });

                    let xScale = d3.scale.linear()
                        .domain([0, xMax])
                        .range([0, width])

                    let rows = dataset[0].map(function(d) {
                        return d.y;
                    });

                    let yScale = d3.scale.ordinal()
                        .domain(rows)
                        .rangeRoundBands([0, height]);

                    let colors = color = d3.scale.linear()
                        .domain([1, width/20])
                        .interpolate(d3.interpolateHcl)
                        .range([d3.rgb("#104f99"), d3.rgb('#f75040')]);

                    let groups = svg.selectAll('g')
                        .data(dataset)
                        .enter().append('g')
                        .style('fill', function(d, i) {
                            return colors(i);
                        });

                    let rects = groups.selectAll('rect')
                        .data(function(d) {
                            return d;
                        })
                        .enter().append('rect')
                        .attr('x', function(d) {
                            return xScale(d.x0);
                        })
                        // .attr('y', function(d, i) {
                        //     return yScale(d.y);
                        // })
                        .attr('height', function(d) {
                            return yScale.rangeBand();
                        })
                        .attr('width', function(d) {
                            return xScale(d.x) - 1;
                        })



                } //end of link
        };
    };
})();