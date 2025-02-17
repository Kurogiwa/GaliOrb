if(!document.querySelector('#galiOrb'))
    document.body.appendChild(document.createElement('canvas')).id = "galiOrb"

if(window.animationFrame)
    cancelAnimationFrame(window.animationFrame)

let
    animation,
    canvas, context,
    parts, l,
    initialPoints;
    
window.animationFrame = ()=>{
    let
        e,first,
        
        point1,
        point2,

        c,
        d,
        h,
        m,

        points, //array de arrays
        cos2,
        cos1,
        sin2,
        sin1,
        X,Y,Z,
        Y1,Z1;
    for(
        context.globalCompositeOperation = "source-over",
        context.fillStyle = "rgba(0,0,0,0.03)", //preto com opacidade muito baixa
        context.fillRect(0, 0, canvas.width, canvas.height),
        context.globalCompositeOperation = "lighter",
        m = l,
        d = 0;
        
        d < 2;
        
        d++ //0 e 1
    ){
        for(
            m *= 1.7,
            h = 1 - d / 3, //1 e 2/3
            cos1 = Math.cos(e = m / 59),
            sin1 = Math.sin(e),
            cos2 = Math.cos(e = m / 30),
            sin2 = Math.sin(e),
            points = [],
            e = 0;
            e < initialPoints.length;
            e++
        ){
        // (a,b) = a(1,0) + b(0,1) =>
        // a(cos(α),-sin(α)) + b( sin(α),cos(α)) = (cos(α)a + sin(α)b, -sin(α)a + cos(α)b)
        // a(cos(α), sin(α)) + b(-sin(α),cos(α)) = (cos(α)a - sin(α)b,  sin(α)a + cos(α)b)
            X = initialPoints[e][0];
            Y1 = (Y = initialPoints[e][1]) * cos1 + (Z = initialPoints[e][2]) * sin1;
            X=
                (X * cos2 - (Z1 = - Y * sin1 + Z * cos1) * sin2)*
                (Z1 = 2**((Z = X * sin2 + Z1 * cos2) * h));
            Y = Y1 * Z1;
            points.push([X, Y, Z]);
        }
        context.strokeStyle = "rgba(100,162,255,0.30)";
        for(
            h *= 120, //120 e 80
            c = parts*3-1;
            
            c > -1;
            
            c -= parts
        ){
            first = c-parts+1
            for(e = first; e < c; e++){
                point1 = points[e];
                point2 = points[e+1];

                context.beginPath();
                context.lineWidth = 6**point1[2];                        //_|_     onde o
                context.lineTo(point1[0] * h + 200, point1[1] * h + 200);//_|_>=> desenho
                context.lineTo(point2[0] * h + 200, point2[1] * h + 200);//_|     ocorre
                context.stroke()
            }
            point1 = points[e];
            point2 = points[first];

            context.beginPath();
            context.lineWidth = 6**point1[2];
            context.lineTo(point1[0] * h + 200, point1[1] * h + 200);
            context.lineTo(point2[0] * h + 200, point2[1] * h + 200);
            context.stroke()
        }
    }
    l+=.2,
    animation = requestAnimationFrame(window.animationFrame)
};

context = (canvas = document.getElementById("galiOrb")).getContext("2d");
canvas.width = canvas.height = 400;
context.clearRect(0, 0, 400, 400);

parts = 100; // o quanto divide a circuferencia
l = 60;
initialPoints = []; // circuferência em 3 dimensões

let r = 0;
for(let e = 0; e < parts; e++)
    initialPoints.push([Math.cos(r), Math.sin(r), 0]),
    r += 2 * Math.PI / parts;
for(let e = 0; e < parts; e++)
    initialPoints.push([0, initialPoints[e][0], initialPoints[e][1]]);
for(let e = 0; e < parts; e++)
    initialPoints.push([initialPoints[e][1], 0, initialPoints[e][0]]);

window.animationFrame()
