class ChessBoard{
	constructor(x, y, z, size){
		this.Object3D = new THREE.Object3D();
		this.x = x, this.y = y, this.z = z;
		this.width = size;
		this.height = size;
		this.segments = 32;

		this.materials = new Array(3);
    	this.mesh = null;

		this.magicallyCreateChessBoard();
	}

	magicallyCreateChessBoard(){
		console.log("Magic stuff gonna happen. Behold the power of javascript(ZERO -.-)!");
		var mesh, geometry, material, mapLoader, texture, woodBumpMap;

		mapLoader = new THREE.TextureLoader();
		texture = mapLoader.load('../CG_PROJ_4/assets/ChessBoard.jpg');
		woodBumpMap = mapLoader.load('../CG_PROJ_4/assets/WoodBumpMap.jpg');

		this.materials[0] = new THREE.MeshPhongMaterial({side:THREE.DoubleSide, map:texture, bumpMap:woodBumpMap, bumpScale:0.75});
		this.materials[1] = new THREE.MeshBasicMaterial({color : Math.random() * 0xffffff, wireframe : false});
		this.materials[2] = new THREE.MeshBasicMaterial({color : Math.random() * 0xffffff, wireframe : true});

		geometry = new THREE.PlaneGeometry(this.width, this.height, this.segments);
		geometry.computeVertexNormals();

		this.mesh = new THREE.Mesh(geometry, this.materials[0]);

		this.Object3D.add(this.mesh);
		this.Object3D.position.set(this.x, this.y, this.z);
		this.Object3D.rotateX(Math.PI/2 + Math.PI);
		//this.Object3D.add(new THREE.AxesHelper(50));
	}

	getObject3D(){
		return this.Object3D;
	}

	changeMaterial(){

	    if(isBasic && !showWireframe){
	      	this.mesh.material = this.materials[1];
	    } else if (showWireframe){
	      	this.mesh.material = this.materials[2];
	    } else if (!isBasic && !showWireframe){
	    	this.mesh.material = this.materials[0];
	    }
	}

}
