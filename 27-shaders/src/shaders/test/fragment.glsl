precision mediump float;

varying float vRandom; // coming from vertex shader
  
void main() {
    gl_FragColor = vec4(0.6, vRandom, 1.0, 1.0);
}