varying vec3 vPosition;
varying vec3 vNormal;

uniform float uTime;

#include ../includes/random2D.glsl;

void main() {
    //position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    //glitch
    float glitchTime = uTime - modelPosition.y;
    float glitchStrength = sin(glitchTime) +sin(glitchTime * 3.45) + sin
    (glitchTime* 8.76);
    glitchStrength = glitchStrength/3.0;
    glitchStrength = smoothstep(0.3, 1.0, glitchStrength);
    glitchStrength *= 0.2; // Adjust the strength of the glitch effect

    modelPosition.x += (random2D(modelPosition.xy + uTime)-0.5) * glitchStrength;
    modelPosition.z += (random2D(modelPosition.zx + uTime)-0.5) * glitchStrength;
    //final position
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    //Model normal
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

    vPosition = modelPosition.xyz;
    vNormal =  modelNormal.xyz;

}