var setupScene = function() {
    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45;
    var ASPECT = WIDTH / HEIGHT;
    var NEAR = 0.1;
    var FAR = 10000;

    // Create the scene and set the scene size.
    scene = new THREE.Scene();

    // Create a renderer and add it to the DOM = Direct Object Model.
    renderer = new THREE.WebGLRenderer({ alpha: true , antialias:true});
    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);
    // Set the background color of the scene.
    renderer.setClearColor( 0xffffff, 0);

    // Create a camera make it look at the scene.
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    //camera.position.set(0,6,0);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 10;
    // camera.lookAt(new THREE.Vector3(10, 0, 0));
    camera.lookAt(scene.position);
    scene.add(camera);

    // Create an event listener that resizes the renderer with the browser window.
    window.addEventListener('resize', function() {
        var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    });

    //spotlight
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-100, 100, -100);
    spotLight.castShadow = true;
    scene.add(spotLight);
    //ambient light
    scene.add(new THREE.AmbientLight(0x666666));

    //build axes
    var l = 5;
    axes = buildAxes(l);
    scene.add(axes);

    //mouse controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);


    //GUI -- no GUI yet, need to add this for 
    //addDatGui();
}

var to_rad = function(x) { 
    return x*Math.PI/180; 
}

//global stuff 
var cos = Math.cos 
var sin = Math.sin 
var pi = Math.PI
var a = to_rad(15); //alpha
var b = to_rad(30); //beta, we are solving for this 
var l = .5; //hole edge length
var e = 2*l*sin(b)-l*sin(a); //middle fold length
var m = 40; // number of cells around in a ring 
var n = 30; // number of cells high 
var phi_w = ((n-2)*pi)/n; //horizontal angle of each piece 
var r2 
var r1 

var x = new THREE.Vector3( 1, 0, 0 );
var y = new THREE.Vector3( 0, 1, 0 );
var z = new THREE.Vector3( 0, 0, 1 );


// some functions to sove equations 
// future this will solve for a range of a,b,l,e,n tubes, any possible combination 
// for now we set a and b to a reasonable value and hardcode to draw this tube and its fold pattern 


// var solve_b = function(phi_w,a,b) {
//     var f = function( cos(phi_w) - (-(cos(2*b) - cos(2*a) + sin(2*a)*sin(2*b))/(cos(2*a + 2*b) - 1)))
//     // "f is not a function"
//     numeric.uncmin(f,to_rad(30),0.01)
// }

// var solve_rho2 = function() {
    var r2 = Math.acos((sin(a + 2*b) - sin(a))/(2*sin(a)*(cos(b))^2 + 2*cos(a)*cos(b)*sin(b)))
// }   
    
// var solve_rho2 = function() {
//     f = sin(r1)*sin(r2) + (sin(b))^3  + cos(2*b)*sin(b)*cos(r2) + (sin(b)^3)*cos(r1)*(cos(r2))^2 + cos(2*b)*sin(b)*cos(r1)*cos(r2) - ((cos(b)^2)*sin(b)*cos(r1) - sin(b)*cos(r1)*(sin(r2))^2 - 2*(cos(b))^2*sin(r1)*sin(r2) - (cos(2*b))^2*sin(b)*cos(r2)^2 - 2*sin(b)^2*cos(r2)*sin(r1)*sin(r2))
// }


    //var phi_s = 

var flip_y = function(pts) {
    //takes a list of vertices
    length =  pts.length
    for (var i = 0; i < length;i++) {
        pts[i].x = pts[i].x*-1
    }
    return pts 
}

function isOdd(num) { return num % 2;}


// displayCar() {
//     var result = "A Beautiful " + this.year + " " + this.make
//         + " " + this.model;
//     pretty_print(result);
// }

var x = new THREE.Vector3( 1, 0, 0 );
var y = new THREE.Vector3( 0, 1, 0 );
var z = new THREE.Vector3( 0, 0, 1 );

// THREE.Geometry.prototype.translate = function(dx,dy,dz) {
//     this.translateOnAxis(x,dx) // [i*(e + l*sin(a)), 2*j*l*(cos(a) + cos(b)),0] )
//     this.translateOnAxis(y,dy) // [i*(e + l*sin(a)), 2*j*l*(cos(a) + cos(b)),0] )
//     this.translateOnAxis(z,dz) // [i*(e + l*sin(a)), 2*j*l*(cos(a) + cos(b)),0] )
//     return this 
// }

