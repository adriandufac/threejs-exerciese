uniform mat4 projectionMatrix; // transform into clip space coordinates
uniform mat4 viewMatrix;  // about the camera
uniform mat4 modelMatrix; // converted from mesh position, rotation, scale

uniform vec2 uFrequency; // from the material
uniform float uTime;


attribute vec3 position;// position coming from geometry
attribute vec2 uv;
varying vec2 vUv;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime  ) * 0.1;
    modelPosition.z += sin(modelPosition.y * uFrequency.y - uTime ) * 0.1;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
    vUv = uv;
}