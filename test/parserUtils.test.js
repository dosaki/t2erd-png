const assert = require('assert');
const fs = require('fs');

const utils = require("../src/parser/parser_utils.js");

describe('ParserUtils', function() {
  describe('isCommentLine', function() {
    it('detect #', function() {
      let line = "# This is a comment";
      assert.equal(utils.isCommentLine(line), true);
    });

    it('detect inline comment', function() {
      let line = "This is not a comment # This is a comment";
      assert.equal(utils.isCommentLine(line), false);
      assert.equal(utils.stripComments(line), "This is not a comment");
    });

    it('detect new line', function() {
      let line = "\n";
      assert.equal(utils.isCommentLine(line), true);
    });

    it('detect regular text', function() {
      let line = "regular text";
      assert.equal(utils.isCommentLine(line), false);
    });

    it('detect regular text with # in the middle', function() {
      let line = "regular # text";
      assert.equal(utils.isCommentLine(line), false);
    });
  });
});
