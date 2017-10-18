require.config({
		paths: {
　　　　　　"jquery": "jquery",　
　　　　}
　　});
require(['math','jquery'], function (math){
		debugger;
　　　　alert(math.add(1,8));
		alert($('#6')[0].innerHTML);
　　});