var make_cell = function(){
    // geometry objects are vertices and faces 
    var geometry = new THREE.Geometry();
    //there are only three vectors that describe the whole thing 
    //make these, then use them in addition/subtraction to define the cell
    //make copies of that cell by moving it on the triangular lattice 
    //d is for the hole, k is for the folds 
    //same nomenclature as in the thesis 

//this sets up the points for a single cell 
//make this into its only hex object? 

    o = new THREE.Vector3(0,0,0) // origin

//hole points 
    d1 = new THREE.Vector3(l*sin(a),l*cos(a),0)
    d2 = new THREE.Vector3(-l*sin(a),l*cos(a),0)
    d3 = new THREE.Vector3(0,2*l*cos(a),0)
    d4 = new THREE.Vector3(0,2*l*cos(a),0)

//fold points 
    k1 = new THREE.Vector3(l*sin(b),-l*cos(b),0) 
    k2 = new THREE.Vector3(e,0,0).add(d1)
    k3 = new THREE.Vector3(-l*sin(b),-l*cos(b),0) 
    k4 = new THREE.Vector3(-e,0,0).add(d2)
    k5 = new THREE.Vector3(d3.x+l*sin(b),d3.y+l*cos(b),0) 
    k6 = new THREE.Vector3(d4.x-l*sin(b),d4.y+l*cos(b),0)

//hex outline points 
    t = new THREE.Vector3(0,2*l*cos(b)+d3.y,0) 
    bot = new THREE.Vector3(0,-2*l*cos(b),0) 
    tl = new THREE.Vector3(-2*l*sin(b),d3.y,0) 
    bl = new THREE.Vector3(-2*l*sin(b),0,0)
    tr = new THREE.Vector3(2*l*sin(b),d3.y,0) 
    br = new THREE.Vector3(2*l*sin(b),0,0)

//different materials for different dxf layers 
    //have to move all of these point sets separately later... as Line objects w different materials 
    //might be worth it, since only certain objects will have borders, etc 
    // hole, folds, border would be the idea 

    folds = new THREE.LineBasicMaterial({linewidth: 1,color: 0x0000ff});
    hole = new THREE.LineBasicMaterial({linewidth: 1,color: 0xff0000});
    border = new THREE.LineBasicMaterial({linewidth: 1,color: 0xff0000});

    points = new THREE.Line(geometry, folds, THREE.LinePieces);

    points.geometry.vertices.push(o,d1)
    points.geometry.vertices.push(o,d2)
    points.geometry.vertices.push(o,k1)
    points.geometry.vertices.push(o,k3)
    points.geometry.vertices.push(d1,k2)
    points.geometry.vertices.push(d2,k4)
    points.geometry.vertices.push(d2,d4)
    points.geometry.vertices.push(d1,d3)
    points.geometry.vertices.push(d3,k5)
    points.geometry.vertices.push(d4,k6)

// old cell outline   
    // points.geometry.vertices.push(k2,k5)
    // points.geometry.vertices.push(k3,k4)
    // points.geometry.vertices.push(k4,k6)
    // points.geometry.vertices.push(k1,k3)
    // points.geometry.vertices.push(k1,k2)
    // points.geometry.vertices.push(k5,k6)

// hex outline 
    points.geometry.vertices.push(tl,bl)
    points.geometry.vertices.push(bl,bot)    
    points.geometry.vertices.push(bot,br)
    points.geometry.vertices.push(br,tr)
    points.geometry.vertices.push(tr,t)
    points.geometry.vertices.push(t,tl)


scene.add(points)

cols = new THREE.Object3D(); 
var width = m; //square grid 
        for (var i = 1; i < width; i++) {
            // clone the original cell, make a row with the correct 
            curr = points.clone().translateOnAxis(x,i*4*(l*sin(b)))
            //clone doesn't keep the original 
            cols.add(points,curr)
        }
scene.add(cols)

rows = new THREE.Object3D(); 
var height = n; //square grid 
        for (var j = 1; j < height; j++) {
            curr = cols.clone().translateOnAxis(y,j*2*l*(cos(a)+cos(b)))
            if (isOdd(j)){
                curr.translateOnAxis(x,e+l*sin(a))
            }
            rows.add(curr)
        }
scene.add(rows)

}

