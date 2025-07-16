uniform float uSize;
uniform vec2 uResolution;
attribute float aSize;
attribute float aTimeMultiplier;
uniform float uProgress;

float remap(float value, float originMin, float originMax, float destinationMin, float destinationMax)
{
    return destinationMin + (value - originMin) * (destinationMax - destinationMin) / (originMax - originMin);
}


void main() {

    float progress = aTimeMultiplier * uProgress; // Use the time multiplier to adjust the progress

    float explosionProgress = remap(progress, 0.0, 0.1, 0.0, 1.0);
    explosionProgress = clamp(explosionProgress, 0.0, 1.0);
    explosionProgress = 1.0-pow(1.0-explosionProgress, 3.0); // Ease out effect

    float fallingProgress = remap(progress, 0.1, 1.0, 0.0, 1.0);
    fallingProgress = clamp(fallingProgress, 0.0, 1.0);
    fallingProgress = 1.0-pow(1.0-fallingProgress, 3.0);

    float scaleUp = remap(progress, 0.0, 0.125, 0.0, 1.0);
    scaleUp = clamp(scaleUp, 0.0, 1.0);

    float scaleDown = remap(progress, 0.125, 1.0, 1.0, 0.0);
    scaleDown = clamp(scaleDown, 0.0, 1.0);

    float scale = min(scaleUp, scaleDown);

    float twinkleProgress = remap(progress, 0.2, 0.8, 0.0, 1.0);
    twinkleProgress = clamp(twinkleProgress, 0.0, 1.0);
    float sizeTwinkling = sin (progress * 30.0 ) * 0.5 + 0.5; 
    sizeTwinkling =1.0 - sizeTwinkling * twinkleProgress; 
    
    vec3 newPosition = position * explosionProgress; // Explosion effect
    newPosition.y -=  fallingProgress * 0.2; // Falling effect

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    //final size
    gl_PointSize = uSize * uResolution.y * aSize * scale * sizeTwinkling;
    gl_PointSize *= 1.0/ - viewPosition.z;

    if (gl_PointSize < 1.0) {
        gl_Position = vec4(9999.9);
    }
}