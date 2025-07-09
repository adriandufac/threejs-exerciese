varying vec3 vPosition;
varying vec3 vNormal;

uniform float uTime;
uniform vec3 uColor;

void main() {
    vec3 normal = normalize(vNormal);

    if(!gl_FrontFacing) {
        normal = -normal;
    }

    float stripes = mod(20.0*(vPosition.y-uTime/20.0),1.0);
    stripes = pow (stripes, 3.0);

    vec3 viewDirection = normalize(vPosition - cameraPosition);

    float fresnel = dot(viewDirection, normal) + 1.0;
    fresnel = pow(fresnel, 2.0);

    //falloff
    float falloff = smoothstep(0.8, 0.0, fresnel);

    float holographic = stripes * fresnel;
    holographic += fresnel * 1.2;
    holographic *= falloff;

    

    gl_FragColor = vec4(uColor,  holographic); 
    // 
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}