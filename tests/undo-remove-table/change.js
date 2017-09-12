const expect = require('expect');

module.exports = function(plugin, change) {
    const cursorBlock = change.state.document.getDescendant('_cursor_');
    const initial = change.state.change({ save: false, });
    initial.moveToRangeOf(cursorBlock);
    const toTest = initial.state.change();
    toTest.call(plugin.changes.removeTable).undo();

    // Back to previous cursor position
    expect(toTest.stateBlock.text).toEqual('Col 1, Row 1');

    return toTest;
};