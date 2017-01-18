
class Cube
{
	constructor(name, length, color, x, y, divisions){
		this.name = name;
		this.length = length;
		this.color = color;

		//Initialisation of the buffers within the object
		this.vertexBuffer = null;
		this.indexBuffer = null;
		this.colorBuffer = null;

		//Initialisation of the arrays used to construct the object
		this.indices = [];
		this.vertices = [];
		this.colors = [];
		this.x = x;
		this.y = y;

		//Static definition of the subdivision of the perimeter of the planet to creater the various points for the verticies
		this.division = 60;

		//Creation of a movement matrix specific for the object
		this.mvMatrix = mat4.create();

		//Call of the initialisation method
		this.init();
	}

	//Initialisation method of a planet object
	init()
	{
		initVerticesNormalsTexturesIndexes();

        //Converts the values to buffers
		this.vertexBuffer = getVertexBufferWithVertices(this.vertices);
		this.colorBuffer  = getVertexBufferWithVertices(this.colors);
		this.indexBuffer  = getIndexBufferWithIndices(this.indices);

		//Defines the position matrix of the object
		mat4.identity(this.mvMatrix);
		mat4.translate(this.mvMatrix, this.mvMatrix, vec3.fromValues(this.x, this.y, 0.0));
	}

    initVerticesNormalsTexturesIndexes()
    {
        vertices = [];
        normals = [];
        indices = [];
        textCoords = [];

        //---------------------------------------------
        //Le cube
        //---------------------------------------------

        // Front face
        this.vertices.push(-1.0, -1.0,  1.0);
        this.vertices.push( 1.0, -1.0,  1.0);
        this.vertices.push(-1.0,  1.0,  1.0);
        this.vertices.push( 1.0,  1.0,  1.0);
        this.normals.push(1, 0, 0, 1);
        this.normals.push(1, 0, 0, 1);
        this.normals.push(1, 0, 0, 1);
        this.normals.push(1, 0, 0, 1);
        textCoords.push(0.0, 0.0);
        textCoords.push(1.0, 0.0);
        textCoords.push(1.0, 1.0);
        textCoords.push(0.0, 1.0);
        indices.push(0, 1, 2);
        indices.push(0, 2, 3);

        // Back face
        this.vertices.push(-1.0, -1.0, -1.0);
        this.vertices.push(-1.0,  1.0, -1.0);
        this.vertices.push( 1.0,  1.0, -1.0);
        this.vertices.push( 1.0, -1.0, -1.0);
        this.normals.push(1, 0, 0, 1);
        this.normals.push(1, 0, 0, 1);
        this.normals.push(1, 0, 0, 1);
        this.normals.push(1, 0, 0, 1);
        textCoords.push(1.0, 0.0);
        textCoords.push(1.0, 1.0);
        textCoords.push(0.0, 1.0);
        textCoords.push(0.0, 0.0);
        indices.push(4, 5, 6);
        indices.push(4, 6, 7);

        // Top face
        this.vertices.push(-1.0,  1.0, -1.0);
        this.vertices.push(-1.0,  1.0,  1.0);
        this.vertices.push( 1.0,  1.0,  1.0);
        this.vertices.push( 1.0,  1.0, -1.0);
        this.normals.push(0, 0, 0, 1);
        this.normals.push(0, 0, 0, 1);
        this.normals.push(0, 0, 0, 1);
        this.normals.push(0, 0, 0, 1);
        textCoords.push(0.0, 1.0);
        textCoords.push(0.0, 0.0);
        textCoords.push(1.0, 0.0);
        textCoords.push(1.0, 1.0);
        indices.push(8, 9, 10);
        indices.push(8, 10, 11);

        // Bottom face
        this.vertices.push(-1.0, -1.0, -1.0);
        this.vertices.push( 1.0, -1.0, -1.0);
        this.vertices.push( 1.0, -1.0,  1.0);
        this.vertices.push(-1.0, -1.0,  1.0);
        this.normals.push(0, 0, 0, 1);
        this.normals.push(0, 0, 0, 1);
        this.normals.push(0, 0, 0, 1);
        this.normals.push(0, 0, 0, 1);
        textCoords.push(1.0, 1.0);
        textCoords.push(0.0, 1.0);
        textCoords.push(0.0, 0.0);
        textCoords.push(1.0, 0.0);
        indices.push(12, 13, 14);
        indices.push(12, 14, 15);

        // Right face
        this.vertices.push( 1.0, -1.0, -1.0);
        this.vertices.push( 1.0,  1.0, -1.0);
        this.vertices.push( 1.0,  1.0,  1.0);
        this.vertices.push( 1.0, -1.0,  1.0);
        this.normals.push(0, 0, 1, 1);
        this.normals.push(0, 0, 1, 1);
        this.normals.push(0, 0, 1, 1);
        this.normals.push(0, 0, 1, 1);
        textCoords.push(1.0, 0.0);
        textCoords.push(1.0, 1.0);
        textCoords.push(0.0, 1.0);
        textCoords.push(0.0, 0.0);
        indices.push(16, 17, 18);
        indices.push(16, 18, 19);

        // Left face
        this.vertices.push(-1.0, -1.0, -1.0);
        this.vertices.push(-1.0, -1.0,  1.0);
        this.vertices.push(-1.0,  1.0,  1.0);
        this.vertices.push(-1.0,  1.0, -1.0);
        this.normals.push(0, 0, 1, 1);
        this.normals.push(0, 0, 1, 1);
        this.normals.push(0, 0, 1, 1);
        this.normals.push(0, 0, 1, 1);
        textCoords.push(0.0, 0.0);
        textCoords.push(1.0, 0.0);
        textCoords.push(1.0, 1.0);
        textCoords.push(0.0, 1.0);
        indices.push(20, 21, 22);
        indices.push(20, 22, 23);
    }

	//Draw method of the planet object
	draw()
	{
		//Sends the mvMatrix to the shader
		glContext.uniformMatrix4fv(prg.mvMatrixUniform, false, this.mvMatrix);

		//Links and sends the vertexBuffer to the shader, defining the format to send it as
		glContext.bindBuffer(glContext.ARRAY_BUFFER, this.vertexBuffer);
		glContext.vertexAttribPointer(prg.vertexPositionAttribute, 3, glContext.FLOAT, false, 0, 0);

		//Links and sends the colorBuffer to the shader, defining the format to send it as
		glContext.bindBuffer(glContext.ARRAY_BUFFER, this.colorBuffer);
		glContext.vertexAttribPointer(prg.colorAttribute, 4, glContext.FLOAT, false, 0, 0);

		//Links the indexBuffer with the shader
		glContext.bindBuffer(glContext.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

		//Based on the render variable
		if(render)
		{
			//Renders the objet as a wireframe
			glContext.drawElements(glContext.LINES, this.indices.length, glContext.UNSIGNED_SHORT,0);
		}
		else
		{
			//Renders the object as triangles
			glContext.drawElements(glContext.TRIANGLES, this.indices.length, glContext.UNSIGNED_SHORT,0);
		}
	}
}
