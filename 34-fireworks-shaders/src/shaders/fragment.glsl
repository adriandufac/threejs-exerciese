uniform sampler2D uTexture;
uniform vec3 uColor; 
void main() {

    float textureAlpha = texture(uTexture, gl_PointCoord).r;

    gl_FragColor = vec4(uColor,textureAlpha); // Red color
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}