(function() {
  var widget;

  widget = {
    server: 'http://librize.com',
    root: 'http://librize.github.io/widgets',
    default_params: {},
    style_loaded: {},
    addStyle: function(url) {
      return $('head').append(`<link rel="stylesheet" type="text/css" href="${url}" />`);
    },
    getQueryParams: function(str = '') {
      var i, key, len, p, ps, ref, val;
      ps = {};
      ref = (str.replace(/^.*\?/, '')).split('&');
      for (i = 0, len = ref.length; i < len; i++) {
        p = ref[i];
        [key, val] = p.split('=');
        ps[key] = val;
      }
      return ps;
    },
    getDefaultParams: function(str) {
      var params;
      params = this.getQueryParams(str);
      return this.default_params = {
        bookspot: params.bookspot || void 0,
        limit: params.limit || 5,
        height: params.height || 75,
        width: params.width || 0,
        theme: params.theme || 'simple'
      };
    },
    show: function(d) {
      var bookspot, height, limit, theme, url, width;
      bookspot = (d.attr('data-bookspot')) || (d.attr('data-place')) || this.default_params.bookspot;
      limit = (d.attr('data-limit')) || this.default_params.limit;
      height = (d.attr('data-height')) || this.default_params.height;
      width = (d.attr('data-width')) || this.default_params.width;
      theme = (d.attr('data-theme')) || this.default_params.theme;
      if (bookspot) {
        if (this.style_loaded[theme] == null) {
          if (theme !== 'none') {
            this.addStyle(`${widget.root}/css/${theme}.css`);
          }
        }
        this.style_loaded[theme] = true;
        url = `${widget.server}/places/${bookspot}/place_items.json?limit=${limit}&callback=?`;
        return $.getJSON(url, (data) => {
          var book, h, html, i, len, w;
          html = `<ul class="${theme}">`;
          for (i = 0, len = data.length; i < len; i++) {
            book = data[i];
            if (width) {
              book.image = book.image.replace(/_SX\d+_/, '_SX' + width + '_');
            }
            if (height) {
              book.image = book.image.replace(/_SX\d+_/, '_SY' + height + '_');
            }
            h = height ? height : width * 1.3;
            w = width ? width : height / 1.3;
            html += book.image === 'no-item-medium-image.jpg' ? `<li style="height:${h}px; width:${w}px" class="noimage"><a href="${book.url}"><span>${book.title}</span></a></li>` : `<li><a href="${book.url}"><img src="${book.image}" alt="${book.title}" /></a></li>`;
          }
          html += `</ul>`;
          d.html(html);
          return this.updated(d);
        });
      } else {
        return typeof console !== "undefined" && console !== null ? console.log('Bookspot Unique URL or ID required.') : void 0;
      }
    },
    updated: function(d) {}
  };
  
  // override this method and do something
  $(function() {
    var div, i, len, ref, results, script, src;
    script = $(`script[src^="${widget.root}/js/latest.js"]`);
    src = $(script).attr('src');
    widget.getDefaultParams(src);
    ref = $('div.librize-widget.latest');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      div = ref[i];
      results.push(widget.show($(div)));
    }
    return results;
  });
}).call(this);
