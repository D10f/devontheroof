
// This is the uniform we provided when declaring the ShaderMaterial in .js
uniform sampler2D globeTexture;

// We declared this in the vertex shader which always runs first, before the
// fragment shader. Now we can use it in this file
varying vec2 vertexUV;
varying vec3 vertexNormal;

void main() {
  // this function comes built-in with GLSL
  // texture2D(globeTexture, vertexUV);

  // Pixel color (r,g,b,a values)
  // gl_FragColor = vec4(1, 0, 0, 1);

  // formula to generate a shader of blue around the edges
  float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
  vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);

  gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz, 1.0);
}
