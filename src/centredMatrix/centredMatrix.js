const CentredMatrix = function(centreItem){
  _self = this;
  const _positions = [[undefined]];
  let _centre = {x:0, y:0};

  const actual = (axis, axisValue) => {
    return axisValue + _centre[axis];
  };

  const fixMatrix = (x, y) => {
    const preAdjustY = actual('y', y);
    const adjustmentY = Math.abs(preAdjustY);
    if(preAdjustY < 0){
      _centre.y += Math.abs(y + _centre.y);
      for(let i = 0; i<adjustmentY; i++){
        _positions.unshift([]);
      }
    }
    else if(preAdjustY >= _positions.length){
      for(let i = 0; i<adjustmentY; i++){
        _positions.push([null]);
      }
    }
    const adjustedY = actual('y', y);

    const preAdjustX = actual('x', x);
    const adjustmentX = Math.abs(preAdjustX);
    if(preAdjustX < 0){
      _centre.x += Math.abs(x + _centre.x);
      for(let i = 0; i<adjustmentX; i++){
        _positions.forEach(position => {
          position.unshift(null);
        });
      }
    }
    else if(preAdjustX >= _positions[adjustedY].length){
      for(let i = 0; i<adjustmentX; i++){
        _positions.forEach(position => {
          position.push(null);
        });
      }
    }
  };

  const trimMatrix = () => {
    if(_positions[_positions.length-1].filter(slot => slot !== null).length === 0){
      _positions.pop(_positions.length-1);
    }
    let foundObject = {};
    for(let rowIt=_positions[0].length-1; rowIt >= 0 ; rowIt--){
      foundObject[rowIt] = false;
      for(let colIt=0; colIt < _positions.length; colIt++){
        if(_positions[colIt][rowIt] !== null && _positions[colIt][rowIt] !== undefined){
          foundObject[rowIt] = true;
        }
      }
    }

    for(let rowIt=_positions[0].length-1; rowIt >= 0 ; rowIt--){
      for(let colIt=0; colIt < _positions.length; colIt++){
        if(!foundObject[rowIt]){
          console.log(`Popping ${rowIt} ${colIt} => ${_positions[colIt][rowIt]}`);
          if(_positions[colIt][rowIt] !== undefined){
            _positions[colIt].pop(rowIt);
            console.log("Popped.");
          }
        }
      }
    }
  }

  const init = (centralItem) => {
    if(centreItem === undefined){
      throw new Error("Matrix needs to be initialized with a central item!")
    }
    _positions[_centre.y][_centre.x] = centreItem;
  }

  _self.push = (x, y, item) => {
    fixMatrix(x, y);
    _positions[actual('y', y)][actual('x', x)] = item;
  };

  _self.get = (x, y) => {
    const actualY = actual('y', y);
    const actualX = actual('x', x);
    if(actualY < 0 || actualY >= _positions.length){
      return undefined;
    }
    if(actualX < 0 || actualX >= _positions[actualY].length){
      return undefined;
    }

    return _positions[actualY][actualX];
  };

  _self.getPlainMatrix = () => {
    trimMatrix();
    return _positions;
  }

  init(centreItem);
};

module.exports = CentredMatrix;
