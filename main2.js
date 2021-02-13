function init(){
	var scene = new THREE.Scene(); 
	//creat a scene
	
	var enableFog = false;
	
	if (enableFog){
		scene.fog = new THREE.FogExp2(0xffffff, 0.2);
	}
	
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	//creat a camera and position the camera
	// it accepts four parameter field of view, aspect ratio, near and far clipping field
	camera.position.z = 4;
	camera.position.y = -1;	
	
	var canvas = document.querySelector('#c');	
	var renderer = new THREE.WebGLRenderer({canvas, alpha: true,});
	renderer.setSize( window.innerWidth, window.innerHeight );
	// renderer.setClearColor('rgb(120, 120, 120)');
	document.body.appendChild( renderer.domElement );
	// in order to see the 3D image, we will have it converted into 2D image
	//this process is call render	
		
	var cube = getCube (3, 1.5, 0.2);	
	//creat a cube
			
	var pointLight = getPointLight(1);	
	pointLight.position.y = -2;
	pointLight.position.x = 3;
			
	scene.add( cube );
	//add the cube to the scene
	scene.add(pointLight);
	
	var animateCube = animate(renderer, scene, camera);
	// renderer.render(scene, camera);
	
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