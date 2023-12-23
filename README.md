# `Dependency Tree Generator`
##### Visualize and manage Node.js dependencies within VS Code.

## **Features**

- Generates a visual dependency tree within the VS Code explorer for easy navigation and understanding of project dependencies.
- Allows adding new dependencies directly from the tree view.
- Refreshes the tree view to reflect changes in the `package.json` file.
- Provides a user-friendly interface with clear icons and labels.

## **Usage**

1. Open a Node.js project in VS Code.
2. Access the "Package Explorer" view from the Activity Bar (icon: React logo).
3. Generate the initial dependency tree using the "Dep-Tree-Generator: Generate Tree" command (Ctrl+Shift+P or Cmd+Shift+P).
4. Interact with the tree:
    - Expand and collapse dependencies to explore their relationships.
    - Click the "Add" button to add new dependencies.
    - Click the "Refresh" button to update the tree view.

## **Fixed Issues**
- ## Issues Addressed
    **Icon Display Issue:** Icons might still appear for dependencies with a collapsible state of "None" under certain conditions. This is currently being investigated.
    ##### Status : `Resolved`

## **Contributing**

Feel free to contribute to this extension! Please follow these steps:

1. Fork this repository.
2. Make your changes.
3. Submit a pull request.

## **License**

This extension is licensed under the MIT License.

## **Contact**

For any questions or feedback, please contact [your name or email address].

## **Additional Information**

- **Supported VS Code Versions:** 1.85.0 or higher
- **Required Dependencies:**
    - `@types/vscode`
    - `@types/mocha`
    - `@types/node`
    - `@typescript-eslint/eslint-plugin`
    - `@typescript-eslint/parser`
    - `eslint`
    - `typescript`
    - `@vscode/test-cli`
    - `@vscode/test-electron`

# **More About Tree View Provider:**
### `NodeDependencyProvider` Class
This class is responsible for providing data for the tree view. It contains the following methods:
#### `constructor(workspaceRoot: string)`
Initializes the class with the root path of the workspace.
#### `getTreeItem(element: Dependency): vscode.TreeItem | Thenable<vscode.TreeItem>`
Returns the given element as a tree item.
#### `getChildren(element?: Dependency): vscode.ProviderResult<Dependency[]>`
Returns the child dependencies of the given element or the top-level dependencies if no element is provided.
#### `getDepsFromPackageJson(packageJsonPath: string): Dependency[]`
Reads the package.json file at the given path and returns an array of dependencies.
#### `pathCheck(p: string): boolean`
Checks if the given path exists.
---
### `Dependency` Class
This class represents a dependency in the tree view. It extends the `vscode.TreeItem` class and includes thefollowing properties:
- `label: string`: The name of the dependency.
- `version: string`: The version of the dependency.
- `collapsibleState: vscode.TreeItemCollapsibleState`: The collapsible state of the dependency (either "None" or"Collapsed").
- `tooltip: string`: The tooltip text for the dependency.
- `description: string`: The description text for the dependency.
- `iconPath: { light: string, dark: string }`: The path to the icon file for the dependency.

# VS Code API

This sample uses following contribution points, activation events and APIs

### Contribution Points

- `views`
- `viewsContainers`
- `menu`
  - `view/title`
  - `view/item/context`

### Activation Events

- `onView:${viewId}`

### APIs

- `window.createTreeView`
- `window.registerTreeDataProvider`
- `TreeView`
- `TreeDataProvider`

## Running the Sample

- Open this example in VS Code Insiders
- `npm install`
- `npm run watch`
- `F5` to start debugging
- Node dependencies view is shown in Package explorer view container in Activity bar.
- FTP file explorer view should be shown in Explorer