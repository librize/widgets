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
			width : params.width || 0
			theme : params.theme || 'simple'
	show : (d) ->
		place = (d.attr 'data-place') || @default_params.place
		limit = (d.attr 'data-limit') || @default_params.limit
		height = (d.attr 'data-height') || @default_params.height
		width = (d.attr 'data-width') || @default_params.width
		theme = (d.attr 'data-theme') || @default_params.theme
		if place
			@addStyle "#{widget.root}/css/#{theme}.css" if theme != 'none' unless @style_loaded[theme]?
			@style_loaded[theme] = true
			url = "#{widget.server}/places/#{place}/place_items.json?limit=#{limit}&height=#{height}&callback=?"
			$.getJSON url, (data) =>
				html = """<ul class="#{theme}">"""
				for book in data
					book.image = book.image.replace /_SL\d+_/, '_SX' + width + '_' if width
					html += """<li><a href="#{book.url}"><img src="#{book.image}" alt="#{book.title}" /></a></li>"""
				html += """</ul>"""
				d.html html
				@updated d
		else
			console?.log 'Place ID required.'
	updated : (d) ->
		# override this method and do something

$ ->
	script = $("""script[src^="#{widget.root}/js/latest.js"]""")
	src = $(script).attr 'src'
	widget.getDefaultParams src
	widget.show $(div) for div in $('div.librize-widget.latest')
