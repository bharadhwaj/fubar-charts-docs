var CONSTANTS = {
    DEFAULT_MARGIN: {
      LEFT: 15,
      BOTTOM: 30,
      RIGHT: 15,
      TOP: 15
    },
    ORIENTATION_MARGIN: {
      LEFT: 35,
      BOTTOM: 30,
      RIGHT: 35,
      TOP: 22
    },
    BAR: {
      color: "#4682B4",
      curve: !1,
      opacity: 1,
      padding: .05
    },
    STACKED_BAR: {
      color: ["#CDDC39", "#4CAF50", "#009688", "#00BCD4", "#2196F3", "#3F51B5", "#673AB7"],
      curve: !1,
      opacity: 1,
      padding: .05
    },
    LINE: {
      color: "#4682B4",
      width: 4,
      opacity: 1,
      icon: {
        show: !0,
        width: 10
      }
    },
    MULTI_LINE: {
      color: ["#CDDC39", "#4CAF50", "#009688", "#00BCD4", "#2196F3", "#3F51B5", "#673AB7"],
      width: 4,
      opacity: 1,
      icon: {
        width: 10
      }
    },
    AREA: {
      color: "#4584F1",
      opacity: 1,
      padding: .05,
      icon: {
        show: !0,
        width: 5
      }
    },
    LABEL_WIDTH: 35,
    LABEL_LINE_HEIGHT: .3,
    ICON: {
      DEFAULT_WIDTH: 10,
      DEFAULT_HEIGHT: 10
    },
    DEFAULT_BAR_RADIUS: 0,
    BAR_CHART: {
      type: "bar",
      element: ".fc-bar",
      class: "fc-bar"
    },
    STACK_CHART: {
      type: "stackedBar",
      element: ".fc-stacked-bar",
      class: "fc-stacked-bar"
    },
    LINE_CHART: {
      type: "line",
      element: ".fc-line-point",
      class: "fc-line-point"
    },
    AREA_CHART: {
      type: "area",
      element: ".fc-area-point",
      class: "fc-area-point"
    },
    FIRST_CHILD: 1,
    AXIS_CONFIG: {
      X_AXIS: {
        orientation: "bottom",
        firstLabel: !0,
        ticks: {
          fontSize: "13px",
          alignment: "middle",
          padding: 5
        },
        showAxisLine: !0
      },
      Y_AXIS: {
        orientation: "left",
        ticks: {
          fontSize: "13px",
          padding: 5,
          alignment: "end"
        },
        firstLabel: !0,
        showAxisLine: !0
      }
    },
    TOOLTIP: {
      LISTENERS: "mouseover click touchstart",
      BODY: {
        title: "Title",
        xLabel: "X value",
        yLabel: "Y value"
      }
    }
  },
  Chart = function() {};
