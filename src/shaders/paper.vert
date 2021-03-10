varying vec2 vUv; 
varying vec3 vNormal;
varying vec2 vNMatCap;
varying vec3 vPosition;
varying float vW;

uniform float uT;


void main() {
  vUv = uv; 
  vNormal = normal;
  vPosition = position;

  vec4 p = vec4( position, 1. );

  vec3 e = normalize( vec3( modelViewMatrix * p ) );
  vec3 n = normalize( normalMatrix * normal );

  vec3 r = reflect( e, n );
  float m = 2. * sqrt(
    pow( r.x, 2. ) +
    pow( r.y, 2. ) +
    pow( r.z + 1., 2. )
  );
  vNMatCap = r.xy / m + .5;


  vec3 pos = position;
  vW = sin(vUv.x*5.+uT*0.1);
  pos.z = vW*0.1;

  vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * modelViewPosition; 
}