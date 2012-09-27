exports.removeArrayDuplicates = function unique(a){
     a.sort();
     for(var i = 1; i < a.length; ){
         if(a[i-1] == a[i]){
            a.splice(i, 1);
         } else {
            i++;
         }
     }
     return a;
} 

exports.buildArrayOfIconsView = function buildArrayIcons(icons, icon_width, _top, _left) {
	var iconWidth = icon_width;
	var returnView = Ti.UI.createView({
		top:_top,
		left:_left,
		height:'auto',
		width:'auto'
	});
	var urlPrefix = 'iphone/';
	var maxImages = 3;
	
	if(icons.length < maxImages) {
		maxImages = icons.length;
	}
	
	for(var i=0; i<=maxImages-1; i++) {
		var leftPosition = i * iconWidth + 5;
		var icon = Ti.UI.createImageView({
			left:leftPosition,
			image:urlPrefix + icons[i],
			height:iconWidth,
			width:iconWidth
		});
		returnView.add(icon);
	}
	return returnView;
}
