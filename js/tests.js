
requirejs.config({
	baseUrl: 'js',
	paths: {
		app: 'app'
    	}
});

requirejs (['app/math/vec3', 'app/math/vec4', 'app/math/vec2'],
function (Vec3, Vec4, Vec2) {
	var contentEl = document.getElementById ('test-content-id');
	
	var p = Vec3 (2, 2, 1);
	var q = Vec3 (1, -2, 0);
	var dotProduct = Vec3.DotProduct (p, q);
	var crossProduct = Vec3.CrossProduct (p, q);
	var proj = Vec3.Projection (q, p);
	var e = [
		Vec3 (Math.sqrt (2)/2, Math.sqrt (2)/2, 0),
		Vec3 (-1, 1, -1),
		Vec3 (0, -2, -2),
	];
	
	eortho = Vec3.Orthogonalize (e);

	var p4 = Vec4 (2, 2, 1, 1);
	var q4 = Vec4 (1, -2, 0, 1);
	var dotProduct4 = Vec4.DotProduct (p4, q4);
	var proj4 = Vec4.Projection (q4, p4);
	
	var p2 = Vec2 (2, 2);
	var q2 = Vec2 (1, -2);
	var dotProduct2 = Vec2.DotProduct (p2, q2);
	var proj2 = Vec2.Projection (q2, p2);

	var html = '<pre>';
	html += 'Let P = &lt;2,2,1&gt; and Q = &lt;1,-2,0&gt;.\n';
	html += 'P&#149;Q = ' + dotProduct + '.\n';
       	html += 'P&#215;Q = &lt;' + crossProduct[0] + ', ' + crossProduct[1] + ', ' + crossProduct[2] + '&gt;.\n';
	html += 'proj<sub>p</sub>Q = &lt;' + proj[0] + ', ' + proj[1] + ', ' + proj[2] + '&gt;.\n';	
	html += '\n';	
	html += 'set [&lt;' + e[0][0] + ', ' + e[0][1] + ', ' + e[0][2] + '&gt;, &lt;' 
		+ e[1][0] + ', ' + e[1][1] + ', ' + e[1][2] + '&gt;, &lt;' 
		+ e[2][0] + ', ' + e[2][1] + ', ' + e[2][2] + '&gt;]\n';
	html +=	'	orthogonalized = \n';
	html += 'set [&lt;' + eortho[0][0] + ', ' + eortho[0][1] + ', ' + eortho[0][2] + '&gt;, &lt;' 
		+ eortho[1][0] + ', ' + eortho[1][1] + ', ' + eortho[1][2] + '&gt;, &lt;' 
		+ eortho[2][0] + ', ' + eortho[2][1] + ', ' + eortho[2][2] + '&gt;]\n';
	
	html += '\n\n';

	html += 'Let P = &lt;2,2,1,1&gt; and Q = &lt;1,-2,0,1&gt;.\n';
	html += 'P&#149;Q = ' + dotProduct4 + '.\n';
	html += 'proj<sub>p</sub>Q = &lt;' + proj4[0] + ', ' + proj4[1] + ', ' + proj4[2] + ', ' + proj4[3] + '&gt;.\n';	
	html += '\n';	
	html += '\n\n';

	html += 'Let P = &lt;2,2&gt; and Q = &lt;1,-2&gt;.\n';
	html += 'P&#149;Q = ' + dotProduct2 + '.\n';
	html += 'proj<sub>p</sub>Q = &lt;' + proj2[0] + ', ' + proj2[1] + '&gt;.\n';	
	html += '\n';

	html += '</pre>';

	contentEl.innerHTML = html; 
});