Chart.prototype.setValues = function(t, e, a, i) {
  var o = this;
  if ("object" == typeof t ? o.element = t : "#" !== t[0] && "." !== t[0] || (o.element = document.querySelector(t)), o.elementClass = o.element.className, o.data = e, o.options = a || {}, i) switch (i.type) {
    case "bar":
      r = o.options.bar;
      o.color = r && r.color ? r.color : CONSTANTS.BAR.color;
      break;
    case "stackedBar":
      var r = o.options.bar;
      o.stackList = i.stack || [], o.color = r && r.color ? r.color : CONSTANTS.STACKED_BAR.color;
      break;
    case "line":
      n = o.options.line;
      o.color = n && n.color ? n.color : CONSTANTS.LINE.color;
      break;
    case "multiLine":
      var n = o.options.line;
      o.color = n && n.color ? n.color : CONSTANTS.MULTI_LINE.color
  }
  var s = o.options.margin;
  o.margin = {
    left: s && s.left ? s.left : 0,
    right: s && s.right ? s.right : 0,
    top: s && s.top ? s.top : 0,
    bottom: s && s.bottom ? s.bottom : 0
  };
  var l = o.options.axis;
  o.options.legend;
  if (l && l.xAxis && l.xAxis.orientation) CONSTANTS.DEFAULT_MARGIN.BOTTOM;
  else CONSTANTS.DEFAULT_MARGIN.TOP;
  var c = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    d = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  o.width = 0 === o.element.offsetWidth ? c : o.element.offsetWidth, o.height = 0 === o.element.offsetHeight ? d : o.element.offsetHeight, o.elementHeight = 0 === o.element.offsetHeight ? d : o.element.offsetHeight, o.element.addEventListener("touchstart", function(t) {
    t.defaultPrevented()
  }, !1)
}, Chart.prototype.drawChart = function() {
  var t = this,
    e = t.options.legend;
  t.options.axis;
  e && e.show && (e.height ? (t.legendHeight = e.height, t.height -= t.legendHeight, t.elementHeight -= t.legendHeight) : (t.legendHeight = 45, t.height -= t.legendHeight, t.elementHeight -= t.legendHeight)), t.createCanvas(), t.xScales(), t.yScales(), t.addAxes(), t.options.grids && t.addGridLines(t.options.grids)
}, Chart.prototype.createCanvas = function() {
  var t = this;
  d3.select(t.element).selectAll("svg").remove(), t.plot = d3.select(t.element).append("svg").attr("width", "100%").attr("height", t.elementHeight).attr("class", "fc-graph-area")
}, Chart.prototype.xScales = function() {
  var t = this,
    e = t.options.axis,
    a = t.options.bar,
    i = t.margin,
    o = t.width,
    r = t.xExtent,
    n = a && a.padding ? parseFloat(a.padding) : CONSTANTS.BAR.padding;
  e && e.yAxis && e.yAxis.orientation ? "left" === e.yAxis.orientation ? (t.xMin = i.left + CONSTANTS.DEFAULT_MARGIN.LEFT + CONSTANTS.ORIENTATION_MARGIN.LEFT, t.xMax = o - (i.right + CONSTANTS.DEFAULT_MARGIN.LEFT)) : (t.xMin = i.left + CONSTANTS.DEFAULT_MARGIN.LEFT, t.xMax = o - (i.right + CONSTANTS.DEFAULT_MARGIN.RIGHT + CONSTANTS.ORIENTATION_MARGIN.RIGHT)) : (t.xMin = i.left + CONSTANTS.DEFAULT_MARGIN.LEFT + CONSTANTS.ORIENTATION_MARGIN.LEFT, t.xMax = o - (i.right + CONSTANTS.DEFAULT_MARGIN.RIGHT)), t.xScale = d3.scaleBand().padding(n).range([t.xMin, t.xMax]).domain(r)
}, Chart.prototype.yScales = function() {
  var t = this,
    e = t.margin,
    a = t.options.axis,
    i = t.options.goalLine,
    o = t.height,
    r = t.yExtent;
  a && a.xAxis && a.xAxis.orientation ? "bottom" === a.xAxis.orientation ? (t.yMin = o - (e.bottom + CONSTANTS.DEFAULT_MARGIN.BOTTOM), t.yMax = CONSTANTS.DEFAULT_MARGIN.TOP + e.top) : (t.yMin = o - (e.bottom + CONSTANTS.DEFAULT_MARGIN.BOTTOM), t.yMax = e.top + CONSTANTS.DEFAULT_MARGIN.TOP + CONSTANTS.ORIENTATION_MARGIN.TOP) : (t.yMin = o - (e.bottom + CONSTANTS.DEFAULT_MARGIN.BOTTOM), t.yMax = CONSTANTS.DEFAULT_MARGIN.TOP + e.top);
  var n = a && a.yAxis && a.yAxis.ticks ? a.yAxis.ticks : CONSTANTS.AXIS_CONFIG.Y_AXIS.ticks,
    s = i && i.value ? i.value : 0,
    l = n.values ? n.values : [],
    c = [];
  "object" == typeof l[0] ? l.forEach(function(t) {
    c.push(t.value)
  }) : c = l, r[1] = d3.max([s, r[1], d3.max(c)]), s === r[1] && (r[1] *= 1.1, l.push(Math.round(r[1]))), t.yScale = d3.scaleLinear().rangeRound([t.yMin, t.yMax]).domain(r), 0 === l.length && t.yScale.nice()
}, Chart.prototype.addAxes = function() {
  var t = this,
    e = t.options.axis,
    a = e && e.xAxis ? t.options.axis.xAxis : {},
    i = e && e.yAxis ? t.options.axis.yAxis : {};
  t.addXAxis(a), t.addYAxis(i)
}, Chart.prototype.addXAxis = function(t) {
  var e = this,
    a = (e.margin, e.xScale),
    i = t && t.ticks && t.ticks.padding ? t.ticks.padding : CONSTANTS.AXIS_CONFIG.X_AXIS.ticks.padding,
    o = t && void 0 !== t.firstLabel ? t.firstLabel : CONSTANTS.AXIS_CONFIG.X_AXIS.firstLabel,
    r = t && t.orientation ? t.orientation : CONSTANTS.AXIS_CONFIG.X_AXIS.orientation,
    n = t && void 0 !== t.showAxisLine ? t.showAxisLine : CONSTANTS.AXIS_CONFIG.X_AXIS.showAxisLine;
  switch (r) {
    case "top":
      s = d3.axisTop(a).tickPadding(i);
      s = e.checkXAxisLabels(s, t), e.drawXAxis(t, s, e.yMax);
      break;
    default:
      var s = d3.axisBottom(a).tickPadding(i);
      s = e.checkXAxisLabels(s, t), e.drawXAxis(t, s, e.yMin)
  }
  o || (void 0 === e.element.querySelector("#x-axis").children && void 0 !== e.element.querySelector("#x-axis").childNodes[CONSTANTS.FIRST_CHILD] ? e.element.querySelector("#x-axis").childNodes[CONSTANTS.FIRST_CHILD].remove() : void 0 !== e.element.querySelector("#x-axis").children[CONSTANTS.FIRST_CHILD] && e.element.querySelector("#x-axis").children[CONSTANTS.FIRST_CHILD].remove()), n || e.element.querySelector("#x-axis path").remove()
}, Chart.prototype.checkXAxisLabels = function(t, e) {
  var a = this;
  if (e.ticks && e.ticks.values) {
    var i = e.ticks.values;
    if ("object" == typeof i[0]) {
      var o = [],
        r = [];
      i.forEach(function(t) {
        o.push(t.value), r.push(t.label)
      })
    } else var o = i,
      r = i
  } else var o = a.xExtent,
    r = a.xExtent;
  return t.tickValues(o).tickFormat(function(t, a) {
    return e && e.ticks && e.ticks.formatter ? e.ticks.formatter(t) : r[a]
  }), t
}, Chart.prototype.addYAxis = function(t) {
  var e = this,
    a = e.yScale,
    i = t.ticks ? t.ticks : CONSTANTS.AXIS_CONFIG.Y_AXIS.ticks,
    o = t && void 0 !== t.firstLabel ? t.firstLabel : CONSTANTS.AXIS_CONFIG.Y_AXIS.firstLabel,
    r = t && t.orientation ? t.orientation : CONSTANTS.AXIS_CONFIG.Y_AXIS.orientation,
    n = i.padding ? i.padding : "left" === r ? 5 : 30,
    s = t && void 0 !== t.showAxisLine ? t.showAxisLine : CONSTANTS.AXIS_CONFIG.Y_AXIS.showAxisLine;
  switch (r) {
    case "right":
      l = d3.axisRight(a).tickPadding(n);
      l = e.checkYAxisLabels(l, t), e.drawYAxis(t, l, e.xMax);
      break;
    default:
      var l = d3.axisLeft(a).tickPadding(n);
      l = e.checkYAxisLabels(l, t), e.drawYAxis(t, l, e.xMin)
  }
  o || (void 0 === e.element.querySelector("#y-axis").children && void 0 !== e.element.querySelector("#y-axis").childNodes[CONSTANTS.FIRST_CHILD] ? e.element.querySelector("#y-axis").childNodes[CONSTANTS.FIRST_CHILD].remove() : void 0 !== e.element.querySelector("#y-axis").children[CONSTANTS.FIRST_CHILD] && e.element.querySelector("#y-axis").children[CONSTANTS.FIRST_CHILD].remove()), s || (e.element.querySelector("#y-axis path").remove(), d3.select("#y-axis").selectAll("line").remove())
}, Chart.prototype.checkYAxisLabels = function(t, e) {
  var a = this;
  e && void 0 !== e.firstLabel ? e.firstLabel : CONSTANTS.AXIS_CONFIG.Y_AXIS.firstLabel;
  if (e.ticks && e.ticks.values) {
    var i = e.ticks.values;
    if ("object" == typeof i[0]) {
      var o = [],
        r = [];
      i.indexOf(a.yExtent[0]) < 0 && i.unshift({
        value: a.yExtent[0],
        label: a.yExtent[0]
      }), i.forEach(function(t) {
        o.push(t.value), r.push(t.label)
      })
    } else {
      i.indexOf(a.yExtent[0]) < 0 && i.unshift(a.yExtent[0]);
      var o = i,
        r = i
    }
    t.tickValues(o).tickFormat(function(t, a) {
      return e && e.ticks && e.ticks.formatter ? e.ticks.formatter(t) : r[a]
    })
  } else t.tickFormat(function(t) {
    return e && e.ticks && e.ticks.formatter ? e.ticks.formatter(t) : t
  });
  return t
}, Chart.prototype.drawXAxis = function(t, e, a) {
  var i = this,
    o = (i.defaultMargin(), t.ticks && t.ticks.fontSize ? t.ticks.fontSize : CONSTANTS.AXIS_CONFIG.X_AXIS.ticks.fontSize);
  i.xAxisLabels = i.plot.append("g").attr("class", "fc-axis fc-x-axis").attr("id", "x-axis").attr("transform", "translate(0," + a + ")").call(e).selectAll(".tick text").attr("font-size", o), i.checkAxisLabelAlteration(t, "x")
}, Chart.prototype.checkAxisLabelAlteration = function(t, e) {
  var a = this,
    i = t.ticks;
  if (i && i.position) {
    var o = i.position.angle || 0,
      r = i.position.x || "0",
      n = i.position.y || "0";
    a.alterAxisLabel(e, r, n, o)
  }
}, Chart.prototype.drawYAxis = function(t, e, a) {
  var i = this,
    o = (i.margin, t.ticks && t.ticks.alignment ? t.ticks.alignment : CONSTANTS.AXIS_CONFIG.Y_AXIS.ticks.alignment),
    r = t.ticks && t.ticks.fontSize ? t.ticks.fontSize : CONSTANTS.AXIS_CONFIG.Y_AXIS.ticks.fontSize;
  i.yAxisLabels = i.plot.append("g").attr("class", "fc-axis fc-y-axis").attr("id", "y-axis").attr("transform", "translate(" + a + ", 0)").call(e).selectAll(".tick text").attr("font-size", r).call(i.wrap, CONSTANTS.LABEL_WIDTH, o), i.checkAxisLabelAlteration(t, "y")
}, Chart.prototype.addGridLines = function(t) {
  var e = this;
  e.options.axis;
  t.vertical && t.vertical.show && e.addVerticalGridLines(t.vertical), t.horizontal && t.horizontal.show && e.addHorizontalGridLines(t.horizontal)
}, Chart.prototype.alterAxisLabel = function(t, e, a, i) {
  var o = this;
  t = "x" === t || "X" === t ? o.xAxisLabels : o.yAxisLabels, 0 === i ? t.attr("transform", "translate(" + e + "," + a + ")") : 0 === e && 0 === a ? t.attr("transform", "rotate(-" + i + ")") : t.attr("transform", "rotate(-" + i + "), translate(" + e + "," + a + ")")
}, Chart.prototype.wrap = function(t, e, a) {
  t.each(function() {
    for (var t, i = d3.select(this), o = i.text().split(/\s+/).reverse(), r = [], n = 0, s = CONSTANTS.LABEL_LINE_HEIGHT, l = i.attr("x"), c = i.attr("y"), d = parseFloat(i.attr("dy")) + s, p = i.text(null).append("tspan").attr("x", l).attr("y", c).attr("dy", d + "em").attr("text-anchor", a); t = o.pop();) r.push(t), p.text(r.join(" ")), p.node().getComputedTextLength() > e && (r.pop(), p.text(r.join(" ")), r = [t], p = i.append("tspan").attr("x", l).attr("y", c).attr("dy", ++n * s + d + "em").attr("text-anchor", a).text(t))
  })
}, Chart.prototype.addVerticalGridLines = function(t) {
  var e = this,
    a = (e.options.legend, e.options.axis),
    i = (e.margin, a && a.xAxis && a.xAxis.orientation && a.xAxis.orientation, e.yMin);
  e.plot.append("g").attr("id", "vertical-grid").attr("class", "fc-grid vertical-grid").attr("transform", "translate(0 ," + i + ")").call(e.verticalGridLines()), [].forEach.call(e.element.querySelectorAll("#vertical-grid line"), function(e) {
    var a = "";
    t.color && (a += "stroke : " + t.color + ";"), t.opacity && (a += "stroke-opacity : " + t.opacity + ";"), e.setAttribute("style", a)
  })
}, Chart.prototype.addHorizontalGridLines = function(t) {
  var e = this,
    a = e.margin,
    i = e.options.axis,
    o = i && i.yAxis && void 0 !== i.yAxis.showAxisLine ? i.yAxis.showAxisLine : CONSTANTS.AXIS_CONFIG.Y_AXIS.showAxisLine,
    r = i && i.yAxis && i.yAxis.orientation ? i.yAxis.orientation : CONSTANTS.AXIS_CONFIG.Y_AXIS.orientation,
    n = o ? "left" === r ? CONSTANTS.ORIENTATION_MARGIN.LEFT + CONSTANTS.DEFAULT_MARGIN.LEFT + a.left : CONSTANTS.DEFAULT_MARGIN.LEFT + a.left : 0;
  e.plot.append("g").attr("id", "horizontal-grid").attr("class", "fc-grid horizontal-grid").attr("transform", "translate(" + n + ",0)").call(e.horizontalGridLines());
  var s = e.element.querySelectorAll("#horizontal-grid g"),
    l = s.length;
  [].forEach.call(s, function(e, a) {
    var i = "";
    t.color && (i += "stroke : " + t.color + ";"), t.opacity && (i += "stroke-opacity : " + t.opacity + ";"), e.querySelector("line").setAttribute("style", i)
  }), t.skipFirst && s[0].remove(), t.skipLast && s[l - 1].remove()
}, Chart.prototype.addGoalLines = function() {
  var t = this,
    e = t.options.goalLine,
    a = t.margin,
    i = t.options.axis,
    o = i && i.yAxis && void 0 !== i.yAxis.showAxisLine ? i.yAxis.showAxisLine : CONSTANTS.AXIS_CONFIG.Y_AXIS.showAxisLine,
    r = i && i.yAxis && i.yAxis.orientation ? i.yAxis.orientation : CONSTANTS.AXIS_CONFIG.Y_AXIS.orientation,
    n = e.value,
    s = e.class ? "fc-goalLine-line " + e.class : "fc-goalLine-line",
    l = o ? "left" === r ? CONSTANTS.ORIENTATION_MARGIN.LEFT + CONSTANTS.DEFAULT_MARGIN.LEFT + a.left : CONSTANTS.DEFAULT_MARGIN.LEFT + a.left : 0,
    c = t.yScale(n) - t.yMin,
    d = t.plot.append("g").attr("class", "fc-goalLine");
  if (d.append("g").attr("class", s).attr("transform", "translate(" + l + ", " + c + ")").call(t.goalLine()), e.icon) {
    var p = e.icon.height,
      h = e.icon.width,
      A = e.icon.url,
      T = e.icon.class ? "qd-goalLine-image " + T : "qd-goalLine-image",
      u = e.icon.left ? e.icon.left + a.left - 2.5 : a.left - 2.5;
    o && "left" === r && (u += CONSTANTS.ORIENTATION_MARGIN.LEFT + CONSTANTS.DEFAULT_MARGIN.LEFT), e.icon.toBase64 ? t.getBase64Image(A, function(e) {
      d.append("svg:image").attr("x", u).attr("y", t.yScale(n) - p / 2 + 1).attr("width", h).attr("height", p).attr("xlink:href", e).attr("class", T)
    }) : d.append("svg:image").attr("x", u).attr("y", t.yScale(n) - p / 2 + 1).attr("width", h).attr("height", p).attr("xlink:href", A).attr("class", T)
  }
}, Chart.prototype.checkTooltip = function(t) {
  var e, a = this;
  switch (t) {
    case "bar":
      e = CONSTANTS.BAR_CHART;
      break;
    case "stackedBar":
      e = CONSTANTS.STACK_CHART;
      break;
    case "line":
    case "multiLine":
      e = CONSTANTS.LINE_CHART;
      break;
    case "area":
      e = CONSTANTS.AREA_CHART
  }
  if (a.options.tooltip && a.options.tooltip.show) {
    var i = a.options.tooltip.listener ? a.options.tooltip.listener : CONSTANTS.TOOLTIP.LISTENERS;
    a.showTooltip(a.options.tooltip, i, e)
  }
}, Chart.prototype.showTooltip = function(t, e, a) {
  var i, o, r = this,
    n = t.class ? t.class : "";
  d3.select(r.element).selectAll("#fc-tooltip").remove();
  var s = d3.select(r.element).append("div").attr("class", "fc-tooltip " + n).attr("id", "fc-tooltip");
  s.node().style.position = "absolute", s.node().style.visibility = "hidden", r.plot.selectAll(a.element).on(e, function(e) {
    switch (o = d3.event.type, a.type) {
      case "bar":
      case "line":
      case "area":
        t.xValue = e[0], t.yValue = e[1];
        break;
      case "stackedBar":
        t.xValue = e.data[r.xAxisKey], t.yValue = r.valueSum(e.data, r.stackList), t.stackData = e.data;
        break;
      case "multiline":
        t.xValue = e[0], t.yValue = e[1], t.line = e[2]
    }
    i !== e ? (s.html(t.formatter ? t.formatter() : r.tooltipBody(t)), s.node().style.visibility = "visible", s.node().style.left = r.calculatePosition("left", [t.xValue, t.yValue]), s.node().style.top = r.calculatePosition("top", [t.xValue, t.yValue]), i = "mouseover" != d3.event.type ? e : "") : (s.node().style.visibility = "hidden", i = "")
  }).on("mouseout", function() {
    "mouseover" === o && (s.node().style.visibility = "hidden")
  }), document.addEventListener("touchstart", function(t) {
    t.touches[0];
    t.target.classList.contains(a.class) || (s.node().style.visibility = "hidden")
  }, !1), document.addEventListener("click", function(t) {
    t.target.classList.contains(a.class) || (s.node().style.visibility = "hidden")
  }, !1)
}, Chart.prototype.calculatePosition = function(t, e) {
  var a = this,
    i = a.options.legend,
    o = a.options.line,
    r = a.element.querySelector("#fc-tooltip"),
    n = parseInt(window.getComputedStyle(a.element.querySelector("#fc-tooltip"), ":after").getPropertyValue("border-left-width")),
    s = parseInt(window.getComputedStyle(a.element.querySelector("#fc-tooltip"), ":after").getPropertyValue("border-top-width")),
    l = n > s ? n : s,
    c = l + r.offsetHeight,
    d = r.classList,
    p = a.xScale(e[0]) + a.shiftCalculate("x", "#fc-tooltip", l),
    h = a.element.offsetTop + a.yScale(e[1]) + a.shiftCalculate("y", "#fc-tooltip", l) - a.margin.top;
  return o && o.plotPoints && o.plotPoints.icon && o.plotPoints.icon.width && (h -= o.plotPoints.icon.width / 2), h - a.element.offsetTop < 0 ? (h += c + l, o && o.plotPoints && o.plotPoints.icon && o.plotPoints.icon.width && (h += o.plotPoints.icon.width + 2), d.add("bottom"), d.remove("left", "top", "right")) : (d.remove("bottom", "left", "right"), d.add("top")), p - a.element.offsetLeft < 0 ? (p += r.offsetWidth / 2 + l, h += c / 2 + l / 2, d.add("right"), d.remove("bottom", "top")) : p + r.offsetWidth > a.element.offsetWidth && (p -= r.offsetWidth / 2 + l, h += c / 2 + l / 2, d.remove("bottom", "top", "right"), d.add("left")), "left" === t ? p + "px" : i && "top" === i.position ? h + a.legendHeight + l / 2 + "px" : h + "px"
}, Chart.prototype.shiftCalculate = function(t, e, a) {
  var i = this,
    o = i.element.querySelector(e).offsetWidth,
    r = i.element.querySelector(e).offsetHeight,
    n = i.xScale.bandwidth() / 2 - o / 2,
    s = -(r + a);
  return i.margin && (s += i.margin.top), "x" === t || "X" === t ? n : "y" === t || "Y" === t ? s : void 0
}, Chart.prototype.tooltipBody = function(t) {
  if (t.body) {
    return title = t.body.title ? t.body.title : CONSTANTS.TOOLTIP.BODY.title, xLabel = t.body.xLabel ? t.body.xLabel : CONSTANTS.TOOLTIP.BODY.xLabel, yLabel = t.body.yLabel ? t.body.yLabel : CONSTANTS.TOOLTIP.BODY.yLabel, xValue = t.xValue, yValue = t.yValue, content = "", title && (content += "<b>" + title + "</b>"), xLabel && (content += "<br/>" + xLabel + ": " + xValue), yLabel && (content += "<br/>" + yLabel + ": " + yValue), content
  }
}, Chart.prototype.verticalGridLines = function() {
  var t = this,
    e = t.options.grids,
    a = (t.options.axis, t.yMin - t.yMax),
    i = d3.axisBottom(t.xScale).tickSize(-a).tickFormat("");
  if (e && e.vertical && e.vertical.values) {
    var o = e.vertical.values;
    if ("object" == typeof o[0]) {
      r = [];
      o.forEach(function(t) {
        r.push(t.key)
      })
    } else var r = o;
    i.tickValues(r)
  }
  return i
}, Chart.prototype.horizontalGridLines = function() {
  var t = this,
    e = t.options.axis,
    a = t.options.grids,
    i = e && e.xAxis && e.xAxis.showAxisLine ? t.width - (CONSTANTS.DEFAULT_MARGIN.LEFT + CONSTANTS.DEFAULT_MARGIN.RIGHT + t.margin.left) : t.width,
    o = e && e.yAxis && e.yAxis.orientation ? e.yAxis.orientation : "left";
  e && e.xAxis && e.xAxis.showAxisLine && (i -= "left" === o ? CONSTANTS.ORIENTATION_MARGIN.LEFT : CONSTANTS.ORIENTATION_MARGIN.RIGHT);
  var r = d3.axisLeft(t.yScale).tickSize(-i).tickFormat("");
  if (a && a.horizontal && a.horizontal.values) {
    var n = a.horizontal.values;
    n.indexOf(t.yExtent[0]) < 0 && n.unshift(t.yExtent[0]), r.tickValues(n)
  }
  return r
}, Chart.prototype.goalLine = function() {
  var t = this,
    e = t.options.axis,
    a = e && e.xAxis && e.xAxis.showAxisLine ? t.width - (CONSTANTS.DEFAULT_MARGIN.LEFT + CONSTANTS.DEFAULT_MARGIN.RIGHT + t.margin.left) : t.width,
    i = e && e.yAxis && e.yAxis.orientation ? e.yAxis.orientation : "left";
  return e && e.xAxis && e.xAxis.showAxisLine && (a -= "left" === i ? CONSTANTS.ORIENTATION_MARGIN.LEFT : CONSTANTS.ORIENTATION_MARGIN.RIGHT), d3.axisLeft(t.yScale).tickSize(-a).ticks(1).tickFormat("")
}, Chart.prototype.defaultMargin = function() {
  var t = this.options.axis;
  return t && t.yAxis && t.yAxis.orientation ? "left" === t.yAxis.orientation ? CONSTANTS.DEFAULT_MARGIN.LEFT : 0 : "left" === CONSTANTS.AXIS_CONFIG.Y_AXIS.orientation ? CONSTANTS.DEFAULT_MARGIN.LEFT : 0
}, Chart.prototype.valueSum = function(t, e) {
  var a = 0;
  for (var i in t) t.hasOwnProperty(i) && -1 !== e.indexOf(i) && (a += parseFloat(t[i]));
  return a
}, Chart.prototype.isNumber = function(t) {
  var e;
  return !isNaN(t) && (0 | (e = parseFloat(t))) === e
}, Chart.prototype.getBase64Image = function(t, e) {
  var a = new Image;
  a.setAttribute("crossOrigin", "anonymous"), a.src = t, a.id = "qd-image-id";
  var i = document.createElement("div");
  i.style.display = "none", i.id = "qd-invisible-div", document.body.appendChild(i), a.onload = function() {
    i.appendChild(a);
    var t = document.createElement("canvas");
    t.width = a.width, t.height = a.height, t.getContext("2d").drawImage(a, 0, 0);
    var o = t.toDataURL("image/png");
    d3.selectAll("#qd-image-id").remove(), d3.selectAll("#qd-invisible-div").remove(), e(o)
  }
}, Array.prototype.diff = function(t) {
  return this.filter(function(e) {
    return t.indexOf(e) < 0
  })
}, Array.prototype.unique = function() {
  for (var t = [], e = 0, a = this.length; e < a; e++) - 1 === t.indexOf(this[e]) && t.push(this[e]);
  return t
}, Array.range = function(t, e, a) {
  var i = [];
  for (a = a || 1, i[0] = t; t + a <= e;) i[i.length] = t += a;
  return i
}, void 0 === String.prototype.contains && (String.prototype.contains = function() {
  return -1 !== String.prototype.indexOf.apply(this, arguments)
});
var BarChart = function(t, e, a) {
  var i = this;
  i.setValues(t, e, a, {
    type: "bar"
  }), i.xExtent = i.xExtentCalculate(i.data), i.yExtent = i.yExtentCalculate(i.data), i.drawBarChart("bar"), window.addEventListener("resize", function(o) {
    i.setValues(t, e, a, {
      type: "bar"
    }), i.drawBarChart("bar")
  })
};
BarChart.prototype = Object.create(Chart.prototype), BarChart.prototype.xExtentCalculate = function(t) {
  return t.map(function(t) {
    return t[0]
  })
}, BarChart.prototype.yExtentCalculate = function(t) {
  var e = d3.extent(t, function(t) {
    return t[1]
  });
  return e[0] > 0 && (e[0] = 0), e
}, BarChart.prototype.drawBarChart = function(t) {
  var e = this,
    a = e.margin;
  e.drawChart(), e.plot.append("clipPath").attr("id", "bar-clip").append("rect").attr("x", 0).attr("y", 0).attr("width", e.width).attr("height", e.height - (a.bottom + CONSTANTS.DEFAULT_MARGIN.BOTTOM)), e.checkGoalLine(), e.createBars(t, e.data), e.checkTransition(), e.checkTooltip(t)
}, BarChart.prototype.createBars = function(t, e) {
  var a = this;
  a.margin, a.options.bar ? a.options.bar : CONSTANTS.BAR;
  switch (t) {
    case "bar":
      i = a.plot.append("g").attr("class", "fc-bars ");
      a.bar = i.selectAll("bar").data(e).enter().append("path").attr("class", "fc-bar").attr("fill", a.color);
      break;
    case "stackedBar":
      var i = a.plot.append("g").attr("class", "fc-stacked-bars");
      a.groups = i.selectAll("g.stack").data(a.stack_data).enter().append("g").style("fill", function(t, e) {
        return a.color[e]
      }), a.rect = a.groups.selectAll("path").data(function(t) {
        return t
      }).enter().append("path").attr("class", "fc-stacked-bar")
  }
}, BarChart.prototype.checkTransition = function() {
  var t = this,
    e = t.options.transition,
    a = t.calculateBarwidth();
  if (e && e.animate) {
    var i = e.delay ? e.delay : 0,
      o = e.duration ? e.duration : 1e3;
    t.drawBarsWithAnimation(a, i, o)
  } else t.drawBarsWithoutAnimation(a)
}, BarChart.prototype.checkGoalLine = function() {
  var t = this;
  t.options.goalLine && t.options.goalLine.value && t.addGoalLines()
}, BarChart.prototype.calculateBarwidth = function() {
  var t = this,
    e = t.options.bar,
    a = e && e.width ? e.width : t.xScale.bandwidth();
  return a = a > t.xScale.bandwidth() ? t.xScale.bandwidth() : a
}, BarChart.prototype.drawBarsWithAnimation = function(t, e, a) {
  var i = this,
    o = i.options.bar,
    r = i.barCentering(t, i.xScale.bandwidth()),
    n = o && o.opacity ? o.opacity : CONSTANTS.BAR.opacity;
  i.bar.attr("d", function(e) {
    var a = i.xScale(e[0]) + r;
    return i.drawRoundedRectangle(e, a, i.yMin, t, 0, 0)
  }).attr("clip-path", "url(#bar-clip)").transition().delay(function(t, a) {
    return a * e
  }).duration(a).attr("d", function(e) {
    return i.drawBar(e, r, t)
  }).attr("opacity", n)
}, BarChart.prototype.drawBarsWithoutAnimation = function(t) {
  var e = this,
    a = e.options.bar,
    i = a && a.opacity ? a.opacity : CONSTANTS.BAR.opacity,
    o = e.barCentering(t, e.xScale.bandwidth());
  e.bar.attr("d", function(a) {
    return e.drawBar(a, o, t)
  }).attr("clip-path", "url(#bar-clip)").attr("opacity", i)
}, BarChart.prototype.drawRoundedRectangle = function(t, e, a, i, o, r) {
  return "M" + (e + r) + " " + a + "h" + (i - 2 * r) + "a" + r + " " + r + " 0 0 1 " + r + " " + r + "v" + (o - 2 * r) + "v" + r + "h" + -r + "h" + (2 * r - i) + "h" + -r + "v" + -r + "v" + (2 * r - o) + "a" + r + " " + r + " 0 0 1 " + r + " " + -r + "z"
}, BarChart.prototype.drawBar = function(t, e, a) {
  var i, o, r, n, s = this,
    l = s.options.bar;
  return n = l && l.curve ? a / 2 : 0, i = s.xScale(t[0]) + e, o = s.yScale(t[1]), r = s.yMin - s.yScale(t[1]), s.drawRoundedRectangle(t, i, o, a, r, n)
}, BarChart.prototype.barCentering = function(t) {
  var e = this;
  return t < e.xScale.bandwidth() ? (e.xScale.bandwidth() - t) / 2 : 0
};
var StackedBarChart = function(t, e, a, i) {
  var o = this;
  o.setValues(t, e, i, {
    type: "stackedBar",
    stack: a
  }), o.createStack(), o.xExtent = o.xExtentCalculate(o.data), o.yExtent = o.yExtentCalculate(o.data), o.drawBarChart("stackedBar"), window.addEventListener("resize", function(r) {
    o.setValues(t, e, i, {
      type: "stackedBar",
      stack: a
    }), o.drawBarChart("stackedBar")
  })
};
StackedBarChart.prototype = Object.create(BarChart.prototype), StackedBarChart.prototype.createStack = function() {
  var t = this,
    e = t.options.bar;
  t.stack = d3.stack().keys(t.stackList).order(d3.stackOrderNone).offset(d3.stackOffsetNone), t.stack_data = t.stack(t.data), e && e.curve && e.curve.show && "ALL" === e.curve.bars.toUpperCase() && (t.stack_data.reverse().forEach(function(t) {
    for (var e = t.length, a = 0; a < e; a++) t[a][0] = 0
  }), t.color.reverse()), t.xAxisKey = Object.keys(t.data[0]).diff(t.stackList)[0]
}, StackedBarChart.prototype.xExtentCalculate = function(t) {
  var e = this;
  return Object.keys(t).map(function(a) {
    return t[a][e.xAxisKey]
  })
}, StackedBarChart.prototype.yExtentCalculate = function(t) {
  var e = this,
    a = d3.extent(t.map(function(t) {
      return e.valueSum(t, e.stackList)
    }));
  return a[0] > 0 && (a[0] = 0), a
}, StackedBarChart.prototype.drawBarsWithAnimation = function(t, e, a) {
  var i = this,
    o = i.barCentering(t, i.xScale.bandwidth());
  i.rect.attr("d", function(e) {
    var a = o + i.xScale(e.data[i.xAxisKey]),
      r = i.yMin;
    return i.drawRoundedRectangle(e, a, r, t, 0, 0)
  }).attr("clip-path", "url(#bar-clip)").transition().delay(function(t, a) {
    return a * e
  }).duration(a).attr("d", function(e) {
    return i.drawBar(e, o, t)
  })
}, StackedBarChart.prototype.drawBarsWithoutAnimation = function(t) {
  var e = this,
    a = e.barCentering(t, e.xScale.bandwidth());
  e.rect.attr("d", function(i) {
    return e.drawBar(i, a, t)
  }).attr("clip-path", "url(#bar-clip)")
}, StackedBarChart.prototype.drawBar = function(t, e, a) {
  var i = this,
    o = i.options.bar;
  if (o && o.curve && o.curve.show) r = a / 2;
  else var r = 0;
  var n = e + i.xScale(t.data[i.xAxisKey]),
    s = i.valueSum(t.data, i.stackList);
  if (isNaN(t[1])) {
    l = i.yScale(t[0]);
    height = 0
  } else {
    var l = i.yScale(t[1]);
    height = i.yScale(t[0]) - i.yScale(t[1])
  }
  return o && o.curve && o.curve.show && "ALL" === o.curve.bars.toUpperCase() ? i.drawRoundedRectangle(t, n, l, a, height, r) : s === t[1] ? i.drawRoundedRectangle(t, n, l, a, height, r) : i.drawRoundedRectangle(t, n, l, a, height, 0)
};