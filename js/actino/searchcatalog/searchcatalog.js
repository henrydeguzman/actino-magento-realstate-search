(function($){
    var latlngbounds = new google.maps.LatLngBounds();
    var map;
    var markers = [];
    var search_option = $('#search_option'),
        buy_section = $('#buy_section'),
        rent_section = $('#rent_section'),
        sell_section = $('#sell_section'),
        forrent_section = $('#forrent_section');
    var thisindex = {
        init: function(){
            $(document).ready(this.exe_ready);

            $(document).on('click', '#buy_where_next', this.exe_next);
            $(document).on('click', '#buy_what_prev', this.exe_prev);

            $(document).on('click', '#rent_where_next', this.exe_next);
            $(document).on('click', '#rent_what_prev', this.exe_prev);
            $(document).on('click', '#rent_what_next', this.exe_next);
            $(document).on('click', '#rent_when_prev', this.exe_prev);

            $(document).on('change', '#search_option', this.exe_search_option);

            $(document).on('click', '#btn_buy', this.exe_btn_buy);
            $(document).on('click', '#btn_rent', this.exe_btn_rent);

            $(document).on('change', "input[name*='radio_time_option']", this.exe_radio_time_option);
            $(document).on('click', "#catalogsearch_btn", this.exe_catalogsearch_btn);
        },
        exe_catalogsearch_btn: function(e){
            //addMarker(position);
            var hotels_marks = [
                ['Fairmont Hotel and Raffles Suites and Residences, West Drive, Makati, Metro Manila, Philippines', 14.550965, 121.023296],
                ['OPL Bldg, 100 Don Carlos Palanca, Makati, 1229 Metro Manila', 14.555881, 121.019643]

            ];

            var infoWindowContent = [
                ['<div class="info_content">' +
                '<h3>Fairmont Hotel and Raffles Suites and Residences</h3>' +
                '<p>Lorem ipsum dolor sit amet, elit aliquam vituperata his in. Et qui sanctus deleniti. In modo dicunt vis, illud euismod scripserit id per, illum admodum tincidunt sit cu. Aeque elitr officiis et vel, ex vel noster iriure conceptam. Pro ut altera putant propriae, vidit partem electram ne nam, te sale soleat aperiri vix.</p>' + '</div>'],
                ['<div class="info_content">' +
                '<h3>OPL Bldg, 100 Don Carlos Palanca</h3>' +
                '<p>Lorem ipsum dolor sit amet, elit aliquam vituperata his in. Et qui sanctus deleniti. In modo dicunt vis, illud euismod scripserit id per, illum admodum tincidunt sit cu. Aeque elitr officiis et vel, ex vel noster iriure conceptam. Pro ut altera putant propriae, vidit partem electram ne nam, te sale soleat aperiri vix..</p>' + '</div>']
            ];

            // Display multiple markers on a map
            var infoWindow = new google.maps.InfoWindow(), marker, i;


            // Loop through our array of markers & place each one on the map

            for( i = 0; i < hotels_marks.length; i++ ) {
                var position = new google.maps.LatLng(hotels_marks[i][1], hotels_marks[i][2]);
                latlngbounds.extend(position);
                addMarker(position);
                marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: hotels_marks[i][0]
                });

                // Allow each marker to have an info window
                google.maps.event.addListener(marker, 'click', (function(marker, i) {

                    return function() {
                        infoWindow.open(map, marker);
                        infoWindow.setContent(infoWindowContent[i][0]);
                        console.log(infoWindowContent[0]);
                        console.log(infoWindowContent[1]);
                        console.log(i);
                    }

                })(marker, i));

                // Automatically center the map fitting all markers on the screen
                map.fitBounds(latlngbounds);
            }
            map_zoom();
            e.preventDefault();
        },
        exe_radio_time_option: function(e){
            var div_forradio_parttime = $('#for_parttime');
            var $this = $(this);
            if($this.val() == "fulltime")
            {
                div_forradio_parttime.addClass('display-none');
            }
            else if($this.val() == "parttime")
            {
                div_forradio_parttime.removeClass('display-none');
            }
            e.preventDefault();
        },
        exe_btn_rent: function(e){
            section_displaynone();
            rent_section.removeClass('display-none');
            search_option.find('div:eq(1)').removeClass('display-none');
        },
        exe_btn_buy: function(e){
            section_displaynone();
            buy_section.removeClass('display-none');
            search_option.find('div:eq(1)').removeClass('display-none');
            e.preventDefault();
        },
        exe_search_option: function(e){
            var $this = $(this);
            console.log($this.val());
            if($this.val() != 0){
                if($this.val() == "buy"){
                    thisindex.exe_btn_buy(e);
                }
                else if($this.val() == "rent"){
                    thisindex.exe_btn_rent(e);
                }
                else if($this.val() == "sell"){
                    thisindex.exe_sell(e);
                }
                else if($this.val() == "forrent"){
                    thisindex.exe_forrent(e);
                }
            }
            e.preventDefault();
        },
        exe_prev: function(){
            prev($(this));
        },
        exe_next: function(){
            next($(this));
        },
        exe_ready: function(){
            map_initialize();
        }
    };
    function closeAccordion($evt){

        $evt.parent().css({
            display: 'none'
        });
        $evt.parent().parent().removeClass('allow');
    }
    function next($evt){
        closeAccordion($evt);
        $evt.parent().parent().next().find('.step.a-item').css({
            display: ''
        }).parent().addClass('allow');
    }
    function prev($evt){
        closeAccordion($evt);
        $evt.parent().parent().prev().find('.step.a-item').css({
            display: ''
        }).parent().addClass('allow');
    }
    function section_displaynone(){
        buy_section.addClass('display-none');
        rent_section.addClass('display-none');
        sell_section.addClass('display-none');
        forrent_section.addClass('display-none');
        search_option.find('div:eq(0)').addClass('display-none');
    }
    function map_initialize() {



        var position = new google.maps.LatLng(43.45291889355465, 12.216796875);
        var makati_center = new google.maps.LatLng(14.5500, 121.0300);
        var mapOptions = {
            zoom: 12,
            center: makati_center,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        // This event listener will call addMarker() when the map is clicked.
        google.maps.event.addListener(map, 'click', function(event) {
            console.log(event.latLng);
            console.log([4.555907, 121.019665]);
        });


        // Adds a marker at the center of the map.
    }
    function map_zoom() {
        var latlng = new google.maps.LatLngBounds();


        console.log(markers.length);
        console.log(markers[0].position);
        for (var i = 0; i < markers.length; i++) {
            latlngbounds.extend(markers[i].position);
        }
        map.fitBounds(latlngbounds);

    }
    function addMarker(location) {
        // Add a marker to the map and push to the array.
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        markers.push(marker);
    }
    function setAllMap(map) {
        // Sets the map on all markers in the array.
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }
    function clearMarkers() {
        // Removes the markers from the map, but keeps them in the array.
        setAllMap(null);
    }
    function showMarkers() {
        // Shows any markers currently in the array.
        setAllMap(map);
    }
    function deleteMarkers() {
        // Deletes all markers in the array by removing references to them.
        clearMarkers();
        markers = [];
    }
    thisindex.init();
})($j);