#pragma glslify: matcap = require(matcap);

varying vec2 vUv; 
varying vec3 vNormal;
varying vec2 vNMatCap;
varying vec3 vPosition;
varying float vW;


uniform float uT;
uniform vec3 uCamVec;
uniform sampler2D uMatCap;

float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {

  float d = sqrt((vUv.x - 0.5)*(vUv.x - 0.5) + (vUv.y - 0.5)*(vUv.y - 0.5));

  vec2 mUv = matcap(uCamVec, vNormal);
  vec4 tex = texture2D(uMatCap, vNMatCap);

  vec4 col = vec4(tex*map(vW, -1.,1., 1.5,1.));
  gl_FragColor = vec4(col);
}