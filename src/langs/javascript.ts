import * as vscode from 'vscode';

const decorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
  });

export function decorate(editor: vscode.TextEditor) {
    let sourceCode = editor.document.getText();
    let regex = /^( +)/;
  
    let decorationsArray: vscode.DecorationOptions[] = [];
  
    const sourceCodeArr = sourceCode.split('\n');
  
    for (let line = 0; line < sourceCodeArr.length; line++) {
      let match = sourceCodeArr[line].match(regex);
      if (match !== null && match.index !== undefined) {
        let range = new vscode.Range(
          new vscode.Position(line, 0),
          new vscode.Position(line, sourceCodeArr[line].length)
        );
  
        let decoration = { range };
  
        decorationsArray.push(decoration);
      }
    }
  
    editor.setDecorations(decorationType, decorationsArray);
}