uniform mat4 projectionMatrix; // transform into clip space coordinates
uniform mat4 viewMatrix;  // about the camera
uniform mat4 modelMatrix; // converted from mesh position, rotation, scale

attribute vec3 position;// position coming from geometry

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += sin(modelPosition.x * 10.0 ) * 0.1;
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
}