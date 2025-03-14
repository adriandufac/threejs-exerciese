varying vec2 vUv;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

//	Classic Perlin 2D Noise 
//	by Stefan Gustavson (https://github.com/stegu/webgl-noise)
//
vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
float cnoise(vec2 P){
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 * 
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}
void main()
{
  
    //pattern3
    //float strength = vUv.x;

    //pattern4
    //float strength = vUv.y;

    //pattern5
    //float strength = (1.0-vUv.y);

    //pattern6
    //float strength = vUv.y * 10.0;

    //pattern7
    //float strength = mod(vUv.y * 10.0, 1.0);

    //pattern8
    //float strength = round(mod(vUv.y * 10.0, 1.0));

    //pattern9
    //float strength = mod(vUv.y * 10.0, 1.0);
    //strength = step(0.8, strength);

    //pattern10
    //float strength = mod(vUv.x * 10.0, 1.0);
    //strength = step(0.8, strength);

    //pattern11
    /* float strengthx = mod(vUv.x * 10.0, 1.0);
    strengthx = step(0.8, strengthx);
    float strengthy = mod(vUv.y * 10.0, 1.0);
    strengthy = step(0.8, strengthy);
    float strength = strengthx + strengthy; */
    
    //pattern12
    /* float strengthx = mod(vUv.x * 10.0, 1.0);
    strengthx = step(0.8, strengthx);
    float strengthy = mod(vUv.y * 10.0, 1.0);
    strengthy = step(0.8, strengthy);
    float strength = (strengthx * strengthy); */

    //pattern13
    /* float strengthx = mod(vUv.x * 10.0, 1.0);
    strengthx = step(0.3, strengthx);
    float strengthy = mod(vUv.y * 10.0, 1.0);
    strengthy = step(0.8, strengthy);
    float strength = (strengthx * strengthy); */

     //pattern14
   /*  float strengthx = mod((vUv.x * 10.0), 1.0);
    float strengthx1 = step(0.8, strengthx);
    float strengthx2 = step(0.3, strengthx);
    float strengthy = mod(vUv.y * 10.0, 1.0);
    float strengthy1 = step(0.3, strengthy);
    float strengthy2 = step(0.8, strengthy);
    float strength = (strengthx1 * strengthy1)+ (strengthx2 * strengthy2); */

    //pattern15
   /*  float barX = step(0.4 , mod(vUv.x * 10.0, 1.0));
    barX *= step(0.8 , mod(vUv.y * 10.0 +0.2, 1.0));

    float barY = step(0.8 , mod(vUv.x * 10.0 + 0.2, 1.0));
    barY *= step(0.4 , mod(vUv.y * 10.0, 1.0));
    float strength = barX + barY; */

    //pattern16
    //float strength =abs(vUv.x -0.5);

    //pattern17
    //float strength =min(abs(vUv.x -0.5), abs(vUv.y-0.5));

    //pattern 18
    //float strength = max(abs(vUv.x -0.5), abs(vUv.y-0.5));
   
    //pattern 19
    /* float tmp = max(abs(vUv.x -0.5), abs(vUv.y-0.5));
    float strength = step(0.2, tmp); */

    //pattern 20
    /* float tmp = max(abs(vUv.x -0.5), abs(vUv.y-0.5));
    float square1 = step(0.2, tmp);
    float square2 = 1.0 -step(0.3, tmp);
    float strength = square1 * square2; */

    //pattern 21
    //float strength = floor(vUv.x*10.0)/10.0;

    //pattern 22
    //float strength = floor(vUv.x*10.0)/10.0 * floor(vUv.y*10.0)/10.0;

    //pattern 23
    //float strength = random(vUv);

    //pattern 24
    /* vec2 uvGrid = vec2(floor(vUv.x*10.0)/10.0, floor(vUv.y*10.0)/10.0);
    float strength = random(uvGrid); */

    //pattern 25
    /* vec2 uvGrid = vec2((floor(vUv.x*10.0)/10.0), floor(vUv.y*10.0+5.0*vUv.x)/10.0);
    float strength = random(uvGrid); */

    //pattern 26
    //float strength = length(vUv);

    //pattern 27
    /* float strength = length(vUv-0.5);
    float strength2 = distance(vUv,vec2(0.5,0.5)); */

    //Patern 28
    //float strength = 1.0-distance(vUv,vec2(0.5,0.5));

    //Patern 29
    /* float strength = pow(1.0-distance(vUv,vec2(0.5,0.5)),15.0);
    float strength2 = 0.015/distance(vUv,vec2(0.5,0.5)); */

    //Patern 30
    /* vec2 vuV2 = vec2(vUv.x * 0.1 +0.45, vUv.y);
    float strength = pow(1.0-distance(vuV2,vec2(0.5,0.5)),15.0);
    float strength2 = 0.015/distance(vUv,vec2(0.5,0.5)); */
    

    //pattern 31
/*      vec2 vuV2 = vec2(vUv.x * 0.3 +0.35, vUv.y);
     vec2 vuV3 = vec2(vUv.x , vUv.y * 0.3 +0.35);
    float strengthx = pow(1.0-distance(vuV2,vec2(0.5,0.5)),15.0);
    float strengthy = pow(1.0-distance(vuV3,vec2(0.5,0.5)),15.0); */


    //pattern 32
/*     vec2 rotatedUV = rotate(vUv, 3.14159/4.0, vec2(0.5, 0.5));
    vec2 vuV2 = vec2(rotatedUV.x * 0.3 +0.35, rotatedUV.y);

    vec2 vuV3 = vec2(rotatedUV.x , rotatedUV.y * 0.3 +0.35);

    float strengthx = pow(1.0-distance(vuV2,vec2(0.5,0.5)),15.0);
    float strengthy = pow(1.0-distance(vuV3,vec2(0.5,0.5)),15.0); */


    //pattern 33
   /*  float strength = distance(vUv,vec2(0.5,0.5));
    strength = step(0.2, strength); */

    //pattern 34
    //float strength = abs(distance(vUv,vec2(0.5,0.5)) -0.25);

    //pattern 35
    //float strength = step(0.01,abs(distance(vUv,vec2(0.5,0.5)) -0.25));

    //pattern 36
    //float strength = 1.0-step(0.01,abs(distance(vUv,vec2(0.5,0.5)) -0.25));

    //pattern 37
    /* vec2 sinUV = vec2(vUv.x, vUv.y + sin(vUv.x *30.0) * 0.1);
    float strength = 1.0-step(0.01,abs(distance(sinUV,vec2(0.5,0.5)) -0.25)); */
    
    //pattern 38
    /* vec2 sinUV = vec2(vUv.x + sin(vUv.y *30.0) * 0.1, vUv.y + sin(vUv.x *30.0) * 0.1);
    float strength = 1.0-step(0.01,abs(distance(sinUV,vec2(0.5,0.5)) -0.25)); */

    //pattern 39
    /* vec2 sinUV = vec2(vUv.x + sin(vUv.y *100.0) * 0.1, vUv.y + sin(vUv.x *100.0) * 0.1);
    float strength = 1.0-step(0.01,abs(distance(sinUV,vec2(0.5,0.5)) -0.25)); */

    //pattern 40
   /*  float angle = atan(vUv.x , vUv.y);
    float strength = angle; */

    //pattern 41
/*     float angle = atan(vUv.x -0.5 , vUv.y -0.5);
    float strength = angle; */

    //pattern 42
/*     float angle = atan(vUv.x -0.5 , vUv.y -0.5)/6.0 +0.5;
    float strength = angle;
 */
    //pattern 43
    /* float angle = atan(vUv.x -0.5 , vUv.y -0.5)/6.28 +0.5;
    float strength = mod(20.0 * angle, 1.0); */

    //pattern 44
/*     float angle = atan(vUv.x -0.5 , vUv.y -0.5)/6.28 +0.5;
    float strength = sin(angle*100.0); */

    //pattern 45
   /*  float angle = atan(vUv.x -0.5 , vUv.y -0.5)/6.28 +0.5;
    float radiusOffset = sin(angle*100.0);
    float strength = 1.0-step(0.01,abs(distance(vUv,vec2(0.5,0.5)) -0.25 + radiusOffset*0.02)); */

    //pattern 46
    //float strength = cnoise(vUv*10.0);

    //pattern 47
    //float strength = step(0.0,cnoise(vUv*10.0));

    //pattern 48
    //float strength = 1.0-abs(cnoise(vUv*10.0));

    //pattern 49
    float strength = sin(cnoise(vUv*10.0)*20.0);

    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv, 1.0);
    vec3 mixedColor = mix(blackColor, uvColor, strength);
        gl_FragColor = vec4(vec3(mixedColor), 1.0);

}