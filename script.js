function setup(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext('2d');
    ctx = ctx;

    function moveToTx(loc,Tx)
    {var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.moveTo(res[0],res[1]);}

    function lineToTx(loc,Tx)
    {var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.lineTo(res[0],res[1]);}

    var Hermite = function(t) {
        return [
            2*t*t*t-3*t*t+1,
            t*t*t-2*t*t+t,
            -2*t*t*t+3*t*t,
            t*t*t-t*t
        ];
    }

    var HermiteDerivative = function(t) {
        return [
            6*t*t-6*t,
            3*t*t-4*t+1,
            -6*t*t+6*t,
            3*t*t-2*t
        ];
    }

    function Cubic(basis,P,t){
        var b = basis(t);
        var result=vec3.create();
        vec3.scale(result,P[0],b[0]);
        vec3.scaleAndAdd(result,result,P[1],b[1]);
        vec3.scaleAndAdd(result,result,P[2],b[2]);
        vec3.scaleAndAdd(result,result,P[3],b[3]);
        return result;
    }

    var p0=[0,0,0];
    var d0=[100,300,0];
    var p1=[100,100,0];
    var d1=[-100,300,0];
    var p2=[200,200,0];
    var d2=[0,300,0];

    var P0 = [p0,d0,p1,d1]; // First two points and tangents
    var P1 = [p1,d1,p2,d2]; // Last two points and tangents

    var C0 = function(t_) {return Cubic(Hermite,P0,t_);};
    var C1 = function(t_) {return Cubic(Hermite,P1,t_);};

    var C0prime = function(t_) {return Cubic(HermiteDerivative,P0,t_);};
    var C1prime = function(t_) {return Cubic(HermiteDerivative,P1,t_);};

    var Ccomp = function(t) {
        if (t<1){
            var u = t;
            return C0(u);
        } else {
            var u = t-1.0;
            return C1(u);
        }
    }

    var Ccomp_tangent = function(t) {
        if (t<1){
            var u = t;
            return C0prime(u);
        } else {
            var u = t-1.0;
            return C1prime(u);
        }
    }

    function drawRect(color, TxU, size){
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx, Tx, [size, size, size]);
        ctx.beginPath();
        moveToTx([0,0,0], Tx);
        
    }

    function draw(){
        canvas.width = canvas.width;
    }

    draw();
}

window.onload = setup;