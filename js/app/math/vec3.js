define (function () {
	
	function Vec3 (x, y, z) {
		return new Float32Array ([x ? x : 0,
			y ? y : 0,
			z ? z : 0
		]);
	}
       

	Vec3.Magnitude = function (v) {
            return Math.sqrt ((v[0] * v[0]) + (v[1] * v[1]) + (v[2] * v[2]));
        };    

        Vec3.TimesScalar = function (v, s) {
		return Vec3 (
			v[0] * s,
			v[1] * s,
			v[2] * s
		);
        };

        Vec3.TimesVec3 = function (v1, v2) {
            	return new Vec3 (
			v1[0] * v2[0],
			v1[1] * v2[1],
			v1[2] * v2[2]			
		);
        };

	Vec3.PlusVec3 =  function (v1, v2) { 
            	return new Vec3 (
			v1[0] + v2[0],
			v1[1] + v2[1],
			v1[2] + v2[2]			
		);
        };

	Vec3.MinusVec3 =  function (v1, v2) { 
            	return new Vec3 (
			v1[0] - v2[0],
			v1[1] - v2[1],
			v1[2] - v2[2]			
		);
        };

	Vec3.Negate = function (v) {
		return new Vec3 (-v[0], -v[1], -v[2]);
	};

        Vec3.DotProduct = function (v1, v2) {
            	return (v1[0] * v2[0]) + (v1[1] * v2[1]) + (v1[2] * v2[2]);
        };

        // v1 onto v2
        Vec3.Projection = function (v1, v2) {
            	var mag2 = Vec3.Magnitude (v2);
            	return Vec3.TimesScalar (v2, (Vec3.DotProduct (v1, v2) / (mag2 * mag2)));
        };
        
        // v1 with respect to v2
        Vec3.PerpendicularComponent = function (v1, v2) {
            	return Vec3.MinusVec3 (v1, Vec3.Projection (v1, v2));
        };

        // 3d cross product
        Vec3.CrossProduct = function (v1, v2) {
		return new Vec3 (
			v1[1] * v2[2] - v1[2] * v2[1],
			v1[2] * v2[0] - v1[0] * v2[2],
			v1[0] * v2[1] - v1[1] * v2[0]
		);
        };

	Vec3.Orthogonalize = function (vectors) {
		var orthoset = [ new Vec3 (vectors[0][0], vectors[0][1], vectors[0][2]) ];

		for (var i = 1; i < vectors.length; ++i) {
			var esummed = new Vec3 ();
			for (var k = 0; k < i; ++k) {
				esummed = Vec3.PlusVec3 (esummed, Vec3.Projection (vectors[i], orthoset[k]));
			}
			
			var eprime = Vec3.MinusVec3 (vectors[i], esummed);
			
			orthoset.push (eprime);

		}

		return orthoset;
	}

	return Vec3;
});
    
