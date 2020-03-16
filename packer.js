const dependencieList = require('npm-remote-ls').ls;
const cmd = require('child_process').exec;
const fs = require('fs');
const DIST_PATH = './Dependencies'
var dependencyName;
var version;
var dependenciesList;
var packagesNames = []

const packAll = () => {
    dependenciesList.forEach((dependency, index) => {
        console.log(`packing ${dependency}. ${index + 1} / ${dependenciesList.length}`);
        cmd(`npm pack ${dependency}`, {cwd: DIST_PATH}, (err,filename) => {
            packagesNames.push(filename.split('.tgz')[0]);
            packagesNames.length == dependenciesList.length ? generatePackgeJson() : null;
        });
    });
    console.log("Don't exit the terminal! Wait for packing to finsh.")
}

const warnAndExit = () => {
    console.log("\x1b[33m","You must supply a npm dependency name!");
    console.log("\x1b[0m","");
    process.exit(1)
}

const initArgs = () => {
    var args = process.argv.slice(2);
    dependencyName = args[0] ? args[0] : warnAndExit() ;
    version = args[1] ? args[1] : 'latest'
}

const makeDistancePath = () => {
    if (!fs.existsSync(DIST_PATH)){
        fs.mkdirSync(DIST_PATH);
    }
}

const getDependenciesList = () => {
    return new Promise(resolve => {
        dependencieList(dependencyName, version, true, (dependencies) => resolve(dependencies))
    })
}

const generatePackgeJson = () => {
    let packgeJsonContent = { dependencies : {} };
    packagesNames.forEach(tarFileName => packgeJsonContent.dependencies[`${tarFileName.replace('@','-')}`] = `${tarFileName}.tgz`);
    fs.writeFile(`${DIST_PATH}/package.json`, JSON.stringify(packgeJsonContent, null, 2), 'utf8', () => 
        console.log(`Procces done! package.json generated at ${DIST_PATH}, just "npm i" to install all dependencies`))
}

initArgs();
makeDistancePath()
console.log("Waiting to get dependencies list")
getDependenciesList().then((dependencies) => {
    dependenciesList = dependencies;
    console.log(`Dependencies list gotten. There are ${dependencies.length} dependencies to pack`)
    packAll()
})