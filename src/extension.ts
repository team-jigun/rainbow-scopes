import * as fs from 'fs';
import * as vscode from 'vscode';
import * as path from 'path';

class LangModule {
  name: string;
  langmodule: any;
  constructor(name: string, langmodule: any) {
    this.name = name;
    this.langmodule = langmodule;
  }
}

export async function activate(context: vscode.ExtensionContext) {
  const langs: LangModule[] = [];
  const langfiles = fs.readdirSync(path.join(__dirname, './langs'));
  for(let langfile in langfiles) {
    console.log(path.join(path.join(__dirname, './langs'), langfiles[langfile]));
    if(!langfiles[langfile].endsWith('.js')) continue;
    const lang = langfiles[langfile].replace('.js', '');
    langs.push(new LangModule(lang, await import(path.join(path.join(__dirname, './langs'), langfiles[langfile]))));
  }
  
  vscode.workspace.onDidChangeTextDocument(event => {
    const openEditor = vscode.window.visibleTextEditors.filter(
      editor => editor.document.uri === event.document.uri
    )[0];
    for(let lang in langs) {
      if(langs[lang].name === openEditor.document.languageId) {
        langs[lang].langmodule.decorate(openEditor);
      }
    }
  });
}