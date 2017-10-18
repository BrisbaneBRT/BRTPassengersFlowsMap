/*global require*/
// require in the complete Cesium object and reassign it globally.
// This is meant for use with the Almond loader.
require([
        'Cesium'
    ], function(
        Cesium) {
    'use strict';
    /*global self*/
    var scope = typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {};

    scope.Cesium = Cesium;
	var viewer = new Cesium.Viewer( 'cesiumContainer', {  
    imageryProvider : new  Cesium.ArcGisMapServerImageryProvider( {  
        url : 'http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer'  
    } ),  
	
	
    baseLayerPicker : false  
} );  
var terrainProvider = new Cesium.CesiumTerrainProvider( {  
    url : '//assets.agi.com/stk-terrain/world',  
    requestVertexNormals : true  
} );  
viewer.terrainProvider = terrainProvider;  
viewer.scene.globe.enableLighting = false;  

	var scene = viewer.scene;
	var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
	handler.setInputAction(function (movement) {
		scene._noLoad=0;
		scene._mayLoad=0;
		var pickedObjects = scene.drillPick(movement.position);
		for(var s in pickedObjects)
		{
			//alert(pickedObjects[s].id);
		}
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN );
	function computeCircle(radius) {
    var positions = [];  
    for (var i = 0; i < 6; i++) { 
		var j = i*60;
        var radians = Cesium.Math.toRadians(j);  
        positions.push(new Cesium.Cartesian2(  
            radius * Math.cos(radians), radius * Math.sin(radians)));  
    }  
    return positions;  
	}  
	   
	function computeStar(arms, rOuter, rInner) {  
		var angle = Math.PI / arms;  
		var length = 2 * arms;  
		var positions = new Array(length);  
		for (var i = 0; i < length; i++) {  
			var r = (i % 2) === 0 ? rOuter : rInner;  
			positions[i] = new Cesium.Cartesian2(  
				Math.cos(i * angle) * r, Math.sin(i * angle) * r);  
		}  
		return positions;  
	}  
	function showShape(viewer,ps,resArr)
	{
		var _tmpPush = resArr;
		var col;
		var widthp;
		if(ps<=443)
		{
			col=Cesium.Color.GREEN
			widthp=8;
		}
			
		if(ps>443 && ps<=1728)
		{
			col=Cesium.Color.GREEN;
			widthp=40;
		}
		if(ps>1728 && ps<=4321)
		{
			col=Cesium.Color.YELLOW;
			widthp=60;
		}
		if(ps>4321 && ps<=10517)
		{
			col=Cesium.Color.BLUE;
			widthp=90;
		}
		if(ps>10517)
		{
			col=Cesium.Color.RED;
			widthp=120;
		}
		if(ps>=0)
		{
			viewer.entities.add({  
			name : 'Red1 tube with rounded corners',
			polylineVolume : {
				positions : Cesium.Cartesian3.fromDegreesArray(  
					_tmpPush),
				shape : computeCircle(widthp),
				material : col
			}
			});
		}
		else
		{
			var redTube = viewer.entities.add({  
			name : 'Red2 tube with rounded corners',  
			polyline: {  
				positions : Cesium.Cartesian3.fromDegreesArray(  
					_tmpPush),  
				width : 2,
				material : col
			}  
			});
		}
		viewer.zoomTo(viewer.entities);
	}
	

	function showShapeBall(viewer,ps,pointx,pointy,diameter)
	{
		var col;

		if(ps>=0)
		{
			col = Cesium.Color.LIGHTSLATEGREY;
		}
		
		if(ps>=0)
		{
			viewer.entities.add({  
			name : 'show ball',
			position: Cesium.Cartesian3.fromDegrees(pointx, pointy,diameter), 
			ellipsoid : {  
			
			radii : new Cesium.Cartesian3(diameter, diameter, diameter),  
			material : col,   
			} 
			});
		} 
		viewer.zoomTo(viewer.entities);
	}
	
	
	Cesium.loadJson('../../Test/resultT.json').then(function(jsonData) {
		var p=0;
		for(var i=0;i<jsonData.length;i++)
	
		{
			debugger;
			var _tmpPush=[];
			if("MultiLineString" == jsonData[i].json_geometry.type)
			{
				for(var j=0;j<jsonData[i].json_geometry.coordinates.length;j++)
				{
					_tmpPush=[];
					for(var k=0;k<jsonData[i].json_geometry.coordinates[j].length;k++)
					{
						_tmpPush.push(jsonData[i].json_geometry.coordinates[j][k][0]);
						_tmpPush.push(jsonData[i].json_geometry.coordinates[j][k][1]);
					}
					showShape(viewer,jsonData[i].MAX_SUM_CO,_tmpPush);
					
				}
			}
			else
			{
				if("LineString" == jsonData[i].json_geometry.type)
				{
					for(var j=0;j<jsonData[i].json_geometry.coordinates.length;j++)
					{
						_tmpPush.push(jsonData[i].json_geometry.coordinates[j][0]);
						_tmpPush.push(jsonData[i].json_geometry.coordinates[j][1]);
					}	
				}
				showShape(viewer,jsonData[i].MAX_SUM_CO,_tmpPush);
				
			}
			debugger;
			
		}
		
	})
	
	

	Cesium.loadJson('../../Test/BRTsTOPS.json').then(function(jsonData) {
		var p=0;
		var MAX_SUM_CO = 150;
		for(var i=0;i<jsonData.length;i++)
	
		{
			debugger;
			var _tmpPush=[];
			var pointx = 0.0;
			var pointy = 0.0;
			var diameter = 140.0;
			if("Point" == jsonData[i].json_geometry.type)
			{
					_tmpPush=[];

					pointx=jsonData[i].json_geometry.coordinates[0];
					pointy=jsonData[i].json_geometry.coordinates[1];
					showShapeBall(viewer,MAX_SUM_CO,pointx,pointy,diameter);
			} 
			debugger;
			
		}
		
	})
	

	
	$('.cesium-viewer-bottom').remove();
	$('.cesium-viewer-toolbar').remove();
	$('.cesium-viewer-animationContainer').remove();
	$('.cesium-viewer-timelineContainer').remove();
}, undefined, true);
