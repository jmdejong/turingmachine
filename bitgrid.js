

var Grid = (function(){
"use strict";

class Grid {
    
    
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.grid = new Int8Array(width*height);
    }
    
    get(x, y){
        if (x >= 0 && y >= 0 && x < width && y < height){
            return this.grid[x + y * width];
        }
        return null;
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
