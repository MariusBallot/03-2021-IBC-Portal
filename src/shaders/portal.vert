varying vec2 vUv; 
varying vec3 vNormal;
varying vec3 vPosition;
uniform float uT;


void main() {
  vUv = uv; 
  vNormal = normal;
  vPosition = position;

  float d = sqrt((vUv.x - 0.5)*(vUv.x - 0.5) + (vUv.y - 0.5)*(vUv.y - 0.5));

  vec3 pos = position;
  pos.y = sin(d*10.+uT*0.1)*0.1;

  vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * modelViewPosition; 
}