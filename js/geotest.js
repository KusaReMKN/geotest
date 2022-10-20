'use strict';

let map;

function initMap()
{
	const pos = [ 35.65867636972139, 139.74541680454988 ];
	map = L.map('map');
	map.setView(pos, 15);
	L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
			attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html'"
				+ " target='_blank'>地理院タイル</a>",
			maxZoom: 21,
			maxNativeZoom: 18,
	}).addTo(map);
}

function initGeolocation()
{
	if ('geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition(
			pos => {
				const k = [ pos.coords.latitude, pos.coords.longitude ];
				L.marker(k).addTo(map);
				map.setView(k, 15);
			},
			err => {
				alert(`Error: ${err.message}`);
			},
			{
				enableHighAccuracy: true
			}
		);
		navigator.geolocation.watchPosition(
			pos => {
				const k = [ pos.coords.latitude, pos.coords.longitude ];
				L.marker(k).addTo(map);
				map.setView(k, 15);
			},
			err => {
				alert(`Error: ${err.message}`);
			},
			{
				enableHighAccuracy: true
			}
		);
	} else {
		alert('Geolocation API is not available');
	}
}

initMap();
initGeolocation();
