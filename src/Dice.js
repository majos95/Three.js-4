class Dice{
  constructor(x, y, z, size){
    this.Object3D = new THREE.Object3D();
    this.x = x, this.y = y, this.z = z;
    this.size = size;
    this.segments = 32;

    this.massCenter = new THREE.Group();
    this.wireframe = false;

    this.materials = new Array(3);
    this.geometries = new Array(3);
    this.mesh = null;

    this.thisTimeJustCallTheStupidFunction();
  }

    thisTimeJustCallTheStupidFunction(){
      console.log("Ok :( I feel like u don't like me, javascript... :("); //Ya, isto n presta lmao
      var mesh, geometry, material, mapLoader, texture, bumpMap;

      mapLoader = new THREE.TextureLoader();

      var texture1 = mapLoader.load('../CG_PROJ_4/assets/DiceOne.png');
      var texture2 = mapLoader.load('../CG_PROJ_4/assets/DiceTwo.png');
      var texture3 = mapLoader.load('../CG_PROJ_4/assets/DiceThree.png');
      var texture4 = mapLoader.load('../CG_PROJ_4/assets/DiceFour.png');
      var texture5 = mapLoader.load('../CG_PROJ_4/assets/DiceFive.png');
      var texture6 = mapLoader.load('../CG_PROJ_4/assets/DiceSix.png');

      var materials = [
        new THREE.MeshPhongMaterial({map: texture1, bumpMap:texture1, bumpScale:1}),
        new THREE.MeshPhongMaterial({map: texture2, bumpMap:texture2, bumpScale:1}),
        new THREE.MeshPhongMaterial({map: texture3, bumpMap:texture3, bumpScale:1}),
        new THREE.MeshPhongMaterial({map: texture4, bumpMap:texture4, bumpScale:1}),
        new THREE.MeshPhongMaterial({map: texture5, bumpMap:texture5, bumpScale:1}),
        new THREE.MeshPhongMaterial({map: texture6, bumpMap:texture6, bumpScale:1})
      ];

      this.materials[0] = new THREE.MeshFaceMaterial(materials);

      this.materials[1] = new THREE.MeshBasicMaterial({color : Math.random() * 0xffffff, wireframe : false});
      this.materials[2] = new THREE.MeshBasicMaterial({color : Math.random() * 0xffffff, wireframe : true});

      this.geometries[0] = new THREE.BoxGeometry(this.size, this.size, this.size, this.segments, this.segments, this.segments);
      this.geometries[0].computeVertexNormals();

      this.geometries[1] = new THREE.BoxGeometry(this.size, this.size, this.size, this.segments, this.segments, this.segments);
      this.geometries[1].computeVertexNormals();

      this.geometries[2] = new THREE.WireframeGeometry(this.geometries[1]);


      this.mesh = new THREE.Mesh(this.geometries[0], this.materials[0]);
      this.mesh.rotateZ(Math.PI/5);
      this.mesh.position.set(0,0,0);
      this.mesh.rotateX(Math.atan(1));


      this.Object3D.add(this.mesh);
      //this.Object3D.add(new THREE.AxesHelper(15));
      this.Object3D.position.set(this.x, this.y + Math.sqrt(3 * (this.size * this.size))/2, this.z);
    }

    getObject3D(){
      return this.Object3D;
    }

    changeMaterial(){

      if(isBasic && !showWireframe){
          this.mesh.material = this.materials[2];
      } else if (showWireframe){

          this.mesh.geometry = this.geometries[2];
          this.mesh.material = this.materials[1];
      } else if (!isBasic){

        this.mesh.material = this.materials[0];
        this.mesh.geometry = this.geometries[0];
      }
  }

    update(deltaTime){
      this.Object3D.rotateY(deltaTime * 10);
    }
}
