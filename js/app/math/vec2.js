define (function () {
	
	function Vec2 (x, y) {
		return new Float32Array ([x ? x : 0,
			y ? y : 0
		]);
	}
       

	Vec2.Magnitude = function (v) {
            return Math.sqrt ((v[0] * v[0]) + (v[1] * v[1]));
        };    

        Vec2.TimesScalar = function (v, s) {
		return Vec2 (
			v[0] * s,
			v[1] * s
		);
        };

        Vec2.TimesVec2 = function (v1, v2) {
            	return new Vec2 (
			v1[0] * v2[0],
			v1[1] * v2[1]
		);
        };

	Vec2.PlusVec2 =  function (v1, v2) { 
            	return new Vec2 (
			v1[0] + v2[0],
			v1[1] + v2[1]
		);
        };

	Vec2.MinusVec2 =  function (v1, v2) { 
            	return new Vec2 (
			v1[0] - v2[0],
			v1[1] - v2[1],
			v1[2] - v2[2]			
		);
        };

	Vec2.Negate = function (v) {
		return new Vec2 (-v[0], -v[1], -v[2]);
	};

        Vec2.DotProduct = function (v1, v2) {
            	return (v1[0] * v2[0]) + (v1[1] * v2[1]);
        };

        // v1 onto v2
        Vec2.Projection = function (v1, v2) {
            	var mag2 = Vec2.Magnitude (v2);
            	return Vec2.TimesScalar (v2, (Vec2.DotProduct (v1, v2) / (mag2 * mag2)));
        };
        
        // v1 with respect to v2
        Vec2.PerpendicularComponent = function (v1, v2) {
            	return Vec2.MinusVec2 (v1, Vec2.Projection (v1, v2));
        };


	return Vec2;
});
    