var make_tube = function(){

    var geometry = new THREE.Geometry();
    folds = new THREE.LineBasicMaterial({linewidth: 1,color: 0x0000ff});
    tube = new THREE.Line(geometry, folds, THREE.LinePieces);

    //rotation axes

    o = new THREE.Vector3(0,0,0) // origin

//hole points 
    d1 = new THREE.Vector3(l*sin(a),l*cos(a),0)
    d2 = new THREE.Vector3(-l*sin(a),l*cos(a),0)
    d3 = new THREE.Vector3(0,2*l*cos(a),0)
    d4 = new THREE.Vector3(0,2*l*cos(a),0)

//fold points 
    k1 = new THREE.Vector3(l*sin(b),-l*cos(b),0) 
    k2 = new THREE.Vector3(e,0,0) // different than flat version! 
    k3 = new THREE.Vector3(-l*sin(b),-l*cos(b),0) 
    k4 = new THREE.Vector3(-e,0,0)
    k5 = new THREE.Vector3(d3.x+l*sin(b),d3.y+l*cos(b),0) 
    k6 = new THREE.Vector3(d4.x-l*sin(b),d4.y+l*cos(b),0)

//hex outline points 
    t = new THREE.Vector3(0,2*l*cos(b)+d3.y,0) 
    bot = new THREE.Vector3(0,-2*l*cos(b),0) 
    tl = new THREE.Vector3(-2*l*sin(b),d3.y,0) 
    bl = new THREE.Vector3(-2*l*sin(b),0,0)
    tr = new THREE.Vector3(2*l*sin(b),d3.y,0) 
    br = new THREE.Vector3(2*l*sin(b),0,0)

    //rotate points of a single cell 

    // var vector = new THREE.Vector3( 1, 0, 0 );
    // var axis = new THREE.Vector3( 0, 1, 0 );
    // var angle = Math.PI / 2;
    // vector.applyAxisAngle( axis, angle );

    phi_s = to_rad(12) // 12 degrees rotate the whole thing 

    d1r = d1.clone().applyAxisAngle(k1,r2)
    k2r = k2.clone().applyAxisAngle(k1,r2).add(d1r)
    
    k1r = k1.clone().applyAxisAngle(x,-phi_s)
    d1r.applyAxisAngle(x,-phi_s)
    k2r.applyAxisAngle(x,-phi_s)

    //symmetric over y 
    k3r = k1r.clone().reflect(x) 
    k4r = k2r.clone().reflect(x) 
    d2r = d1r.clone().reflect(x)

    //other half of hole 
    d4r = d1r.clone().reflect(z).add(d2r)
    d3r = d2r.clone().reflect(z).add(d1r)

    //other half folds
    k5r = k1r.clone().reflect(y).add(d3r)
    k6r = k3r.clone().reflect(y).add(d4r)

    tube.geometry.vertices.push(o,d1r)
    tube.geometry.vertices.push(o,d2r)
    tube.geometry.vertices.push(o,k1r)
    tube.geometry.vertices.push(o,k3r)
    tube.geometry.vertices.push(d1r,k2r)
    tube.geometry.vertices.push(d2r,k4r)
    tube.geometry.vertices.push(d2r,d4r)
    tube.geometry.vertices.push(d1r,d3r)
    tube.geometry.vertices.push(d3r,k5r)
    tube.geometry.vertices.push(d4r,k6r)

    //hex outline points 
    t = k5r.clone().add(k3r.clone().reflect(y)) 
    bot = k1r.clone().add(k3r)  
    tl = new THREE.Vector3(k4r.x,d3.y,0) 
    tr = t.clone().add((k1r.clone().sub(bot)).multiplyScalar(2))
    bl = bot.clone().add((k3r.clone().sub(bot)).multiplyScalar(2))
    br = bot.clone().add((k1r.clone().sub(bot)).multiplyScalar(2))

    // tube.geometry.vertices.push(t,bot)
    // tube.geometry.vertices.push(bot,br)
    // tube.geometry.vertices.push(br,k2r)
    // tube.geometry.vertices.push(bl,k4r)    
    // tube.geometry.vertices.push(bot,bl)

    //rotate cells
    //make a row 

    phi_w = Math.acos(-(cos(2*b)-cos(2*a)+sin(2*a)*sin(2*b)/(cos(2*a+2*b)-1)))
    theta = (Math.PI - phi_w)

cols = new THREE.Object3D(); 
var width = 5; //square grid 
    for (var i = 1; i < width; i++) {
        // clone the original cell, make a row with the correct 
        curr = tube.clone()
        curr.translateOnAxis(z,2*e*cos(i*phi_w))
        curr.translateOnAxis(x,2*e*sin(i*phi_w))
        curr.rotateY(i*theta)
        cols.add(tube,curr)
    }
scene.add(cols)


    //clone one cell at time
    //move cells in a cylinder (convert x,y motion to cylindrical)
        //two for-loops 
        //circumference

    scene.add(tube)

}

// i is the row, j is the column
// if i is odd, the then use odd j 
// if i is even, then add 1 to j 

// to do 
// add edges to the boundary 
// add optional hex pattern to the cells 


    // ********** DXF output **********

var make_dxf = function() { 
    // put all points in a long 1D list for output
    coords = [];
    length = points.geometry.vertices.length //all the points
    for (var i = 0; i < length;i++) {
        coords.push(points.geometry.vertices[i].x);
        coords.push(points.geometry.vertices[i].y);
    }

    var blobparts = ccl2dxf(coords, 0, 20, 0, 20);
    var blob = new Blob(blobparts, {type: "text/plain"});
    //saveAs(blob, "kiri.dxf");
}


// Does this need to be a function?
var renderScene = function() {
  renderer.render(scene, camera);
  //points.geometry.verticesNeedUpdate = true; // ask for an update
  //points.geometry.elementsNeedUpdate = true; // ask for an update
}

var animateScene = function() {
    controls.update();
    renderScene();
    requestAnimationFrame(animateScene);
}

// Here, call the functions all at once.
setupScene();
make_cell();
// make_tube();
animateScene();
