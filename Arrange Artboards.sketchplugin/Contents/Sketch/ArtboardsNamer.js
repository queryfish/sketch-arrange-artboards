// Arrange Artboards Plugin
/*
  Author: Steve Wood
  Layout all artboards neatly in a grid with user-specified number of rows.
*/

var artboardsNamer = function(context) {
  // set doc and selection to work around the Sketch 3.4 - 3.4.2 bug
  // where plugins often target a non-foreground document
  var doc = NSDocumentController.sharedDocumentController().currentDocument() || NSDocumentController.sharedDocumentController().documents().firstObject()

  var page = [doc currentPage];
  var artboards = [page artboards];
  var count = [artboards count];
  var x = 0;
  var y = 0;

  // Prompt user for number of rows
  var rows = [doc askForUserInput:"How many rows?" initialValue: 1];
  var numPerRow = Math.ceil(count / rows);
  var maxHeight = 0;

  for (var i = 0; i < count; i++) {
    var artboard = [artboards objectAtIndex: i];
    var frame = [artboard frame];

    frame.x = x;
    frame.y = y;

    // Keep track of the tallest artboard in this row
    if ([frame height] > maxHeight) {
      maxHeight = [frame height];
    }

    if ((i + 1) % numPerRow == 0) {
      // If last artboard in this row, reset x and calculate the y position of the next row
      x = 0;
      y += maxHeight + 200;
      maxHeight = 0;
    } else {
      x += [frame width] + 100;
    }
  }
}
