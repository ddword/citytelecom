/*var ChannelData = $.getJSON('ct.json')
*/
var Packet = function(title, options) {
	this.title = title || '';
	this.channels = {};
	this.image = options.image || '';
	this.price = options.price || 0;
	this.count = options.count || 0;
    this.main = options.main;
};
Packet.prototype.setChannels = function(channelData) {
	channelData.forEach(function(channel, idx) {
		if (!(channel.type in this.channels)) {
			this.channels[channel.type] = [];
		}
		this.channels[channel.type].push({title: channel.title});
        this.count = channelData.length;
	}, this);
};
var Packets = [new Packet('Promo', {price: 560, image: '/images/iptv/packages.png', main: 'true'}),
               new Packet('Base', {price: 780, image: '/images/iptv/packages.png', main: 'true'}),
               new Packet('SuperBase', {price: 1050, image: '/images/iptv/packages.png', main: 'true'}),
               new Packet('Our footbal', {price: 850, image: '/images/iptv/packages.png', main: 'false'}),
               new Packet('Amedia', {price: 750, image: '/images/iptv/packages.png', main: 'false'}),
               new Packet('Rain', {price: 950, image: '/images/iptv/packages.png', main: 'false'})
            ];
Packets.forEach(function (packet, idx) {
	packet.setChannels(ChannelData[packet.title]);
});
Packets.forEach(function(packet) {
	var html = '<div class="fco-package-item">';
    html += '<div class="fco-label">' + '<b>' + packet.title + '&nbsp</b>' + packet.count + '&nbspканалов' + '</div>';
	html += '<div class="fco-list">'+'<ul>';
	for(var group in packet.channels) {
		html += '<li>';
		html += group;
		html += '<ul>';
		for (var channel in packet.channels[group]) {
			html += '<li>';
			html += packet.channels[group][channel].title;
			html += '</li>';
		}
		html += '</ul>';
		html += '</li>';
	}
	html += '</ul>' + '<div class="fco-clearboth">' + '</div>';
	html += '<div class="fco-close">' + '</div>' + '</div>';
    html += '<img src="'+ packet.image +'"/>';
    html += '<div class="fco-price">' + packet.price + '&nbspруб' + '</div>';
    html += '</div>';
    /*разграничение на базовые и доп. каналы*/
    if(packet.main ==='true'){
        $('.fco-packages .fco-main').append($(html));
    } else if((packet.main ==='false')){
        $('.fco-packages .fco-dop').append($(html));
    }
});
$(function() {
    /*подсчет только кликнутых пакетов*/
    var $price = $('body #price');
    var calc = function() {
        var th = ''; var summ = 0;
        $('.fco-package-item.clicked').each(function(){
            var $this = $(this);
            summ += parseInt($this.find('.fco-price').html(), 10);
            th += $this.children('.fco-label').find('b').text() + ';';
        });
        $price.html(summ);
        $('input[name="package"]').val(th);
    };
    calc();
    /*определение какие пакеты можно считать кликнутыми*/
    $('.fco-package-item').on('click', function() {
        var $this = $(this);
        var $main = $('.fco-main .fco-package-item');
        var $dop = $('.fco-dop .fco-package-item');
            $this[$(this).hasClass('clicked') ? 'removeClass' :  'addClass' ]('clicked');
        if((!($main.hasClass('clicked')))&&($dop.hasClass('clicked'))){
            $dop.removeClass('clicked');
        }
        calc();
        return false;
    });
});
/*выпадающий список*/
$(function() {
    var $item = $('.fco-package-item');
    $item.on('click', '.fco-label', function(e) {
        e.stopPropagation();
        var $ul = $(this).parent()
            .find('.fco-list');
        $('.fco-package-item .fco-list').hide();
        $ul.show();
    });
   $('.fco-list .fco-close').click(function (e) {
       e.stopPropagation();
        $(this).closest('.fco-list').hide();
    });
    $(document).on('click', function() {
        $('.fco-list .fco-close').trigger('click');
    });
    /*$('.fco-package-item').eq(0)
        .addClass('fco-package-promo main');
    $('.fco-package-item').eq(1)
        .addClass('fco-package-base main');
    $('.fco-package-item').eq(2)
        .addClass('fco-package-super main');*/
});



