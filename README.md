# Reactron SMD

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

## Requirements

- git bash
- vs code
- vs code extensions: prettier, gitlens, eslint, camel case navigation, subword navigation
- yarn installed
- node js installed, probably by nvm is easiest?

## To Use

```bash
# Clone this repository
git clone https://github.com/king-koda/reactron
# Go into the repository
cd reactron
# Install dependencies
yarn
# Run the app
yarn dev
```

## Note
- ignore the dist/ files, this is the folder where the typescript files we have get compiled into regular javascript
- don't move photos in case some are named the same, instead, scan every file generating hash for each, put in hash bucket and the file location, build this structure and then refer to it at runtime? hash table? HASH <-> [path1,path2]

## Icons
https://react-icons.github.io/react-icons
