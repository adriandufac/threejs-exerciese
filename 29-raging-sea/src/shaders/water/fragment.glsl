uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uBigWavesElevation;

varying float vElevation;


void main (){
    float elevationNormalized = (vElevation + uBigWavesElevation) / (2.0 * uBigWavesElevation);
    vec3 color = mix(uDepthColor, uSurfaceColor, elevationNormalized );

    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>

}