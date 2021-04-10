var origin = new THREE.Object3D();
var rot=0;

class CoolBall{
  constructor(x, y, z, radius){
    this.Object3D = new THREE.Object3D();
    this.x = x, this.y = y, this.z = z;
    this.radius = radius;
    this.segments = 32;

    this.momentum = null;

    this.materials = new Array(3);
    this.mesh = null;
    origin.position.set(0,0,0);

    this.askGodForBall();
    origin.add(this.Object3D);
    //origin.add(this.Object3D);

    this.velocity = 0.3;
    this.maxVelocity = 5.0;
    this.step = 0.01;
  }

  askGodForBall(){
    console.log("The god of THREEJS will send a ball through an invisible socket using GTP(god transfer protocol......)");
		var  geometry, mapLoader, texture;

    mapLoader = new THREE.TextureLoader();
    texture = mapLoader.load('../CG_PROJ_4/assets/MonaLisa.jpg');

    geometry = new THREE.SphereGeometry(this.radius, this.segments, this.segments);
    geometry.computeVertexNormals();

    this.materials[0] = new THREE.MeshPhongMaterial({map:texture, shininess:30, specular:0x444444});

    this.materials[1] = new THREE.MeshBasicMaterial({color : Math.random() * 0xffffff, wireframe : false});
    this.materials[2] = new THREE.MeshBasicMaterial({color : Math.random() * 0xffffff, wireframe : true});



    this.mesh = new THREE.Mesh(geometry, this.materials[0]);

    this.Object3D.add(this.mesh);
    this.Object3D.position.set(this.x, this.y + this.radius, this.z);
    this.Object3D.rotateY(-Math.PI/2);
  }

  getObject3D(){
    return this.Object3D;
  }

  posSet(x,y,z){
    this.Object3D.position.set(x, y + this.radius, z);
    this.Object3D.rotateY(-Math.PI/2);
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

  update(deltaTime){
    var axis = new THREE.Vector3(0, 1, 0);
    if(!deltaTime == 0){
      if(moveBall){
        if(this.velocity > this.maxVelocity){
          this.velocity = this.maxVelocity;
          this.step = 0;
          //this.step = -1 * this.step;
          //this.velocity = this.maxVelocity + this.step;
        }
        if (this.velocity < 0.0) {
          moveBall = false;
        }
        else{
          var v = Math.abs(this.velocity) * deltaTime * -4;
          this.Object3D.rotateOnAxis(axis, v);
          origin.rotateY(deltaTime * this.velocity);
          rot+=deltaTime*this.velocity;
          this.velocity = this.velocity + this.step;
        }
      }
    }
  }
}
