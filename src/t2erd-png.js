#!/usr/bin/env node

'use strict';

// Text to ERD
const minimist = require('minimist');
const t2erd = require('t2erd');
const svgToImg = require("svg-to-img");
const fs = require('fs');

const argv = minimist(process.argv.slice(2));
const input = argv.i;
const output = argv.o;

if(!!input){
  fs.readFile(input, 'utf8', (err, data) => {
    if (err) throw err;

    const svgCode = t2erd(data);
    console.log(svgCode);
    (async () => {
      const image = await svgToImg.from(svgCode).toPng({
        path: output
      });
    })();
  });
}
