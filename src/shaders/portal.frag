#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

varying vec2 vUv; 
varying vec3 vNormal;
varying vec3 vPosition;
uniform float uT;

float dist(float x1, float y1, float x2, float y2){
  return sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));
}

float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {

  float d = dist(vUv.x,vUv.y, 0.5,.5);

  float sn = snoise3(vec3(vUv*5., uT*0.01));
  float mn = map(sn,-1.,1.,0.,1.);
  float ln = step(mn, .6) - step(mn, .4);

  float w = (sin(uT*0.1-d*10.)+1.)/2.;

  vec3 blue = vec3(0.,0.6,1); 
  vec4 col = vec4(blue, ln);
  col += vec4(w);
  col.a *=(1.-d*2.);

  gl_FragColor = vec4(col);
}