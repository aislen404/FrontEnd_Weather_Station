/**
 * Created by Aislen404 on 6/5/17.
 */
/**
 * @description googleMaps easy managing market
 * @type {{init}}
 */
var MapsGoogle = function () {

    var mapMarker = function (t,g) {
        var map = new GMaps({
            div: '#gmap_marker',
            lat: t,
            lng: g
        });
        map.addMarker({
            lat: t,
            lng: g,
            title: 'Marker with InfoWindow',
            icon: "img/map_marker.png",
            infoWindow: {
                content: '<img src="img/logo_registered.png"/>'
            }
        });
    };

    return {
        //main function to initiate map samples
        init: function (lt,lg) {
            mapMarker(lt,lg);
        }

    };

}();