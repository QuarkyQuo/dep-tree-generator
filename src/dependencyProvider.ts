import * as vscode from "vscode";
import fs from "fs";
import path from "path";

   let iconPath = {
        light: vscode.Uri.file(path.join( __dirname ,'icon-hide-sidebar.svg')),
        dark: vscode.Uri.file(path.join( __dirname,'icon-hide-sidebar.svg'))
       
    };

export default class NodeDependencyProvider implements vscode.TreeDataProvider<Dependency>{
    constructor(private workspaceRoot: string ) { }

    getTreeItem(element: Dependency): vscode.TreeItem | Thenable<vscode.TreeItem> {
        
        return element;
    }

    getChildren(element?: Dependency): vscode.ProviderResult<Dependency[]> {
        if (!this.workspaceRoot) {
            vscode.window.showInformationMessage("No dependencies in this workspace")
            return Promise.resolve([]);
        }
        if (element) {
            // console.log(element)
            return Promise.resolve(
                this.getDepsFromPackageJson(
                  path.join(this.workspaceRoot, 'node_modules', element.label, 'package.json')
                ));
        }else{
            const packageJsonPath = path.join(this.workspaceRoot, 'package.json');
            if (this.pathCheck(packageJsonPath)) {
                return Promise.resolve(this.getDepsFromPackageJson(packageJsonPath));
              } else {
                vscode.window.showInformationMessage('Workspace has no package.json');
                return Promise.resolve([]);
              }
        }
    }

    private getDepsFromPackageJson(packageJsonPath: string): Dependency[] {
        if (this.pathCheck(packageJsonPath)) {
            const toDep = (moduleName: string, version: string): Dependency => {
                if (this.pathCheck(path.join(this.workspaceRoot, 'node_modules', moduleName))){
                    
                    return new Dependency(moduleName, version,vscode.TreeItemCollapsibleState.Collapsed,iconPath);
                }else{
                    return new Dependency(moduleName, version,vscode.TreeItemCollapsibleState.None)
                }
            }




            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
            const deps= packageJson.dependencies?
            Object.keys(packageJson.dependencies).map(dep=>toDep(dep,packageJson.dependencies[dep])):
            [];

            const devDeps= packageJson.devDependencies?
            Object.keys(packageJson.devDependencies).map(dep=>toDep(dep,packageJson.devDependencies[dep])):
            [];

            return deps.concat(devDeps)
        }else{
            return [];
        }
    }

    private pathCheck(p: string): boolean {
        try {
            fs.accessSync(p)
        } catch (err) {
            return false;
        }
        return true;
    }
    private _onDidChangeTreeData: vscode.EventEmitter<Dependency | undefined | null | void> = new vscode.EventEmitter<Dependency | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<Dependency | undefined | null | void> = this._onDidChangeTreeData.event;
  
    refresh(): void {
      console.log("Refresh is fired");
      this._onDidChangeTreeData.fire();
    }
    
    addNew(): void {
        // 1. Prompt for dependency name and version
        const input = vscode.window.showInputBox({
          placeHolder: "Enter dependency name and version (e.g., react@18.2.0)",
          prompt: "Add New Dependency",
        }).then((result) => {
        
        if (result) {
            
          // 2. Validate input
          const [name, version] = result.split("@");
          if (!name || !version) {
            vscode.window.showErrorMessage("Invalid input format. Please specify name and version (e.g., react@18.2.0)");
            return;
          }
      
          // 3. Add dependency to package.json
          const packageJsonPath = path.join(this.workspaceRoot, "package.json");
          try {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
            packageJson.dependencies[name] = version;
            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      
            // 4. Update tree view and notify
            this.refresh(); // Trigger tree view refresh
            vscode.window.showInformationMessage("Dependency added successfully!");
          } catch (error) {
            vscode.window.showErrorMessage("Error adding dependency: " + error);
          }
        }
    });
      }
      

}


class Dependency extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        private version: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly iconPath?: vscode.ThemeIcon | vscode.Uri | { light: vscode.Uri ; dark: vscode.Uri  }
    ) {
        super(label, collapsibleState);
        this.tooltip = `${this.label}-${this.version}`;
        this.description = this.version
        this.iconPath = iconPath?iconPath:vscode.Uri.file("");
        
    }
    
    
	
    // iconPath = {
    //     light: vscode.Uri.file(path.join( __dirname ,'icon-hide-sidebar.svg')),
    //     dark: vscode.Uri.file(path.join( __dirname,'icon-hide-sidebar.svg'))
       
    // };

}

