 // Classic setup coppied from Maria's work :)
var camera, scene, renderer, eventHandler, frameId, clock, delta;
var perspectiveCamera, ortographicCamera, currentCamera;
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var aspect = SCREEN_HEIGHT/SCREEN_WIDTH;

var moveBall = false, stopAnimation = false, isBasic = false, showWireframe = false, reset=false;

var boardPointlight, boardDirectionalLight;
var pointLightON = true, directionalLightON = true;
// Scene Object3D's
var chessBoard, monaLisaBall, dice;

function createScene(){ 'use strict';
	scene = new THREE.Scene();

	// Chess board :)
	chessBoard = new ChessBoard(0, 0, 0, 70);
	scene.add(chessBoard.getObject3D());

	// Mona Lisa ball :)
	monaLisaBall = new CoolBall(-15, 0, -10, 7);
	scene.add(origin);
	//scene.add(monaLisaBall.getObject3D());

	// Dice :)
	dice = new Dice(0, 0, 0, 7);
	scene.add(dice.getObject3D());

	//pause visualization
	var pauseLoader  = new THREE.TextureLoader();
	var pauseTexture =  pauseLoader.load('../CG_PROJ_4/assets/pausa.jpg');
	var pauseGeometry = new THREE.PlaneGeometry(45, 18.9, 20);
	pauseGeometry.computeVertexNormals();
	var pauseMaterial = new THREE.MeshBasicMaterial({color : 0xffffff, side:THREE.DoubleSide, map: pauseTexture});
	var pauseMesh = new THREE.Mesh(pauseGeometry, pauseMaterial);
	//pauseMesh.rotateZ(Math.PI);
	pauseMesh.position.set(0,0,115);
	scene.add(pauseMesh);


	//var chessBoardSpotlight = new THREE.SpotLight({intensity:1.3, target:chessBoard.getObject3D()});
	boardPointlight = new THREE.PointLight(0x444444, 3, 75, 0, 2);
  	boardPointlight.position.set(0, 20, 20);
  	boardPointlight.shadow = new THREE.LightShadow(camera);
	scene.add(boardPointlight);

	boardDirectionalLight = new THREE.DirectionalLight(0x444444, 2);
	boardDirectionalLight.position.set(2, 30, -1);
	scene.add(boardDirectionalLight);


	//scene.add(new THREE.AxesHelper(25));
}

function createCameras(){ 'use strict';
	perspectiveCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
	perspectiveCamera.position.set(0, 20, 70);
 	perspectiveCamera.lookAt(scene.position);
 	//scene.add(perspectiveCamera);

}

function render(){ 'use strict';
	renderer.render(scene, perspectiveCamera);
}

function resetTHANGS(){'use strict';
	monaLisaBall.Object3D.visible = false;
	scene.dispose();
	moveBall = false, isBasic = false, showWireframe = false;

	createScene();
	origin.rotateY(-rot);
	rot = 0;
	createCameras();
	//render();
}

function update(){ 'use strict';
	// Pretend something cool is happening pls
	//chessBoard.getObject3D().rotateZ(0.001);
	//monaLisaBall.getObject3D().rotateY(-0.01);

	delta = clock.getDelta();

	if(stopAnimation){
		dice.update(0);
		monaLisaBall.update(0);
	}
	else if(!stopAnimation){
		monaLisaBall.update(delta);
		dice.update(delta);
	}

	if (reset){
		console.log("aqui 3");
		resetTHANGS();
		reset = !reset;
		stopAnimation = !stopAnimation;
		moveBall = false;
	}
}

function init(){ 'use strict';
	renderer = new THREE.WebGLRenderer({antialias: true, fullscreen: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  clock = new THREE.Clock({autostart:true});

  eventHandler = new EventHandler();
	window.addEventListener("keydown", eventHandler.onKeyDown);
  window.addEventListener("keyup", eventHandler.onKeyUp);
  window.addEventListener("resize", eventHandler.onResize);

  createScene();
  createCameras();
  render();
}

function animate(){'use strict';
	frameId = requestAnimationFrame(animate);

	update();
	render();
}
