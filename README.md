<h1 align="center">Welcome to cz-conventional-changelog-jira-first 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/cz-conventional-changelog-jira-first" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/cz-conventional-changelog-jira-first.svg">
  </a>
  <img src="https://img.shields.io/badge/npm-%3E%3D5.5.0-blue.svg" />
  <img src="https://img.shields.io/badge/node-%3E%3D10.0.0-blue.svg" />
  <a href="https://github.com/Michriko/cz-conventional-changelog-jira-first/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/Michriko/cz-conventional-changelog-jira-first/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/Michriko/cz-conventional-changelog-jira-first" />
  </a>
</p>


> This is a typeScript implementation of a commitizen adapter for conventional changelogs, with the jira id as first item in the commit message head. This Project is in an early state but will be improved soon. Any Contribution is appreciated.

## Prerequisites
- npm >=5.8.0
- node >=10.15.2

## Install
First install the package via npm:
```sh
npm i --save-dev cz-conventional-changelog-jira-first
```

As every commitizen adapter you need to add a refenrece to this adapter in your commitizen config in your package.json
```json
"commitizen": {
  "path": "./node_modules/cz-conventional-changelog-jira-first"
}
```

or your commitizen config file .czrz
```json
{
  "path": "./node_modules/cz-conventional-changelog-jira-first"
}

```
## Usage
Just use your configured default commitizen command:

```sh
git cz
```
or 
```sh
npm run commit
```
or if you added prepare commit message hooks via husky
```sh
git commit
```

## Debugging
For easier debugging there is a helper Script, that runs the adapter without commiting. It just prints the generated commitmessage to the console. This script is not part of the npm package. Its only used for development.
I added VScode launchsettings for easy to go debugging and launching the helper. If you are not using VSCode, you can start the script with first calling the typescript transpiler and run the script afterwards with nodejs.

```sh
tsc
node dist/debugHelper.js
```

## Author

👤 **Michael Kopf**

* Website: https://kopf.codes
* Github: [@Michriko](https://github.com/Michriko)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Michriko/cz-conventional-changelog-jira-first/issues). 

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Michael Kopf](https://github.com/Michriko).<br />
This project is [MIT](https://github.com/Michriko/cz-conventional-changelog-jira-first/blob/master/LICENSE) licensed.

***
