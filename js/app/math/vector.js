define (function () {
    return {
        vectorTimesScalar: function (v, s) {
            var rv = [];


            for (var i = 0; i < v.length; ++i) {
                rv[i] = v[i] * s;
            }

            return rv;
        },

        vectorTimesVector: function (v1, v2) {
            var rv = [];

            for (var i = 0; i < v1.length; ++i) {
                rv[i] = v1[i] * v2[i];
            }

            return rv;
        },

        vectorMinusVector: function (v1, v2) { 
            var rv = [];

            for (var i = 0; i < v1.length; ++i) {
                rv[i] = v1[i] * v2[i];
            }

            return rv;
        },

        vectorPlusVector: function (v1, v2) { 
            var rv = [];

            for (var i = 0; i < v1.length; ++i) {
                rv[i] = v1[i] + v2[i];
            }

            return rv;
        },

        magnitude: function (v) {
            var sum = 0;
            for (var i = 0; i < v.length; ++i) {
                sum += (v[i] * v[i]);   
            }

            return Math.sqrt (sum);
        },
            
        dotProduct: function (v1, v2) {
            var products = [];
            for (var i = 0; i < v1.length; ++v1) {
                products.push (v1[i] * v2[i]);
            }

            var sum = 0;
            for (var i = 0; i < products.length; ++i) {
                sum += products[i];
            }

            return sum;
        },

        // v1 onto v2
        projection: function (v1, v2) {
            var magq = this.magnitude (v1);

            return this.vectorTimesVector (this.dotProduct (v1, v2) / (magq * magq));
        },
        
        // v1 with respect to v2
        perpendicularComponent: function (v1, v2) {
            return this.vectorMinusVector (v1, this.projection (v1, v2));
        },

        // 3d cross product
        crossProduct: function (v1, v2) {
            return {
                v1[1] * v2[2] - v1[2] * v2[1],
                v1[2] * v2[0] - v1[0] * v2[2],
                v1[0] * v2[1] - v1[1] * v2[0]
            };
        }

    };
}):
    
