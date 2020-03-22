var PieChart = function(t, e, a) {
  var n = this;
  n.setValues(t, e, a), n.drawPieChart(), window.addEventListener("resize", function(o) {
    n.setValues(t, e, a), n.drawPieChart()
  })
};
PieChart.prototype.setValues = function(t, e, a) {
  var n = this;
  n.options = a || {}, n.data = e;
  var o = n.options.margin;
  n.getElement(t), n.margin = {
    left: o && o.left ? o.left : 0,
    right: o && o.right ? o.right : 0,
    top: o && o.top ? o.top : 0,
    bottom: o && o.bottom ? o.bottom : 0
  }, n.setCanvasBoundary()
}, PieChart.prototype.getElement = function(t) {
  var e = this;
  "object" == typeof t ? e.element = t : "#" !== t[0] && "." !== t[0] || (e.element = document.querySelector(t)), e.elementClass = e.element.className
}, PieChart.prototype.setCanvasBoundary = function() {
  var t = this,
    e = t.margin,
    a = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    n = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  t.width = 0 === t.element.offsetWidth ? a : t.element.offsetWidth, t.height = 0 === t.element.offsetHeight ? n : t.element.offsetHeight, t.options.legend && t.options.legend.show && (t.width -= 100), t.canvasHeight = t.height - (e.top + e.bottom), t.canvasWidth = t.width - (e.left + e.right)
}, PieChart.prototype.setColorPattern = function() {
  var t = this.options.pie;
  return t && t.color && Array.isArray(t.color) ? d3.scaleOrdinal().range(t.color) : d3.scaleOrdinal(d3.schemeCategory20c)
}, PieChart.prototype.createCanvas = function() {
  var t = this;
  d3.select(t.element).selectAll("svg").remove(), t.plot = d3.select(t.element).append("svg").attr("width", t.width).attr("height", t.height).attr("class", "fc-graph-area")
}, PieChart.prototype.createArc = function() {
  var t = this,
    e = t.options.pie,
    a = Math.PI / 180,
    n = e && e.radius && e.radius < Math.min(t.canvasHeight, t.canvasWidth) / 2 ? e.radius : Math.min(t.canvasHeight, t.canvasWidth) / 2,
    o = e && e.chart && e.chart.type && ("DOUGHNUT" === e.chart.type.toUpperCase() || "DONUT" === e.chart.type.toUpperCase()) ? e.chart.width ? n - e.chart.width : .75 * n : 0,
    i = e && e.cornerRadius ? e.cornerRadius : 0,
    r = e && e.padding ? e.padding * a : 0;
  return d3.arc().innerRadius(o).outerRadius(n).cornerRadius(i).padAngle(r)
}, PieChart.prototype.createPie = function() {
  var t = this.options.pie,
    e = Math.PI / 180,
    a = t && t.curve ? t.curve * e : 2 * Math.PI,
    n = t && t.startAngle ? t.startAngle * e : 0;
  return d3.pie().value(function(t) {
    return t[1]
  }).startAngle(n).endAngle(n + a).sort(null)
}, PieChart.prototype.drawPieChart = function() {
  var t = this,
    e = t.margin,
    a = t.options.legend,
    n = t.options.transition,
    a = t.options.legend,
    o = t.createArc(),
    i = t.createPie(),
    r = t.setColorPattern(),
    s = a && a.show ? "left" === a.position ? t.canvasWidth / 2 + e.left + 100 : "center" === a.position ? t.canvasWidth / 2 : t.canvasWidth / 2 + e.left - 50 : t.canvasWidth / 2 + e.left - 50,
    l = t.canvasHeight / 2 + e.top;
  i && i.radius && i.radius < Math.min(t.canvasHeight, t.canvasWidth) / 2 ? i.radius : Math.min(t.canvasHeight, t.canvasWidth);
  t.createCanvas();
  var c = t.plot.append("g").attr("class", "fc-pie-chart").attr("transform", "translate(" + s + "," + l + ")");
  t.pieChartPlot = c.selectAll("path").data(i(t.data)).enter().append("path").attr("class", "fc-pie").attr("d", o).attr("fill", function(t) {
    return r(t.data[0])
  }), n && n.animate && t.animateDraw(o), t.checkTooltip(), a && a.show && t.showLegend()
}, PieChart.prototype.animateDraw = function(t) {
  var e = this,
    a = e.options.transition,
    n = a && a.duration ? a.duration : 1e3;
  e.pieChartPlot.transition().ease(d3.easeExp).duration(n).attrTween("d", function(e) {
    var a = d3.interpolate({
      startAngle: 0,
      endAngle: 0
    }, e);
    return function(e) {
      return t(a(e))
    }
  })
}, PieChart.prototype.checkTooltip = function() {
  var t = this;
  if (t.options.tooltip && t.options.tooltip.show) {
    var e = t.options.tooltip.listener ? t.options.tooltip.listener : "mousemove";
    t.showTooltip(t.options.tooltip, e)
  }
}, PieChart.prototype.showTooltip = function(t, e) {
  var a, n, o = this,
    i = t.class ? "fc-tooltip " + t.class : "fc-tooltip";
  d3.select(o.element).selectAll("#fc-tooltip").remove();
  var r = d3.select(o.element).append("div").attr("class", i).attr("id", "fc-tooltip");
  r.node().style.position = "absolute", r.node().style.display = "none", o.pieChartPlot.on(e, function(e) {
    n = d3.event.type, t.xValue = e.data[0], t.yValue = e.data[1], a !== e ? (r.node().style.display = "block", r.html(t.formatter ? t.formatter() : o.tooltipBody(t)), r.style("top", d3.event.layerY + 10 + "px").style("left", d3.event.layerX + 10 + "px"), a = "mouseover" != d3.event.type ? e : "") : (r.node().style.display = "none", a = "")
  }).on("mouseout", function() {
    "mouseover" === n && (r.node().style.display = "none")
  }), document.addEventListener("touchstart", function(t) {
    t.touches[0];
    t.target.classList.contains("fc-pie") || (r.node().style.display = "none")
  }, !1), document.addEventListener("click", function(t) {
    t.target.classList.contains("fc-pie") || (r.node().style.display = "none")
  }, !1)
}, PieChart.prototype.tooltipBody = function(t) {
  return title = t.body && t.body.title ? t.body.title : "Title", xLabel = t.body && t.body.xLabel ? t.body.xLabel : "X ", yLabel = t.body && t.body.yLabel ? t.body.yLabel : "Y ", xValue = t.xValue, yValue = t.yValue, content = "", title && (content += "<b>" + title + "</b>"), xLabel && (content += "<br/>" + xLabel + ": " + xValue), yLabel && (content += "<br/>" + yLabel + ": " + yValue), content
}, PieChart.prototype.showLegend = function() {
  var t = this,
    e = t.options.legend,
    a = t.options.pie,
    n = t.setColorPattern();
  switch (e.position) {
    case "right":
      o = t.canvasWidth - 50;
      break;
    case "left":
      o = t.margin.left + 70;
      break;
    case "center":
      if (a && a.chart && ("DOUGHNUT" === a.chart.type.toUpperCase() || "DONUT" === a.chart.type.toUpperCase())) o = t.canvasWidth / 2;
      else o = t.canvasWidth - 50;
      break;
    default:
      var o = t.canvasWidth - 50
  }
  var i = t.canvasHeight / 3;
  (e = t.plot.append("g").attr("class", "fc-legend").attr("transform", "translate(" + o + "," + i + ")").selectAll(".fc-legend-item").data(t.data).enter().append("g").attr("class", "fc-legend-element").attr("transform", function(t, e) {
    return "translate(-36," + (23 * e - 5) + ")"
  })).append("rect").attr("width", 18).attr("height", 18).style("fill", n).style("stroke", n), e.append("text").attr("x", 23).attr("y", 13).text(function(t) {
    return t[0]
  })
};