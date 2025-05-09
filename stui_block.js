/*!
 * v3.0 Copyright 2016-2018 http://v.shoutu.cn
 * Email 726662013@qq.com
 */



window.console && window.console.log;
var playerhigh = "1",
lazyswitch = "1",
playcolumn = "0",
qrcode1 = "1",
qrcode2 = "1",
copyshort = "0",
baidushare = "",
stui = {
	browser: {
		url: document.URL,
		domain: document.domain,
		title: document.title,
		language: (navigator.browserLanguage || navigator.language).toLowerCase(),
		canvas: !!document.createElement("canvas").getContext,
		useragent: function() {
			var e = navigator.userAgent;
			return {
				mobile: !!e.match(/AppleWebKit.*Mobile.*/),
				ios: !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				android: -1 < e.indexOf("Android") || -1 < e.indexOf("Linux"),
				iPhone: -1 < e.indexOf("iPhone") || -1 < e.indexOf("Mac"),
				iPad: -1 < e.indexOf("iPad"),
				trident: -1 < e.indexOf("Trident"),
				presto: -1 < e.indexOf("Presto"),
				webKit: -1 < e.indexOf("AppleWebKit"),
				gecko: -1 < e.indexOf("Gecko") && -1 == e.indexOf("KHTML"),
				weixin: -1 < e.indexOf("MicroMessenger")
			}
		} ()
	},
	mobile: {
		popup: function() {
			$popblock = $(".popup"),
			$(".open-popup").click(function() {
				$popblock.addClass("popup-visible"),
				$("body").append('<div class="mask"></div>'),
				$(".close-popup").click(function() {
					$popblock.removeClass("popup-visible"),
					$(".mask").remove(),
					$("body").removeClass("modal-open")
				}),
				$(".mask").click(function() {
					$popblock.removeClass("popup-visible"),
					$(this).remove(),
					$("body").removeClass("modal-open")
				})
			})
		},
		slide: function() {
			$(".type-slide").each(function(e) {
				3 < ($index = +$(this).find(".active").index()) ? $index -= 3 : $index = 0,
				$(this).flickity({
					cellAlign: "left",
					freeScroll: !0,
					contain: !0,
					prevNextButtons: !1,
					pageDots: !1,
					initialIndex: $index
				})
			})
		},
		mshare: function() {
			$(".open-share").click(function() {
				stui.browser.useragent.weixin ? $("body").append('<div class="mobile-share share-weixin"></div>') : $("body").append('<div class="mobile-share share-other"></div>'),
				$(".mobile-share").click(function() {
					$(".mobile-share").remove(),
					$("body").removeClass("modal-open")
				})
			})
		}
	},
	images: {
		lazyload: function() {
			1 == lazyswitch ? $(".lazyload").lazyload({
				effect: "fadeIn",
				threshold: 200,
				failurelimit: 15,
				skip_invisible: !1
			}) : $(".lazyload").each(function() {
				var e = $(this).attr("data-original");
				$(this).css("background-image", "url(" + e + ")"),
				$(this).attr("data-original", ""),
				null != $(this).attr("src") && $(this).attr("src", e)
			})
		},
		carousel: function() {
			$(".carousel_default").flickity({
				cellAlign: "left",
				contain: !0,
				wrapAround: !0,
				autoPlay: !0,
				prevNextButtons: !1
			}),
			$(".carousel_wide").flickity({
				cellAlign: "center",
				contain: !0,
				wrapAround: !0,
				autoPlay: !0
			}),

			$(".carousel_center").flickity({
				cellAlign: "center",
				contain: !0,
				wrapAround: !0,
				autoPlay: !0,
				prevNextButtons: !1


			}).css("opacity", 1),






			$(".carousel_right").flickity({
				cellAlign: "left",
				wrapAround: !0,
				contain: !0,
				pageDots: !1
			})
		},
		qrcode: function() {
			1 == qrcode1 ? $("#qrcode").length && (new QRCode("qrcode", {
				text: stui.browser.url,
				width: 150,
				height: 150,
				colorDark: "#000000",
				colorLight: "#ffffff",
				correctLevel: QRCode.CorrectLevel.H
			}), $("#qrcode img").attr("class", "img-responsive")) : $("#qrcode").length && $("#qrcode").append("<img class='img-responsive' src='" + qrcode1 + "' width='150' height='150' />"),
			1 == qrcode2 ? $("#qrcode2").length && (new QRCode("qrcode2", {
				text: stui.browser.url,
				width: 160,
				height: 160,
				colorDark: "#000000",
				colorLight: "#ffffff",
				correctLevel: QRCode.CorrectLevel.H
			}), $("#qrcode2 img").attr("class", "img-responsive").css("display", "inline-block")) : $("#qrcode2").length && $("#qrcode2").append("<img class='img-responsive' src='" + qrcode2 + "' width='160' height='160' />")
		}
	},
	common: {
		bootstrap: function() {
			$('a[data-toggle="tab"]').on("shown.bs.tab",
			function(e) {
				var o = $(e.target).text();
				$(e.relatedTarget).text(),
				$("span.active-tab").html(o)
			})
		},
		headroom: function() {
			var e;
			$("#header-top").length && (e = document.querySelector("#header-top"), new Headroom(e, {
				tolerance: 5,
				offset: 205,
				classes: {
					initial: "top-fixed",
					pinned: "top-fixed-up",
					unpinned: "top-fixed-down"
				}
			}).init())
		},
		history: function() {
			if ($("#stui_history").length) {
				if ($.cookie("recente")) {
					var json = eval("(" + $.cookie("recente") + ")"),
					list = "";
					for (i = 0; i < json.length; i++) list = list + "<li class='top-line'><a href='" + json[i].vod_url + "' title='" + json[i].vod_name + "'><span class='pull-right text-red'>" + json[i].vod_part + "</span>" + json[i].vod_name + "</a></li>";
					$("#stui_history").append(list)
				} else $("#stui_history").append("<p style='padding: 80px 0; text-align: center'>您还没有看过影片哦</p>");
				$(".historyclean").on("click",
				function() {
					$.cookie("recente", null, {
						expires: -1,
						path: "/"
					})
				})
			}
		},
		collapse: function() {
			$(".detail").length && $(".detail").find("a.detail-more").on("click",
			function() {
				$(this).parent().find(".detail-sketch").addClass("hide"),
				$(this).parent().find(".detail-content").css("display", ""),
				$(this).remove()
			})
		},
		scrolltop: function() {
			var e = $(window);
			$scrollTopLink = $("a.backtop"),
			e.scroll(function() {
				500 < $(this).scrollTop() ? $scrollTopLink.css("display", "") : $scrollTopLink.css("display", "none")
			}),
			$scrollTopLink.on("click",
			function() {
				return $("html, body").animate({
					scrollTop: 0
				},
				400),
				!1
			})
		},
		copylink: function() {
			var o;
			1 == copyshort ? $(".copylink").length && $.ajax({
				type: "GET",
				url: "https://api.weibo.com/2/short_url/shorten.json?source=2849184197&url_long=" + encodeURIComponent(stui.browser.url),
				dataType: "JSONP",
				success: function(e) {
					o = e.data.urls[0].url_short,
					new Clipboard(".copylink", {
						text: function() {
							return o
						}
					}).on("success",
					function(e) {
						alert("地址复制成功，赶快分享给小伙伴吧！")
					})
				}
			}) : $(".copylink").length && (o = stui.browser.url, new Clipboard(".copylink", {
				text: function() {
					return o
				}
			}).on("success",
			function(e) {
				alert("地址复制成功，赶快分享给小伙伴吧！")
			}))
		},
		share: function() {
			if (0 != baidushare) with($(".share").html('<span class="bds_shere"></span><a class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a class="bds_weixin" data-cmd="weixin" title="分享到微信"></a><a class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a><a class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a><a class="bds_bdhome" data-cmd="bdhome" title="分享到百度新首页"></a><a class="bds_tqf" data-cmd="tqf" title="分享到腾讯朋友"></a><a class="bds_youdao" data-cmd="youdao" title="分享到有道云笔记"></a><a class="bds_more" data-cmd="more" title="更多"></a>'), window._bd_share_config = {
				common: {
					bdSnsKey: {},
					bdText: "",
					bdMini: "2",
					bdMiniList: !1,
					bdPic: "",
					bdStyle: "0",
					bdSize: "24"
				},
				share: {}
			},
			document)(getElementsByTagName("head")[0] || body).appendChild(createElement("script")).src = baidushare + "?cdnversion=" + ~ (-new Date / 36e5)
		}
	}
};
$(document).ready(function() {
	stui.browser.useragent.mobile && (stui.mobile.slide(), stui.mobile.popup(), stui.mobile.mshare()),
	stui.images.lazyload(),
	stui.images.carousel(),
	stui.images.qrcode(),
	stui.common.bootstrap(),
	stui.common.headroom(),
	stui.common.history(),
	stui.common.collapse(),
	stui.common.scrolltop(),
	stui.common.copylink(),
	stui.common.share()
});