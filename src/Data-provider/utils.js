// helper function to sort object by value
function sortObject(obj) {
    var arr = [];
    var prop;
    for (prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        arr.push({
          'key': prop,
          'value': obj[prop]
        });
      }
    }
    arr.sort(function (a, b) {
      return b.value - a.value;
    });
    return arr; // returns array [[key:val],[key:val]]
  }
  
  
  // helper function to convert bytes to human readable format
  function toReadableBytes(num) {
    var neg = num < 0;
    var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    if (neg) {
      num = -num;
    }
    if (num < 1) {
      return (neg ? '-' : '') + num + ' B';
    }
    var exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
    num = Number((num / Math.pow(1000, exponent)).toFixed(2));
    var unit = units[exponent];
    return (neg ? '-' : '') + num + ' ' + unit;
  }
  
  module.exports={
      toReadableBytes,
      sortObject
  }