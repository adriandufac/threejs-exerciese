uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uBigWavesElevation;

varying float vElevation;


void main (){
    // Calculer l'élévation maximale possible
    float elevationNormalized = (vElevation + uBigWavesElevation) / (2.0 * max(uBigWavesElevation, 0.01));
    vec3 color = mix(uDepthColor, uSurfaceColor, elevationNormalized );

    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>

}