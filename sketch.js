let img;

let p;
let v;
let step = 5;
let samples = 10;

function preload() {
  img = loadImage("heightmap.png");
}

function setup() {
  let ratio = img.width / img.height;
  createCanvas(800, 800 / ratio);

  console.log(img.width, img.height);
  p = createVector(width / 2, height / 2);
  v = createVector(0, step);

  frameRate(24);
}

function draw() {
  background(250);

  let theta = 260 / samples;
  let minVal = 1000;
  let minPos = null;
  for (let i = 0; i < samples; i++) {
    let p2 = p5.Vector.add(p, v);
    let lookupX = map(p2.x, 0, width, 0, img.width);
    let lookupY = map(p2.y, 0, height, 0, img.height);
    let col = img.get(lookupX, lookupY);
    // console.log(col);
    let r = red(col);
    if (r < minVal) {
      minVal = r;
      minPos = p2;
    }
    v.rotate(radians(theta));
    // console.log(r);
  }

  image(img, 0, 0, width, height);
  noStroke();
  fill("red");
  ellipse(p.x, p.y, 5, 5);
  fill("green");
  ellipse(minPos.x, minPos.y, 5, 5);

  p = minPos;

  // noLoop();
}

function mouseClicked() {
  console.log("mouseClicked");
  p.set(mouseX, mouseY);
}

// class Particle(){
//   constructor(x,y){
//     this.position = createVector(x,y);
//     this.velo
//   }
// }
