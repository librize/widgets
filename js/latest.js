// Generated by CoffeeScript 1.4.0
(function(){var e;e={server:"http://librize.com",root:"http://librize.github.com/widgets",default_params:{},style_loaded:{},addStyle:function(e){return $("head").append('<link rel="stylesheet" type="text/css" href="'+e+'" />')},getQueryParams:function(e){var t,n,r,i,s,o,u,a;e==null&&(e="");r={};u=e.replace(/^.*\?/,"").split("&");for(s=0,o=u.length;s<o;s++){n=u[s];a=n.split("="),t=a[0],i=a[1];r[t]=i}return r},getDefaultParams:function(e){var t;t=this.getQueryParams(e);return this.default_params={bookspot:t.bookspot||void 0,limit:t.limit||5,height:t.height||75,width:t.width||0,theme:t.theme||"simple"}},show:function(t){var n,r,i,s,o,u,a=this;n=t.attr("data-bookspot")||t.attr("data-place")||this.default_params.bookspot;i=t.attr("data-limit")||this.default_params.limit;r=t.attr("data-height")||this.default_params.height;u=t.attr("data-width")||this.default_params.width;s=t.attr("data-theme")||this.default_params.theme;if(n){(this.style_loaded[s]==null?s!=="none":void 0)&&this.addStyle(""+e.root+"/css/"+s+".css");this.style_loaded[s]=!0;o=""+e.server+"/places/"+n+"/place_items.json?limit="+i+"&callback=?";return $.getJSON(o,function(e){var n,i,o,f,l,c;o='<ul class="'+s+'">';for(l=0,c=e.length;l<c;l++){n=e[l];u&&(n.image=n.image.replace(/_SX\d+_/,"_SX"+u+"_"));r&&(n.image=n.image.replace(/_SX\d+_/,"_SY"+r+"_"));i=r?r:u*1.3;f=u?u:r/1.3;o+=n.image==="no-item-medium-image.jpg"?'<li style="height:'+i+"px; width:"+f+'px" class="noimage"><a href="'+n.url+'"><span>'+n.title+"</span></a></li>":'<li><a href="'+n.url+'"><img src="'+n.image+'" alt="'+n.title+'" /></a></li>'}o+="</ul>";t.html(o);return a.updated(t)})}return typeof console!="undefined"&&console!==null?console.log("Bookspot Unique URL or ID required."):void 0},updated:function(e){}};$(function(){var t,n,r,i,s,o,u;n=$('script[src^="'+e.root+'/js/latest.js"]');r=$(n).attr("src");e.getDefaultParams(r);o=$("div.librize-widget.latest");u=[];for(i=0,s=o.length;i<s;i++){t=o[i];u.push(e.show($(t)))}return u})}).call(this);