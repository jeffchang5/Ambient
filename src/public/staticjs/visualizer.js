var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, $(window).width() / $(window).height(), 1, 1000);
var renderer = new THREE.WebGLRenderer();
var cyl = new Array();
var controls;

document.body.appendChild(renderer.domElement);

var i = 0;
for(var x = 0; x < 30; x += 2) {
	var j = 0;
	cyl[i] = new Array();
	for(var y = 0; y < 30; y += 2) {
		var geometry = new THREE.CylinderGeometry(1.5, 1.5, 1.5);
		
		var material = new THREE.MeshPhongMaterial({
			color: randomFairColor(),
			ambient: 0x808080,
			specular: 0xffffff,
			shininess: 20,
			reflectivity: 5.5 
		});
		
		cyl[i][j] = new THREE.Mesh(geometry, material);
		cyl[i][j].position = new THREE.Vector3(x, y, 0);
		
		scene.add(cyl[i][j]);
		j++;
	}
	i++;
}

var light = new THREE.AmbientLight(0x505050);
scene.add(light);

var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);


directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(0, -1, -1);
scene.add(directionalLight);

directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(-1, -1, 0);
scene.add(directionalLight);

camera.position.z = 0;
camera.position.x = 0;
camera.position.y = 50;

controls = new THREE.OrbitControls(camera);
controls.addEventListener('change', render);

for(var i = 0; i < 7; i++) {
	controls.pan(new THREE.Vector3( 1, 0, 0 ));
	controls.pan(new THREE.Vector3( 0, 1, 0 ));
}

var render = function () {

	if(typeof array === 'object' && array.length > 0) {
		var k = 0;
		for(var i = 0; i < cyl.length; i++) {
			for(var j = 0; j < cyl[i].length; j++) {
				var scale = (array[k] + boost) / 30;
				if (scale <= cyl[i][j].scale.y) scale = scale;
				cyl[i][j].scale.y = (scale < 1 ? 1 : scale);
				cyl[i][j].scale.z = -scale ;
				cyl[i][j].scale.x = 25/scale; //(scale < 1 ? 1 : scale);

				k += (k < array.length ? 1 : 0);
			}
		}
	}

	requestAnimationFrame(render);
	controls.update();
	renderer.render(scene, camera);
	//setTimeout(testLoop,1000);
};

render();
renderer.setSize($(window).width(), $(window).height());

function randomFairColor() {
	var min = 64;
	var max = 224;
	var r = (Math.floor(Math.random() * (max - min + 1)) + min) * 65536;
	var g = (Math.floor(Math.random() * (max - min + 1)) + min) * 256;
	var b = (Math.floor(Math.random() * (max - min + 1)) + min);
	return r + g + b;
}
