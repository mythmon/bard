_.extend(_, {
  'sum': function(list) {
    return _.reduce(list, function(a, b) {return a + b;}, 0);
  },

  'hash': function(obj) {
    var str, hash = 0, i, char;
    str = '%@1'.fmt(obj);

    if (str == 0) return hash;

    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = hash * 31 + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  },
});
