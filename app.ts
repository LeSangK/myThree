import $ = require("jquery")
import THREE = require("three");

$(function () {
    const $mainFrame = $("body");

    // シーン、カメラ、レンダラを生成
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, $mainFrame.width() / $mainFrame.height(), 1, 10000);
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
    light.position.set(50,50,-50)
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.castShadow = true;
    scene.add(light);    

     //Light2
    const light2 = new THREE.DirectionalLight(0xFFFFFF, 1);
    // ライトに影を有効にする
    light2.shadow.mapSize.width = 2048;
    light2.shadow.mapSize.height = 2048;
    light2.castShadow = true;
    scene.add(light2);   

    //太陽
    const sun =new THREE.Mesh(new THREE.SphereBufferGeometry(10,32,32),new THREE.MeshStandardMaterial({color:0xFF5733}))
    sun.position.set(50,50,-50)
    scene.add(sun)


    // 床を作成
    const meshFloor = new THREE.Mesh(
    new THREE.BoxGeometry(2000, 0.1, 2000),
    new THREE.MeshStandardMaterial());
    // 影を受け付ける
    meshFloor.receiveShadow = true;
    scene.add(meshFloor);

     
    const cube = new THREE.Mesh(new THREE.BoxGeometry(25, 25, 25), new THREE.MeshPhysicalMaterial({color: 0xFFFFFF}));
    cube.position.set(-10,25,0)
    cube.castShadow = true;
    scene.add(cube);

    const sphere=new THREE.Mesh( new THREE.TorusKnotBufferGeometry( 12, 3, 1000, 26 ),new THREE.MeshPhysicalMaterial({color: 0x000790}))
    sphere.position.set(20,20,0)
    sphere.castShadow = true;
    scene.add(sphere);

    let pause=false

    // コールバック関数 render をrequestAnimationFrameに渡して、
    // 繰り返し呼び出してもらう。
    const render = function () {
        window.requestAnimationFrame(render);
        if(cube.position.y>25&&!pause){
            cube.position.y-=0.1;
        }
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
        renderer.render(scene, camera);
    };
    render();

    $(window).keypress(function (eventObject) {
        if ('w' == eventObject.key){
            cube.position.z -= 10;
        }
        if ('s' == eventObject.key){
            cube.position.z += 10;
        }
        if ('d' == eventObject.key){
            cube.position.x += 10;
        }
        if ('a' == eventObject.key){
            cube.position.x -= 10;
        }
        if(' '==eventObject.key){
            cube.position.y +=10;
        }
        if('p'==eventObject.key){
            pause=!pause;
        }
    });
});