widget =
	server : 'http://librize.com'
	root : 'http://librize.github.com/widgets'
	default_params : {}
	style_loaded : {}
	addStyle : (url) -> $('head').append """<link rel="stylesheet" type="text/css" href="#{url}" />"""
	getQueryParams : (str) ->
		ps = {}
		for p in (str.replace /^.*\?/, '').split '&'
			[key, val] = p.split '='
			ps[key] = val
		ps
	getDefaultParams : (str) ->
		params = @getQueryParams str
		@default_params = 
			place : params.place || undefined
			limit : params.limit || 5
			height : params.height || 75
			theme : params.theme || 'simple'
	show : (d) ->
		place = (d.attr 'data-place') || @default_params.place
		limit = (d.attr 'data-limit') || @default_params.limit
		height = (d.attr 'data-height') || @default_params.height
		theme = (d.attr 'data-theme') || @default_params.theme
		if place
			@addStyle "#{widget.root}/css/#{theme}.css" if theme != 'none' unless @style_loaded[theme]?
			@style_loaded[theme] = true
			url = "#{widget.server}/places/#{place}/place_items.json?limit=#{limit}&height=#{height}&callback=?"
			$.getJSON url, (data) =>
				html = """<ul class="#{theme}">"""
				html += """<li><a href="#{book.url}"><img src="#{book.image}" alt="#{book.title}" /></a></li>""" for book in data
				html += """</ul>"""
				d.html html
		else
			console?.log 'Place ID required.'

$ ->
	script = $("""script[src^="#{widget.root}/js/latest.js"]""")
	src = $(script).attr 'src'
	widget.getDefaultParams src
	widget.show $(div) for div in $('div.librize-widget.latest')
