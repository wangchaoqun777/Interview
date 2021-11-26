export function utilMapZoom(city) {
  let _zoom = 11
  console.log(city)
  switch (city) {
    case '上海':
    case '北京':
      _zoom = 11
      break;
    case '天津':
    case '重庆':
    case '石家庄':
    case '呼和浩特':
    case '沈阳':
    case '长春':
    case '哈尔滨':
    case '南京':
    case '杭州':
    case '合肥':
    case '福州':
    case '南昌':
    case '济南':
    case '郑州':
    case '武汉':
    case '长沙':
    case '广州':
    case '南宁':
    case '成都':
    case '贵阳':
    case '昆明':
    case '西安':
    case '兰州':
    case '西宁':
    case '银川':
    case '乌鲁木齐':
    case '大连':
    case '无锡':
    case '宁波':
    case '温州':
    case '厦门':
    case '青岛':
    case '深圳':
    case '烟台':
      _zoom = 12
      break;
    case '拉萨':
      _zoom = 13
      break;
    default:
  }
  return _zoom
}

export function getPayType() {
  // let _type = window.serverData.acount.payType
  // switch (_type) {
  //   case '1':
  //  _desc = '试用'
  //     break;
  //   case '2':
  //  _desc = '合作试用'
  //     break;
  //   case '3':
  //     _desc = '付费用户'
  //     break;
  //   default:
  // }

  return 3
}

export function utilExpress() {
  let endTime = new Date(window.serverData.acount.expireTime.replace(/-/g, "/"))
  // let endTime = new Date('2019-09-20 00:00:00')
  let curTime = new Date(window.serverData.acount.today.replace(/-/g, "/"))
  // let curTime = new Date('2018-10-12 12:32:12')
  var ret = endTime.getTime() - curTime.getTime();
  ret = Math.round(ret / 1000)
  if (ret > 0) {
    return 0 //没有过期
  } else {
    return 1 //是的已经过期 出现弹框
  }
}

export function utilNumDecimal(x) {
  if (!x) return '-'
  if (isNaN(x)) {
    return '--';
  }
  let f = Math.round(x * 10) / 10;
  let s = f.toString();
  let rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 1) {
    s += '0';
  }
  return s;
}
export function utilNumDecimal_int(x) {
  if (!x) return '-'
  if (isNaN(x)) {
    return '--';
  }
  // var f = x*100;
  var f = Math.round(x * 100) / 1;
  var s = f.toString();
  // var rs = s.indexOf('.');
  // if (rs < 0) {
  //   rs = s.length;
  // }
  // // while (s.length <= rs + 1) {
  // //   s += '0';
  // // }
  return s
}

function _getZoomData(gl, data) {
  let _zoom = 11;
  if (gl == 0) {
    return 10
  }
  if (gl >= (data * 10000 / 86)) {
    _zoom = 3
  } else if (gl < (data * 1000 / 86) && gl >= (data * 500 / 86)) {
    _zoom = 4
  } else if (gl < (data * 500 / 86) && gl >= (data * 200 / 69)) {
    _zoom = 5
  } else if (gl < (data * 200 / 69) && gl >= (data * 100 / 69)) {
    _zoom = 6
  } else if (gl < (data * 100 / 69) && gl >= (data * 50 / 69)) {
    _zoom = 7
  } else if (gl < (data * 50 / 69) && gl >= (data * 25 / 69)) {
    _zoom = 8
  } else if (gl < (data * 25 / 69) && gl >= (data * 20 / 110)) {
    _zoom = 9
  } else if (gl < (data * 20 / 110) && gl >= (data * 10 / 110)) {
    _zoom = 10
  } else if (gl < (data * 10 / 110) && gl >= (data * 5 / 110)) {
    _zoom = 11
  } else if (gl < (data * 5 / 110) && gl >= (data * 2 / 88)) {
    _zoom = 12
  } else if (gl < (data * 2 / 88) && gl >= (data * 1 / 88)) {
    _zoom = 13
  } else if (gl < (data * 1 / 88) && gl >= (data * .2 / 88)) {
    _zoom = 14
  } else if (gl < (data * .2 / 88)) {
    _zoom = 15
  }
  return _zoom
}
export function utilAutoMapZoom(obj) {
  let {
    width,
    height,
    east_west,
    north_south
  } = obj
  let _zoom = 12;
  let eastwest = _getZoomData(east_west, width)
  let northsouth = _getZoomData(north_south, height)
  _zoom = (eastwest >= northsouth) ? northsouth : eastwest
  return _zoom
}

export function utilGetColor(start, end, steps, gamma) {
  var parseColor = function(hexStr) {
    return hexStr.length === 4 ? hexStr.substr(1).split('').map(function(s) {
      return 0x11 * parseInt(s, 16);
    }) : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(function(s) {
      return parseInt(s, 16);
    })
  };

  var pad = function(s) {
    return (s.length === 1) ? '0' + s : s;
  };

  var i, j, ms, me, output = [],
    so = [];
  gamma = gamma || 1;
  var normalize = function(channel) {
    return Math.pow(channel / 255, gamma);
  };
  start = parseColor(start).map(normalize);
  end = parseColor(end).map(normalize);
  for (i = 0; i < steps; i++) {
    ms = i / (steps - 1);
    me = 1 - ms;
    for (j = 0; j < 3; j++) {
      so[j] = pad(Math.round(Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255).toString(16));
    }
    output.push('#' + so.join(''));
  }
  return output;
  // console.log(gradientColors('#000', '#fff', 100, 2.2));
}

export const bmapstyle = [{
  "featureType": "land",
  "elementType": "geometry",
  "stylers": {
      "color": "#f5f6f7ff"
  }
}, {
  "featureType": "water",
  "elementType": "geometry",
  "stylers": {
      "color": "#c4d7f5ff"
  }
}, {
  "featureType": "green",
  "elementType": "geometry",
  "stylers": {
      "color": "#dcf2d5ff"
  }
}, {
  "featureType": "highway",
  "elementType": "geometry.fill",
  "stylers": {
      "color": "#ffe59eff"
  }
}, {
  "featureType": "highway",
  "elementType": "geometry.stroke",
  "stylers": {
      "color": "#f5d48cff"
  }
}, {
  "featureType": "nationalway",
  "elementType": "geometry.fill",
  "stylers": {
      "color": "#fff6ccff"
  }
}, {
  "featureType": "provincialway",
  "elementType": "geometry.fill",
  "stylers": {
      "color": "#fff6ccff"
  }
}, {
  "featureType": "cityhighway",
  "elementType": "geometry.fill",
  "stylers": {
      "color": "#fff6ccff"
  }
}, {
  "featureType": "arterial",
  "elementType": "geometry.fill",
  "stylers": {
      "color": "#fff6ccff"
  }
}, {
  "featureType": "nationalway",
  "elementType": "geometry.stroke",
  "stylers": {
      "color": "#f2dc9dff"
  }
}, {
  "featureType": "provincialway",
  "elementType": "geometry.stroke",
  "stylers": {
      "color": "#f2dc9dff"
  }
}, {
  "featureType": "cityhighway",
  "elementType": "geometry.stroke",
  "stylers": {
      "color": "#f2dc9dff"
  }
}, {
  "featureType": "arterial",
  "elementType": "geometry.stroke",
  "stylers": {
      "color": "#f2dc9dff"
  }
}, {
  "featureType": "building",
  "elementType": "geometry.sidefill",
  "stylers": {
      "color": "#e6ebf0ff"
  }
}, {
  "featureType": "building",
  "elementType": "geometry.topfill",
  "stylers": {
      "color": "#e6ebf0ff"
  }
}, {
  "featureType": "building",
  "elementType": "geometry.stroke",
  "stylers": {
      "color": "#d8e2ebff"
  }
}, {
  "featureType": "tertiaryway",
  "elementType": "geometry.fill",
  "stylers": {
      "color": "#ffffffff"
  }
}, {
  "featureType": "tertiaryway",
  "elementType": "geometry.stroke",
  "stylers": {
      "color": "#dfe4ebff"
  }
}, {
  "featureType": "fourlevelway",
  "elementType": "geometry.fill",
  "stylers": {
      "color": "#ffffffff"
  }
}, {
  "featureType": "fourlevelway",
  "elementType": "geometry.stroke",
  "stylers": {
      "color": "#dfe4ebff"
  }
}, {
  "featureType": "local",
  "elementType": "geometry.fill",
  "stylers": {
      "color": "#ffffffff"
  }
}, {
  "featureType": "local",
  "elementType": "geometry.stroke",
  "stylers": {
      "color": "#dfe4ebff"
  }
}, {
  "featureType": "scenicspotsway",
  "elementType": "geometry.fill",
  "stylers": {
      "color": "#ffffffff"
  }
}, {
  "featureType": "scenicspotsway",
  "elementType": "geometry.stroke",
  "stylers": {
      "color": "#dfe4ebff"
  }
}, {
  "featureType": "universityway",
  "elementType": "geometry.stroke",
  "stylers": {
      "color": "#dfe4ebff"
  }
}, {
  "featureType": "universityway",
  "elementType": "geometry.fill",
  "stylers": {
      "color": "#ffffffff"
  }
}, {
  "featureType": "vacationway",
  "elementType": "geometry.stroke",
  "stylers": {
      "color": "#dfe4ebff"
  }
}, {
  "featureType": "vacationway",
  "elementType": "geometry.fill",
  "stylers": {
      "color": "#ffffffff"
  }
}, {
  "featureType": "town",
  "elementType": "labels.text",
  "stylers": {
      "fontsize": 18
  }
}, {
  "featureType": "town",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#9ca0a3ff"
  }
}, {
  "featureType": "town",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffff00"
  }
}, {
  "featureType": "highway",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#c0792dff"
  }
}, {
  "featureType": "highway",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffff00"
  }
}, {
  "featureType": "nationalway",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#c0792dff"
  }
}, {
  "featureType": "nationalway",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffff60"
  }
}, {
  "featureType": "provincialway",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#c0792dff"
  }
}, {
  "featureType": "provincialway",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffff00"
  }
}, {
  "featureType": "cityhighway",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#c0792dff"
  }
}, {
  "featureType": "cityhighway",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffff00"
  }
}, {
  "featureType": "arterial",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffff00"
  }
}, {
  "featureType": "arterial",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#c0792dff"
  }
}, {
  "featureType": "arterial",
  "elementType": "labels.text",
  "stylers": {
      "fontsize": 24
  }
}, {
  "featureType": "cityhighway",
  "elementType": "labels.text",
  "stylers": {
      "fontsize": 24
  }
}, {
  "featureType": "provincialway",
  "elementType": "labels.text",
  "stylers": {
      "fontsize": 24
  }
}, {
  "featureType": "nationalway",
  "elementType": "labels.text",
  "stylers": {
      "fontsize": 24
  }
}, {
  "featureType": "highway",
  "elementType": "labels.text",
  "stylers": {
      "fontsize": 24
  }
}, {
  "featureType": "scenicspotslabel",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#9ca0a3ff"
  }
}, {
  "featureType": "scenicspotslabel",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffff00"
  }
}, {
  "featureType": "scenicspotslabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off"
  }
}, {
  "featureType": "educationlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "on"
  }
}, {
  "featureType": "educationlabel",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#9ca0a3ff"
  }
}, {
  "featureType": "educationlabel",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffff00"
  }
}, {
  "featureType": "medicallabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "on"
  }
}, {
  "featureType": "medicallabel",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#9ca0a3ff"
  }
}, {
  "featureType": "medicallabel",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffff00"
  }
}, {
  "featureType": "entertainmentlabel",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#9ca0a3ff"
  }
}, {
  "featureType": "entertainmentlabel",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffff00"
  }
}, {
  "featureType": "estatelabel",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#9ca0a3ff"
  }
}, {
  "featureType": "estatelabel",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffff00"
  }
}, {
  "featureType": "estatelabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off"
  }
}, {
  "featureType": "entertainmentlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off"
  }
}, {
  "featureType": "businesstowerlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off"
  }
}, {
  "featureType": "businesstowerlabel",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#9ca0a3ff"
  }
}, {
  "featureType": "businesstowerlabel",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffff00"
  }
}, {
  "featureType": "companylabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off"
  }
}, {
  "featureType": "companylabel",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#9ca0a3ff"
  }
}, {
  "featureType": "companylabel",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffff00"
  }
}, {
  "featureType": "governmentlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "on"
  }
}, {
  "featureType": "governmentlabel",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#9ca0a3ff"
  }
}, {
  "featureType": "governmentlabel",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffff00"
  }
}, {
  "featureType": "restaurantlabel",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#9ca0a3ff"
  }
}, {
  "featureType": "restaurantlabel",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffff00"
  }
}, {
  "featureType": "restaurantlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off"
  }
}, {
  "featureType": "hotellabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off"
  }
}, {
  "featureType": "hotellabel",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffff00"
  }
}, {
  "featureType": "hotellabel",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#9ca0a3ff"
  }
}, {
  "featureType": "shoppinglabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "on"
  }
}, {
  "featureType": "shoppinglabel",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffff00"
  }
}, {
  "featureType": "shoppinglabel",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#9ca0a3ff"
  }
}, {
  "featureType": "lifeservicelabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off"
  }
}, {
  "featureType": "lifeservicelabel",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffff00"
  }
}, {
  "featureType": "lifeservicelabel",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#9ca0a3ff"
  }
}, {
  "featureType": "carservicelabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off"
  }
}, {
  "featureType": "carservicelabel",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffff00"
  }
}, {
  "featureType": "carservicelabel",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#9ca0a3ff"
  }
}, {
  "featureType": "transportationlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "on"
  }
}, {
  "featureType": "transportationlabel",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffff00"
  }
}, {
  "featureType": "transportationlabel",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#9ca0a3ff"
  }
}, {
  "featureType": "financelabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off"
  }
}, {
  "featureType": "financelabel",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffff00"
  }
}, {
  "featureType": "financelabel",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#9ca0a3ff"
  }
}, {
  "featureType": "tertiaryway",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#9ca0a3ff"
  }
}, {
  "featureType": "tertiaryway",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffff00"
  }
}, {
  "featureType": "tertiaryway",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off"
  }
}, {
  "featureType": "fourlevelway",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off"
  }
}, {
  "featureType": "fourlevelway",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#9ca0a3ff"
  }
}, {
  "featureType": "fourlevelway",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffff00"
  }
}, {
  "featureType": "local",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#9ca0a3ff"
  }
}, {
  "featureType": "local",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffff00"
  }
}, {
  "featureType": "local",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off"
  }
}, {
  "featureType": "companylabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off"
  }
}, {
  "featureType": "lifeservicelabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off"
  }
}, {
  "featureType": "carservicelabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off"
  }
}, {
  "featureType": "financelabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off"
  }
}, {
  "featureType": "scenicspotslabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "on"
  }
}, {
  "featureType": "manmade",
  "elementType": "geometry",
  "stylers": {
      "color": "#f5f6f7ff"
  }
}, {
  "featureType": "subway",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "12,13",
      "level": "12"
  }
}, {
  "featureType": "subway",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "12,13",
      "level": "13"
  }
}, {
  "featureType": "subway",
  "elementType": "geometry",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,13",
      "level": "12"
  }
}, {
  "featureType": "subway",
  "elementType": "geometry",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,13",
      "level": "13"
  }
}, {
  "featureType": "subwaylabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "13,13",
      "level": "13"
  }
}, {
  "featureType": "subwaylabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,13",
      "level": "13"
  }
}, {
  "featureType": "subwaylabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,13",
      "level": "13"
  }
}, {
  "featureType": "railway",
  "elementType": "geometry",
  "stylers": {
      "visibility": "off"
  }
}, {
  "featureType": "scenicspotslabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "10,15",
      "level": "10"
  }
}, {
  "featureType": "scenicspotslabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "10,15",
      "level": "11"
  }
}, {
  "featureType": "scenicspotslabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "10,15",
      "level": "12"
  }
}, {
  "featureType": "scenicspotslabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "10,15",
      "level": "13"
  }
}, {
  "featureType": "scenicspotslabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "10,15",
      "level": "14"
  }
}, {
  "featureType": "scenicspotslabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "10,15",
      "level": "15"
  }
}, {
  "featureType": "scenicspotslabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "10,15",
      "level": "10"
  }
}, {
  "featureType": "scenicspotslabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "10,15",
      "level": "11"
  }
}, {
  "featureType": "scenicspotslabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "10,15",
      "level": "12"
  }
}, {
  "featureType": "scenicspotslabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "10,15",
      "level": "13"
  }
}, {
  "featureType": "scenicspotslabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "10,15",
      "level": "14"
  }
}, {
  "featureType": "scenicspotslabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "10,15",
      "level": "15"
  }
}, {
  "featureType": "scenicspotslabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "10,15",
      "level": "10"
  }
}, {
  "featureType": "scenicspotslabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "10,15",
      "level": "11"
  }
}, {
  "featureType": "scenicspotslabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "10,15",
      "level": "12"
  }
}, {
  "featureType": "scenicspotslabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "10,15",
      "level": "13"
  }
}, {
  "featureType": "scenicspotslabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "10,15",
      "level": "14"
  }
}, {
  "featureType": "scenicspotslabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "10,15",
      "level": "15"
  }
}, {
  "featureType": "district",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#9ca0a3ff"
  }
}, {
  "featureType": "district",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffffff"
  }
}, {
  "featureType": "city",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#9ca0a3ff"
  }
}, {
  "featureType": "city",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffffff"
  }
}, {
  "featureType": "city",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "on"
  }
}, {
  "featureType": "country",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#9ca0a3ff"
  }
}, {
  "featureType": "country",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffffff"
  }
}, {
  "featureType": "continent",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#a77726ff"
  }
}, {
  "featureType": "continent",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffffff"
  }
}, {
  "featureType": "medicallabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "13,16",
      "level": "13"
  }
}, {
  "featureType": "medicallabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "13,16",
      "level": "14"
  }
}, {
  "featureType": "medicallabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "13,16",
      "level": "15"
  }
}, {
  "featureType": "medicallabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "13,16",
      "level": "16"
  }
}, {
  "featureType": "medicallabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,16",
      "level": "13"
  }
}, {
  "featureType": "medicallabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,16",
      "level": "14"
  }
}, {
  "featureType": "medicallabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,16",
      "level": "15"
  }
}, {
  "featureType": "medicallabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,16",
      "level": "16"
  }
}, {
  "featureType": "medicallabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,16",
      "level": "13"
  }
}, {
  "featureType": "medicallabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,16",
      "level": "14"
  }
}, {
  "featureType": "medicallabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,16",
      "level": "15"
  }
}, {
  "featureType": "medicallabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,16",
      "level": "16"
  }
}, {
  "featureType": "entertainmentlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "12,17",
      "level": "12"
  }
}, {
  "featureType": "entertainmentlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "12,17",
      "level": "13"
  }
}, {
  "featureType": "entertainmentlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "12,17",
      "level": "14"
  }
}, {
  "featureType": "entertainmentlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "12,17",
      "level": "15"
  }
}, {
  "featureType": "entertainmentlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "12,17",
      "level": "16"
  }
}, {
  "featureType": "entertainmentlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "12,17",
      "level": "17"
  }
}, {
  "featureType": "entertainmentlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,17",
      "level": "12"
  }
}, {
  "featureType": "entertainmentlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,17",
      "level": "13"
  }
}, {
  "featureType": "entertainmentlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,17",
      "level": "14"
  }
}, {
  "featureType": "entertainmentlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,17",
      "level": "15"
  }
}, {
  "featureType": "entertainmentlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,17",
      "level": "16"
  }
}, {
  "featureType": "entertainmentlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,17",
      "level": "17"
  }
}, {
  "featureType": "entertainmentlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,17",
      "level": "12"
  }
}, {
  "featureType": "entertainmentlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,17",
      "level": "13"
  }
}, {
  "featureType": "entertainmentlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,17",
      "level": "14"
  }
}, {
  "featureType": "entertainmentlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,17",
      "level": "15"
  }
}, {
  "featureType": "entertainmentlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,17",
      "level": "16"
  }
}, {
  "featureType": "entertainmentlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,17",
      "level": "17"
  }
}, {
  "featureType": "estatelabel",
  "elementType": "labels.text",
  "stylers": {
      "fontsize": 23
  }
}, {
  "featureType": "estatelabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "13,16",
      "level": "13"
  }
}, {
  "featureType": "estatelabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "13,16",
      "level": "14"
  }
}, {
  "featureType": "estatelabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "13,16",
      "level": "15"
  }
}, {
  "featureType": "estatelabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "13,16",
      "level": "16"
  }
}, {
  "featureType": "estatelabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,16",
      "level": "13"
  }
}, {
  "featureType": "estatelabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,16",
      "level": "14"
  }
}, {
  "featureType": "estatelabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,16",
      "level": "15"
  }
}, {
  "featureType": "estatelabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,16",
      "level": "16"
  }
}, {
  "featureType": "estatelabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,16",
      "level": "13"
  }
}, {
  "featureType": "estatelabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,16",
      "level": "14"
  }
}, {
  "featureType": "estatelabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,16",
      "level": "15"
  }
}, {
  "featureType": "estatelabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,16",
      "level": "16"
  }
}, {
  "featureType": "businesstowerlabel",
  "elementType": "labels.text",
  "stylers": {
      "fontsize": 23
  }
}, {
  "featureType": "businesstowerlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "12,16",
      "level": "12"
  }
}, {
  "featureType": "businesstowerlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "12,16",
      "level": "13"
  }
}, {
  "featureType": "businesstowerlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "12,16",
      "level": "14"
  }
}, {
  "featureType": "businesstowerlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "12,16",
      "level": "15"
  }
}, {
  "featureType": "businesstowerlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "12,16",
      "level": "16"
  }
}, {
  "featureType": "businesstowerlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,16",
      "level": "12"
  }
}, {
  "featureType": "businesstowerlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,16",
      "level": "13"
  }
}, {
  "featureType": "businesstowerlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,16",
      "level": "14"
  }
}, {
  "featureType": "businesstowerlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,16",
      "level": "15"
  }
}, {
  "featureType": "businesstowerlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,16",
      "level": "16"
  }
}, {
  "featureType": "businesstowerlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,16",
      "level": "12"
  }
}, {
  "featureType": "businesstowerlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,16",
      "level": "13"
  }
}, {
  "featureType": "businesstowerlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,16",
      "level": "14"
  }
}, {
  "featureType": "businesstowerlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,16",
      "level": "15"
  }
}, {
  "featureType": "businesstowerlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,16",
      "level": "16"
  }
}, {
  "featureType": "governmentlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "13,17",
      "level": "13"
  }
}, {
  "featureType": "governmentlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "13,17",
      "level": "14"
  }
}, {
  "featureType": "governmentlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "13,17",
      "level": "15"
  }
}, {
  "featureType": "governmentlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "13,17",
      "level": "16"
  }
}, {
  "featureType": "governmentlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "13,17",
      "level": "17"
  }
}, {
  "featureType": "governmentlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,17",
      "level": "13"
  }
}, {
  "featureType": "governmentlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,17",
      "level": "14"
  }
}, {
  "featureType": "governmentlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,17",
      "level": "15"
  }
}, {
  "featureType": "governmentlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,17",
      "level": "16"
  }
}, {
  "featureType": "governmentlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,17",
      "level": "17"
  }
}, {
  "featureType": "governmentlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,17",
      "level": "13"
  }
}, {
  "featureType": "governmentlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,17",
      "level": "14"
  }
}, {
  "featureType": "governmentlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,17",
      "level": "15"
  }
}, {
  "featureType": "governmentlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,17",
      "level": "16"
  }
}, {
  "featureType": "governmentlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,17",
      "level": "17"
  }
}, {
  "featureType": "restaurantlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "13,18",
      "level": "13"
  }
}, {
  "featureType": "restaurantlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "13,18",
      "level": "14"
  }
}, {
  "featureType": "restaurantlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "13,18",
      "level": "15"
  }
}, {
  "featureType": "restaurantlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "13,18",
      "level": "16"
  }
}, {
  "featureType": "restaurantlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "13,18",
      "level": "17"
  }
}, {
  "featureType": "restaurantlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "13,18",
      "level": "18"
  }
}, {
  "featureType": "restaurantlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,18",
      "level": "13"
  }
}, {
  "featureType": "restaurantlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,18",
      "level": "14"
  }
}, {
  "featureType": "restaurantlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,18",
      "level": "15"
  }
}, {
  "featureType": "restaurantlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,18",
      "level": "16"
  }
}, {
  "featureType": "restaurantlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,18",
      "level": "17"
  }
}, {
  "featureType": "restaurantlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,18",
      "level": "18"
  }
}, {
  "featureType": "restaurantlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,18",
      "level": "13"
  }
}, {
  "featureType": "restaurantlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,18",
      "level": "14"
  }
}, {
  "featureType": "restaurantlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,18",
      "level": "15"
  }
}, {
  "featureType": "restaurantlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,18",
      "level": "16"
  }
}, {
  "featureType": "restaurantlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,18",
      "level": "17"
  }
}, {
  "featureType": "restaurantlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "13,18",
      "level": "18"
  }
}, {
  "featureType": "hotellabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "14,16",
      "level": "14"
  }
}, {
  "featureType": "hotellabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "14,16",
      "level": "15"
  }
}, {
  "featureType": "hotellabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "14,16",
      "level": "16"
  }
}, {
  "featureType": "hotellabel",
  "elementType": "labels.text",
  "stylers": {
      "fontsize": 22,
      "curZoomRegionId": "0",
      "curZoomRegion": "14,16",
      "level": "14"
  }
}, {
  "featureType": "hotellabel",
  "elementType": "labels.text",
  "stylers": {
      "fontsize": 22,
      "curZoomRegionId": "0",
      "curZoomRegion": "14,16",
      "level": "15"
  }
}, {
  "featureType": "hotellabel",
  "elementType": "labels.text",
  "stylers": {
      "fontsize": 22,
      "curZoomRegionId": "0",
      "curZoomRegion": "14,16",
      "level": "16"
  }
}, {
  "featureType": "hotellabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "14,16",
      "level": "14"
  }
}, {
  "featureType": "hotellabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "14,16",
      "level": "15"
  }
}, {
  "featureType": "hotellabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "14,16",
      "level": "16"
  }
}, {
  "featureType": "hotellabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "14,16",
      "level": "14"
  }
}, {
  "featureType": "hotellabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "14,16",
      "level": "15"
  }
}, {
  "featureType": "hotellabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "14,16",
      "level": "16"
  }
}, {
  "featureType": "shoppinglabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "11,16",
      "level": "11"
  }
}, {
  "featureType": "shoppinglabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "11,16",
      "level": "12"
  }
}, {
  "featureType": "shoppinglabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "11,16",
      "level": "13"
  }
}, {
  "featureType": "shoppinglabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "11,16",
      "level": "14"
  }
}, {
  "featureType": "shoppinglabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "11,16",
      "level": "15"
  }
}, {
  "featureType": "shoppinglabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "11,16",
      "level": "16"
  }
}, {
  "featureType": "shoppinglabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "11,16",
      "level": "11"
  }
}, {
  "featureType": "shoppinglabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "11,16",
      "level": "12"
  }
}, {
  "featureType": "shoppinglabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "11,16",
      "level": "13"
  }
}, {
  "featureType": "shoppinglabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "11,16",
      "level": "14"
  }
}, {
  "featureType": "shoppinglabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "11,16",
      "level": "15"
  }
}, {
  "featureType": "shoppinglabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "11,16",
      "level": "16"
  }
}, {
  "featureType": "shoppinglabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "11,16",
      "level": "11"
  }
}, {
  "featureType": "shoppinglabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "11,16",
      "level": "12"
  }
}, {
  "featureType": "shoppinglabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "11,16",
      "level": "13"
  }
}, {
  "featureType": "shoppinglabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "11,16",
      "level": "14"
  }
}, {
  "featureType": "shoppinglabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "11,16",
      "level": "15"
  }
}, {
  "featureType": "shoppinglabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "11,16",
      "level": "16"
  }
}, {
  "featureType": "shoppinglabel",
  "elementType": "labels.text",
  "stylers": {
      "fontsize": 23
  }
}, {
  "featureType": "hotellabel",
  "elementType": "labels.text",
  "stylers": {
      "fontsize": 23
  }
}, {
  "featureType": "restaurantlabel",
  "elementType": "labels.text",
  "stylers": {
      "fontsize": 23
  }
}, {
  "featureType": "governmentlabel",
  "elementType": "labels.text",
  "stylers": {
      "fontsize": 23
  }
}, {
  "featureType": "companylabel",
  "elementType": "labels.text",
  "stylers": {
      "fontsize": 24
  }
}, {
  "featureType": "entertainmentlabel",
  "elementType": "labels.text",
  "stylers": {
      "fontsize": 23
  }
}, {
  "featureType": "medicallabel",
  "elementType": "labels.text",
  "stylers": {
      "fontsize": 23
  }
}, {
  "featureType": "educationlabel",
  "elementType": "labels.text",
  "stylers": {
      "fontsize": 23
  }
}, {
  "featureType": "scenicspotslabel",
  "elementType": "labels.text",
  "stylers": {
      "fontsize": 23
  }
}, {
  "featureType": "airportlabel",
  "elementType": "labels.text",
  "stylers": {
      "fontsize": 23
  }
}, {
  "featureType": "water",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#9ca0a3ff"
  }
}, {
  "featureType": "water",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffffff"
  }
}, {
  "featureType": "manmade",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#9ca0a3ff"
  }
}, {
  "featureType": "manmade",
  "elementType": "labels.text.stroke",
  "stylers": {
      "color": "#ffffff00"
  }
}, {
  "featureType": "education",
  "elementType": "labels",
  "stylers": {
      "visibility": "on"
  }
}, {
  "featureType": "transportationlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "12,13",
      "level": "12"
  }
}, {
  "featureType": "transportationlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "12,13",
      "level": "13"
  }
}, {
  "featureType": "transportationlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,13",
      "level": "12"
  }
}, {
  "featureType": "transportationlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,13",
      "level": "13"
  }
}, {
  "featureType": "transportationlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,13",
      "level": "12"
  }
}, {
  "featureType": "transportationlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "12,13",
      "level": "13"
  }
}, {
  "featureType": "educationlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "11,14",
      "level": "11"
  }
}, {
  "featureType": "educationlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "11,14",
      "level": "12"
  }
}, {
  "featureType": "educationlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "11,14",
      "level": "13"
  }
}, {
  "featureType": "educationlabel",
  "stylers": {
      "curZoomRegionId": "0",
      "curZoomRegion": "11,14",
      "level": "14"
  }
}, {
  "featureType": "educationlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "11,14",
      "level": "11"
  }
}, {
  "featureType": "educationlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "11,14",
      "level": "12"
  }
}, {
  "featureType": "educationlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "11,14",
      "level": "13"
  }
}, {
  "featureType": "educationlabel",
  "elementType": "labels",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "11,14",
      "level": "14"
  }
}, {
  "featureType": "educationlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "11,14",
      "level": "11"
  }
}, {
  "featureType": "educationlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "11,14",
      "level": "12"
  }
}, {
  "featureType": "educationlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "11,14",
      "level": "13"
  }
}, {
  "featureType": "educationlabel",
  "elementType": "labels.icon",
  "stylers": {
      "visibility": "off",
      "curZoomRegionId": "0",
      "curZoomRegion": "11,14",
      "level": "14"
  }
}, {
  "featureType": "transportationlabel",
  "elementType": "labels.text",
  "stylers": {
      "fontsize": 23
  }
}, {
  "featureType": "manmade",
  "elementType": "labels.text",
  "stylers": {
      "fontsize": 23
  }
}, {
  "featureType": "scenicspots",
  "elementType": "labels.text.fill",
  "stylers": {
      "color": "#ab76b6ff"
  }
}, {
  "featureType": "scenicspots",
  "elementType": "labels.text",
  "stylers": {
      "fontsize": 23
  }
}]
/*格式如下所示:
		{
    '1': 'rgb(255,0,0)',
    '0.5': 'yellow',
    '0': '#27D38A'
		}*/
