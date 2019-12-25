import $ = require("jquery")
import THREE = require("three");

$(function () {
    const $mainFrame = $("body");

    // シーン、カメラ、レンダラを生成
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, $mainFrame.width() / $mainFrame.height(), 10, 10000);
    const renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize($mainFrame.width(), $mainFrame.height());
    camera.position.z = 200;
    camera.position.y = 100;

    // 自動生成されたcanvas要素をdivへ追加する。
    $mainFrame.append(renderer.domElement);

    //Light
    const light = new THREE.PointLight(0xFFFFFF, 1);
    // ライトに影を有効にする
    light.position.set(50,80,-50)
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.castShadow = true;
    scene.add(light);    

    //directLight
    const directLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    // ライトに影を有効にする
    directLight.position.set(80,80,-50)
    directLight.shadow.mapSize.width = 2048;
    directLight.shadow.mapSize.height = 2048;
    directLight.castShadow = true;
    scene.add(directLight);    


    // //太陽
    // const sun =new THREE.Mesh(new THREE.SphereBufferGeometry(10,32,32),new THREE.MeshStandardMaterial({color:0xFF5733}))
    // sun.position.set(50,80,-50)
    // scene.add(sun)
     

    const geometry = new THREE.BoxBufferGeometry(2, 2, 2);
    // マウスとの交差を調べたいものは配列に格納する
    const meshList = [];
    for (let i = 0; i < 5000; i++) {
      const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 800;
      mesh.position.y = (Math.random() - 0.5) * 800;
      mesh.position.z = (Math.random() - 0.5) * 800;
      mesh.rotation.x = Math.random() * 2 * Math.PI;
      mesh.rotation.y = Math.random() * 2 * Math.PI;
      mesh.rotation.z = Math.random() * 2 * Math.PI;
      scene.add(mesh);
      // 配列に保存
      meshList.push(mesh);
    }






    // 床を作成
    const meshFloor = new THREE.Mesh(
    new THREE.BoxGeometry(20000, 0.1, 20000),
    new THREE.MeshStandardMaterial());
    // 影を受け付ける
    meshFloor.receiveShadow = true;
    scene.add(meshFloor);

    const tree=new THREE.Object3D()
    tree.position.set(-50,10,-50)
    const cone = new THREE.Mesh( new THREE.ConeGeometry( 5, 20, 32 ), new THREE.MeshStandardMaterial( {color: 0xFFFFFF} ) );
    const cone2 = new THREE.Mesh( new THREE.ConeGeometry( 10, 20, 32 ), new THREE.MeshStandardMaterial( {color: 0xFFFFFF} ) );
    const cone3 = new THREE.Mesh( new THREE.ConeGeometry( 14, 24, 32 ), new THREE.MeshStandardMaterial( {color: 0xFFFFFF} ) );
    const cone4 = new THREE.Mesh( new THREE.ConeGeometry( 16, 25, 32 ), new THREE.MeshStandardMaterial( {color: 0xFFFFFF} ) );
    const cylinder = new THREE.Mesh( new THREE.CylinderGeometry( 5, 5, 40, 32 ), new THREE.MeshStandardMaterial( {color: 0xFFFFFF} ) );
    cone.position.set(0,50,0)
    cone2.position.set(0,35,0)
    cone3.position.set(0,25,0)
    cone4.position.set(0,18,0)
    cylinder.position.set(0,0,0)
    tree.add(cone,cone2,cone3,cone4,cylinder)
    scene.add(tree)


     
    // const cube = new THREE.Mesh(new THREE.BoxGeometry(25, 25, 25), new THREE.MeshPhysicalMaterial({color: 0xFFFFFF}));
    // cube.position.set(-10,25,0)
    // cube.castShadow = true;
    // scene.add(cube);

    // const sphere=new THREE.Mesh( new THREE.TorusKnotBufferGeometry( 12, 3, 1000, 26 ),new THREE.MeshPhysicalMaterial({color: 0xFFFFFF}))
    // sphere.position.set(20,20,0)
    // sphere.castShadow = true;
    // scene.add(sphere);

    let pause=false

    // コールバック関数 render をrequestAnimationFrameに渡して、
    // 繰り返し呼び出してもらう。
    const render = function () {
        window.requestAnimationFrame(render);
        // if(cube.position.y>25&&!pause){
        //     cube.position.y-=0.1;
        // }
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
        // sphere.rotation.x += 0.01;
        // sphere.rotation.y += 0.01;
        meshList.forEach(mesh=>{mesh.rotation.x+=0.01,mesh.rotation.y+=0.01,mesh.position.y-=0.1});
        meshList.forEach(mesh=>{if(mesh.position.y<0){  
            mesh.position.x = (Math.random() - 0.5) * 800;
            mesh.position.y = (Math.random() - 0.5) * 800;
            mesh.position.z = (Math.random() - 0.5) * 800;}})
        renderer.render(scene, camera);
    };
    render();

    $(window).keypress(function (eventObject) {
        // if ('w' == eventObject.key){
        //     cube.position.z -= 10;
        // }
        // if ('s' == eventObject.key){
        //     cube.position.z += 10;
        // }
        // if ('d' == eventObject.key){
        //     cube.position.x += 10;
        // }
        // if ('a' == eventObject.key){
        //     cube.position.x -= 10;
        // }
        // if(' '==eventObject.key){
        //     cube.position.y +=10;
        // }
        if('p'==eventObject.key){
            pause=!pause;
        }
    });
});