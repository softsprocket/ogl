
requirejs.config({
	baseUrl: 'js',
	paths: {
		app: 'app'
    	}
});

requirejs (['app/math/vector'],
function (Vector) {
	var contentEl = document.getElementById ('test-content-id');

	console.log (contentEl);
	
	var p = new Vector (2, 2, 1);
	var q = new Vector (1, -2, 0);
	var dotProduct = Vector.DotProduct (p, q);
	var crossProduct = Vector.CrossProduct (p, q);
	var proj = Vector.Projection (q, p);
	var e = [
		new Vector (Math.sqrt (2)/2, Math.sqrt (2)/2, 0),
		new Vector (-1, 1, -1),
		new Vector (0, -2, -2),
	];
	
	eortho = Vector.Orthogonalize (e);

	var html = '<pre>';
	html += 'Let P = &lt;2,2,1&gt; and Q = &lt;1,-2,0&gt;.\n';
	html += 'P&#149;Q = ' + dotProduct + '.\n';
       	html += 'P&#215;Q = &lt;' + crossProduct.x + ', ' + crossProduct.y + ', ' + crossProduct.z + '&gt;.\n';
	html += 'proj<sub>p</sub>Q = &lt;' + proj.x + ', ' + proj.y + ', ' + proj.z + '&gt;.\n';	
	html += '\n';	
	html += 'set [&lt;' + e[0].x + ', ' + e[0].y + ', ' + e[0].z + '&gt;, &lt;' 
		+ e[1].x + ', ' + e[1].y + ', ' + e[1].z + '&gt;, &lt;' 
		+ e[2].x + ', ' + e[2].y + ', ' + e[2].z + '&gt;]\n';
	html +=	'	orthogonalized = \n';
	html += 'set [&lt;' + eortho[0].x + ', ' + eortho[0].y + ', ' + eortho[0].z + '&gt;, &lt;' 
		+ eortho[1].x + ', ' + eortho[1].y + ', ' + eortho[1].z + '&gt;, &lt;' 
		+ eortho[2].x + ', ' + eortho[2].y + ', ' + eortho[2].z + '&gt;]\n';
	html += '</pre>';

	contentEl.innerHTML = html; 
});


