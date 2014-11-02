#Overview
A mobile client to the [modernomad](https://github.com/jessykate/modernomad) server software. The mobile client is written in [AngularJS](https://angularjs.org/) using the [Ionic](http://ionicframework.com/) framework and compiled with Apache [Cordova](http://cordova.apache.org/). The initial code was generated using the [ionic generator](https://github.com/diegonetto/generator-ionic) for [yeoman](http://yeoman.io/).

## License
The ambassynetwork code is licensed under the Affero General Public License, which is like the GPL but requires you provide access to the source code for any modified versions that are running publicly (among other things). The intent is to make sure that anyone improving the software makes those improvements available to others, as we have to them.

## Develop
    brew update && brew install node git
    git clone git@github.com:gardner/embassynetwork.git
    cd embassynetwork
    npm update -g npm
    npm install -g bower
    npm install && bower install
    grunt serve

## Build for Devices
The build system is based around cordova. The code can be built for multiple platforms. An osx machine with Xcode installed is required to build for iOS.

### iOS
    brew update && brew install node git
    npm install -g bower
    npm install -g cordova
    npm update -g npm
    npm install -g ios-sim
    grunt platform:add:ios
    npm install && bower install    
    grunt emulate:ios
    

### Android
    brew update && brew install ant phantomjs node android-sdk node git
    npm update -g npm
    npm install -g bower
    npm install -g cordova
    echo "ANDROID_HOME=/usr/local/opt/android-sdk" >> ~/.bash_profile
    android update sdk -u --all --filter platform-tool,android-19,build-tools-19.1.0
    adb kill-server ; adb start-server
    npm install && bower install
    grunt platform:add:android
    grunt run:android
