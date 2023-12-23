
import * as vscode from 'vscode';
import NodeDependencyProvider from './dependencyProvider';


export function activate(context: vscode.ExtensionContext) {
	const rootPath =
	vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
		? vscode.workspace.workspaceFolders[0].uri.fsPath
		: "";
	const nodeDependenciesProvider = new NodeDependencyProvider(rootPath);
	const treeView= vscode.window.registerTreeDataProvider(
		'nodeDependencies',
		nodeDependenciesProvider
	);

	let disposable = vscode.commands.registerCommand('dep-tree-generator.gen', () => {

		vscode.window.showInformationMessage('Tree is generated');
	});
	let refresh=vscode.commands.registerCommand('nodeDependencies.refreshEntry', () =>
    nodeDependenciesProvider.refresh()
  	);
	  let addNew=vscode.commands.registerCommand('nodeDependencies.addNew', () =>
	  nodeDependenciesProvider.addNew()
		);
	context.subscriptions.push(disposable,treeView,refresh,addNew);
}

// This method is called when your extension is deactivated
export function deactivate() { }
