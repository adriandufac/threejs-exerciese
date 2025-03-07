varying vec2 vUv;

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
    float strengthx = mod((vUv.x * 10.0), 1.0);
    float strengthx1 = step(0.8, strengthx);
    float strengthx2 = step(0.3, strengthx);
    float strengthy = mod(vUv.y * 10.0 , 1.0);
    float strengthy1 = step(0.3, strengthy);
    float strengthy2 = step(0.8, strengthy);
    float strength = (strengthx1 * strengthy1)+ (strengthx2 * strengthy2);

        gl_FragColor = vec4(vec3(strength), 1.0);
}