export const source = `
/*
"Flame thrower" by Emmanuel Keller aka Tambako - June 2016
License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
Contact: tamby@tambako.ch
*/

// ToDo
// * Variation power flame thrower with time
// * Better texture2D/color tube (bump)
// * Amb Occ
// * Problem bump slow
// * Lamp(s) for flame thrower
// * Heat refraction
// - Speed/compile optimisations

float iTime;

#define pi 3.14159265359

// Switches, you can play with them, but be careful, some options can crash your browser!
#define specular
#define reflections
#define ambocc
//#define test_ambocc
#define bump_maps
#define show_floor
#define show_wall
#define show_tube
#define show_flame
#define flame_a_turb
#define heat_refraction
//#define antialias

struct Lamp
{
  	vec3 position;
  	vec3 color;
  	float intensity;
  	float attenuation;
};

struct RenderData
{
  	vec3 col;
  	vec3 pos;
  	vec3 norm;
  	int objnr;
};
   
// Every object of the scene has its ID
#define SKY_OBJ        0
#define FLAME_OBJ      1
#define TUBE_OBJ       2
#define FLOOR_OBJ      3
#define WALL_1_OBJ     4
#define WALL_2_OBJ     5

Lamp lamps[3];

// Campera options
vec3 campos = vec3(0.5, -0.4, 10.);
vec3 camtarget = vec3(0., 0.7, 0.);
vec3 camdir;
float fov = 4.5;
float angle;
float angle2;

// Ambient light
const vec3 ambientColor = vec3(0.3);
const float ambientint = 0.;

// Color options
const vec3 flameColor = vec3(1., 0.68, 0.32);
const vec3 tubeColor = vec3(0.3, 0.32, 0.42);
const vec3 floorColor = vec3(0.5, 0.5, 0.54);
const vec3 wallColor = vec3(0.3, 0.3, 0.34);

// Shading options
const float specint = 0.14;
const float specshin  = 5.;
const float aoint = 0.42;
    
// Tracing options
const float normdelta = 0.001;
const float maxdist = 30.;

// Antialias. Change from 1 to 2 or more AT YOUR OWN RISK! It may CRASH your browser while compiling!
const float aawidth = 0.8;
const int aasamples = 2;

const float tubeDiameter = 0.14;
const float tubeLenght = 0.8;
const vec3 flamePos = vec3(0.05, 1.1, 1.5);

bool traceFlame = true;

float flameVar;

float textureScale = 0.3;
float rms;
const float rmb = 0.8;

void init()
{
    // The lamps
    lamps[0] = Lamp(vec3(-1.5, 3., 1.), vec3(1., 1., 1.), 1.2, 0.01); // 1.2
    lamps[1] = Lamp(vec3(-5., 12., 15.), vec3(0.65, 0.75, 1.), 1.05, 0.01); // 0.9
    lamps[2] = Lamp(flamePos*2., 1.2*flameColor, 0., 0.01);
    
    rms = 0.28 + 0.003*iTime;
    
    // Power of the flame in function of the time
    flameVar = sin(iTime*0.55) + 0.56*sin(iTime*0.134) + 0.22*sin(iTime*0.095);
}

// Union operation from iq
vec2 opU(vec2 d1, vec2 d2)
{
	return (d1.x<d2.x) ? d1 : d2;
}

vec2 rotateVec(vec2 vect, float angle)
{
    vec2 rv;
    rv.x = vect.x*cos(angle) - vect.y*sin(angle);
    rv.y = vect.x*sin(angle) + vect.y*cos(angle);
    return rv;
}

vec3 rotateVec2(vec3 posr)
{
    posr = vec3(posr.x, posr.y*cos(angle2) + posr.z*sin(angle2), posr.y*sin(angle2) - posr.z*cos(angle2));
    posr = vec3(posr.x*cos(angle) + posr.z*sin(angle), posr.y, posr.x*sin(angle) - posr.z*cos(angle)); 
    
    return posr;
}

// 1D hash function
float hash(float n)
{
    return fract(sin(n)*753.5453123);
}

// From https://www.shadertoy.com/view/4sfGzS
float noise(vec3 x)
{
    //x.x = mod(x.x, 0.4);
    vec3 p = floor(x);
    vec3 f = fract(x);
    f = f*f*(3.0-2.0*f);
	
    float n = p.x + p.y*157.0 + 113.0*p.z;
    return mix(mix(mix(hash(n+  0.0), hash(n+  1.0),f.x),
                   mix(hash(n+157.0), hash(n+158.0),f.x),f.y),
               mix(mix(hash(n+113.0), hash(n+114.0),f.x),
                   mix(hash(n+270.0), hash(n+271.0),f.x),f.y),f.z);
}

// From https://www.shadertoy.com/view/Xds3zN
float sdCylinder(vec3 p, vec2 h)
{
    vec2 d = abs(vec2(length(p.xz),p.y)) - h;
    return min(max(d.x,d.y),0.0) + length(max(d,0.0));
}

// Distance mapping function of the tube where the flame comes
float map_tube(vec3 pos)
{
    pos-= flamePos;
    pos.x+= tubeLenght;
    pos = pos.yxz;
    
    float df = sdCylinder(pos, vec2(tubeDiameter, tubeLenght));
    df+= -0.006 + 0.003*noise(pos*vec3(70., 20., 70.));
    df = max(df, -sdCylinder(pos, vec2(tubeDiameter - 0.02, tubeLenght + 0.02)));
    return df;
}

// Gets the height of the water on the floor
float waterPos;
float getWaterPos(vec3 pos)
{
    vec3 pos2 = pos + vec3(0.3*noise(pos*4.2),
                          0.27*noise(pos*6.5),
                          0.32*noise(pos*3.8))
                      + vec3 (7., 0.5, 12.);
    return noise(pos2*1.7) - 0.1 
        + 1.2*smoothstep(-0.3, 0.2, pos.x) 
        + 1.4*smoothstep(0.3, -0.2, pos.z);
    return 0.;
}

// Get the bumpmap of the floor/walls
float getBumps(vec3 pos, int objnr)
{
    #ifdef bump_maps
    if (objnr==FLOOR_OBJ)
    {
    	float a = 0.8*smoothstep(rms + 0.2, rms, waterPos);
    	return 0.025*(texture2D(iChannel0, pos.xz*textureScale + vec2(0.55, 0.)).r*a - 0.55*a);
    }
    else if (objnr==WALL_1_OBJ)
        return 0.01*texture2D(iChannel0, pos.yz*textureScale).r;
    else if (objnr==WALL_1_OBJ)
        return 0.01*texture2D(iChannel0, pos.xy*textureScale).r;
    else
        return 0.;
    #else
    return 0.;
    #endif    
}

// Distance mapping function of the floor
float map_floor(vec3 pos)
{
    return pos.y;
}

// Distance mapping function of the wall on the left
float map_wall_1(vec3 pos)
{
    return -pos.x;
}

// Distance mapping function of the wall behind
float map_wall_2(vec3 pos)
{
    return pos.z;
}

// Flame parameters
const float flameIntensity = 0.4;
const float flameStep = 0.07;
const float flamePow = 1.5;
const float flameBias = 0.;
const float faf = 0.18;
const float fd0 = -0.04;
const float fg = 0.02;
const float dnf = -0.25;
const float dnx = 0.26;
const float dns = 40.;
const float fdx = 0.2;
const float fts = 6.;
const float ftf = 1.1;
float ft;

const float fcp = 1.5;

// Simplified mapping function of the flame
float map_flame_s(vec3 pos)
{
   
    vec3 q = pos*0.6;
    q*= vec3(1., 1.5, 1.);
    q+= vec3(ft, 0., 0.);
    float dn = 0.5*(dnf - dnx*pos.x);
    pos.x+= dn*noise(q + vec3(12., 3. + ft, 16.)) - dn/2.;
    pos.y+= dn*noise(q + vec3(14., 7., 20.)) - dn/2.;
    pos.z+= dn*noise(q + vec3(8., 22., 9.)) - dn/2.;

    float df = length(pos.yz) + 0.8*pos.x + 2.;
    
    return df;
}

// Main mapping function of the flame
float map_flame(vec3 pos, bool turb, bool bounding)
{  
    #ifdef show_flame
    if (!traceFlame && bounding)
        return 10.;
    
    ft = iTime*dns;
    
    pos-= flamePos;
    pos.x+= tubeLenght - 0.33;
    pos.y+= pos.x*pos.x*fg - fg;
 
    vec3 q = pos*fts;
    
    if (turb)
    {
        #ifdef flame_a_turb
        float n = 0.07*noise(q*0.6);
        q.xy = rotateVec(-q.xy, pos.z*n);
    	q.yz = rotateVec(-q.yz, pos.x*n);
    	q.zx = rotateVec(-q.zx, pos.y*n);
    	#endif
        
    	q*= vec3(1., 1.5, 1.);
        q+= vec3(ft, 0., 0.);
    	q.x+= 0.5*pos.x*noise(q + vec3(30., 40., 50. + ft));
    	q.y+= 0.5*pos.x*noise(q + vec3(10., 30. + ft, 20.));
    	q.z+= 0.5*pos.x*noise(q + vec3(20., 60. - ft, 40. - ft));
 
    	float dn = (dnf - dnx*pos.x);
    	pos.x+= dn*noise(q + vec3(12., 3.+ ft, 16. - ft)) - dn/2.;
    	pos.y+= dn*noise(q + vec3(14., 7., 20.)) - dn/2.;
    	pos.z+= dn*noise(q + vec3(8. + ft*0.3, 22., 9.)) - dn/2.;
    }        
    
    float df = length(pos.yz) + faf*pos.x + fd0;
    
    if (bounding)
    {
        df-= 0.5*smoothstep(-1.1, -4., pos.x);
        df = mix(df, sdCylinder(pos.yxz + vec3(0., 1., 0.), vec2(tubeDiameter - 0.01, tubeLenght*2.)), smoothstep(-1.3, -1.12, pos.x));   
    }
    else
        df = mix(df, sdCylinder(pos.yxz + vec3(0., 1., 0.), vec2(tubeDiameter + 0.01, tubeLenght*2.)), smoothstep(-1.5, -1.12, pos.x));   

    return df;
    #else
    return 10.;
    #endif
}

// Main mapping function
vec2 map(vec3 pos)
{
    vec2 res;

    float tube = map_tube(pos);
    float ffloor = map_floor(pos);
    float wall1 = map_wall_1(pos);
    float wall2 = map_wall_2(pos);
    float flame = map_flame(pos, false, true);
    
    res = vec2(tube, TUBE_OBJ);
    res = opU(vec2(ffloor, FLOOR_OBJ), res);
    res = opU(vec2(wall1, WALL_1_OBJ), res);
    res = opU(vec2(wall2, WALL_2_OBJ), res);
    //res = opU(vec2(flame, TUBE_OBJ), res);
    res = opU(vec2(flame, FLAME_OBJ), res);

    return res;
}

// Main tracing function
vec2 trace(vec3 cam, vec3 ray, float maxdist) 
{
    float t = 0.02;
    float objnr = 0.;
    vec3 pos;
    float dist;
    float dist2;
    
  	for (int i = 0; i < 76; ++i)
    {
    	pos = ray*t + cam;
        vec2 res = map(pos);
        dist = res.x;
        if (dist>maxdist || abs(dist)<0.002)
            break;
        t+= dist*0.75;
        objnr = abs(res.y);
  	}
  	return vec2(t, objnr);
}

// Gets the normal at specified position
vec3 getNormal(vec3 pos, float e, int objnr)
{  
    vec2 q = vec2(0, e);
    vec3 b = vec3(map(pos + q.yxx).x - map(pos - q.yxx).x,
                  map(pos + q.xyx).x - map(pos - q.xyx).x,
                  map(pos + q.xxy).x - map(pos - q.xxy).x);
    
    waterPos = getWaterPos(pos);
    b+= vec3(getBumps(pos + q.yxx, objnr) - getBumps(pos - q.yxx, objnr),
             getBumps(pos + q.xyx, objnr) - getBumps(pos - q.xyx, objnr),
             getBumps(pos + q.xxy, objnr) - getBumps(pos - q.xxy, objnr));
        
        
    
    return normalize(b);
}

// Gets the color of the sky
vec3 sky_color(vec3 ray)
{ 
    return vec3(0.);
}

// Gets the color of the tube
vec3 getTubeColor(vec3 pos)
{
    return tubeColor*texture2D(iChannel2, vec2(pos.x, 2.*atan(pos.y, pos.z))).rrr;
}

// Gets the color of the floor
vec3 getFloorColor(vec3 pos)
{
    return floorColor*mix(texture2D(iChannel0, pos.xz*textureScale + vec2(0.55, 0)).rgb, 
    texture2D(iChannel0, pos.xz*textureScale + vec2(0.55, 0)).rrr, 0.8);
}

// Gets the color of the wall on the left
vec3 getWallColor1(vec3 pos)
{
    return wallColor*mix(texture2D(iChannel0, pos.yz*textureScale).rgb, 
                         texture2D(iChannel0, pos.yz*textureScale).rrr, 0.6);
}

// Gets the color of the wall behind
vec3 getWallColor2(vec3 pos)
{
    return wallColor*mix(texture2D(iChannel0, pos.xy*textureScale).rgb, 
                         texture2D(iChannel0, pos.xy*textureScale).rrr, 0.6);
}

// Gets the reflection factor of the floor in function of the position
float getFloorReflection(vec3 pos)
{
    return 0.85*smoothstep(rms - 0.1, rms + 0.25, getWaterPos(pos));
}

// Gets the color of the flame
vec3 getFlameColor(vec3 pos)
{
    return flameColor;
}

// Gets the color of the flame depending on the position and ray direction by volume sampling
vec3 getFlameDensColor(vec3 pos, vec3 ray, float s, float fi, int nbSteps)
{
    float d = 1.;
    float f;
    vec3 scol = vec3(0.);
    for (int i=0; i<70; i++)
    {
    	if (i==nbSteps)
            break;
        pos+= ray*s;
        f = -map_flame(pos, true, false);
        f = sign(f)*pow(abs(f), flamePow);
    	d = clamp(f + flameBias, 0., 10.);
        d*= smoothstep(-7. - 0.8*flameVar, -4. - 0.3*flameVar, pos.x)*smoothstep(-1.3, -1.5, pos.x)*(3. + 0.4*pos.x);
        d*= (0.7 + 20./(pow(abs(pos.x), 3.) + 1.3));
        d*= 1. + 14.*smoothstep(-1.88, -1.2, pos.x);
        scol+= d*getFlameColor(pos);
    }
    
    return clamp(scol*fi, 0., 1.5);
}
    
// Combines the colors
vec3 getColor(vec3 norm, vec3 pos, int objnr, vec3 ray)
{
   pos = rotateVec2(pos);
   return (objnr==TUBE_OBJ?getTubeColor(pos):
          (objnr==FLOOR_OBJ?getFloorColor(pos):
          (objnr==WALL_1_OBJ?getWallColor1(pos):
          (objnr==WALL_2_OBJ?getWallColor2(pos):
           vec3(0.)))));
}

// From https://www.shadertoy.com/view/Xds3zN
float calcAO(in vec3 pos, in vec3 nor)
{
	float occ = 0.0;
    float sca = 1.1;
    for(int i=0; i<10; i++)
    {
        float hr = 0.06 + 0.3*float(i)/4.0;
        vec3 aopos =  nor*hr + pos;
        float dd = map(aopos).x;
        occ+= -(dd - hr)*sca;
        sca*= 1.3;
    }
    //occ = 2.*smoothstep(0.06, 0.5, occ);
    return clamp( 1.0 - 0.03*occ, 0.0, 1.0 );    
}

// Fresnel reflectance factor through Schlick's approximation: https://en.wikipedia.org/wiki/Schlick's_approximation
float fresnel(vec3 ray, vec3 norm, float n2)
{
   float n1 = 1.; // air
   float angle = acos(-dot(ray, norm));
   float r0 = dot((n1-n2)/(n1 + n2), (n1 - n2)/(n1 + n2));
   float r = r0 + (1. - r0)*pow(1. - cos(angle), 5.);
   return r;
}

// Shading of the objects pro lamp
vec3 lampShading(Lamp lamp, vec3 norm, vec3 pos, vec3 ocol, int objnr, int lampnr)
{     
    vec3 lp = lamp.position;
    float li = lamp.intensity;
    vec3 lc = lamp.color;
    if (lampnr==2)
    {
        lp = pos + norm;
        #ifdef show_flame
        li = 1.2*(1. + 0.3*flameVar)*clamp(3.*(1. - 0.25*map_flame_s(pos)), 0., 5.);
        #endif
    }
    
    vec3 pl = normalize(lp - pos);
    float dlp = distance(lp, pos);
    vec3 pli = pl/pow(1. + lamp.attenuation*dlp, 2.);
    float dnp = dot(norm, pli);
    float specintc;
    float specshinc;
      
    // Diffuse shading
    vec3 col;
    col = ocol*lc*li*clamp(dnp, 0., 1.);
    
    // Specular shading
    #ifdef specular
    // Special varaiation of the specular shading for the floor
    if (objnr==FLOOR_OBJ)
    {
       	specintc = clamp(1.2*getFloorReflection(pos), 0., 1.);
       	specshinc = 50.*pow(specint, 0.5);
    }
    else
    {
        specintc = specint;
        specshinc = specshin;
    }
    
    //if (dot(norm, lp - pos) > 0.0)
    if (lampnr<2)
        col+= lamp.color*li*specintc*pow(max(0.0, dot(reflect(pl, norm), normalize(pos - campos))), specshinc);
    #endif
    
    return col;
}

// Shading of the objects over all lamps
vec3 lampsShading(vec3 norm, vec3 pos, vec3 ocol, int objnr)
{
    vec3 col = vec3(0.);
    for (int l=0; l<3; l++) // lamps.length()
        col+= lampShading(lamps[l], norm, pos, ocol, objnr, l);
    
    return col;
}

// From https://www.shadertoy.com/view/lsSXzD, modified
vec3 GetCameraRayDir(vec2 vWindow, vec3 vCameraDir, float fov)
{
	vec3 vForward = normalize(vCameraDir);
	vec3 vRight = normalize(cross(vec3(0.0, 1.0, 0.0), vForward));
	vec3 vUp = normalize(cross(vForward, vRight));
    
	vec3 vDir = normalize(vWindow.x * vRight + vWindow.y * vUp + vForward * fov);

	return vDir;
}

// Sets the position of the camera with the mouse and calculates its direction
void setCamera()
{
   vec2 iMouse2;
   if (iMouse.x==0. && iMouse.y==0.)
      iMouse2 = iResolution.xy*vec2(0.52, 0.65);
   else
      iMouse2 = iMouse.xy;
   
   campos = vec3(-3. + 10.*cos(1.3 + 1.3*iMouse2.x/iResolution.x)*(1. - 0.3*iMouse2.y/iResolution.y),
                 12.*(iMouse2.y/iResolution.y),
                 10.*sin(1.3 + 1.3*iMouse2.x/iResolution.x)*(1. - 0.3*iMouse2.y/iResolution.y));
   camtarget = vec3(-2., -1.2*iMouse2.y/iResolution.y + 1.1, 0.);
   camdir = camtarget - campos;   
}

// Combine the flame color with its background in a non-linear way
vec3 combFlameCol(vec3 col1, vec3 col2)
{
    return pow(pow(col1, vec3(fcp)) + pow(clamp(col2, 0., 1.), vec3(fcp)), vec3(1./fcp));   
}

// Tracing and rendering a ray
vec3 flamecol = vec3(0.);
RenderData trace0(vec3 tpos, vec3 ray, float maxdist, bool ref)
{
    traceFlame = true;
    vec2 tr = trace(tpos, ray, maxdist);
    traceFlame = false;
    float tx = tr.x;
    int objnr = int(tr.y);
    vec3 col;
    vec3 pos = tpos + tx*ray;
    vec3 norm;
    float flameIntensityV = flameIntensity*(1. + 0.37*flameVar);
    
    if (ref)
    {
        if (map_flame(tpos, false, true)>9. && map_tube(pos)>0.3)
        	flamecol = getFlameDensColor(tpos, ray, flameStep, flameIntensityV, 70);
        else
            flamecol = vec3(0.);
    }
    if (tx<maxdist*0.95)
    {
        vec3 rayRef = vec3(0.);
        
        // Includes the flame in the scene
        if (objnr==FLAME_OBJ)
        {
            flamecol = getFlameDensColor(pos, ray, flameStep, flameIntensityV, 70);
            
            // Calculating the effect of the heat refraction (quick and dirty)
            #ifdef heat_refraction
            rayRef = 0.032*clamp(smoothstep(-2.2, -2.5, pos.x)*pow(flamecol, vec3(1.2)), -1., 1.);
            #endif
        }
            
        tr = trace(tpos, ray*(1. + rayRef), maxdist);
        tx = tr.x;
        objnr = int(tr.y);
        pos = tpos + tx*ray;
         
        norm = getNormal(pos, normdelta, objnr);
        col = getColor(norm, pos, objnr, ray);
      
        // Shading
        col = ambientColor*ambientint + lampsShading(norm, pos, col, objnr);
        
        // Ambient occlusion
        #ifdef ambocc
        #ifdef test_ambocc
        col = vec3(calcAO(pos, norm));
        #else
        col*= 1. - aoint + aoint*vec3(calcAO(pos, norm));
        #endif
        #endif
        
        // The end of the tube is glowing from the heat!
        #ifdef show_flame
        if (objnr==TUBE_OBJ)
            col+= smoothstep(-0.6, -2., pos.x)*vec3(0.35, 0.13, 0.)*(0.8 + 0.2*flameVar);
        #endif
        
        col = combFlameCol(col, flamecol);
    }
    else
    {
        objnr = SKY_OBJ;
        col = vec3(0.);
    }
    return RenderData(col, pos, norm, objnr);
}

// Main render function with reflections and refractions
vec4 render(vec2 fragCoord)
{   
  	vec2 uv = fragCoord.xy / iResolution.xy; 
  	uv = uv*2.0 - 1.0;
  	uv.x*= iResolution.x / iResolution.y;

  	vec3 ray0 = GetCameraRayDir(uv, camdir, fov);
    vec3 ray = ray0;
  	RenderData traceinf0 = trace0(campos, ray, maxdist, false);
    RenderData traceinf = traceinf0;
  	vec3 col = traceinf.col;
    vec3 refray;
    
    #ifdef reflections
    vec3 flamecol0 = flamecol;
    if (traceinf.objnr==FLOOR_OBJ)
    {	               
        refray = reflect(ray, traceinf.norm);

        RenderData traceinf_ref = trace0(traceinf.pos, refray, maxdist, true);
        float rf = getFloorReflection(traceinf.pos);

        col = combFlameCol(mix(col, traceinf_ref.col, rf), rf*flamecol0);
        //col = combFlameCol(traceinf_ref.col, flamecol0);
        //col = traceinf_ref.col;
    }
    #endif

  	return vec4(col, 1.0);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{   
    init();    
    setCamera();
    
    // Antialiasing.
    #ifdef antialias
    vec4 vs = vec4(0.);
    for (int j=0;j<aasamples ;j++)
    {
       float oy = float(j)*aawidth/max(float(aasamples-1), 1.);
       for (int i=0;i<aasamples ;i++)
       {
          float ox = float(i)*aawidth/max(float(aasamples-1), 1.);
          vs+= render(fragCoord + vec2(ox, oy));
       }
    }
    vec2 uv = fragCoord.xy / iResolution.xy;
    fragColor = vs/vec4(aasamples*aasamples);
    #else
    fragColor = render(fragCoord);
    #endif
}

czm_material czm_getMaterial(czm_materialInput materialInput)
{
    czm_material material = czm_getDefaultMaterial(materialInput);
    //合成最终颜色
    
    iTime=czm_frameNumber/60.;

    vec4 IColor;
    mainImage(IColor,materialInput.st*100.);
    
    material.diffuse = IColor.rgb;

    return material;
}

`;
