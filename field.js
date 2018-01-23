
var Field = (function(){
"use strict";

class Field {
    
    constructor(grid, ant, cellwidth, cellheight, timing){
        this.grid = grid;
        var canvas = this.canvas = document.getElementById("outfield");
        this.ctx = canvas.getContext("2d");
        this.cellWidth = cellwidth;
        this.cellHeight = cellheight;
        this.ant = ant;
        this.ant.place(grid, grid.width/2, grid.height/2);
        this.timing = timing;
        canvas.addEventListener("mousedown", this.onClick.bind(this));
        canvas.addEventListener("contextmenu", function(e){e.preventDefault();});
//         window.addEventListener("keydown", this.onKeypress.bind(this));
        document.getElementById("startstop").addEventListener("click", this.toggleRun.bind(this));
        document.getElementById("step").addEventListener("click", this.step.bind(this));
        document.getElementById("updatesource").addEventListener("click", this.setCode.bind(this));
        document.getElementById("updatestate").addEventListener("click", this.setState.bind(this));
        this.setCode()
        this.draw();
    }
    
    draw(){
        var width = this.canvas.width = this.cellWidth * this.grid.width;
        var height = this.canvas.height = this.cellHeight * this.grid.height;
        this.ctx.clearRect(0, 0, width, height);
        this.ctx.fillStyle = "black";
        for (let x=0; x<this.grid.width; x++){
            for (let y=0; y<this.grid.height; y++){
                if (this.grid.get(x, y)){
                    this.ctx.fillRect(x*this.cellWidth, y*this.cellHeight, this.cellWidth, this.cellHeight);
                }
            }
        }
        this.ctx.fillStyle = "#ff0000bb";
        this.ctx.fillRect(this.ant.x * this.cellWidth, this.ant.y * this.cellHeight, this.cellWidth, this.cellHeight);
        document.getElementById("state").innerHTML = this.ant.state;
    }
    
    onClick(e){
        var x = e.offsetX / this.cellWidth |0;
        var y = e.offsetY / this.cellHeight |0;
        if (e.button == 0){
            this.grid.flip(x, y);
        } else if (e.button == 2){
            this.ant.place(this.grid, x, y);
        }
        this.draw();
    }
    
    start(){
        this.interval = setInterval(this.step.bind(this), this.timing);
    }
    
    stop(){
        clearInterval(this.interval);
        this.interval = null;
    }
    
    toggleRun(){
        if (this.interval){
            this.stop()
        } else {
            this.start();
        }
    }
    
    step(){
        this.ant.step();
        this.draw();
    }
    
    onKeypress(e){
        if (e.key == ' '){
            e.preventDefault();
            this.toggleRun();
        }
    }
    
    setCode(){
        var code = document.getElementById("sourcecode").value;
        this.ant.setCode(parseAsm(code));
    }
    
    setState(){
        this.ant.state = window.prompt("Choose a state", this.ant.state)|0;
        this.draw();
    }
        
}
                
return Field;

})();

