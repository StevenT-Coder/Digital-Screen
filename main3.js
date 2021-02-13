function init(){
	
	// 1) Creat a scene
	var scene = new THREE.Scene(); 
		
	var enableFog = false;
	
	if (enableFog){
		scene.fog = new THREE.FogExp2(0xffffff, 0.2);
	}
	
	// 2) Creat a camera
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.z = 6;
	camera.position.y = -2.5;
	
	// 3) Providing rendering detail.
	var canvas = document.querySelector('#c');	
	var renderer = initRenderer(canvas);
	
	// 4) creat a cube	
	var cube = getCube (3, 1.5, 0.2);	
	
	// 5) Provide light visual effect		
	var pointLight = getPointLight(1);	
	pointLight.position.y = -2;
	pointLight.position.x = 3;

	// 6) add the cube and pointLight to the scene as a one piece.		
	scene.add( cube );
	scene.add(pointLight);
	
	// 7) the following function allowed you to adapt different devices display.

	window.addEventListener('resize', function(){
		var width = window.innerWidth;
		var height = window.innerHeight;
		renderer.setSize(width, height);
		camera.aspect = width/height;
		camera.updateProjectionMatrix();
	});
	
	// 8) start the animation of the scene
	var animateCube = animate(renderer, scene, camera);

	
}

function initRenderer(canvas){
	var renderer = new THREE.WebGLRenderer({canvas, alpha:true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	return renderer;
	
}


function getCube(w, h, d) {
				
		var geometry = new THREE.BoxGeometry(w, h, d);
		var cubeMaterials = [
			new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide}),//right side
			new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide}),//left side
			new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide}),//top side
			new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide}),//bottom side
			new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/AfterpaySide1.png'), side: THREE.DoubleSide }),//front side
			new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/AfterpaySide2.png'), side: THREE.DoubleSide }) //back side
		]
		var material = new THREE.MeshFaceMaterial(cubeMaterials);
		var mesh = new THREE.Mesh( geometry, material );
		return mesh;
			
}

function getPointLight(intensity){
	var light = new THREE.PointLight(0xffffff, intensity);
	return light;
}

function animate (renderer, scene, camera) {
		renderer.render(scene, camera);
		requestAnimationFrame( function(){animate(renderer, scene, camera)});
		// scene.rotation.x += 0.01;
		scene.rotation.y += 0.01;
		};

init();