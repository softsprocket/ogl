define (function () {
	
	function Vec4 (x, y, z, w) {
		return [x ? x : 0,
			y ? y : 0,
			z ? z : 0,
			w ? w : 0
		];
	}
       

	Vec4.Magnitude = function (v) {
            return Math.sqrt ((v[0] * v[0]) + (v[1] * v[1]) + (v[2] * v[2]) + (v[3] * v[3]));
        };    

        Vec4.TimesScalar = function (v, s) {
		return Vec4 (
			v[0] * s,
			v[1] * s,
			v[2] * s,
			v[3] * s
		);
        };

        Vec4.TimesVec4 = function (v1, v2) {
            	return new Vec4 (
			v1[0] * v2[0],
			v1[1] * v2[1],
			v1[2] * v2[2],			
			v1[3] * v2[3]			
		);
        };

	Vec4.PlusVec4 =  function (v1, v2) { 
            	return new Vec4 (
			v1[0] + v2[0],
			v1[1] + v2[1],
			v1[2] + v2[2],			
			v1[3] + v2[3]			
		);
        };

	Vec4.MinusVec4 =  function (v1, v2) { 
            	return new Vec4 (
			v1[0] - v2[0],
			v1[1] - v2[1],
			v1[2] - v2[2],			
			v1[3] - v2[3]			
		);
        };

	Vec4.Negate = function (v) {
		return new Vec4 (-v[0], -v[1], -v[2], -v[3]);
	};

        Vec4.DotProduct = function (v1, v2) {
            	return (v1[0] * v2[0]) + (v1[1] * v2[1]) + (v1[2] * v2[2]) + (v1[3] * v2[3]);
        };

        // v1 onto v2
        Vec4.Projection = function (v1, v2) {
            	var mag2 = Vec4.Magnitude (v2);
            	return Vec4.TimesScalar (v2, (Vec4.DotProduct (v1, v2) / (mag2 * mag2)));
        };
        
        // v1 with respect to v2
        Vec4.PerpendicularComponent = function (v1, v2) {
            	return Vec4.MinusVec4 (v1, Vec4.Projection (v1, v2));
        };

	return Vec4;
});
    
