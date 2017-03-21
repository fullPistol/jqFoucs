;(function() {

	function Focus_() {
		this.imagesJs = $('.imagesJs');
		this.ulJs = $('.ulJs');
		this.liJs = $('.ulJs li');
		this.width = this.liJs.width(); 
		this.num = 0;
		this.initialize(); 
	};

	Focus_.prototype = {

		initialize: function() {
			this.initializeTemplate();
			this.monitor();
			this.autoRoll();
		},

		initializeTemplate: function() {
			//左右箭头
			this.arrowsTpl = '<div class="right arrows rightJs"> > </div>'
							+'<div class="left arrows leftJs"> < </div>';
			//piont
			this.piontTpl = '<ul class="point pointJs">'
								+'<li class="cur"></li>'
								+'<li></li>'
								+'<li></li>'
								+'<li></li>'
								+'<li></li>'
							+'</ul>';

			this.imagesJs.append(this.piontTpl,this.arrowsTpl);
			this.liJs.first().clone().appendTo(this.ulJs);
		},

		autoRoll: function() {
			var this_ = this;

			var auto = window.setInterval(function() {
				this_.rightRoll()
			}, 2000);

			this_.imagesJs.hover(function() {
				clearInterval(auto);
			}, function() {
				auto = setInterval(function() {
					this_.rightRoll()
				}, 2000);
			});
		},

		rollFn: function() {
			var this_ = this;

			this_.rightRoll = function() {
				this_.num++;
				
				if(this_.num == this_.liJs.size() + 1) {
					//当图片是最后一张的时候,重新定位
					this_.ulJs.css({
						left:0,
					})
					this_.num = 1;
				};
				
				this_.scroll();
			};

			this_.leftRoll = function() {
				this_.num--;

				if(this_.num == -1) {
					//当图片是第一张的时候,定位到最后一张
					this_.ulJs.css({
						left:-(this_.width * this_.liJs.size() - 1)
					});
					this_.num = this_.liJs.size() - 1;
				};

				this_.scroll();
			};
		},

		monitor: function() {
			var this_ = this;
			
			this_.rollFn();
			
			this_.imagesJs.on('click', '.rightJs', this_.rightRoll);

			this_.imagesJs.on('click', '.leftJs', this_.leftRoll);

			this_.imagesJs.on('click', '.point li', function() {
				this_.num = $(this).index(); 
				this_.scroll();
			});
		},

		scroll: function() {
			
			this.ulJs.stop().animate({
				left: -(this.width) * this.num,
			}, 500);

			//scroll piont
			if(this.num == this.liJs.size()) {
				$('.pointJs li').eq( 0).addClass('cur').siblings().removeClass('cur');
			} else {
				$('.pointJs li').eq( this.num).addClass('cur').siblings().removeClass('cur');
			};	
		},
	};

	new Focus_();
})()