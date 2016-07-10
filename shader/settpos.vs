

attribute vec3 a_Position;
uniform vec4 u_Translation;

void main() {
	gl_Position = vec4 (a_Position, 1.0) + u_Translation;
	gl_PointSize = 2.0;
}