export const gradient = {
  '0.5': '#69D5A4',
  // '0.5': '#2c7bb6',
  '0.65': '#AAE5CB',
  // '0.65': '#abd9e9',
  '0.7': '#ffffbf',
  '0.9': '#fde468',
  '1': '#d7191c'
}

export const loading = {
  text: '数据获取中',
  color: '#27d38a',
  effect: 'whirling'
}

export const isTest = process.env.NODE_ENV !== 'production' || /^test/.test(window.location.hostname)


export const beijing_json = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"adcode":110101,"name":"东城区","center":[116.418757,39.917544],"centroid":[116.416718,39.912934],"childrenNum":0,"level":"district","parent":{"adcode":110000},"subFeatureIndex":0,"acroutes":[100000,110000]},"geometry":{"type":"MultiPolygon","coordinates":[[[[116.44364,39.87284],[116.445648,39.879283],[116.444059,39.890038],[116.450939,39.890249],[116.450876,39.894088],[116.447154,39.894186],[116.446819,39.900042],[116.448722,39.903246],[116.436488,39.902042],[116.434983,39.913964],[116.434314,39.92868],[116.443682,39.928664],[116.443703,39.936663],[116.446338,39.946205],[116.440566,39.945295],[116.442239,39.9497],[116.435422,39.952121],[116.436698,39.949245],[116.429483,39.950155],[116.429002,39.957274],[116.424861,39.962279],[116.414196,39.962182],[116.411415,39.964928],[116.411101,39.97146],[116.407504,39.973995],[116.40788,39.962182],[116.389498,39.96314],[116.387658,39.96093],[116.38678,39.957014],[116.393346,39.957355],[116.394266,39.940629],[116.396169,39.94006],[116.396692,39.928306],[116.399474,39.923574],[116.392175,39.92242],[116.392259,39.907881],[116.395563,39.907995],[116.396086,39.89944],[116.397612,39.898675],[116.399097,39.872205],[116.38059,39.871148],[116.380632,39.866054],[116.387888,39.867372],[116.394956,39.862734],[116.3955,39.858682],[116.406856,39.859967],[116.41246,39.858942],[116.41589,39.863645],[116.413652,39.871148],[116.423209,39.872824],[116.442574,39.87188],[116.44364,39.87284]]]]}},{"type":"Feature","properties":{"adcode":110102,"name":"西城区","center":[116.366794,39.915309],"centroid":[116.36567,39.912028],"childrenNum":0,"level":"district","parent":{"adcode":110000},"subFeatureIndex":1,"acroutes":[100000,110000]},"geometry":{"type":"MultiPolygon","coordinates":[[[[116.325799,39.896789],[116.32582,39.891111],[116.320759,39.881512],[116.321324,39.875199],[116.326636,39.876859],[116.335273,39.875183],[116.341567,39.876159],[116.344286,39.873653],[116.349472,39.873588],[116.35058,39.86869],[116.38059,39.871148],[116.399097,39.872205],[116.397612,39.898675],[116.396086,39.89944],[116.395563,39.907995],[116.392259,39.907881],[116.392175,39.92242],[116.399474,39.923574],[116.396692,39.928306],[116.396169,39.94006],[116.394266,39.940629],[116.393346,39.957355],[116.38678,39.957014],[116.387658,39.96093],[116.390084,39.968406],[116.394162,39.969397],[116.394099,39.972858],[116.380903,39.972712],[116.380401,39.968178],[116.370384,39.967902],[116.371974,39.948594],[116.356206,39.944092],[116.352023,39.950854],[116.352421,39.943832],[116.341442,39.941979],[116.332889,39.944092],[116.327953,39.942369],[116.333056,39.938565],[116.334645,39.922664],[116.335356,39.898448],[116.337301,39.89739],[116.325799,39.896789]]]]}},{"type":"Feature","properties":{"adcode":110105,"name":"朝阳区","center":[116.486409,39.921489],"centroid":[116.513687,39.951064],"childrenNum":0,"level":"district","parent":{"adcode":110000},"subFeatureIndex":2,"acroutes":[100000,110000]},"geometry":{"type":"MultiPolygon","coordinates":[[[[116.595548,40.01751],[116.577814,40.027512],[116.578797,40.033097],[116.570474,40.032431],[116.564242,40.039655],[116.550753,40.045499],[116.54655,40.048956],[116.552761,40.05488],[116.551757,40.059765],[116.547784,40.062718],[116.543183,40.059408],[116.534379,40.066791],[116.525993,40.071334],[116.513948,40.070426],[116.506775,40.074352],[116.49933,40.080387],[116.486657,40.081036],[116.482935,40.083745],[116.473545,40.085562],[116.471015,40.08939],[116.466832,40.090185],[116.466247,40.08235],[116.461855,40.080825],[116.462608,40.076786],[116.458823,40.075796],[116.458635,40.070377],[116.462127,40.06731],[116.459408,40.059992],[116.45142,40.06129],[116.451629,40.058759],[116.442867,40.061323],[116.433268,40.06228],[116.415618,40.056],[116.409595,40.055626],[116.406124,40.049768],[116.408884,40.043291],[116.405266,40.038974],[116.395333,40.036766],[116.39297,40.041733],[116.390649,40.041279],[116.390251,40.036587],[116.395103,40.032854],[116.378708,40.031181],[116.350873,40.0267],[116.376554,39.992971],[116.381196,39.977976],[116.380903,39.972712],[116.394099,39.972858],[116.394162,39.969397],[116.390084,39.968406],[116.387658,39.96093],[116.389498,39.96314],[116.40788,39.962182],[116.407504,39.973995],[116.411101,39.97146],[116.411415,39.964928],[116.414196,39.962182],[116.424861,39.962279],[116.429002,39.957274],[116.429483,39.950155],[116.436698,39.949245],[116.435422,39.952121],[116.442239,39.9497],[116.440566,39.945295],[116.446338,39.946205],[116.443703,39.936663],[116.443682,39.928664],[116.434314,39.92868],[116.434983,39.913964],[116.436488,39.902042],[116.448722,39.903246],[116.446819,39.900042],[116.447154,39.894186],[116.450876,39.894088],[116.450939,39.890249],[116.444059,39.890038],[116.445648,39.879283],[116.44364,39.87284],[116.442971,39.866087],[116.446359,39.860862],[116.448178,39.863645],[116.454222,39.859381],[116.456062,39.86122],[116.463319,39.856224],[116.467794,39.856012],[116.460308,39.848622],[116.451148,39.852008],[116.450479,39.848704],[116.445983,39.848329],[116.446694,39.84426],[116.442323,39.843674],[116.440587,39.839653],[116.436739,39.841329],[116.432055,39.832929],[116.425217,39.831903],[116.430068,39.830112],[116.43699,39.830649],[116.436677,39.827425],[116.44592,39.826692],[116.443912,39.82096],[116.452737,39.823012],[116.462775,39.815945],[116.468463,39.814511],[116.474256,39.809772],[116.485256,39.81272],[116.485632,39.816889],[116.495357,39.818795],[116.498201,39.8157],[116.505813,39.817866],[116.502801,39.819006],[116.510142,39.821449],[116.510602,39.827637],[116.516164,39.829835],[116.525366,39.829754],[116.525868,39.826904],[116.534944,39.82482],[116.538143,39.828207],[116.533187,39.832733],[116.542681,39.830209],[116.543664,39.835078],[116.558596,39.834687],[116.569386,39.833498],[116.577145,39.830682],[116.577479,39.827539],[116.587015,39.828223],[116.583732,39.824917],[116.591595,39.823875],[116.59147,39.826367],[116.599228,39.825585],[116.598977,39.831659],[116.60224,39.831675],[116.601905,39.840727],[116.608367,39.846539],[116.604666,39.846132],[116.604185,39.850071],[116.613449,39.850185],[116.626958,39.860683],[116.619994,39.868951],[116.62493,39.87725],[116.624323,39.881155],[116.628987,39.881594],[116.627585,39.890477],[116.615603,39.889794],[116.61531,39.895503],[116.621019,39.898854],[116.623361,39.904271],[116.620245,39.90767],[116.623006,39.913818],[116.620956,39.923103],[116.630576,39.921672],[116.624156,39.929981],[116.6293,39.931314],[116.629677,39.938727],[116.633441,39.940906],[116.630492,39.946156],[116.632228,39.950545],[116.645277,39.945977],[116.643081,39.952983],[116.641827,39.969575],[116.639819,39.982606],[116.634026,39.981696],[116.63365,39.986197],[116.639129,39.986879],[116.640321,39.990177],[116.643751,39.989608],[116.642684,39.996755],[116.637582,40.002359],[116.63273,39.999825],[116.625766,40.003122],[116.628129,40.007653],[116.61989,40.011794],[116.60132,40.013873],[116.595548,40.01751]]],[[[116.603683,40.052949],[116.608409,40.054912],[116.603473,40.086811],[116.602909,40.093883],[116.598392,40.103874],[116.598705,40.09351],[116.595903,40.090218],[116.580365,40.088352],[116.578316,40.102739],[116.574071,40.107815],[116.574322,40.096138],[116.578149,40.076461],[116.581411,40.067846],[116.58139,40.073817],[116.586597,40.074336],[116.590131,40.056162],[116.587957,40.05053],[116.591198,40.051796],[116.591993,40.043129],[116.599814,40.041408],[116.599417,40.047171],[116.601633,40.047658],[116.598517,40.052543],[116.603683,40.052949]]]]}},{"type":"Feature","properties":{"adcode":110106,"name":"丰台区","center":[116.286968,39.863642],"centroid":[116.250342,39.835716],"childrenNum":0,"level":"district","parent":{"adcode":110000},"subFeatureIndex":3,"acroutes":[100000,110000]},"geometry":{"type":"MultiPolygon","coordinates":[[[[116.259089,39.896658],[116.252899,39.896382],[116.233534,39.89212],[116.234642,39.88955],[116.227783,39.889078],[116.22772,39.883839],[116.222952,39.883986],[116.219523,39.881334],[116.219105,39.876713],[116.210907,39.878079],[116.212099,39.874679],[116.208126,39.874125],[116.20457,39.879885],[116.199426,39.883286],[116.19035,39.881529],[116.179099,39.882684],[116.167033,39.888752],[116.163352,39.886881],[116.156137,39.889029],[116.150972,39.884051],[116.147605,39.885287],[116.13167,39.881268],[116.125898,39.877949],[116.119729,39.877477],[116.112242,39.873247],[116.105425,39.872547],[116.104149,39.868837],[116.095826,39.869032],[116.087169,39.866152],[116.078323,39.870318],[116.07046,39.868446],[116.067344,39.865761],[116.070188,39.860423],[116.070982,39.853717],[116.056553,39.85095],[116.05465,39.845953],[116.061488,39.841899],[116.068975,39.840792],[116.07619,39.837015],[116.078615,39.831593],[116.084366,39.828581],[116.085747,39.832163],[116.089741,39.829721],[116.088214,39.82692],[116.089594,39.816352],[116.086186,39.816401],[116.084826,39.811596],[116.087127,39.803289],[116.0856,39.795324],[116.091916,39.787927],[116.091581,39.784082],[116.094613,39.781557],[116.101368,39.78576],[116.107014,39.78532],[116.106366,39.788612],[116.119792,39.789654],[116.120754,39.784848],[116.125062,39.785353],[116.131503,39.783121],[116.132569,39.778624],[116.127467,39.779047],[116.124351,39.77675],[116.121486,39.779047],[116.117491,39.77336],[116.121465,39.761626],[116.12847,39.762409],[116.133803,39.76663],[116.148044,39.766483],[116.148902,39.768651],[116.15597,39.766923],[116.162704,39.769205],[116.16971,39.784278],[116.182989,39.783707],[116.183365,39.780204],[116.188008,39.781785],[116.194407,39.780579],[116.194449,39.778493],[116.200388,39.778151],[116.201852,39.788269],[116.201852,39.799657],[116.208063,39.806352],[116.207415,39.810814],[116.216762,39.816905],[116.214462,39.818974],[116.214127,39.824706],[116.227219,39.825048],[116.228306,39.827197],[116.23962,39.826872],[116.243007,39.825145],[116.244304,39.818567],[116.251644,39.81329],[116.25361,39.807231],[116.250933,39.801432],[116.251519,39.793059],[116.259298,39.797621],[116.262184,39.792782],[116.27423,39.796936],[116.287237,39.799103],[116.289182,39.795894],[116.296083,39.795568],[116.291148,39.793271],[116.295205,39.790958],[116.301541,39.774941],[116.307062,39.770085],[116.31068,39.772057],[116.317978,39.783447],[116.321784,39.783626],[116.322872,39.798386],[116.326824,39.798386],[116.328225,39.801416],[116.340124,39.802149],[116.341755,39.807589],[116.355704,39.805668],[116.356833,39.800471],[116.367039,39.79982],[116.368189,39.794819],[116.365742,39.794151],[116.367582,39.784962],[116.378478,39.785646],[116.379209,39.77939],[116.385609,39.778852],[116.390649,39.780465],[116.391903,39.765277],[116.398888,39.765864],[116.397905,39.781068],[116.396023,39.786738],[116.42024,39.787439],[116.421034,39.794134],[116.429274,39.794102],[116.429399,39.803583],[116.425719,39.805358],[116.422456,39.81044],[116.417772,39.81013],[116.415262,39.812525],[116.410013,39.811336],[116.41016,39.817052],[116.419759,39.815375],[116.418441,39.822915],[116.414426,39.824282],[116.415785,39.829428],[116.420072,39.826611],[116.425217,39.831903],[116.432055,39.832929],[116.436739,39.841329],[116.440587,39.839653],[116.442323,39.843674],[116.446694,39.84426],[116.445983,39.848329],[116.450479,39.848704],[116.451148,39.852008],[116.460308,39.848622],[116.467794,39.856012],[116.463319,39.856224],[116.456062,39.86122],[116.454222,39.859381],[116.448178,39.863645],[116.446359,39.860862],[116.442971,39.866087],[116.44364,39.87284],[116.442574,39.87188],[116.423209,39.872824],[116.413652,39.871148],[116.41589,39.863645],[116.41246,39.858942],[116.406856,39.859967],[116.3955,39.858682],[116.394956,39.862734],[116.387888,39.867372],[116.380632,39.866054],[116.38059,39.871148],[116.35058,39.86869],[116.349472,39.873588],[116.344286,39.873653],[116.341567,39.876159],[116.335273,39.875183],[116.326636,39.876859],[116.321324,39.875199],[116.320759,39.881512],[116.32582,39.891111],[116.325799,39.896789],[116.314026,39.896772],[116.302796,39.891925],[116.295016,39.886833],[116.294975,39.896496],[116.266199,39.896252],[116.259089,39.896658]]]]}},{"type":"Feature","properties":{"adcode":110107,"name":"石景山区","center":[116.195445,39.914601],"centroid":[116.176229,39.933205],"childrenNum":0,"level":"district","parent":{"adcode":110000},"subFeatureIndex":4,"acroutes":[100000,110000]},"geometry":{"type":"MultiPolygon","coordinates":[[[[116.167033,39.888752],[116.179099,39.882684],[116.19035,39.881529],[116.199426,39.883286],[116.20457,39.879885],[116.208126,39.874125],[116.212099,39.874679],[116.210907,39.878079],[116.219105,39.876713],[116.219523,39.881334],[116.222952,39.883986],[116.22772,39.883839],[116.227783,39.889078],[116.234642,39.88955],[116.233534,39.89212],[116.252899,39.896382],[116.259089,39.896658],[116.252983,39.896951],[116.252983,39.915558],[116.250975,39.919834],[116.237696,39.918452],[116.232426,39.91694],[116.230899,39.919525],[116.206787,39.916663],[116.207707,39.9259],[116.215696,39.927103],[116.213061,39.928891],[116.216198,39.931233],[116.213186,39.933232],[116.216281,39.936386],[116.215466,39.94375],[116.212831,39.948952],[116.20112,39.961109],[116.190747,39.965367],[116.190685,39.968259],[116.185812,39.970274],[116.18531,39.977976],[116.186586,39.983906],[116.178911,39.988292],[116.178012,39.982216],[116.171487,39.977001],[116.169229,39.979357],[116.166845,39.987561],[116.158124,39.984133],[116.156117,39.989137],[116.151579,39.993442],[116.144678,39.989186],[116.118934,39.986115],[116.113455,39.981518],[116.116592,39.971932],[116.122971,39.967561],[116.120712,39.96119],[116.115254,39.957745],[116.120043,39.950789],[116.114522,39.949196],[116.11195,39.942921],[116.119875,39.932761],[116.124769,39.934907],[116.127822,39.930338],[116.127341,39.926615],[116.13029,39.924518],[116.139282,39.922095],[116.146852,39.910077],[116.152792,39.906629],[116.153503,39.900985],[116.161094,39.896805],[116.167033,39.888752]]]]}},{"type":"Feature","properties":{"adcode":110108,"name":"海淀区","center":[116.310316,39.956074],"centroid":[116.23328,40.026927],"childrenNum":0,"level":"district","parent":{"adcode":110000},"subFeatureIndex":5,"acroutes":[100000,110000]},"geometry":{"type":"MultiPolygon","coordinates":[[[[116.325799,39.896789],[116.337301,39.89739],[116.335356,39.898448],[116.334645,39.922664],[116.333056,39.938565],[116.327953,39.942369],[116.332889,39.944092],[116.341442,39.941979],[116.352421,39.943832],[116.352023,39.950854],[116.356206,39.944092],[116.371974,39.948594],[116.370384,39.967902],[116.380401,39.968178],[116.380903,39.972712],[116.381196,39.977976],[116.376554,39.992971],[116.350873,40.0267],[116.378708,40.031181],[116.395103,40.032854],[116.390251,40.036587],[116.390649,40.041279],[116.38519,40.042853],[116.376888,40.042756],[116.376114,40.045466],[116.36959,40.04696],[116.367394,40.053436],[116.372999,40.054344],[116.372267,40.05785],[116.379272,40.059002],[116.382848,40.061582],[116.381928,40.066402],[116.373354,40.065623],[116.372538,40.06843],[116.363149,40.068965],[116.363023,40.065931],[116.357293,40.066012],[116.34667,40.063659],[116.346963,40.06043],[116.342676,40.059635],[116.343366,40.055448],[116.340271,40.055091],[116.338828,40.058921],[116.330756,40.063383],[116.331801,40.057168],[116.325946,40.054799],[116.318292,40.061663],[116.309446,40.060609],[116.305995,40.063043],[116.302942,40.060803],[116.290353,40.083145],[116.279897,40.079754],[116.2731,40.092699],[116.27333,40.09557],[116.265237,40.094694],[116.258273,40.101522],[116.263899,40.10402],[116.263334,40.110588],[116.258022,40.11195],[116.25957,40.106907],[116.255868,40.104474],[116.252732,40.106517],[116.245956,40.10535],[116.240498,40.108009],[116.243363,40.113279],[116.241836,40.118403],[116.245036,40.118825],[116.247043,40.136204],[116.233785,40.136577],[116.215445,40.143174],[116.212224,40.140548],[116.206285,40.143092],[116.205658,40.150175],[116.203211,40.153773],[116.202166,40.160984],[116.194282,40.160076],[116.192065,40.155669],[116.182696,40.158099],[116.183094,40.153335],[116.180417,40.14729],[116.174122,40.143595],[116.167681,40.141844],[116.168622,40.135442],[116.17178,40.127936],[116.167409,40.128455],[116.169563,40.124564],[116.152708,40.121776],[116.132925,40.121354],[116.132214,40.115079],[116.127676,40.116393],[116.113309,40.115598],[116.105864,40.118014],[116.102246,40.115987],[116.096056,40.121257],[116.089783,40.119327],[116.08445,40.120252],[116.077883,40.115047],[116.073847,40.115436],[116.072676,40.109258],[116.069456,40.104912],[116.062931,40.10282],[116.061969,40.09956],[116.055905,40.09643],[116.051848,40.091661],[116.048878,40.085303],[116.051325,40.084345],[116.054587,40.07823],[116.064019,40.073022],[116.064981,40.067456],[116.071129,40.062037],[116.068055,40.051926],[116.075123,40.039915],[116.078176,40.032756],[116.084241,40.030905],[116.095073,40.031782],[116.098398,40.033811],[116.105488,40.032204],[116.114522,40.033],[116.123598,40.029655],[116.129558,40.0311],[116.140098,40.02873],[116.149278,40.022154],[116.157309,40.021034],[116.163938,40.016796],[116.164774,40.014328],[116.175335,40.006403],[116.172115,40.000637],[116.161658,39.999987],[116.154527,39.997275],[116.151579,39.993442],[116.156117,39.989137],[116.158124,39.984133],[116.166845,39.987561],[116.169229,39.979357],[116.171487,39.977001],[116.178012,39.982216],[116.178911,39.988292],[116.186586,39.983906],[116.18531,39.977976],[116.185812,39.970274],[116.190685,39.968259],[116.190747,39.965367],[116.20112,39.961109],[116.212831,39.948952],[116.215466,39.94375],[116.216281,39.936386],[116.213186,39.933232],[116.216198,39.931233],[116.213061,39.928891],[116.215696,39.927103],[116.207707,39.9259],[116.206787,39.916663],[116.230899,39.919525],[116.232426,39.91694],[116.237696,39.918452],[116.250975,39.919834],[116.252983,39.915558],[116.252983,39.896951],[116.259089,39.896658],[116.266199,39.896252],[116.294975,39.896496],[116.295016,39.886833],[116.302796,39.891925],[116.314026,39.896772],[116.325799,39.896789]]]]}},{"type":"Feature","properties":{"adcode":110109,"name":"门头沟区","center":[116.105381,39.937183],"centroid":[115.791698,39.994115],"childrenNum":0,"level":"district","parent":{"adcode":110000},"subFeatureIndex":6,"acroutes":[100000,110000]},"geometry":{"type":"MultiPolygon","coordinates":[[[[116.151579,39.993442],[116.154527,39.997275],[116.161658,39.999987],[116.172115,40.000637],[116.175335,40.006403],[116.164774,40.014328],[116.163938,40.016796],[116.157309,40.021034],[116.149278,40.022154],[116.140098,40.02873],[116.129558,40.0311],[116.123598,40.029655],[116.114522,40.033],[116.105488,40.032204],[116.098398,40.033811],[116.095073,40.031782],[116.084241,40.030905],[116.078176,40.032756],[116.075123,40.039915],[116.068055,40.051926],[116.071129,40.062037],[116.064981,40.067456],[116.064019,40.073022],[116.054587,40.07823],[116.051325,40.084345],[116.048878,40.085303],[116.043775,40.083502],[116.037899,40.084524],[116.033926,40.079657],[116.030914,40.082188],[116.020856,40.074579],[116.007785,40.080614],[116.005129,40.079803],[115.99735,40.082074],[115.986434,40.083469],[115.979993,40.081669],[115.977232,40.079041],[115.968575,40.075488],[115.966588,40.084556],[115.960461,40.092456],[115.962092,40.094419],[115.962552,40.10235],[115.957449,40.100679],[115.956717,40.096041],[115.952681,40.10102],[115.943229,40.103339],[115.947913,40.107409],[115.933588,40.124824],[115.921438,40.134485],[115.906549,40.138181],[115.904457,40.136123],[115.900442,40.138716],[115.8816,40.139073],[115.874155,40.14387],[115.870768,40.144276],[115.865184,40.148635],[115.856547,40.147468],[115.853348,40.149332],[115.846384,40.147096],[115.834234,40.15024],[115.83576,40.145426],[115.829047,40.149981],[115.822272,40.152606],[115.806567,40.153254],[115.802091,40.156754],[115.789837,40.168939],[115.78693,40.170414],[115.787014,40.178708],[115.773023,40.176197],[115.768213,40.165553],[115.762212,40.16262],[115.754328,40.163252],[115.749539,40.152995],[115.75485,40.145459],[115.749246,40.137711],[115.741111,40.132216],[115.734126,40.129379],[115.724841,40.128812],[115.715891,40.133383],[115.708697,40.134291],[115.699746,40.132394],[115.704765,40.129655],[115.711039,40.128941],[115.712064,40.126899],[115.702172,40.128196],[115.697216,40.12672],[115.693096,40.131924],[115.68699,40.13053],[115.681197,40.13267],[115.678667,40.130935],[115.657734,40.128098],[115.654806,40.131276],[115.64458,40.126639],[115.641882,40.120819],[115.643722,40.117511],[115.635943,40.115793],[115.631468,40.117852],[115.625048,40.116295],[115.621388,40.118711],[115.616223,40.117138],[115.606979,40.120057],[115.599116,40.120008],[115.59485,40.116279],[115.594432,40.108982],[115.592403,40.110182],[115.590709,40.096397],[115.584038,40.094889],[115.578538,40.096365],[115.576196,40.100825],[115.567769,40.096543],[115.563419,40.097922],[115.553736,40.091661],[115.555472,40.082626],[115.552168,40.079252],[115.544263,40.07591],[115.537885,40.077775],[115.527324,40.076072],[115.514944,40.066937],[115.509695,40.065477],[115.510427,40.062913],[115.500954,40.052478],[115.488323,40.046132],[115.488992,40.043746],[115.478557,40.036165],[115.468414,40.031896],[115.460656,40.032172],[115.454528,40.029704],[115.452082,40.02079],[115.442169,40.010885],[115.442817,40.007345],[115.449196,40.001985],[115.450346,39.993247],[115.443905,39.994644],[115.436815,39.991427],[115.428513,39.984328],[115.427635,39.979471],[115.423411,39.969819],[115.426924,39.965302],[115.423745,39.955697],[115.42615,39.95035],[115.43577,39.950919],[115.438468,39.95256],[115.444595,39.951358],[115.447042,39.948806],[115.452312,39.948188],[115.456787,39.944271],[115.464462,39.940142],[115.472387,39.93876],[115.48069,39.93585],[115.487277,39.923835],[115.494994,39.917948],[115.50386,39.915818],[115.52013,39.902547],[115.523016,39.898919],[115.509026,39.884164],[115.51003,39.88148],[115.516659,39.880406],[115.526299,39.875655],[115.529185,39.875948],[115.527345,39.869862],[115.521929,39.868186],[115.522368,39.858779],[115.515948,39.847678],[115.510992,39.84509],[115.514505,39.83835],[115.526509,39.835241],[115.530482,39.829916],[115.534957,39.830714],[115.546396,39.825992],[115.548027,39.822703],[115.563461,39.816417],[115.569274,39.813274],[115.577367,39.812541],[115.587322,39.813762],[115.59117,39.818534],[115.596649,39.821498],[115.599325,39.829151],[115.604533,39.834443],[115.607586,39.84089],[115.613086,39.843755],[115.616369,39.857542],[115.621973,39.863271],[115.623103,39.866949],[115.630987,39.871977],[115.640021,39.871554],[115.644705,39.875964],[115.648867,39.875411],[115.654869,39.882505],[115.667541,39.883888],[115.671055,39.88597],[115.678144,39.886556],[115.682556,39.893047],[115.68929,39.896187],[115.691779,39.8997],[115.709178,39.905117],[115.719592,39.904612],[115.721621,39.906824],[115.731261,39.907865],[115.74889,39.9152],[115.749622,39.917655],[115.76148,39.920989],[115.769385,39.925233],[115.774257,39.920599],[115.792848,39.920859],[115.797344,39.92216],[115.806839,39.919656],[115.811084,39.913785],[115.8188,39.913948],[115.826914,39.910581],[115.835112,39.899586],[115.838772,39.900644],[115.845255,39.897049],[115.860897,39.901359],[115.868321,39.905572],[115.87311,39.912484],[115.87884,39.915964],[115.890112,39.917281],[115.903935,39.914029],[115.927858,39.914257],[115.935868,39.917753],[115.941159,39.917509],[115.945697,39.910972],[115.944965,39.901847],[115.935805,39.898236],[115.921856,39.884164],[115.92744,39.876192],[115.949837,39.871278],[115.954145,39.866786],[115.961318,39.867877],[115.967822,39.872059],[115.968742,39.867714],[115.976563,39.868251],[115.97627,39.870497],[115.990177,39.876338],[115.997245,39.875167],[115.992875,39.867356],[115.986789,39.864703],[115.98817,39.859837],[115.98428,39.849111],[115.991285,39.840222],[116.00789,39.849469],[116.016694,39.849225],[116.018367,39.841525],[116.021023,39.840662],[116.030308,39.843462],[116.033089,39.845904],[116.04181,39.844878],[116.045825,39.84732],[116.05465,39.845953],[116.056553,39.85095],[116.070982,39.853717],[116.070188,39.860423],[116.067344,39.865761],[116.07046,39.868446],[116.078323,39.870318],[116.087169,39.866152],[116.095826,39.869032],[116.104149,39.868837],[116.105425,39.872547],[116.112242,39.873247],[116.119729,39.877477],[116.125898,39.877949],[116.13167,39.881268],[116.147605,39.885287],[116.150972,39.884051],[116.156137,39.889029],[116.163352,39.886881],[116.167033,39.888752],[116.161094,39.896805],[116.153503,39.900985],[116.152792,39.906629],[116.146852,39.910077],[116.139282,39.922095],[116.13029,39.924518],[116.127341,39.926615],[116.127822,39.930338],[116.124769,39.934907],[116.119875,39.932761],[116.11195,39.942921],[116.114522,39.949196],[116.120043,39.950789],[116.115254,39.957745],[116.120712,39.96119],[116.122971,39.967561],[116.116592,39.971932],[116.113455,39.981518],[116.118934,39.986115],[116.144678,39.989186],[116.151579,39.993442]]]]}},{"type":"Feature","properties":{"adcode":110111,"name":"房山区","center":[116.139157,39.735535],"centroid":[115.853966,39.719216],"childrenNum":0,"level":"district","parent":{"adcode":110000},"subFeatureIndex":7,"acroutes":[100000,110000]},"geometry":{"type":"MultiPolygon","coordinates":[[[[116.05465,39.845953],[116.045825,39.84732],[116.04181,39.844878],[116.033089,39.845904],[116.030308,39.843462],[116.021023,39.840662],[116.018367,39.841525],[116.016694,39.849225],[116.00789,39.849469],[115.991285,39.840222],[115.98428,39.849111],[115.98817,39.859837],[115.986789,39.864703],[115.992875,39.867356],[115.997245,39.875167],[115.990177,39.876338],[115.97627,39.870497],[115.976563,39.868251],[115.968742,39.867714],[115.967822,39.872059],[115.961318,39.867877],[115.954145,39.866786],[115.949837,39.871278],[115.92744,39.876192],[115.921856,39.884164],[115.935805,39.898236],[115.944965,39.901847],[115.945697,39.910972],[115.941159,39.917509],[115.935868,39.917753],[115.927858,39.914257],[115.903935,39.914029],[115.890112,39.917281],[115.87884,39.915964],[115.87311,39.912484],[115.868321,39.905572],[115.860897,39.901359],[115.845255,39.897049],[115.838772,39.900644],[115.835112,39.899586],[115.826914,39.910581],[115.8188,39.913948],[115.811084,39.913785],[115.806839,39.919656],[115.797344,39.92216],[115.792848,39.920859],[115.774257,39.920599],[115.769385,39.925233],[115.76148,39.920989],[115.749622,39.917655],[115.74889,39.9152],[115.731261,39.907865],[115.721621,39.906824],[115.719592,39.904612],[115.709178,39.905117],[115.691779,39.8997],[115.68929,39.896187],[115.682556,39.893047],[115.678144,39.886556],[115.671055,39.88597],[115.667541,39.883888],[115.654869,39.882505],[115.648867,39.875411],[115.644705,39.875964],[115.640021,39.871554],[115.630987,39.871977],[115.623103,39.866949],[115.621973,39.863271],[115.616369,39.857542],[115.613086,39.843755],[115.607586,39.84089],[115.604533,39.834443],[115.599325,39.829151],[115.596649,39.821498],[115.59117,39.818534],[115.587322,39.813762],[115.577367,39.812541],[115.569274,39.813274],[115.566367,39.809788],[115.566577,39.804609],[115.56229,39.803713],[115.554866,39.795601],[115.539432,39.794754],[115.536275,39.792131],[115.513815,39.788693],[115.508712,39.784082],[115.497336,39.791088],[115.49238,39.796057],[115.483241,39.798679],[115.475859,39.791821],[115.45777,39.782143],[115.452751,39.781964],[115.443382,39.785646],[115.434076,39.782274],[115.431169,39.775756],[115.425209,39.77336],[115.427029,39.769775],[115.430918,39.772073],[115.435414,39.769938],[115.434411,39.763859],[115.439158,39.752678],[115.457728,39.744918],[115.46672,39.740451],[115.470568,39.742391],[115.482321,39.742473],[115.492108,39.73887],[115.488866,39.733163],[115.491229,39.714719],[115.493404,39.707494],[115.490247,39.701409],[115.492631,39.701719],[115.49926,39.696189],[115.499783,39.691278],[115.496395,39.685665],[115.494408,39.686481],[115.488783,39.681619],[115.489724,39.678012],[115.486733,39.673362],[115.491334,39.668694],[115.482593,39.66303],[115.477971,39.654216],[115.478515,39.650331],[115.494659,39.649237],[115.496771,39.652551],[115.506705,39.652127],[115.511493,39.644388],[115.515864,39.641237],[115.522452,39.639964],[115.520423,39.633416],[115.521699,39.622311],[115.523414,39.620384],[115.514358,39.613508],[115.512121,39.605129],[115.515948,39.591193],[115.518834,39.593072],[115.518311,39.597156],[115.524229,39.598937],[115.530586,39.602874],[115.533891,39.608608],[115.533263,39.611434],[115.539119,39.616285],[115.545978,39.618751],[115.551875,39.614064],[115.55451,39.609408],[115.564569,39.605619],[115.567267,39.599623],[115.573875,39.596552],[115.571867,39.591569],[115.586109,39.589412],[115.592445,39.59665],[115.598719,39.597761],[115.599785,39.600865],[115.605285,39.600032],[115.6125,39.601126],[115.618439,39.604067],[115.625947,39.599394],[115.632555,39.597695],[115.634688,39.603871],[115.641589,39.603332],[115.643576,39.598937],[115.650268,39.600996],[115.657273,39.600081],[115.665304,39.605325],[115.667583,39.609637],[115.667479,39.615256],[115.673271,39.608526],[115.685317,39.603675],[115.68929,39.599035],[115.689269,39.592941],[115.694226,39.587778],[115.693431,39.580327],[115.697906,39.579248],[115.698596,39.570586],[115.694393,39.56941],[115.692072,39.565781],[115.698722,39.563248],[115.710161,39.563019],[115.717104,39.560403],[115.72022,39.554747],[115.7216,39.543499],[115.726953,39.543908],[115.726765,39.548143],[115.739124,39.545363],[115.73879,39.539314],[115.741487,39.536289],[115.743934,39.526771],[115.752508,39.515453],[115.759451,39.513916],[115.765328,39.514848],[115.768736,39.508878],[115.770828,39.510971],[115.767419,39.515862],[115.776537,39.512722],[115.777917,39.513834],[115.785006,39.51035],[115.792681,39.510742],[115.821456,39.509499],[115.828692,39.507045],[115.829487,39.512885],[115.822146,39.514145],[115.819762,39.518528],[115.824447,39.518774],[115.824112,39.522405],[115.819804,39.524923],[115.819219,39.530762],[115.822753,39.530533],[115.824321,39.534212],[115.828399,39.535455],[115.828692,39.541309],[115.84216,39.54157],[115.846028,39.543287],[115.847555,39.550284],[115.851361,39.550448],[115.855481,39.554993],[115.862026,39.548551],[115.866041,39.549843],[115.866355,39.546361],[115.872315,39.546099],[115.873298,39.548829],[115.88296,39.54811],[115.883587,39.551102],[115.887686,39.55066],[115.888752,39.555614],[115.89306,39.556219],[115.893416,39.561875],[115.890028,39.567873],[115.896009,39.569916],[115.907866,39.566876],[115.91276,39.572842],[115.911777,39.574182],[115.915604,39.582958],[115.908744,39.58402],[115.909665,39.588284],[115.9068,39.590016],[115.910187,39.600832],[115.912488,39.599149],[115.923759,39.597287],[115.924178,39.59384],[115.930221,39.593382],[115.929991,39.589935],[115.934174,39.588072],[115.934969,39.581814],[115.938105,39.581699],[115.937938,39.577467],[115.943187,39.577385],[115.943083,39.574672],[115.949147,39.573299],[115.950423,39.56637],[115.954982,39.566092],[115.957554,39.560927],[115.963409,39.565503],[115.967592,39.564604],[115.968909,39.570995],[115.974576,39.570832],[115.978153,39.572842],[115.977086,39.590931],[115.978445,39.595686],[115.990993,39.593791],[115.990721,39.586471],[115.996953,39.583203],[115.995196,39.577075],[116.007618,39.577205],[116.010588,39.583023],[116.013703,39.583039],[116.014038,39.588072],[116.020667,39.585981],[116.02623,39.587402],[116.024766,39.575604],[116.032859,39.574607],[116.032964,39.572302],[116.039237,39.571943],[116.098817,39.575146],[116.102016,39.576143],[116.101368,39.580049],[116.105801,39.576568],[116.106282,39.570979],[116.11379,39.570668],[116.116634,39.574002],[116.121465,39.574917],[116.121528,39.570554],[116.130311,39.569459],[116.130373,39.567743],[116.138425,39.568887],[116.13878,39.571044],[116.149613,39.573087],[116.151788,39.583415],[116.165527,39.583562],[116.176924,39.585899],[116.177071,39.590016],[116.184432,39.590915],[116.190768,39.589396],[116.19058,39.587386],[116.196854,39.588987],[116.196394,39.586095],[116.201726,39.586373],[116.206243,39.583219],[116.208105,39.577728],[116.221175,39.578921],[116.225085,39.584085],[116.226089,39.591993],[116.222597,39.593938],[116.223141,39.597222],[116.21808,39.608102],[116.219502,39.618931],[116.218875,39.628011],[116.215487,39.64305],[116.216992,39.651572],[116.223162,39.664728],[116.221342,39.667486],[116.22565,39.67359],[116.221238,39.678453],[116.230941,39.692355],[116.23435,39.703823],[116.231945,39.706025],[116.236629,39.71286],[116.245036,39.718421],[116.245768,39.72408],[116.248466,39.728027],[116.248026,39.732641],[116.243948,39.741658],[116.251895,39.749092],[116.252481,39.758676],[116.254426,39.76324],[116.252481,39.771747],[116.253777,39.77952],[116.251602,39.782518],[116.251519,39.793059],[116.250933,39.801432],[116.25361,39.807231],[116.251644,39.81329],[116.244304,39.818567],[116.243007,39.825145],[116.23962,39.826872],[116.228306,39.827197],[116.227219,39.825048],[116.214127,39.824706],[116.214462,39.818974],[116.216762,39.816905],[116.207415,39.810814],[116.208063,39.806352],[116.201852,39.799657],[116.201852,39.788269],[116.200388,39.778151],[116.194449,39.778493],[116.194407,39.780579],[116.188008,39.781785],[116.183365,39.780204],[116.182989,39.783707],[116.16971,39.784278],[116.162704,39.769205],[116.15597,39.766923],[116.148902,39.768651],[116.148044,39.766483],[116.133803,39.76663],[116.12847,39.762409],[116.121465,39.761626],[116.117491,39.77336],[116.121486,39.779047],[116.124351,39.77675],[116.127467,39.779047],[116.132569,39.778624],[116.131503,39.783121],[116.125062,39.785353],[116.120754,39.784848],[116.119792,39.789654],[116.106366,39.788612],[116.107014,39.78532],[116.101368,39.78576],[116.094613,39.781557],[116.091581,39.784082],[116.091916,39.787927],[116.0856,39.795324],[116.087127,39.803289],[116.084826,39.811596],[116.086186,39.816401],[116.089594,39.816352],[116.088214,39.82692],[116.089741,39.829721],[116.085747,39.832163],[116.084366,39.828581],[116.078615,39.831593],[116.07619,39.837015],[116.068975,39.840792],[116.061488,39.841899],[116.05465,39.845953]]]]}},{"type":"Feature","properties":{"adcode":110112,"name":"通州区","center":[116.658603,39.902486],"centroid":[116.733003,39.803506],"childrenNum":0,"level":"district","parent":{"adcode":110000},"subFeatureIndex":8,"acroutes":[100000,110000]},"geometry":{"type":"MultiPolygon","coordinates":[[[[116.725518,39.624075],[116.730202,39.622932],[116.730516,39.619143],[116.737877,39.61537],[116.744004,39.616824],[116.748689,39.619943],[116.762616,39.613819],[116.774202,39.605439],[116.774892,39.599166],[116.778196,39.593382],[116.785055,39.593497],[116.785474,39.596209],[116.790702,39.596045],[116.789384,39.602596],[116.792835,39.602155],[116.790012,39.610535],[116.802078,39.6123],[116.809711,39.614521],[116.81954,39.618996],[116.823994,39.617183],[116.82504,39.613884],[116.835391,39.617004],[116.834116,39.621495],[116.838445,39.62223],[116.826357,39.633122],[116.82893,39.635163],[116.826901,39.638217],[116.834555,39.641841],[116.833572,39.644127],[116.840766,39.644241],[116.839135,39.647523],[116.85141,39.652845],[116.849946,39.667552],[116.860486,39.667258],[116.863979,39.670391],[116.87318,39.671387],[116.883239,39.675352],[116.891144,39.67408],[116.906661,39.677425],[116.905197,39.681651],[116.909024,39.682859],[116.902896,39.690576],[116.88991,39.687656],[116.887819,39.690952],[116.89336,39.693187],[116.893841,39.695879],[116.886376,39.707004],[116.887108,39.714311],[116.8828,39.71847],[116.887589,39.725515],[116.89976,39.726168],[116.90229,39.729413],[116.911533,39.731516],[116.916678,39.731353],[116.916364,39.73587],[116.912934,39.73569],[116.910718,39.740989],[116.914461,39.741755],[116.913185,39.745962],[116.907163,39.75597],[116.901558,39.755204],[116.901809,39.763615],[116.908292,39.766711],[116.910613,39.762278],[116.920902,39.769107],[116.91649,39.775935],[116.921718,39.780628],[116.933784,39.781801],[116.939284,39.781361],[116.945788,39.777369],[116.94974,39.778542],[116.948004,39.785369],[116.953797,39.78607],[116.950828,39.791528],[116.938301,39.793124],[116.934809,39.801139],[116.942881,39.801677],[116.92979,39.811368],[116.92818,39.814153],[116.92887,39.820912],[116.9259,39.835403],[116.917431,39.846913],[116.910383,39.850608],[116.902813,39.848248],[116.902896,39.841346],[116.907581,39.834117],[116.903357,39.830682],[116.897501,39.832587],[116.885665,39.844585],[116.878304,39.84522],[116.878638,39.842257],[116.871507,39.842062],[116.866049,39.843902],[116.865505,39.846913],[116.85829,39.84846],[116.85254,39.859056],[116.847249,39.858616],[116.839407,39.865777],[116.836897,39.864736],[116.827277,39.877071],[116.823681,39.879137],[116.817009,39.878649],[116.81312,39.881301],[116.812304,39.889712],[116.80831,39.889631],[116.808247,39.884913],[116.804253,39.88488],[116.804148,39.877933],[116.794738,39.881252],[116.787084,39.886833],[116.7847,39.89142],[116.78424,39.902221],[116.78217,39.910419],[116.782358,39.928273],[116.78332,39.936045],[116.782567,39.947554],[116.78058,39.949716],[116.762826,39.956006],[116.757326,39.961483],[116.759605,39.969933],[116.766443,39.976351],[116.766757,39.982281],[116.775373,39.992759],[116.775749,40.002943],[116.770459,40.011632],[116.771755,40.014474],[116.764791,40.016049],[116.75329,40.015919],[116.751763,40.019962],[116.747037,40.021976],[116.747058,40.025385],[116.737145,40.02761],[116.732335,40.025109],[116.732043,40.022219],[116.724828,40.024265],[116.724221,40.021278],[116.719725,40.022512],[116.717383,40.019605],[116.716337,40.023762],[116.708621,40.026587],[116.703936,40.020141],[116.697244,40.016098],[116.685575,40.016569],[116.688378,40.00918],[116.686286,40.00827],[116.683777,40.014458],[116.678465,40.015058],[116.668615,40.013938],[116.664705,40.019037],[116.660125,40.021651],[116.655629,40.018566],[116.651676,40.021911],[116.651195,40.025759],[116.636159,40.019703],[116.633504,40.023664],[116.627063,40.021505],[116.624239,40.023664],[116.620099,40.022512],[116.619388,40.026733],[116.614139,40.028178],[116.614055,40.03175],[116.610061,40.031214],[116.602762,40.028503],[116.600839,40.018858],[116.595548,40.01751],[116.60132,40.013873],[116.61989,40.011794],[116.628129,40.007653],[116.625766,40.003122],[116.63273,39.999825],[116.637582,40.002359],[116.642684,39.996755],[116.643751,39.989608],[116.640321,39.990177],[116.639129,39.986879],[116.63365,39.986197],[116.634026,39.981696],[116.639819,39.982606],[116.641827,39.969575],[116.643081,39.952983],[116.645277,39.945977],[116.632228,39.950545],[116.630492,39.946156],[116.633441,39.940906],[116.629677,39.938727],[116.6293,39.931314],[116.624156,39.929981],[116.630576,39.921672],[116.620956,39.923103],[116.623006,39.913818],[116.620245,39.90767],[116.623361,39.904271],[116.621019,39.898854],[116.61531,39.895503],[116.615603,39.889794],[116.627585,39.890477],[116.628987,39.881594],[116.624323,39.881155],[116.62493,39.87725],[116.619994,39.868951],[116.626958,39.860683],[116.613449,39.850185],[116.604185,39.850071],[116.604666,39.846132],[116.608367,39.846539],[116.601905,39.840727],[116.60224,39.831675],[116.598977,39.831659],[116.599228,39.825585],[116.59147,39.826367],[116.591595,39.823875],[116.583732,39.824917],[116.587015,39.828223],[116.577479,39.827539],[116.577145,39.830682],[116.569386,39.833498],[116.558596,39.834687],[116.543664,39.835078],[116.542681,39.830209],[116.533187,39.832733],[116.538143,39.828207],[116.534944,39.82482],[116.539586,39.821563],[116.533375,39.819658],[116.540527,39.811857],[116.541678,39.803159],[116.535111,39.800146],[116.537537,39.796676],[116.530929,39.79174],[116.532894,39.786542],[116.538081,39.78128],[116.530092,39.778836],[116.536136,39.769873],[116.544647,39.772301],[116.545797,39.768732],[116.536491,39.768406],[116.539879,39.766255],[116.540423,39.761072],[116.528294,39.761463],[116.52363,39.769922],[116.520075,39.765782],[116.525178,39.762392],[116.523003,39.749678],[116.531159,39.747559],[116.527562,39.743304],[116.53624,39.740663],[116.537997,39.738071],[116.532413,39.73962],[116.531849,39.730016],[116.53783,39.728043],[116.536972,39.72152],[116.534609,39.718079],[116.52936,39.719808],[116.527332,39.716578],[116.53256,39.71529],[116.530552,39.713268],[116.535676,39.711881],[116.544961,39.715045],[116.573276,39.714507],[116.573464,39.709125],[116.579884,39.710234],[116.581202,39.712517],[116.590152,39.713349],[116.590194,39.711522],[116.598371,39.711963],[116.604017,39.714752],[116.604561,39.718731],[116.609141,39.719367],[116.616251,39.725581],[116.621876,39.725825],[116.621646,39.728076],[116.628129,39.727749],[116.631203,39.722971],[116.637623,39.723934],[116.638502,39.717166],[116.644587,39.709647],[116.652994,39.708619],[116.653098,39.703823],[116.647912,39.703579],[116.64626,39.700447],[116.647097,39.694786],[116.651509,39.694459],[116.651321,39.687868],[116.658097,39.686155],[116.65818,39.68857],[116.666566,39.687101],[116.669577,39.683642],[116.666022,39.679693],[116.668574,39.674602],[116.675203,39.676234],[116.680786,39.674896],[116.685554,39.676886],[116.692706,39.676789],[116.693543,39.674944],[116.703769,39.674145],[116.704857,39.667192],[116.702138,39.657644],[116.702891,39.649923],[116.70609,39.642903],[116.710419,39.639686],[116.716003,39.640356],[116.723489,39.639033],[116.721398,39.629415],[116.725518,39.624075]]]]}},{"type":"Feature","properties":{"adcode":110113,"name":"顺义区","center":[116.653525,40.128936],"centroid":[116.726467,40.152366],"childrenNum":0,"level":"district","parent":{"adcode":110000},"subFeatureIndex":9,"acroutes":[100000,110000]},"geometry":{"type":"MultiPolygon","coordinates":[[[[116.771755,40.014474],[116.777485,40.027204],[116.77782,40.032448],[116.781542,40.034818],[116.790221,40.034477],[116.789531,40.032318],[116.800259,40.028844],[116.803375,40.032155],[116.815295,40.030905],[116.82,40.028357],[116.820816,40.038779],[116.823158,40.039834],[116.822739,40.046473],[116.831732,40.048485],[116.831502,40.051196],[116.849486,40.051926],[116.850197,40.054977],[116.857809,40.051894],[116.867826,40.041863],[116.873619,40.041522],[116.88075,40.046164],[116.890265,40.04597],[116.90137,40.047723],[116.906431,40.051423],[116.914252,40.052592],[116.917974,40.044704],[116.924164,40.047463],[116.928096,40.054929],[116.931693,40.052024],[116.938824,40.050887],[116.937632,40.046911],[116.945014,40.048631],[116.945265,40.041425],[116.961932,40.051358],[116.962288,40.063529],[116.970652,40.063805],[116.973476,40.066304],[116.978599,40.064893],[116.980816,40.071188],[116.982844,40.070685],[116.986274,40.078359],[116.981192,40.08149],[116.981862,40.089828],[116.979938,40.093867],[116.975462,40.095051],[116.967976,40.101214],[116.973329,40.103712],[116.976069,40.111188],[116.971301,40.114009],[116.969189,40.118776],[116.971594,40.124224],[116.96578,40.127823],[116.967829,40.129849],[116.970025,40.140321],[116.977763,40.151374],[116.972054,40.156301],[116.968749,40.163495],[116.961242,40.171937],[116.962037,40.175549],[116.951371,40.174788],[116.945349,40.1813],[116.945809,40.186224],[116.94997,40.186354],[116.945913,40.193141],[116.939556,40.192347],[116.930898,40.207084],[116.929685,40.211585],[116.938029,40.210549],[116.940978,40.223922],[116.935206,40.229847],[116.931065,40.230624],[116.92544,40.225768],[116.922031,40.220134],[116.915507,40.222271],[116.913917,40.220118],[116.908606,40.222401],[116.906598,40.228682],[116.900701,40.228763],[116.893946,40.233457],[116.901746,40.23684],[116.894343,40.240028],[116.892252,40.245709],[116.886585,40.251907],[116.886104,40.255256],[116.881273,40.259221],[116.879893,40.264139],[116.874247,40.268281],[116.876338,40.274348],[116.871737,40.281481],[116.871319,40.290943],[116.859462,40.290878],[116.857182,40.2929],[116.854547,40.303152],[116.848984,40.311204],[116.838382,40.310185],[116.828992,40.304413],[116.830101,40.299206],[116.827215,40.298333],[116.82458,40.290991],[116.825123,40.285347],[116.811823,40.282387],[116.809607,40.28601],[116.800572,40.289196],[116.794487,40.287417],[116.788025,40.289439],[116.787795,40.281449],[116.784073,40.279443],[116.782964,40.273248],[116.773512,40.269527],[116.771651,40.266501],[116.768597,40.270109],[116.762658,40.269058],[116.752788,40.275512],[116.74298,40.279087],[116.738337,40.278764],[116.741098,40.283001],[116.738965,40.284101],[116.738421,40.284392],[116.710837,40.256227],[116.704668,40.257101],[116.704585,40.251551],[116.696554,40.248072],[116.697265,40.243216],[116.69072,40.240886],[116.684007,40.234282],[116.678131,40.234379],[116.676311,40.238604],[116.670247,40.234865],[116.668783,40.238539],[116.673321,40.246777],[116.669494,40.253153],[116.666901,40.262085],[116.648519,40.260143],[116.643081,40.25715],[116.641492,40.259463],[116.637038,40.25846],[116.63526,40.261454],[116.623654,40.26058],[116.6238,40.252667],[116.622044,40.250467],[116.61324,40.251761],[116.603787,40.251324],[116.604624,40.256146],[116.600755,40.258978],[116.599647,40.265385],[116.590842,40.264139],[116.588396,40.269462],[116.585238,40.266226],[116.58254,40.268362],[116.570202,40.268863],[116.570516,40.273102],[116.565371,40.273377],[116.566187,40.27802],[116.552176,40.27383],[116.546236,40.276224],[116.540904,40.274946],[116.53693,40.277178],[116.540088,40.267165],[116.535717,40.261373],[116.526181,40.261324],[116.523965,40.257522],[116.509201,40.258056],[116.505959,40.261356],[116.503011,40.25969],[116.501024,40.251599],[116.493705,40.251179],[116.482098,40.245385],[116.481094,40.238248],[116.483771,40.225185],[116.477979,40.225201],[116.473712,40.221203],[116.472249,40.205092],[116.484503,40.196493],[116.488016,40.191796],[116.487975,40.184686],[116.490129,40.181316],[116.485151,40.176764],[116.483332,40.171742],[116.480802,40.171937],[116.476912,40.163576],[116.477916,40.159979],[116.484629,40.160465],[116.492303,40.156981],[116.490777,40.148992],[116.480781,40.14742],[116.482307,40.140629],[116.484754,40.140078],[116.487222,40.124678],[116.492199,40.111561],[116.489292,40.101668],[116.480885,40.096965],[116.473357,40.097516],[116.466498,40.094954],[116.466832,40.090185],[116.471015,40.08939],[116.473545,40.085562],[116.482935,40.083745],[116.486657,40.081036],[116.49933,40.080387],[116.506775,40.074352],[116.513948,40.070426],[116.525993,40.071334],[116.534379,40.066791],[116.543183,40.059408],[116.547784,40.062718],[116.551757,40.059765],[116.578149,40.076461],[116.574322,40.096138],[116.574071,40.107815],[116.578316,40.102739],[116.580365,40.088352],[116.595903,40.090218],[116.598705,40.09351],[116.598392,40.103874],[116.602909,40.093883],[116.603473,40.086811],[116.608409,40.054912],[116.603683,40.052949],[116.610061,40.031214],[116.614055,40.03175],[116.614139,40.028178],[116.619388,40.026733],[116.620099,40.022512],[116.624239,40.023664],[116.627063,40.021505],[116.633504,40.023664],[116.636159,40.019703],[116.651195,40.025759],[116.651676,40.021911],[116.655629,40.018566],[116.660125,40.021651],[116.664705,40.019037],[116.668615,40.013938],[116.678465,40.015058],[116.683777,40.014458],[116.686286,40.00827],[116.688378,40.00918],[116.685575,40.016569],[116.697244,40.016098],[116.703936,40.020141],[116.708621,40.026587],[116.716337,40.023762],[116.717383,40.019605],[116.719725,40.022512],[116.724221,40.021278],[116.724828,40.024265],[116.732043,40.022219],[116.732335,40.025109],[116.737145,40.02761],[116.747058,40.025385],[116.747037,40.021976],[116.751763,40.019962],[116.75329,40.015919],[116.764791,40.016049],[116.771755,40.014474]]],[[[116.578149,40.076461],[116.551757,40.059765],[116.552761,40.05488],[116.54655,40.048956],[116.550753,40.045499],[116.564242,40.039655],[116.570474,40.032431],[116.578797,40.033097],[116.577814,40.027512],[116.595548,40.01751],[116.600839,40.018858],[116.602762,40.028503],[116.610061,40.031214],[116.603683,40.052949],[116.598517,40.052543],[116.601633,40.047658],[116.599417,40.047171],[116.599814,40.041408],[116.591993,40.043129],[116.591198,40.051796],[116.587957,40.05053],[116.590131,40.056162],[116.586597,40.074336],[116.58139,40.073817],[116.581411,40.067846],[116.578149,40.076461]]]]}},{"type":"Feature","properties":{"adcode":110114,"name":"昌平区","center":[116.235906,40.218085],"centroid":[116.210616,40.215484],"childrenNum":0,"level":"district","parent":{"adcode":110000},"subFeatureIndex":10,"acroutes":[100000,110000]},"geometry":{"type":"MultiPolygon","coordinates":[[[[116.390649,40.041279],[116.39297,40.041733],[116.395333,40.036766],[116.405266,40.038974],[116.408884,40.043291],[116.406124,40.049768],[116.409595,40.055626],[116.415618,40.056],[116.433268,40.06228],[116.442867,40.061323],[116.451629,40.058759],[116.45142,40.06129],[116.459408,40.059992],[116.462127,40.06731],[116.458635,40.070377],[116.458823,40.075796],[116.462608,40.076786],[116.461855,40.080825],[116.466247,40.08235],[116.466832,40.090185],[116.466498,40.094954],[116.473357,40.097516],[116.480885,40.096965],[116.489292,40.101668],[116.492199,40.111561],[116.487222,40.124678],[116.484754,40.140078],[116.482307,40.140629],[116.480781,40.14742],[116.490777,40.148992],[116.492303,40.156981],[116.484629,40.160465],[116.477916,40.159979],[116.476912,40.163576],[116.480802,40.171937],[116.483332,40.171742],[116.485151,40.176764],[116.490129,40.181316],[116.487975,40.184686],[116.488016,40.191796],[116.484503,40.196493],[116.472249,40.205092],[116.473712,40.221203],[116.477979,40.225201],[116.483771,40.225185],[116.481094,40.238248],[116.482098,40.245385],[116.493705,40.251179],[116.501024,40.251599],[116.503011,40.25969],[116.505959,40.261356],[116.501839,40.262974],[116.493245,40.262489],[116.484273,40.267634],[116.484001,40.2759],[116.478794,40.280025],[116.472081,40.280122],[116.469634,40.283001],[116.460308,40.28711],[116.45533,40.284845],[116.449412,40.286722],[116.45096,40.293045],[116.448011,40.300484],[116.443766,40.302457],[116.44822,40.305982],[116.455184,40.316345],[116.449182,40.32113],[116.443745,40.322682],[116.438245,40.333221],[116.43423,40.329116],[116.427914,40.329213],[116.424359,40.331265],[116.417061,40.329843],[116.408989,40.333205],[116.408633,40.334886],[116.396358,40.334853],[116.391422,40.338393],[116.384563,40.339055],[116.375069,40.337375],[116.376135,40.334352],[116.365909,40.331702],[116.368231,40.334805],[116.369903,40.342401],[116.364508,40.349107],[116.367101,40.350351],[116.369673,40.356362],[116.363923,40.359028],[116.355641,40.356814],[116.348866,40.356427],[116.352797,40.364391],[116.357356,40.364084],[116.360033,40.366815],[116.355369,40.37137],[116.34506,40.373163],[116.337364,40.379769],[116.32398,40.387295],[116.32078,40.386859],[116.313106,40.389459],[116.302691,40.387473],[116.295581,40.384437],[116.293762,40.392415],[116.289872,40.391672],[116.290729,40.383177],[116.282845,40.375263],[116.270863,40.382693],[116.261264,40.380561],[116.258336,40.383193],[116.25338,40.381239],[116.252104,40.376297],[116.247796,40.374471],[116.24353,40.379818],[116.241962,40.377508],[116.23665,40.377427],[116.23184,40.374988],[116.226989,40.38111],[116.222221,40.382111],[116.211451,40.381756],[116.209129,40.376232],[116.192985,40.372775],[116.180354,40.367687],[116.177154,40.370934],[116.170713,40.369351],[116.168789,40.366718],[116.159295,40.366265],[116.148233,40.361807],[116.148651,40.35696],[116.145514,40.351046],[116.1507,40.349252],[116.155677,40.344906],[116.152603,40.337714],[116.144719,40.336631],[116.147543,40.340655],[116.144782,40.348541],[116.138404,40.345229],[116.140809,40.343047],[116.137567,40.340769],[116.137651,40.336534],[116.143904,40.336082],[116.13809,40.330974],[116.138383,40.324671],[116.141959,40.316879],[116.132737,40.31198],[116.122385,40.312805],[116.116237,40.321955],[116.116634,40.323668],[116.110381,40.330813],[116.102978,40.331524],[116.098649,40.330005],[116.086353,40.330813],[116.083342,40.33571],[116.077716,40.339346],[116.073429,40.339831],[116.06841,40.336971],[116.061802,40.336809],[116.053353,40.326853],[116.056971,40.322181],[116.051116,40.315812],[116.042479,40.316846],[116.040095,40.312724],[116.031144,40.312352],[116.026167,40.320484],[116.026481,40.324283],[116.01684,40.33466],[116.007597,40.33314],[115.999065,40.325463],[115.993398,40.328986],[115.982711,40.324202],[115.979658,40.320532],[115.973259,40.318997],[115.976417,40.311511],[115.975538,40.308698],[115.987919,40.303799],[115.990323,40.299498],[115.982732,40.297977],[115.978675,40.289633],[115.981227,40.28525],[115.978822,40.281627],[115.981812,40.276903],[115.976396,40.270983],[115.967006,40.265612],[115.968888,40.264269],[115.965605,40.259415],[115.960001,40.256648],[115.950276,40.256163],[115.942706,40.253557],[115.935826,40.25558],[115.916984,40.247068],[115.916628,40.242391],[115.911965,40.234477],[115.906695,40.23412],[115.898079,40.236419],[115.898476,40.234509],[115.891994,40.228147],[115.891366,40.225379],[115.883106,40.216119],[115.885072,40.212039],[115.883169,40.209594],[115.886326,40.206663],[115.877313,40.200849],[115.87633,40.193918],[115.873695,40.192687],[115.870308,40.186079],[115.863072,40.186095],[115.855502,40.188865],[115.848099,40.183843],[115.854205,40.179939],[115.846865,40.169458],[115.844418,40.168016],[115.84676,40.163171],[115.853557,40.154162],[115.853348,40.149332],[115.856547,40.147468],[115.865184,40.148635],[115.870768,40.144276],[115.874155,40.14387],[115.8816,40.139073],[115.900442,40.138716],[115.904457,40.136123],[115.906549,40.138181],[115.921438,40.134485],[115.933588,40.124824],[115.947913,40.107409],[115.943229,40.103339],[115.952681,40.10102],[115.956717,40.096041],[115.957449,40.100679],[115.962552,40.10235],[115.962092,40.094419],[115.960461,40.092456],[115.966588,40.084556],[115.968575,40.075488],[115.977232,40.079041],[115.979993,40.081669],[115.986434,40.083469],[115.99735,40.082074],[116.005129,40.079803],[116.007785,40.080614],[116.020856,40.074579],[116.030914,40.082188],[116.033926,40.079657],[116.037899,40.084524],[116.043775,40.083502],[116.048878,40.085303],[116.051848,40.091661],[116.055905,40.09643],[116.061969,40.09956],[116.062931,40.10282],[116.069456,40.104912],[116.072676,40.109258],[116.073847,40.115436],[116.077883,40.115047],[116.08445,40.120252],[116.089783,40.119327],[116.096056,40.121257],[116.102246,40.115987],[116.105864,40.118014],[116.113309,40.115598],[116.127676,40.116393],[116.132214,40.115079],[116.132925,40.121354],[116.152708,40.121776],[116.169563,40.124564],[116.167409,40.128455],[116.17178,40.127936],[116.168622,40.135442],[116.167681,40.141844],[116.174122,40.143595],[116.180417,40.14729],[116.183094,40.153335],[116.182696,40.158099],[116.192065,40.155669],[116.194282,40.160076],[116.202166,40.160984],[116.203211,40.153773],[116.205658,40.150175],[116.206285,40.143092],[116.212224,40.140548],[116.215445,40.143174],[116.233785,40.136577],[116.247043,40.136204],[116.245036,40.118825],[116.241836,40.118403],[116.243363,40.113279],[116.240498,40.108009],[116.245956,40.10535],[116.252732,40.106517],[116.255868,40.104474],[116.25957,40.106907],[116.258022,40.11195],[116.263334,40.110588],[116.263899,40.10402],[116.258273,40.101522],[116.265237,40.094694],[116.27333,40.09557],[116.2731,40.092699],[116.279897,40.079754],[116.290353,40.083145],[116.302942,40.060803],[116.305995,40.063043],[116.309446,40.060609],[116.318292,40.061663],[116.325946,40.054799],[116.331801,40.057168],[116.330756,40.063383],[116.338828,40.058921],[116.340271,40.055091],[116.343366,40.055448],[116.342676,40.059635],[116.346963,40.06043],[116.34667,40.063659],[116.357293,40.066012],[116.363023,40.065931],[116.363149,40.068965],[116.372538,40.06843],[116.373354,40.065623],[116.381928,40.066402],[116.382848,40.061582],[116.379272,40.059002],[116.372267,40.05785],[116.372999,40.054344],[116.367394,40.053436],[116.36959,40.04696],[116.376114,40.045466],[116.376888,40.042756],[116.38519,40.042853],[116.390649,40.041279]]]]}},{"type":"Feature","properties":{"adcode":110115,"name":"大兴区","center":[116.338033,39.728908],"centroid":[116.418968,39.647838],"childrenNum":0,"level":"district","parent":{"adcode":110000},"subFeatureIndex":11,"acroutes":[100000,110000]},"geometry":{"type":"MultiPolygon","coordinates":[[[[116.725518,39.624075],[116.721398,39.629415],[116.723489,39.639033],[116.716003,39.640356],[116.710419,39.639686],[116.70609,39.642903],[116.702891,39.649923],[116.702138,39.657644],[116.704857,39.667192],[116.703769,39.674145],[116.693543,39.674944],[116.692706,39.676789],[116.685554,39.676886],[116.680786,39.674896],[116.675203,39.676234],[116.668574,39.674602],[116.666022,39.679693],[116.669577,39.683642],[116.666566,39.687101],[116.65818,39.68857],[116.658097,39.686155],[116.651321,39.687868],[116.651509,39.694459],[116.647097,39.694786],[116.64626,39.700447],[116.647912,39.703579],[116.653098,39.703823],[116.652994,39.708619],[116.644587,39.709647],[116.638502,39.717166],[116.637623,39.723934],[116.631203,39.722971],[116.628129,39.727749],[116.621646,39.728076],[116.621876,39.725825],[116.616251,39.725581],[116.609141,39.719367],[116.604561,39.718731],[116.604017,39.714752],[116.598371,39.711963],[116.590194,39.711522],[116.590152,39.713349],[116.581202,39.712517],[116.579884,39.710234],[116.573464,39.709125],[116.573276,39.714507],[116.544961,39.715045],[116.535676,39.711881],[116.530552,39.713268],[116.53256,39.71529],[116.527332,39.716578],[116.52936,39.719808],[116.534609,39.718079],[116.536972,39.72152],[116.53783,39.728043],[116.531849,39.730016],[116.532413,39.73962],[116.537997,39.738071],[116.53624,39.740663],[116.527562,39.743304],[116.531159,39.747559],[116.523003,39.749678],[116.525178,39.762392],[116.520075,39.765782],[116.52363,39.769922],[116.528294,39.761463],[116.540423,39.761072],[116.539879,39.766255],[116.536491,39.768406],[116.545797,39.768732],[116.544647,39.772301],[116.536136,39.769873],[116.530092,39.778836],[116.538081,39.78128],[116.532894,39.786542],[116.530929,39.79174],[116.537537,39.796676],[116.535111,39.800146],[116.541678,39.803159],[116.540527,39.811857],[116.533375,39.819658],[116.539586,39.821563],[116.534944,39.82482],[116.525868,39.826904],[116.525366,39.829754],[116.516164,39.829835],[116.510602,39.827637],[116.510142,39.821449],[116.502801,39.819006],[116.505813,39.817866],[116.498201,39.8157],[116.495357,39.818795],[116.485632,39.816889],[116.485256,39.81272],[116.474256,39.809772],[116.468463,39.814511],[116.462775,39.815945],[116.452737,39.823012],[116.443912,39.82096],[116.44592,39.826692],[116.436677,39.827425],[116.43699,39.830649],[116.430068,39.830112],[116.425217,39.831903],[116.420072,39.826611],[116.415785,39.829428],[116.414426,39.824282],[116.418441,39.822915],[116.419759,39.815375],[116.41016,39.817052],[116.410013,39.811336],[116.415262,39.812525],[116.417772,39.81013],[116.422456,39.81044],[116.425719,39.805358],[116.429399,39.803583],[116.429274,39.794102],[116.421034,39.794134],[116.42024,39.787439],[116.396023,39.786738],[116.397905,39.781068],[116.398888,39.765864],[116.391903,39.765277],[116.390649,39.780465],[116.385609,39.778852],[116.379209,39.77939],[116.378478,39.785646],[116.367582,39.784962],[116.365742,39.794151],[116.368189,39.794819],[116.367039,39.79982],[116.356833,39.800471],[116.355704,39.805668],[116.341755,39.807589],[116.340124,39.802149],[116.328225,39.801416],[116.326824,39.798386],[116.322872,39.798386],[116.321784,39.783626],[116.317978,39.783447],[116.31068,39.772057],[116.307062,39.770085],[116.301541,39.774941],[116.295205,39.790958],[116.291148,39.793271],[116.296083,39.795568],[116.289182,39.795894],[116.287237,39.799103],[116.27423,39.796936],[116.262184,39.792782],[116.259298,39.797621],[116.251519,39.793059],[116.251602,39.782518],[116.253777,39.77952],[116.252481,39.771747],[116.254426,39.76324],[116.252481,39.758676],[116.251895,39.749092],[116.243948,39.741658],[116.248026,39.732641],[116.248466,39.728027],[116.245768,39.72408],[116.245036,39.718421],[116.236629,39.71286],[116.231945,39.706025],[116.23435,39.703823],[116.230941,39.692355],[116.221238,39.678453],[116.22565,39.67359],[116.221342,39.667486],[116.223162,39.664728],[116.216992,39.651572],[116.215487,39.64305],[116.218875,39.628011],[116.219502,39.618931],[116.21808,39.608102],[116.223141,39.597222],[116.222597,39.593938],[116.226089,39.591993],[116.225085,39.584085],[116.221175,39.578921],[116.225817,39.568151],[116.229373,39.565471],[116.236462,39.568396],[116.234684,39.563934],[116.240644,39.564098],[116.243007,39.55836],[116.246186,39.557167],[116.242505,39.552966],[116.246521,39.539788],[116.245601,39.53014],[116.248256,39.530271],[116.246479,39.525299],[116.24353,39.524236],[116.246709,39.520098],[116.245831,39.514897],[116.253861,39.510055],[116.25706,39.505491],[116.257939,39.500518],[116.269315,39.495495],[116.275631,39.495201],[116.279269,39.491306],[116.283201,39.493941],[116.305284,39.489179],[116.306957,39.485023],[116.312708,39.480556],[116.314779,39.476104],[116.319944,39.473436],[116.320048,39.468543],[116.325088,39.466153],[116.325611,39.462961],[116.334499,39.457019],[116.350162,39.45291],[116.351124,39.455529],[116.362187,39.454874],[116.367791,39.451633],[116.373563,39.452058],[116.388557,39.450732],[116.391903,39.452893],[116.399787,39.450044],[116.408947,39.450257],[116.425635,39.446885],[116.434397,39.442758],[116.437241,39.445951],[116.450353,39.448522],[116.450667,39.452648],[116.454682,39.453302],[116.453992,39.45751],[116.448638,39.465122],[116.448764,39.476284],[116.444059,39.47887],[116.444142,39.482192],[116.436258,39.482912],[116.433644,39.478183],[116.428333,39.476219],[116.425342,39.481259],[116.429964,39.481325],[116.427329,39.487788],[116.423544,39.485154],[116.412376,39.482077],[116.411582,39.485105],[116.415827,39.48823],[116.418504,39.496575],[116.422895,39.496608],[116.418734,39.506391],[116.40857,39.508011],[116.407253,39.512116],[116.40282,39.51439],[116.402652,39.526886],[116.405538,39.528194],[116.411247,39.524678],[116.421473,39.525103],[116.424046,39.522732],[116.423125,39.516337],[116.424631,39.509728],[116.431699,39.51053],[116.433017,39.507438],[116.443829,39.509875],[116.442741,39.516189],[116.440378,39.516271],[116.439876,39.523353],[116.437513,39.52651],[116.440985,39.527311],[116.45372,39.526477],[116.453846,39.528652],[116.464553,39.527638],[116.464595,39.531628],[116.468819,39.534359],[116.478188,39.535487],[116.47802,39.543205],[116.475134,39.545756],[116.470952,39.5546],[116.473378,39.553096],[116.48948,39.553472],[116.489773,39.550268],[116.508448,39.551053],[116.50805,39.560256],[116.510581,39.560502],[116.511564,39.565503],[116.519385,39.566484],[116.520389,39.57191],[116.527248,39.57294],[116.52614,39.577271],[116.520389,39.577156],[116.519699,39.581863],[116.52317,39.586242],[116.521267,39.590229],[116.525052,39.593807],[116.524446,39.596535],[116.530615,39.598774],[116.530866,39.596715],[116.541803,39.59348],[116.540883,39.60142],[116.544124,39.603609],[116.544187,39.596519],[116.549436,39.596143],[116.557132,39.601502],[116.562276,39.601714],[116.566605,39.604361],[116.566103,39.61114],[116.569637,39.61176],[116.565978,39.616138],[116.565936,39.61978],[116.579382,39.619666],[116.579194,39.623487],[116.591993,39.621299],[116.593561,39.618588],[116.600128,39.619649],[116.602177,39.624533],[116.607886,39.624696],[116.607781,39.619698],[116.611755,39.618882],[116.613177,39.613802],[116.616648,39.614096],[116.616857,39.607301],[116.620182,39.606893],[116.620517,39.601665],[116.628338,39.599558],[116.635407,39.599934],[116.635595,39.604818],[116.645549,39.60209],[116.646532,39.599117],[116.657678,39.60075],[116.6568,39.602776],[116.662384,39.60521],[116.670037,39.604916],[116.669975,39.603381],[116.6889,39.598496],[116.694087,39.601355],[116.696408,39.595392],[116.699127,39.595457],[116.700695,39.590964],[116.705108,39.587974],[116.727065,39.593055],[116.724953,39.598006],[116.718324,39.601077],[116.718282,39.603021],[116.702577,39.610421],[116.700737,39.62107],[116.705338,39.621462],[116.70929,39.618114],[116.716149,39.62156],[116.721858,39.621756],[116.725518,39.624075]]]]}},{"type":"Feature","properties":{"adcode":110116,"name":"怀柔区","center":[116.637122,40.324272],"centroid":[116.586079,40.63069],"childrenNum":0,"level":"district","parent":{"adcode":110000},"subFeatureIndex":12,"acroutes":[100000,110000]},"geometry":{"type":"MultiPolygon","coordinates":[[[[116.289872,40.391672],[116.293762,40.392415],[116.295581,40.384437],[116.302691,40.387473],[116.313106,40.389459],[116.32078,40.386859],[116.32398,40.387295],[116.337364,40.379769],[116.34506,40.373163],[116.355369,40.37137],[116.360033,40.366815],[116.357356,40.364084],[116.352797,40.364391],[116.348866,40.356427],[116.355641,40.356814],[116.363923,40.359028],[116.369673,40.356362],[116.367101,40.350351],[116.364508,40.349107],[116.369903,40.342401],[116.368231,40.334805],[116.365909,40.331702],[116.376135,40.334352],[116.375069,40.337375],[116.384563,40.339055],[116.391422,40.338393],[116.396358,40.334853],[116.408633,40.334886],[116.408989,40.333205],[116.417061,40.329843],[116.424359,40.331265],[116.427914,40.329213],[116.43423,40.329116],[116.438245,40.333221],[116.443745,40.322682],[116.449182,40.32113],[116.455184,40.316345],[116.44822,40.305982],[116.443766,40.302457],[116.448011,40.300484],[116.45096,40.293045],[116.449412,40.286722],[116.45533,40.284845],[116.460308,40.28711],[116.469634,40.283001],[116.472081,40.280122],[116.478794,40.280025],[116.484001,40.2759],[116.484273,40.267634],[116.493245,40.262489],[116.501839,40.262974],[116.505959,40.261356],[116.509201,40.258056],[116.523965,40.257522],[116.526181,40.261324],[116.535717,40.261373],[116.540088,40.267165],[116.53693,40.277178],[116.540904,40.274946],[116.546236,40.276224],[116.552176,40.27383],[116.566187,40.27802],[116.565371,40.273377],[116.570516,40.273102],[116.570202,40.268863],[116.58254,40.268362],[116.585238,40.266226],[116.588396,40.269462],[116.590842,40.264139],[116.599647,40.265385],[116.600755,40.258978],[116.604624,40.256146],[116.603787,40.251324],[116.61324,40.251761],[116.622044,40.250467],[116.6238,40.252667],[116.623654,40.26058],[116.63526,40.261454],[116.637038,40.25846],[116.641492,40.259463],[116.643081,40.25715],[116.648519,40.260143],[116.666901,40.262085],[116.669494,40.253153],[116.673321,40.246777],[116.668783,40.238539],[116.670247,40.234865],[116.676311,40.238604],[116.678131,40.234379],[116.684007,40.234282],[116.69072,40.240886],[116.697265,40.243216],[116.696554,40.248072],[116.704585,40.251551],[116.704668,40.257101],[116.710837,40.256227],[116.738421,40.284392],[116.738965,40.284101],[116.754461,40.303686],[116.756845,40.302586],[116.762888,40.310428],[116.773324,40.315973],[116.768639,40.317816],[116.762846,40.326707],[116.759689,40.326853],[116.758559,40.333884],[116.751491,40.335742],[116.744653,40.333706],[116.744046,40.339136],[116.73129,40.335031],[116.731185,40.339023],[116.722967,40.339152],[116.723887,40.344033],[116.727484,40.346522],[116.729031,40.355619],[116.725769,40.355619],[116.726773,40.361193],[116.718094,40.361338],[116.719872,40.369044],[116.714079,40.368608],[116.706509,40.373809],[116.707115,40.377007],[116.716254,40.384114],[116.711716,40.386908],[116.713849,40.395806],[116.713242,40.40157],[116.718512,40.402055],[116.723427,40.405316],[116.724389,40.409191],[116.728801,40.40982],[116.741139,40.414631],[116.733235,40.418312],[116.73244,40.420604],[116.72556,40.418053],[116.722339,40.423832],[116.723552,40.435065],[116.716421,40.441714],[116.72098,40.440988],[116.725811,40.443085],[116.719265,40.448636],[116.7196,40.455735],[116.723594,40.458542],[116.719223,40.460397],[116.716902,40.457074],[116.706174,40.459929],[116.698667,40.468043],[116.695571,40.466721],[116.693397,40.476108],[116.69348,40.481704],[116.704334,40.479043],[116.694149,40.485462],[116.693376,40.490783],[116.698353,40.493266],[116.699106,40.50444],[116.701071,40.510549],[116.711402,40.516465],[116.712239,40.522058],[116.717216,40.524798],[116.712573,40.529955],[116.706948,40.532582],[116.701469,40.539913],[116.702138,40.545456],[116.690699,40.549468],[116.68225,40.548904],[116.67698,40.554462],[116.665771,40.552432],[116.66872,40.557507],[116.682397,40.556766],[116.679636,40.562001],[116.686349,40.564497],[116.699336,40.563563],[116.709855,40.565512],[116.710503,40.568685],[116.71456,40.570682],[116.714351,40.58028],[116.708955,40.590054],[116.711611,40.59189],[116.708495,40.595206],[116.711235,40.600213],[116.705609,40.60303],[116.707993,40.606507],[116.70655,40.610998],[116.702598,40.612785],[116.697955,40.618402],[116.701322,40.621379],[116.704689,40.620076],[116.705128,40.626947],[116.70195,40.628444],[116.70149,40.632917],[116.712197,40.641268],[116.711151,40.648218],[116.712636,40.653896],[116.709855,40.662598],[116.714309,40.666104],[116.713221,40.669867],[116.714915,40.680014],[116.725413,40.68466],[116.725581,40.689114],[116.735807,40.69167],[116.74252,40.69593],[116.747518,40.697072],[116.748668,40.700544],[116.754963,40.702891],[116.756155,40.705687],[116.762867,40.706427],[116.769246,40.70281],[116.783989,40.700496],[116.787105,40.704482],[116.786687,40.7103],[116.789091,40.712454],[116.790472,40.728973],[116.786352,40.736026],[116.782818,40.747817],[116.780727,40.751512],[116.783759,40.757631],[116.793629,40.748267],[116.802977,40.745986],[116.810527,40.749118],[116.818662,40.75042],[116.826211,40.749343],[116.831795,40.751303],[116.840076,40.760682],[116.834785,40.770221],[116.850448,40.775006],[116.851264,40.778924],[116.856806,40.77955],[116.858039,40.78305],[116.867471,40.784559],[116.862577,40.792858],[116.871277,40.794785],[116.873326,40.798781],[116.878575,40.797545],[116.886961,40.801076],[116.880207,40.804367],[116.882172,40.814172],[116.876735,40.818456],[116.876171,40.8212],[116.870378,40.821601],[116.861448,40.825356],[116.860633,40.830457],[116.855425,40.835447],[116.848587,40.837147],[116.84819,40.839313],[116.839741,40.839024],[116.837775,40.841542],[116.831815,40.842585],[116.828009,40.841109],[116.823471,40.842681],[116.820732,40.848263],[116.813622,40.848423],[116.805947,40.840836],[116.802496,40.842392],[116.802413,40.851198],[116.796996,40.854886],[116.797226,40.860034],[116.776795,40.878376],[116.772362,40.87852],[116.769392,40.882961],[116.762135,40.880765],[116.758539,40.881983],[116.759501,40.889854],[116.750257,40.891665],[116.739759,40.896665],[116.730432,40.897771],[116.726145,40.901185],[116.723678,40.906313],[116.716881,40.910175],[116.713347,40.910431],[116.717111,40.921695],[116.722318,40.92743],[116.713891,40.929416],[116.712197,40.934846],[116.70722,40.934029],[116.702786,40.936512],[116.702368,40.940628],[116.696178,40.94452],[116.689298,40.951118],[116.687248,40.962551],[116.677921,40.970972],[116.677921,40.975983],[116.681267,40.980737],[116.685304,40.982641],[116.682543,40.986259],[116.683066,41.000486],[116.69095,41.007254],[116.690866,41.012982],[116.693836,41.013686],[116.698855,41.021253],[116.695739,41.025396],[116.69509,41.033265],[116.691347,41.037503],[116.692246,41.040813],[116.688629,41.044651],[116.682878,41.041789],[116.67698,41.042732],[116.673279,41.046378],[116.665207,41.046682],[116.657009,41.051303],[116.653914,41.05626],[116.647431,41.059393],[116.641158,41.058322],[116.637937,41.060497],[116.630848,41.0608],[116.624093,41.054437],[116.61646,41.053382],[116.617736,41.048649],[116.613491,41.040782],[116.614118,41.036096],[116.617589,41.034704],[116.621228,41.028978],[116.62288,41.020693],[116.621897,41.015749],[116.619179,41.01423],[116.614892,41.003574],[116.617067,40.998725],[116.614515,40.983314],[116.597764,40.97475],[116.589692,40.976703],[116.574928,40.986307],[116.569177,40.991636],[116.561231,40.993461],[116.558617,40.988627],[116.547826,40.988003],[116.541991,40.99026],[116.535634,40.988675],[116.533417,40.985698],[116.524718,40.981073],[116.519573,40.981569],[116.51629,40.975198],[116.504516,40.975919],[116.496737,40.978432],[116.493726,40.977919],[116.485612,40.982465],[116.47894,40.979104],[116.474193,40.978608],[116.464135,40.984498],[116.455519,40.980481],[116.451713,40.968667],[116.453302,40.964584],[116.447446,40.95384],[116.454829,40.949533],[116.455372,40.945433],[116.462315,40.935231],[116.461541,40.932684],[116.467209,40.931322],[116.468422,40.925091],[116.473608,40.91974],[116.477581,40.901746],[116.474047,40.896008],[116.464344,40.896329],[116.458676,40.900592],[116.45073,40.901345],[116.448492,40.899919],[116.436614,40.89939],[116.430905,40.903364],[116.418922,40.902339],[116.413715,40.899758],[116.404764,40.905736],[116.398533,40.906024],[116.396316,40.911264],[116.39274,40.913123],[116.384877,40.922848],[116.384019,40.928535],[116.379732,40.933228],[116.379941,40.935775],[116.370343,40.943655],[116.364801,40.942999],[116.358925,40.93608],[116.35012,40.936048],[116.339894,40.929416],[116.338828,40.925732],[116.334122,40.920829],[116.33544,40.910495],[116.334436,40.90463],[116.342236,40.899887],[116.344683,40.894694],[116.353864,40.887786],[116.360514,40.884885],[116.365972,40.880188],[116.366599,40.876645],[116.374881,40.871531],[116.38174,40.863465],[116.389707,40.861814],[116.391778,40.854838],[116.399306,40.850492],[116.406145,40.837933],[116.406458,40.833361],[116.414991,40.829318],[116.422477,40.822772],[116.436823,40.820735],[116.439897,40.815038],[116.440002,40.809133],[116.450981,40.801927],[116.452152,40.798059],[116.457233,40.7983],[116.461416,40.78854],[116.460663,40.78244],[116.465849,40.774525],[116.465452,40.772742],[116.471517,40.771233],[116.4803,40.771586],[116.485193,40.765179],[116.491404,40.7633],[116.495482,40.759735],[116.50025,40.760811],[116.502906,40.756635],[116.501819,40.746581],[116.506461,40.743432],[116.513697,40.741456],[116.509493,40.73548],[116.510748,40.72645],[116.506858,40.720039],[116.504119,40.720135],[116.503115,40.715893],[116.506064,40.710879],[116.501923,40.706796],[116.501066,40.70228],[116.502676,40.697361],[116.496653,40.696879],[116.488811,40.69196],[116.483374,40.679403],[116.487138,40.674338],[116.492826,40.673984],[116.501568,40.671186],[116.505938,40.673067],[116.513488,40.672344],[116.517273,40.665734],[116.520096,40.66411],[116.518381,40.660925],[116.527039,40.6584],[116.529507,40.654588],[116.540046,40.656679],[116.544103,40.653767],[116.545023,40.650116],[116.550335,40.647606],[116.551151,40.642828],[116.55389,40.642877],[116.563886,40.636908],[116.573903,40.63628],[116.574092,40.631678],[116.568989,40.625483],[116.561231,40.628557],[116.551674,40.625209],[116.545003,40.627076],[116.539294,40.625612],[116.538938,40.619673],[116.535634,40.615698],[116.532915,40.606459],[116.535948,40.59944],[116.530929,40.595883],[116.531577,40.59131],[116.525136,40.583002],[116.517796,40.579749],[116.513153,40.572792],[116.509577,40.57276],[116.505144,40.562581],[116.499999,40.560921],[116.496277,40.555106],[116.484587,40.552867],[116.479651,40.541396],[116.470617,40.535418],[116.467125,40.530068],[116.460956,40.524363],[116.46587,40.518802],[116.470345,40.518963],[116.476306,40.514192],[116.488581,40.515853],[116.492073,40.518093],[116.497762,40.518093],[116.500459,40.510904],[116.506398,40.508212],[116.51194,40.501135],[116.519155,40.496604],[116.519092,40.491799],[116.511543,40.486929],[116.508322,40.483172],[116.492157,40.481027],[116.487347,40.481737],[116.483541,40.484994],[116.468212,40.48493],[116.465577,40.48701],[116.457903,40.488445],[116.455937,40.480914],[116.443201,40.481801],[116.433142,40.478189],[116.420971,40.480301],[116.416664,40.483011],[116.413673,40.481527],[116.4065,40.481995],[116.393702,40.47256],[116.38609,40.475802],[116.387344,40.482043],[116.376825,40.485736],[116.378603,40.491525],[116.377537,40.49683],[116.369632,40.500312],[116.365909,40.499635],[116.357042,40.501941],[116.348636,40.499071],[116.34232,40.500457],[116.336653,40.498636],[116.330567,40.500748],[116.323227,40.500151],[116.31321,40.491799],[116.31022,40.491702],[116.303779,40.485817],[116.29717,40.486768],[116.291691,40.485317],[116.294786,40.47535],[116.301646,40.468108],[116.306853,40.466092],[116.300955,40.458429],[116.293824,40.452831],[116.294368,40.449975],[116.289788,40.440907],[116.290667,40.435856],[116.294452,40.429304],[116.296648,40.420701],[116.291942,40.416617],[116.289433,40.418021],[116.288513,40.413437],[116.291608,40.408448],[116.287864,40.404719],[116.289746,40.402539],[116.286003,40.396032],[116.289872,40.391672]]]]}},{"type":"Feature","properties":{"adcode":110117,"name":"平谷区","center":[117.112335,40.144783],"centroid":[117.145392,40.208997],"childrenNum":0,"level":"district","parent":{"adcode":110000},"subFeatureIndex":13,"acroutes":[100000,110000]},"geometry":{"type":"MultiPolygon","coordinates":[[[[116.961932,40.051358],[116.964902,40.047836],[116.969293,40.048583],[116.972095,40.036977],[116.985626,40.038828],[116.991837,40.036896],[117.00016,40.032253],[117.000683,40.029915],[117.011369,40.031246],[117.018061,40.030467],[117.020884,40.032448],[117.024836,40.03011],[117.023916,40.033746],[117.028517,40.033957],[117.027032,40.038828],[117.033159,40.04235],[117.038639,40.049378],[117.051437,40.051163],[117.053382,40.052884],[117.052022,40.059375],[117.061182,40.060105],[117.064382,40.062783],[117.070634,40.064179],[117.069652,40.06757],[117.081049,40.068819],[117.080986,40.065087],[117.085064,40.068592],[117.085608,40.075131],[117.103927,40.075585],[117.107775,40.071805],[117.119507,40.072421],[117.128896,40.06546],[117.139227,40.064049],[117.15625,40.069338],[117.160139,40.075553],[117.158466,40.077435],[117.172227,40.074157],[117.175593,40.071642],[117.183603,40.072081],[117.186426,40.076202],[117.181533,40.080095],[117.18538,40.083875],[117.189207,40.082853],[117.191842,40.072973],[117.198576,40.070101],[117.197572,40.067748],[117.205247,40.07028],[117.208175,40.076834],[117.203616,40.076704],[117.204285,40.079657],[117.213989,40.086243],[117.21104,40.090785],[117.211249,40.096608],[117.224487,40.094662],[117.224403,40.098619],[117.228606,40.100257],[117.229025,40.103533],[117.236009,40.108382],[117.238226,40.111755],[117.245357,40.113215],[117.249268,40.116474],[117.255541,40.113279],[117.260393,40.114155],[117.266834,40.112177],[117.269908,40.107198],[117.274362,40.105804],[117.276663,40.109307],[117.275659,40.113636],[117.285425,40.121322],[117.297094,40.118857],[117.297073,40.121273],[117.302991,40.125926],[117.307613,40.136982],[117.313761,40.139964],[117.318571,40.138522],[117.323276,40.14071],[117.33093,40.13575],[117.330617,40.133691],[117.349082,40.136528],[117.351404,40.139932],[117.35636,40.140904],[117.356883,40.145037],[117.350525,40.144827],[117.355272,40.148587],[117.351717,40.150564],[117.360626,40.156965],[117.357343,40.164273],[117.351111,40.171661],[117.353746,40.17367],[117.359413,40.173346],[117.364014,40.176683],[117.368844,40.17299],[117.372023,40.176538],[117.377021,40.176327],[117.381225,40.172455],[117.380597,40.17691],[117.393186,40.174901],[117.391618,40.177607],[117.401217,40.183617],[117.404751,40.183244],[117.4077,40.187504],[117.397704,40.192914],[117.388356,40.188249],[117.38409,40.187828],[117.384382,40.195278],[117.381455,40.194906],[117.379552,40.201319],[117.393145,40.203376],[117.385679,40.207894],[117.378443,40.21029],[117.377586,40.218612],[117.39373,40.221656],[117.390029,40.227969],[117.386829,40.227111],[117.373989,40.232777],[117.36027,40.23255],[117.355691,40.229556],[117.351613,40.229459],[117.348246,40.234574],[117.345464,40.234946],[117.343457,40.242909],[117.339881,40.246194],[117.342202,40.256502],[117.337622,40.263266],[117.337999,40.265903],[117.334005,40.285654],[117.331244,40.289665],[117.32336,40.284441],[117.316794,40.285104],[117.316835,40.281999],[117.304309,40.278181],[117.29632,40.2781],[117.292368,40.286236],[117.294647,40.290894],[117.293309,40.296748],[117.285739,40.302214],[117.274342,40.308552],[117.274697,40.314405],[117.271853,40.319853],[117.271288,40.325285],[117.274969,40.331944],[117.267127,40.335694],[117.259828,40.336195],[117.261125,40.338781],[117.257089,40.341463],[117.25437,40.351191],[117.254182,40.357105],[117.250188,40.358381],[117.247762,40.364101],[117.242283,40.369981],[117.237055,40.370627],[117.22618,40.369044],[117.223901,40.375538],[117.218527,40.377718],[117.211124,40.373825],[117.204536,40.373082],[117.199747,40.375861],[117.185799,40.377767],[117.179943,40.375021],[117.170491,40.374342],[117.16796,40.371467],[117.157609,40.374859],[117.155329,40.371402],[117.147466,40.369965],[117.142385,40.362824],[117.128122,40.358866],[117.125362,40.35641],[117.117457,40.353744],[117.100915,40.360546],[117.0946,40.358285],[117.085231,40.350432],[117.072705,40.345584],[117.072286,40.342999],[117.066933,40.342983],[117.060931,40.337795],[117.052817,40.337649],[117.048279,40.341528],[117.039266,40.340057],[117.032762,40.33752],[117.026133,40.338458],[117.020842,40.336179],[117.012686,40.32674],[117.01024,40.320726],[117.006998,40.319255],[117.007563,40.314599],[117.011306,40.307113],[117.002,40.299675],[117.004091,40.293918],[116.99834,40.29083],[116.990833,40.290603],[116.991042,40.287724],[116.983765,40.287886],[116.971343,40.281724],[116.970527,40.276531],[116.961995,40.273442],[116.960468,40.2704],[116.950953,40.261081],[116.954341,40.25715],[116.961786,40.252635],[116.969293,40.253962],[116.975881,40.249463],[116.974082,40.24456],[116.959924,40.23268],[116.956286,40.232615],[116.953567,40.236079],[116.946896,40.236095],[116.945641,40.233441],[116.936837,40.232259],[116.935206,40.229847],[116.940978,40.223922],[116.938029,40.210549],[116.929685,40.211585],[116.930898,40.207084],[116.939556,40.192347],[116.945913,40.193141],[116.94997,40.186354],[116.945809,40.186224],[116.945349,40.1813],[116.951371,40.174788],[116.962037,40.175549],[116.961242,40.171937],[116.968749,40.163495],[116.972054,40.156301],[116.977763,40.151374],[116.970025,40.140321],[116.967829,40.129849],[116.96578,40.127823],[116.971594,40.124224],[116.969189,40.118776],[116.971301,40.114009],[116.976069,40.111188],[116.973329,40.103712],[116.967976,40.101214],[116.975462,40.095051],[116.979938,40.093867],[116.981862,40.089828],[116.981192,40.08149],[116.986274,40.078359],[116.982844,40.070685],[116.980816,40.071188],[116.978599,40.064893],[116.973476,40.066304],[116.970652,40.063805],[116.962288,40.063529],[116.961932,40.051358]]]]}},{"type":"Feature","properties":{"adcode":110118,"name":"密云区","center":[116.843352,40.377362],"centroid":[116.995042,40.526881],"childrenNum":0,"level":"district","parent":{"adcode":110000},"subFeatureIndex":14,"acroutes":[100000,110000]},"geometry":{"type":"MultiPolygon","coordinates":[[[[117.223901,40.375538],[117.226661,40.378558],[117.229045,40.386843],[117.235382,40.389556],[117.23695,40.394078],[117.240694,40.394417],[117.240484,40.39763],[117.236616,40.400844],[117.237515,40.407786],[117.234085,40.417149],[117.243872,40.422848],[117.246737,40.426883],[117.257654,40.435372],[117.263342,40.442375],[117.252635,40.446038],[117.252154,40.450459],[117.243308,40.455428],[117.236532,40.456558],[117.233207,40.463204],[117.237243,40.468785],[117.230907,40.470463],[117.225783,40.47585],[117.22846,40.481301],[117.21792,40.494589],[117.212065,40.494685],[117.208426,40.498071],[117.208572,40.501102],[117.21449,40.50739],[117.212504,40.507906],[117.215013,40.513273],[117.219969,40.514321],[117.230405,40.511162],[117.239543,40.516723],[117.246821,40.511968],[117.255562,40.514934],[117.263133,40.513145],[117.264115,40.517271],[117.26146,40.51906],[117.255123,40.527973],[117.252007,40.53632],[117.247427,40.540236],[117.250606,40.542024],[117.24954,40.548179],[117.25964,40.552867],[117.268507,40.559842],[117.273191,40.561501],[117.279256,40.560342],[117.285592,40.565061],[117.299562,40.566801],[117.311837,40.578026],[117.325451,40.578155],[117.328442,40.575948],[117.334611,40.576464],[117.342767,40.581585],[117.350023,40.582197],[117.353014,40.578831],[117.365917,40.575965],[117.369221,40.57036],[117.375453,40.567799],[117.378422,40.56337],[117.389297,40.561244],[117.39465,40.567912],[117.400589,40.569345],[117.40358,40.574257],[117.413471,40.569893],[117.42123,40.569104],[117.429992,40.576126],[117.429804,40.579298],[117.423217,40.58144],[117.420623,40.590875],[117.421753,40.593178],[117.414747,40.600728],[117.412739,40.605123],[117.419954,40.617517],[117.430285,40.626014],[117.438002,40.625692],[117.442289,40.627977],[117.448876,40.62838],[117.45402,40.642844],[117.451448,40.646577],[117.456467,40.649167],[117.449106,40.651596],[117.462009,40.653076],[117.464309,40.648652],[117.467885,40.649521],[117.473093,40.644453],[117.475539,40.644421],[117.477986,40.635331],[117.486163,40.633496],[117.489948,40.636023],[117.500425,40.6362],[117.501972,40.644518],[117.505026,40.646142],[117.50283,40.653076],[117.513913,40.656196],[117.514583,40.660523],[117.502934,40.669674],[117.493357,40.67527],[117.484741,40.677087],[117.482399,40.679033],[117.471503,40.674338],[117.465188,40.673534],[117.453958,40.677618],[117.442226,40.676605],[117.437332,40.683599],[117.432711,40.681622],[117.426437,40.685304],[117.419348,40.68696],[117.414852,40.685947],[117.409226,40.687281],[117.397223,40.683776],[117.386996,40.684178],[117.378192,40.678808],[117.37058,40.679708],[117.359748,40.673919],[117.342411,40.673437],[117.336681,40.666956],[117.337622,40.664447],[117.331851,40.661504],[117.321164,40.658287],[117.290423,40.660185],[117.278608,40.664463],[117.278629,40.667551],[117.273401,40.670076],[117.267754,40.676669],[117.261397,40.681155],[117.256775,40.679467],[117.241635,40.676669],[117.234336,40.680577],[117.233207,40.683583],[117.218715,40.689484],[117.217335,40.69196],[117.210622,40.691976],[117.208405,40.694435],[117.202361,40.695577],[117.197802,40.694291],[117.193996,40.696268],[117.182453,40.697072],[117.180947,40.694082],[117.176639,40.693567],[117.169236,40.699097],[117.16474,40.699628],[117.159491,40.696332],[117.147571,40.698968],[117.142531,40.6972],[117.132493,40.698663],[117.128792,40.700913],[117.117792,40.700078],[117.110661,40.708243],[117.095144,40.705559],[117.086047,40.702055],[117.081153,40.702617],[117.076804,40.700029],[117.058338,40.70154],[117.054887,40.699804],[117.044494,40.700367],[117.036108,40.697265],[117.035585,40.694467],[117.031047,40.692136],[117.027848,40.694355],[117.018291,40.696011],[117.013418,40.694082],[117.005513,40.694853],[117.002481,40.697345],[116.990456,40.701203],[116.988177,40.703164],[116.979938,40.702826],[116.977533,40.705559],[116.969628,40.706362],[116.965111,40.709593],[116.96647,40.71525],[116.960134,40.721083],[116.946645,40.726916],[116.942714,40.729857],[116.940706,40.739786],[116.926548,40.744894],[116.923516,40.750596],[116.927908,40.757824],[116.923181,40.766897],[116.923391,40.773722],[116.904569,40.777286],[116.898589,40.77674],[116.895013,40.781733],[116.89495,40.790675],[116.896686,40.796438],[116.889073,40.798348],[116.886961,40.801076],[116.878575,40.797545],[116.873326,40.798781],[116.871277,40.794785],[116.862577,40.792858],[116.867471,40.784559],[116.858039,40.78305],[116.856806,40.77955],[116.851264,40.778924],[116.850448,40.775006],[116.834785,40.770221],[116.840076,40.760682],[116.831795,40.751303],[116.826211,40.749343],[116.818662,40.75042],[116.810527,40.749118],[116.802977,40.745986],[116.793629,40.748267],[116.783759,40.757631],[116.780727,40.751512],[116.782818,40.747817],[116.786352,40.736026],[116.790472,40.728973],[116.789091,40.712454],[116.786687,40.7103],[116.787105,40.704482],[116.783989,40.700496],[116.769246,40.70281],[116.762867,40.706427],[116.756155,40.705687],[116.754963,40.702891],[116.748668,40.700544],[116.747518,40.697072],[116.74252,40.69593],[116.735807,40.69167],[116.725581,40.689114],[116.725413,40.68466],[116.714915,40.680014],[116.713221,40.669867],[116.714309,40.666104],[116.709855,40.662598],[116.712636,40.653896],[116.711151,40.648218],[116.712197,40.641268],[116.70149,40.632917],[116.70195,40.628444],[116.705128,40.626947],[116.704689,40.620076],[116.701322,40.621379],[116.697955,40.618402],[116.702598,40.612785],[116.70655,40.610998],[116.707993,40.606507],[116.705609,40.60303],[116.711235,40.600213],[116.708495,40.595206],[116.711611,40.59189],[116.708955,40.590054],[116.714351,40.58028],[116.71456,40.570682],[116.710503,40.568685],[116.709855,40.565512],[116.699336,40.563563],[116.686349,40.564497],[116.679636,40.562001],[116.682397,40.556766],[116.66872,40.557507],[116.665771,40.552432],[116.67698,40.554462],[116.68225,40.548904],[116.690699,40.549468],[116.702138,40.545456],[116.701469,40.539913],[116.706948,40.532582],[116.712573,40.529955],[116.717216,40.524798],[116.712239,40.522058],[116.711402,40.516465],[116.701071,40.510549],[116.699106,40.50444],[116.698353,40.493266],[116.693376,40.490783],[116.694149,40.485462],[116.704334,40.479043],[116.69348,40.481704],[116.693397,40.476108],[116.695571,40.466721],[116.698667,40.468043],[116.706174,40.459929],[116.716902,40.457074],[116.719223,40.460397],[116.723594,40.458542],[116.7196,40.455735],[116.719265,40.448636],[116.725811,40.443085],[116.72098,40.440988],[116.716421,40.441714],[116.723552,40.435065],[116.722339,40.423832],[116.72556,40.418053],[116.73244,40.420604],[116.733235,40.418312],[116.741139,40.414631],[116.728801,40.40982],[116.724389,40.409191],[116.723427,40.405316],[116.718512,40.402055],[116.713242,40.40157],[116.713849,40.395806],[116.711716,40.386908],[116.716254,40.384114],[116.707115,40.377007],[116.706509,40.373809],[116.714079,40.368608],[116.719872,40.369044],[116.718094,40.361338],[116.726773,40.361193],[116.725769,40.355619],[116.729031,40.355619],[116.727484,40.346522],[116.723887,40.344033],[116.722967,40.339152],[116.731185,40.339023],[116.73129,40.335031],[116.744046,40.339136],[116.744653,40.333706],[116.751491,40.335742],[116.758559,40.333884],[116.759689,40.326853],[116.762846,40.326707],[116.768639,40.317816],[116.773324,40.315973],[116.762888,40.310428],[116.756845,40.302586],[116.754461,40.303686],[116.738965,40.284101],[116.741098,40.283001],[116.738337,40.278764],[116.74298,40.279087],[116.752788,40.275512],[116.762658,40.269058],[116.768597,40.270109],[116.771651,40.266501],[116.773512,40.269527],[116.782964,40.273248],[116.784073,40.279443],[116.787795,40.281449],[116.788025,40.289439],[116.794487,40.287417],[116.800572,40.289196],[116.809607,40.28601],[116.811823,40.282387],[116.825123,40.285347],[116.82458,40.290991],[116.827215,40.298333],[116.830101,40.299206],[116.828992,40.304413],[116.838382,40.310185],[116.848984,40.311204],[116.854547,40.303152],[116.857182,40.2929],[116.859462,40.290878],[116.871319,40.290943],[116.871737,40.281481],[116.876338,40.274348],[116.874247,40.268281],[116.879893,40.264139],[116.881273,40.259221],[116.886104,40.255256],[116.886585,40.251907],[116.892252,40.245709],[116.894343,40.240028],[116.901746,40.23684],[116.893946,40.233457],[116.900701,40.228763],[116.906598,40.228682],[116.908606,40.222401],[116.913917,40.220118],[116.915507,40.222271],[116.922031,40.220134],[116.92544,40.225768],[116.931065,40.230624],[116.935206,40.229847],[116.936837,40.232259],[116.945641,40.233441],[116.946896,40.236095],[116.953567,40.236079],[116.956286,40.232615],[116.959924,40.23268],[116.974082,40.24456],[116.975881,40.249463],[116.969293,40.253962],[116.961786,40.252635],[116.954341,40.25715],[116.950953,40.261081],[116.960468,40.2704],[116.961995,40.273442],[116.970527,40.276531],[116.971343,40.281724],[116.983765,40.287886],[116.991042,40.287724],[116.990833,40.290603],[116.99834,40.29083],[117.004091,40.293918],[117.002,40.299675],[117.011306,40.307113],[117.007563,40.314599],[117.006998,40.319255],[117.01024,40.320726],[117.012686,40.32674],[117.020842,40.336179],[117.026133,40.338458],[117.032762,40.33752],[117.039266,40.340057],[117.048279,40.341528],[117.052817,40.337649],[117.060931,40.337795],[117.066933,40.342983],[117.072286,40.342999],[117.072705,40.345584],[117.085231,40.350432],[117.0946,40.358285],[117.100915,40.360546],[117.117457,40.353744],[117.125362,40.35641],[117.128122,40.358866],[117.142385,40.362824],[117.147466,40.369965],[117.155329,40.371402],[117.157609,40.374859],[117.16796,40.371467],[117.170491,40.374342],[117.179943,40.375021],[117.185799,40.377767],[117.199747,40.375861],[117.204536,40.373082],[117.211124,40.373825],[117.218527,40.377718],[117.223901,40.375538]]]]}},{"type":"Feature","properties":{"adcode":110119,"name":"延庆区","center":[115.985006,40.465325],"centroid":[116.164004,40.540013],"childrenNum":0,"level":"district","parent":{"adcode":110000},"subFeatureIndex":15,"acroutes":[100000,110000]},"geometry":{"type":"MultiPolygon","coordinates":[[[[115.967006,40.265612],[115.976396,40.270983],[115.981812,40.276903],[115.978822,40.281627],[115.981227,40.28525],[115.978675,40.289633],[115.982732,40.297977],[115.990323,40.299498],[115.987919,40.303799],[115.975538,40.308698],[115.976417,40.311511],[115.973259,40.318997],[115.979658,40.320532],[115.982711,40.324202],[115.993398,40.328986],[115.999065,40.325463],[116.007597,40.33314],[116.01684,40.33466],[116.026481,40.324283],[116.026167,40.320484],[116.031144,40.312352],[116.040095,40.312724],[116.042479,40.316846],[116.051116,40.315812],[116.056971,40.322181],[116.053353,40.326853],[116.061802,40.336809],[116.06841,40.336971],[116.073429,40.339831],[116.077716,40.339346],[116.083342,40.33571],[116.086353,40.330813],[116.098649,40.330005],[116.102978,40.331524],[116.110381,40.330813],[116.116634,40.323668],[116.116237,40.321955],[116.122385,40.312805],[116.132737,40.31198],[116.141959,40.316879],[116.138383,40.324671],[116.13809,40.330974],[116.143904,40.336082],[116.137651,40.336534],[116.137567,40.340769],[116.140809,40.343047],[116.138404,40.345229],[116.144782,40.348541],[116.147543,40.340655],[116.144719,40.336631],[116.152603,40.337714],[116.155677,40.344906],[116.1507,40.349252],[116.145514,40.351046],[116.148651,40.35696],[116.148233,40.361807],[116.159295,40.366265],[116.168789,40.366718],[116.170713,40.369351],[116.177154,40.370934],[116.180354,40.367687],[116.192985,40.372775],[116.209129,40.376232],[116.211451,40.381756],[116.222221,40.382111],[116.226989,40.38111],[116.23184,40.374988],[116.23665,40.377427],[116.241962,40.377508],[116.24353,40.379818],[116.247796,40.374471],[116.252104,40.376297],[116.25338,40.381239],[116.258336,40.383193],[116.261264,40.380561],[116.270863,40.382693],[116.282845,40.375263],[116.290729,40.383177],[116.289872,40.391672],[116.286003,40.396032],[116.289746,40.402539],[116.287864,40.404719],[116.291608,40.408448],[116.288513,40.413437],[116.289433,40.418021],[116.291942,40.416617],[116.296648,40.420701],[116.294452,40.429304],[116.290667,40.435856],[116.289788,40.440907],[116.294368,40.449975],[116.293824,40.452831],[116.300955,40.458429],[116.306853,40.466092],[116.301646,40.468108],[116.294786,40.47535],[116.291691,40.485317],[116.29717,40.486768],[116.303779,40.485817],[116.31022,40.491702],[116.31321,40.491799],[116.323227,40.500151],[116.330567,40.500748],[116.336653,40.498636],[116.34232,40.500457],[116.348636,40.499071],[116.357042,40.501941],[116.365909,40.499635],[116.369632,40.500312],[116.377537,40.49683],[116.378603,40.491525],[116.376825,40.485736],[116.387344,40.482043],[116.38609,40.475802],[116.393702,40.47256],[116.4065,40.481995],[116.413673,40.481527],[116.416664,40.483011],[116.420971,40.480301],[116.433142,40.478189],[116.443201,40.481801],[116.455937,40.480914],[116.457903,40.488445],[116.465577,40.48701],[116.468212,40.48493],[116.483541,40.484994],[116.487347,40.481737],[116.492157,40.481027],[116.508322,40.483172],[116.511543,40.486929],[116.519092,40.491799],[116.519155,40.496604],[116.51194,40.501135],[116.506398,40.508212],[116.500459,40.510904],[116.497762,40.518093],[116.492073,40.518093],[116.488581,40.515853],[116.476306,40.514192],[116.470345,40.518963],[116.46587,40.518802],[116.460956,40.524363],[116.467125,40.530068],[116.470617,40.535418],[116.479651,40.541396],[116.484587,40.552867],[116.496277,40.555106],[116.499999,40.560921],[116.505144,40.562581],[116.509577,40.57276],[116.513153,40.572792],[116.517796,40.579749],[116.525136,40.583002],[116.531577,40.59131],[116.530929,40.595883],[116.535948,40.59944],[116.532915,40.606459],[116.535634,40.615698],[116.538938,40.619673],[116.539294,40.625612],[116.545003,40.627076],[116.551674,40.625209],[116.561231,40.628557],[116.568989,40.625483],[116.574092,40.631678],[116.573903,40.63628],[116.563886,40.636908],[116.55389,40.642877],[116.551151,40.642828],[116.550335,40.647606],[116.545023,40.650116],[116.544103,40.653767],[116.540046,40.656679],[116.529507,40.654588],[116.527039,40.6584],[116.518381,40.660925],[116.520096,40.66411],[116.517273,40.665734],[116.513488,40.672344],[116.505938,40.673067],[116.501568,40.671186],[116.492826,40.673984],[116.487138,40.674338],[116.483374,40.679403],[116.488811,40.69196],[116.496653,40.696879],[116.502676,40.697361],[116.501066,40.70228],[116.501923,40.706796],[116.506064,40.710879],[116.503115,40.715893],[116.504119,40.720135],[116.506858,40.720039],[116.510748,40.72645],[116.509493,40.73548],[116.513697,40.741456],[116.506461,40.743432],[116.501819,40.746581],[116.502906,40.756635],[116.50025,40.760811],[116.495482,40.759735],[116.491404,40.7633],[116.485193,40.765179],[116.4803,40.771586],[116.471517,40.771233],[116.465452,40.772742],[116.45395,40.76587],[116.444414,40.76921],[116.437722,40.766865],[116.431846,40.768246],[116.424861,40.767443],[116.416496,40.76937],[116.4143,40.777912],[116.407838,40.780417],[116.403217,40.778635],[116.392635,40.778394],[116.379837,40.772325],[116.37097,40.772453],[116.367687,40.77088],[116.361204,40.772646],[116.353111,40.770221],[116.342947,40.773096],[116.33314,40.772694],[116.330149,40.77377],[116.31756,40.77218],[116.313168,40.770205],[116.30794,40.763734],[116.311119,40.75511],[116.30794,40.752122],[116.304762,40.755656],[116.29786,40.756812],[116.290918,40.763814],[116.281402,40.763926],[116.277366,40.76163],[116.273456,40.762883],[116.274167,40.766335],[116.26988,40.770703],[116.269587,40.777158],[116.261013,40.782938],[116.257834,40.787898],[116.247943,40.791831],[116.245224,40.78838],[116.235019,40.78313],[116.235625,40.775135],[116.231757,40.77149],[116.229979,40.762417],[116.23366,40.759896],[116.223308,40.753793],[116.220485,40.749183],[116.220359,40.744669],[116.213249,40.740139],[116.210551,40.741713],[116.204717,40.739946],[116.2057,40.733038],[116.197753,40.7269],[116.192274,40.724779],[116.184913,40.713675],[116.181128,40.712438],[116.177907,40.707889],[116.176213,40.700544],[116.171341,40.695979],[116.173683,40.689034],[116.171487,40.68167],[116.168413,40.67892],[116.167597,40.672633],[116.162683,40.662437],[116.151432,40.663338],[116.142858,40.666972],[116.13694,40.667648],[116.125229,40.654089],[116.113225,40.648845],[116.111531,40.646287],[116.112744,40.640946],[116.120419,40.633287],[116.122071,40.629989],[116.118349,40.627961],[116.1044,40.626996],[116.098879,40.630584],[116.088507,40.626626],[116.08583,40.623825],[116.076691,40.619883],[116.073492,40.612125],[116.069811,40.610258],[116.062722,40.610322],[116.058289,40.607006],[116.050907,40.606121],[116.04457,40.602032],[116.032357,40.599875],[116.030036,40.597364],[116.028509,40.607328],[116.025268,40.60654],[116.005109,40.584097],[115.996116,40.58392],[115.995238,40.579862],[115.982147,40.579008],[115.97512,40.590779],[115.971983,40.60237],[115.965877,40.601002],[115.967404,40.605896],[115.955107,40.609534],[115.948331,40.608809],[115.944672,40.611095],[115.935031,40.613316],[115.928297,40.612753],[115.920372,40.616632],[115.907803,40.617291],[115.897849,40.608101],[115.894733,40.606878],[115.888146,40.597026],[115.885406,40.595223],[115.867777,40.595786],[115.86623,40.593371],[115.854895,40.590151],[115.846175,40.593049],[115.827374,40.587027],[115.820662,40.568234],[115.82154,40.563305],[115.819804,40.559343],[115.815036,40.55741],[115.804915,40.55865],[115.79908,40.5577],[115.7922,40.561292],[115.784713,40.558376],[115.776327,40.552158],[115.773902,40.548582],[115.770179,40.548002],[115.763885,40.540574],[115.759577,40.538914],[115.75506,40.540042],[115.752968,40.536288],[115.755624,40.531019],[115.748702,40.526087],[115.743788,40.518464],[115.743098,40.513854],[115.73605,40.503988],[115.743077,40.494959],[115.744039,40.498249],[115.768088,40.498345],[115.774529,40.493911],[115.782204,40.492073],[115.776202,40.482704],[115.776683,40.477511],[115.771559,40.47285],[115.770367,40.46493],[115.772856,40.462301],[115.779527,40.464075],[115.7734,40.457397],[115.77547,40.45204],[115.77248,40.452831],[115.773546,40.44812],[115.77043,40.444166],[115.786679,40.437066],[115.78992,40.432483],[115.796884,40.432531],[115.796445,40.426834],[115.836555,40.38568],[115.837454,40.381255],[115.840633,40.381094],[115.846865,40.375085],[115.855962,40.37712],[115.861859,40.373422],[115.861922,40.364811],[115.85981,40.36213],[115.86441,40.36192],[115.864452,40.359335],[115.872754,40.359593],[115.876226,40.362146],[115.878066,40.359367],[115.883169,40.359545],[115.88526,40.357024],[115.890927,40.357897],[115.892997,40.355554],[115.909539,40.357622],[115.918301,40.35389],[115.920581,40.346473],[115.924094,40.341059],[115.921417,40.338668],[115.922881,40.332898],[115.92721,40.329601],[115.922672,40.325899],[115.926792,40.319611],[115.929239,40.32105],[115.935721,40.316717],[115.937185,40.313047],[115.943814,40.310945],[115.939757,40.304397],[115.945885,40.296199],[115.946115,40.289034],[115.950088,40.289228],[115.951698,40.282015],[115.955212,40.276984],[115.960231,40.274914],[115.961611,40.269219],[115.967006,40.265612]]]]}}]}
export default {
  utilMapZoom,
  utilAutoMapZoom,
  utilExpress,
  utilNumDecimal,
  getPayType,
  utilGetColor,
  utilNumDecimal_int,
  bmapstyle,
  loading,
  isTest,
  beijing_json,
  gradient
}
