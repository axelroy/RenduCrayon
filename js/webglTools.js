var gl = null;
var c_width = 0;
var c_height = 0;
var prg = null;

function degToRad(degrees) {
    return (degrees * Math.PI / 180.0);
}

/**
 * Allow to initialize Shaders.
 */
function getShader(gl, id) {
    var script = document.getElementById(id);
    if (!script) {
        return null;
    }

    var str = "";
    var k = script.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    var shader;
    if (script.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (script.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}

/**
 * The program contains a series of instructions that tell the Graphic Processing Unit (GPU)
 * what to do with every vertex and fragment that we transmit.
 * The vertex shader and the fragment shaders together are called through that program.
 */
function initProgram() {
    var fgShader = getShader(gl, "shader-fs");
    var vxShader = getShader(gl, "shader-vs");

    prg = gl.createProgram();
    gl.attachShader(prg, vxShader);
    gl.attachShader(prg, fgShader);
    gl.linkProgram(prg);

    if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(prg);

    initShaderParameters(prg);

}

function requestAnimFrame(o) {
    requestAnimFrame(o);
}

/**
 * Provides requestAnimationFrame in a cross browser way.
 */
requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
            window.setTimeout(callback, 1000.0 / 60.0);
        };
})();

/**
 * Render Loop: frame rate and scene drawing.
 */
function renderLoop() {
    requestAnimFrame(renderLoop);
    drawScene();
}

/**
 * Verify that WebGL is supported by your machine
 */
function getGLContext(canvasName) {
    var canvas = document.getElementById(canvasName);
    if (canvas == null) {
        alert("there is no canvas on this page");
        return;
    } else {
        c_width = canvas.width;
        c_height = canvas.height;
    }

    var gl = null;
    var names = ["webgl",
        "experimental-webgl",
        "webkit-3d",
        "moz-webgl"
    ];

    for (var i = 0; i < names.length; i++) {
        try {
			gl = canvas.getContext(names[i]); // no blending

			//*** for transparency (Blending) ***
            //gl = canvas.getContext(names[i], {premultipliedAlpha: false});
            //gl.enable(gl.BLEND);
            //gl.blendEquation(gl.FUNC_ADD);
            //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        } catch (e) {}

        if (gl) break;
    }

    if (gl == null) {
        alert("WebGL is not available");
    } else {
        //alert("We got a WebGL context: "+names[i]);
        return gl;
    }
}



/**
 * The following code snippet creates a vertex buffer and binds the vertices to it.
 */
function getVertexBufferWithVertices(vertices) {
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return vBuffer;
}

/**
 * The following code snippet creates a vertex buffer and binds the indices to it.
 */
function getIndexBufferWithIndices(indices) {
    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    return iBuffer;
}


function getArrayBufferWithArray(values) {
    //The following code snippet creates an array buffer and binds the array values to it
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(values), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return vBuffer;
}


function initTextureWithImage(sFilename, texturen) {
    var anz = texturen.length;
    texturen[anz] = gl.createTexture();

    texturen[anz].image = new Image();
    texturen[anz].image.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, texturen[anz]);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texturen[anz].image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        gl.generateMipmap(gl.TEXTURE_2D);

        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    texturen[anz].image.src = sFilename;

    // let's use a canvas to make textures, with by default a random color (red, green, blue)
    function rnd() {
        return Math.floor(Math.random() * 256);
    }

    var c = document.createElement("canvas");
    c.width = 64;
    c.height = 64;
    var ctx = c.getContext("2d");
    var red = rnd();
    var green = rnd();
    var blue = rnd();
    ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";

    ctx.fillRect(0, 0, 64, 64);

    gl.bindTexture(gl.TEXTURE_2D, texturen[anz]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
}

function calculateTangents(vs, tc, ind) {
    var i;
    var tangents = [];
    for (i = 0; i < vs.length / 3; i++) {
        tangents[i] = [0, 0, 0];
    }
    // Calculate tangents
    var a = [0, 0, 0],
        b = [0, 0, 0];
    var triTangent = [0, 0, 0];
    for (i = 0; i < ind.length; i += 3) {

        var i0 = ind[i + 0];
        var i1 = ind[i + 1];
        var i2 = ind[i + 2];

        var pos0 = [vs[i0 * 3], vs[i0 * 3 + 1], vs[i0 * 3 + 2]];
        var pos1 = [vs[i1 * 3], vs[i1 * 3 + 1], vs[i1 * 3 + 2]];
        var pos2 = [vs[i2 * 3], vs[i2 * 3 + 1], vs[i2 * 3 + 2]];

        var tex0 = [tc[i0 * 2], tc[i0 * 2 + 1]];
        var tex1 = [tc[i1 * 2], tc[i1 * 2 + 1]];
        var tex2 = [tc[i2 * 2], tc[i2 * 2 + 1]];

        vec3.subtract(pos1, pos0, a);
        vec3.subtract(pos2, pos0, b);

        var c2c1t = tex1[0] - tex0[0];
        var c2c1b = tex1[1] - tex0[1];
        var c3c1t = tex2[0] - tex0[0];
        var c3c1b = tex2[0] - tex0[1];

        triTangent = [c3c1b * a[0] - c2c1b * b[0], c3c1b * a[1] - c2c1b * b[1], c3c1b * a[2] - c2c1b * b[2]];

        vec3.add(tangents[i0], triTangent);
        vec3.add(tangents[i1], triTangent);
        vec3.add(tangents[i2], triTangent);
    }

    // Normalize tangents
    var ts = [];
    for (i = 0; i < tangents.length; i++) {
        var tan = tangents[i];
        vec3.normalize(tan);

        ts.push(tan[0]);
        ts.push(tan[1]);
        ts.push(tan[2]);

    }

    return ts;
}
