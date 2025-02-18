precision mediump float;
uniform vec3 uColor;

uniform sampler2D uTexture;

varying vec2 vUv;

  
void main() {
    vec4 texture = texture2D(uTexture, vUv);
    gl_FragColor = vec4(texture.r, texture.g, texture.b, texture.a);
}