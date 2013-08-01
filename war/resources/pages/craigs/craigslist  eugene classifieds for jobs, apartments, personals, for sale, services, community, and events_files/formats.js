var IE=(function(){var v=3,div=document.createElement('div'),all=div.getElementsByTagName('i');while(div.innerHTML='<!--[if gt IE '+(++v)+']><i></i><![endif]-->',all[0]);return v>4?v:undefined;}());var pagemode=(function(){return(document.cookie.match('(^|; )cl_fmt=([^;]*)')||0)[2];}());$(document).ready(function(){formats_autosize(pagetype);ie_tweaks();});function ie_tweaks(){if(IE&&IE<=7){var $crumbs=$('.crumb');$crumbs.length=$crumbs.length-1;$crumbs.append(' >');}}
function get_domain(hostname){var m=((hostname||'')+'').match(/craigslist.[\w.]+$/);return m?m[0]:null;}
function formats_autosize(pagetype){if(pagemode==='mobile'){$('meta[name=viewport]').attr('content','width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');var mobile_handler={homepage:homepage_size_mobile,toc:toc_size_mobile,posting:posting_size_mobile,post:post_size_mobile,simple:simple_size_mobile,sites:sites_size_mobile,account:account_size_mobile}[pagetype];if(typeof mobile_handler==="function"){mobile_handler();}
mobile_header();}
activate_format_selector();}
function issue_format_cookie_and_reload(format){var date=new Date();var domain=get_domain(document.location.hostname);date.setTime(date.getTime()+(365*24*60*60*1000));document.cookie='cl_fmt='+format+
'; domain='+domain+'; expires='+
date.toGMTString()+'; path=/';window.location.href=window.location.href;}
function activate_format_selector(target){var $obj=target?target:$('body');var $fmtsel=$('#fmtsel');var $footer=$obj.find('footer,#footer');if($footer.length!=0){$footer.before($fmtsel);}else{$obj.append($fmtsel);}
update_format_selector();$fmtsel.show();}
function update_format_selector(){$('#fmtsel .fsel').each(function(){if($(this).attr('data-mode')===pagemode){$(this).contents().wrap('<b>');}else{$(this).contents().wrap('<a href="#">');}}).click(function(e){e.preventDefault();var target_mode=$(this).attr('data-mode');if(target_mode!==pagemode){issue_format_cookie_and_reload(target_mode);}});}
function mobile_header(){var $header=$('header');var $contents=$header.find('.contents');var $breadcrumbs=$header.find('.breadcrumbs');var $breadcrumbLinks=$breadcrumbs.find('a');var $backButton=$header.find('.back');var closedHeight,openHeight;var isOpen=false;var headerActions=function(e){if(e.target===$backButton[0]){}else if(isOpen&&$breadcrumbLinks.filter(e.target).length){}else{e.preventDefault();if(typeof closedHeight==='undefined'){closedHeight=$contents.height();openHeight=$breadcrumbs.height();}
if(isOpen){$contents.height(closedHeight).removeClass('open').addClass('closed');}else{$contents.height(openHeight).addClass('open').removeClass('closed');}
isOpen=!isOpen;}};$contents.on('touchstart mousedown',headerActions);$backButton.on('click',function(e){window.history.go(-1);});$header.siblings().on('touchstart mousedown',function(e){if(isOpen){headerActions(e);}});var androidVersion=navigator.userAgent.match(/Android (\d)\.(\d)\.(\d)/);if(androidVersion&&androidVersion[1]==2){var timer;var $body=$('body');var bodyHeight=$body.height();$(window).on('scroll',function(){if(!timer){timer=setTimeout(function(){$body.height(bodyHeight++);timer=undefined;},300);}});}}
function getObjectKeys(o){var result=[];for(var name in o){if(o.hasOwnProperty(name))result.push(name);}
return result;}
function build_sorted_cat_list(catabbr,catname){var catlist=[];$('#'+catabbr+'0>li>a,#'+catabbr+'1>li>a').each(function(){catlist.push($(this).html());});catlist=catlist.sort();var excludePattern=/^\[/;var catlist=new Object;$('#center #'+catabbr+' li').each(function(){var html=$(this).find('a').html();if(!html.match(excludePattern)){catlist[html]=$(this);}});var s=getObjectKeys(catlist).sort();for(var i=s.length-1;i>=0;i--){catlist[s[i]].prependTo('#'+catabbr+'0');}
$('#'+catabbr+'1').remove();$('#'+catabbr+'0 li').first().clone().prependTo('#'+catabbr+'0');var allHref=$('#'+catabbr+' .ban a').attr('href');$('#'+catabbr+'0 a').first().attr('href',allHref).html('all '+catname);$('#'+catabbr+' .ban').click(function(e){e.preventDefault();$('#'+catabbr+' .cats').slideToggle();});}
function homepage_size_mobile(){$('#topban').prependTo('#pagecontainer').removeClass('ban');$.map(['center','rightbar'],function(v){$("#"+v).contents().unwrap().wrapAll('<div id="'+v+'"></div>');$("#"+v).prependTo('.body');});$('.sublinks').prependTo('.body').hide();$('#topban h2').prepend('CL &gt; ').click(function(){$('#rightbar,.sublinks').slideToggle();});$('#search>div:first').remove();$('#search').insertAfter('#rightbar');$('#postlks').insertAfter('#search');$.map(['sss','jjj','hhh','ppp','ccc','bbb','ggg'],function(v){$("#"+v).contents().unwrap().wrapAll('<div id="'+v+'"></div>');$("#"+v).insertBefore('#main');});build_sorted_cat_list('sss','for sale');build_sorted_cat_list('jjj','jobs');build_sorted_cat_list('hhh','housing');build_sorted_cat_list('ppp','personals');$('#ppp0>li').first().remove();build_sorted_cat_list('ccc','community');build_sorted_cat_list('bbb','services');build_sorted_cat_list('ggg','gigs');$('#res,#forums,#calban,.cal').each(function(){$(this).appendTo('#center').removeClass('col');});$('#center').append('<br>');$('.cal').appendTo('#center');$('#calban').addClass('ban').click(function(e){e.preventDefault();$('.cal').slideToggle();});$('.leftlinks').appendTo('#center');$('#center').show();$('#main,#container,#leftbar').remove();}
function toc_size_mobile(){$(window).bind('orientationchange',function(){$('#pagecontainer').css('width','100%');});build_toc_searchform();build_toc_results();}
function toc_orientation_flip(){if(window.innerWidth>window.innerHeight){$('body').removeClass('portrait');$('#tocright').appendTo('#pagecontainer');}else{$('body').addClass('portrait');$('#tocleft').appendTo('#pagecontainer');}}
function build_toc_searchform(){var $searchfieldset=$('#searchfieldset');var $query=$('#query').attr('size','');var $satabs=$('#satabs');var $expsearch;$searchfieldset
.find(':submit')
.remove()
.end()
.append('<button id="topsubmit" type="submit">&gt;</button>')
.append($('<div class="leftside"></div>')
.append('<div class="expando"><button id="expsrch" type="button">+</button></div>')
.append($('<div class="searchbox"></div>').append($query)));$expsearch=$('#expsrch');$expsearch.on('click',function(e){$('#searchdrop').slideToggle();$expsearch.html($expsearch.html()==='+'?'&ndash;':'+');});$('#searchtable')
.wrap('<div id="searchdrop" />')
.find('td:first-child')
.remove();if($satabs.length){$satabs
.removeClass('tabcontainer')
.prependTo($('#searchdrop'))
.find('b')
.prependTo($satabs)
.end().end()
.find('>*')
.not(':first')
.wrapAll('<div class="tog" />')
.end().end()
.show()
.filter(':first')
.on('click',function(e){e.preventDefault();$satabs.find('.tog').slideToggle();});}
$searchfieldset.show();}
function build_toc_results(){$('#toc_rows').find('.row')
.find('.gc').text(function(i,text){return text;}).end()
.on('click',function(e){var href=$(this).find('.pl').find('a').attr('href');if(href){window.location.href=href;}});}
function posting_size_mobile(){$('.cltags').before($('#attributes'));$('.flags').insertAfter('.postinginfos');$('date')
.attr('title',function(i,dt){var isoDate='';var rawDate=new Date(+dt);if(dt&&!isNaN(rawDate.getTime())){isoDate+=rawDate.getUTCFullYear()+'-'+(rawDate.getUTCMonth()+1)+'-'+rawDate.getUTCDate();isoDate+='T'+rawDate.getUTCHours()+':'+rawDate.getUTCMinutes()+'Z';}
return isoDate;})
.timeago()
.on('click',function(){var temp,$this=$(this);temp=$this.text();$this.text($this.attr('title'));$this.attr('title',temp);});var $thumbs=$('#thumbs a');var $figure=$('figure.iw');var sliderHtml='';var sw;if($thumbs.length>1){sliderHtml+='<div class="slidernav"><button class="back" disabled="disabled">&lt;</button>'+
'<span class="sliderinfo"></span><button class="forward">&gt;</button></div>'+
'<div class="swipe"><div class="swipe-wrap">';for(var i=0,len=imgList.length;i<len;i++){sliderHtml+='<div><img src="'+imgList[i]+'" /></div>';}
sliderHtml+='</div></div>';$figure.html(sliderHtml);var total,current,$sliderNav=$('.slidernav'),$sliderInfo=$sliderNav.find('.sliderinfo'),$back=$sliderNav.find('.back'),$forward=$sliderNav.find('.forward'),touchCapable='ontouchstart'in window,updateInfo=function(current,total){$sliderInfo.text(current+' of '+total);if(current==1){$back.attr('disabled','disabled');}
if(current==2){$back.removeAttr('disabled');}
if(current==total){$forward.attr('disabled','disabled');}
if(current==(total-1)){$forward.removeAttr('disabled');}};sw=new Swipe($('.swipe')[0],{continuous:false,callback:function(i,el){updateInfo(i+1,total);}});total=sw.getNumSlides();updateInfo(1,total);$back.on('touchstart mousedown',function(e){e.preventDefault();sw.prev();});$forward.on('touchstart mousedown',function(e){e.preventDefault();sw.next();});}}
function post_size_mobile(){$('header aside.highlight').appendTo('.post > header section.contents');$('header > br:last,#accountBlurb br').remove();$('.managestatus a').prepend('<br>');$('.managestatus form').prepend('<br>');$('.managestatus table td').wrap('<tr />');$('blockquote>i').each(function(){$(this).find('sup').each(function(){$(this).replaceWith($(this).html());});$(this).prev('label').append('<br>');$(this).appendTo($(this).prev('label'));});if($('form table').attr('summary')==='neighborhood picker'){$('form table td:last').prependTo('form table td blockquote');}
if($('form table').attr('summary')==='flava picka'){$('form table td fieldset').last().appendTo($('form table td:first'));$('form table td:first').append('<br>');$('form table td:last').children().appendTo($('form table td:first'));}
if($('textarea.toutext').attr('cols')==='80'){$('textarea').attr('cols',null).css('width','100%');$('table form').append('<br><br>').appendTo('body');}
if($('form').first().attr('id')==='postingForm'){$('input[size=80]').css('width','100%').attr('size',null);$('input[size=30]').css('width','100%').attr('size',null);$('input[size=20]').css('width','100%').attr('size',null);}
$('.userbody').append('<div width="100%" class="imagehole"></div>');$('.iw').remove();var imagesDiv=$('.imagehole');$('.tn a').each(function(){var imgHref=$(this).attr('href');imagesDiv.append('<a href="'+imgHref+'"><img class="postingimg" width="100%" src="'+imgHref+'"></a><br>');});}
function simple_size_mobile(){$('body').addClass('mobile');if($('table:first').css('width')==='706px'){$('td').each(function(){$(this).children().appendTo($('form'));});}
if($('table:first').css('width')==='500px'){$('td').each(function(){$(this).append('<br/>').children().prependTo('#content>div:first');});}
return false;}
function sites_size_mobile(){$('.box').children().unwrap();$('h1,h4').click(function(e){var menu=$(this).next('ul,.colmask');menu.slideToggle();$(this).parent().children('ul:visible,,colmask:visible').not(menu).slideUp();});}
function account_size_mobile(){$('body').removeClass('toc').addClass('mobile');$('.bchead').appendTo('body');$('.bchead>#ef>a:first').appendTo('.bchead>#satabs');$('.bchead>#satabs').append(' ');$('.bchead>#ef>a:first').appendTo('.bchead>#satabs');$('.bchead>#ef').remove();$('.bchead>#satabs').appendTo('body');$('blockquote>br').remove();$('blockquote').children().appendTo('body');$('form').each(function(){$(this).find('table td').children().appendTo($(this).find('table td:first'));});$('select').before('<br>');$('#paginator>table>tbody>tr').first().remove();$('#paginator>table>tbody>tr').each(function(){var newDiv=$('<div class="postingrow"></div>');var posttitle=$(this).find('.title');newDiv.append(posttitle.html())
.append($(this).find('.areacat').html())
.append('&bull;')
.append($(this).find('.dates').html())
.append('<br>')
.append($(this).find('.status').html());newDiv.css({'background':posttitle.css('background'),'border':posttitle.css('border'),'font-size':posttitle.css('font-size'),'font-family':posttitle.css('font-family')});$('#paginator').append(newDiv);newDiv.click(function(e){e.preventDefault;window.location.href=posttitle.find('a').attr('href');});});$('#paginator>table').remove();$('#paginator>.postingrow').appendTo('body');$('#paginator').clone().appendTo('body');$('p>em').appendTo('body');$('#footer').appendTo('body');return false;}
