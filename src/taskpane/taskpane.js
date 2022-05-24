/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office, Word */

Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("run").onclick = run;
    document.getElementById("find").onclick = find;
  }
});

export async function run() {
  return Word.run(async (context) => {
    /**
     * Insert your Word code here
     */

    // insert a paragraph at the end of the document.
    const paragraph = context.document.body.insertParagraph("Hello World", Word.InsertLocation.end);

    // change the paragraph color to blue.
    paragraph.font.color = "blue";

    await context.sync();
  });
}

export async function find() {
  return Word.run(async (context) => {

    const word = context.document.body.search("World", {ignorePunct: true});
    context.load(word);
    for(let i=0; i<word.items.length; i++)
    word.items[i].document.body.insertHtml("Hello World", "Replace");
    // console.log(word);

    await context.sync();
  })
  .catch(function(e){
    console.log(e.message);
    if (error instanceof OfficeExtension.Error) {
      console.log("Debug info: " + JSON.stringify(error.debugInfo));
    }
  });
}