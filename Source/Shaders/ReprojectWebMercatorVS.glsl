attribute vec4 position;
attribute float webMercatorT;

uniform vec2 u_textureDimensions;

varying vec2 v_textureCoordinates;

void main()
{
    v_textureCoordinates = vec2(position.x, webMercatorT);
    gl_Position = czm_viewportOrthographic * (position * vec4(u_textureDimensions, 1.0, 1.0));
}
