

var Grid = (function(){
"use strict";

class Grid {
    
    
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.grid = new Int8Array(width*height);
    }
    
    get(x, y){
        return this.grid[x + y * width];
    }
    
    set(x, y, value){
        this.grid[x + y * width] = value;
    }
    
    flip(x, y){
        this.set(x, y, !this.get(x, y));
    }

}

return Grid;

})();
