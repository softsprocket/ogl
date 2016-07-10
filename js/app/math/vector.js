define (function () {
	
	function Vector (x, y, z) {
		this.x = x ? x : 0;
		this.y = y ? y : 0;
		this.z = z ? z : 0;
	}
        
	Vector.prototype.magnitude = function () {
            return Math.sqrt ((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
        };
            

        Vector.TimesScalar = function (v, s) {
		return new Vector (
			v.x * s,
			v.y * s,
			v.z * s
		);
        };

        Vector.TimesVector = function (v1, v2) {
            	return new Vector (
			v1.x * v2.x,
			v1.y * v2.y,
			v1.z * v2.z			
		);
        };

	Vector.PlusVector =  function (v1, v2) { 
            	return new Vector (
			v1.x + v2.x,
			v1.y + v2.y,
			v1.z + v2.z			
		);
        };

	Vector.MinusVector =  function (v1, v2) { 
            	return new Vector (
			v1.x - v2.x,
			v1.y - v2.y,
			v1.z - v2.z			
		);
        };

	Vector.Negate = function (v) {
		return new Vector (-v.x, -v.y, -v.z);
	};

        Vector.DotProduct = function (v1, v2) {
            	return (v1.x * v2.x) + (v1.y * v2.y) + (v1.z * v2.z);
        };

        // v1 onto v2
        Vector.Projection = function (v1, v2) {
            	var mag2 = v2.magnitude ();
            	return Vector.TimesScalar (v2, (Vector.DotProduct (v1, v2) / (mag2 * mag2)));
        };
        
        // v1 with respect to v2
        Vector.PerpendicularComponent = function (v1, v2) {
            	return Vector.MinusVector (v1, Vector.Projection (v1, v2));
        };

        // 3d cross product
        Vector.CrossProduct = function (v1, v2) {
		return new Vector (
			v1.y * v2.z - v1.z * v2.y,
			v1.z * v2.x - v1.x * v2.z,
			v1.x * v2.y - v1.y * v2.x
		);
        };

	Vector.Orthogonalize = function (vectors) {
		var orthoset = [ new Vector (vectors[0].x, vectors[0].y, vectors[0].z) ];

		for (var i = 1; i < vectors.length; ++i) {
			var esummed = new Vector ();
			for (var k = 0; k < i; ++k) {
				esummed = Vector.PlusVector (esummed, Vector.Projection (vectors[i], orthoset[k]));
			}
			
			var eprime = Vector.MinusVector (vectors[i], esummed);
			
			orthoset.push (eprime);

		}

		return orthoset;
	}

	return Vector;
});
    
