 void main() {
    
    float strength = 1.0-step( 0.5,distance(gl_PointCoord, vec2(0.5)));


      gl_FragColor = vec4(vec3(strength), 1.0);
      #include <colorspace_fragment>
    }