# NPM Sub Dependency Packer
Allow you to download all the sub dependencies of npm packaged in format of .tgz files, in order to copy them to standalone machines.

package.json is auto generated so you just install them by `npm install` at the downloaded dependencies folder.

# Usage
`git clone https://github.com/elichai123/NPM-Sub-Dependency-Packer.git &&
cd NPM-Sub-Dependency-Packer &&
npm install &&
node packer [NPM package name] [package version - optinal]`

Defualt version is latest.  
