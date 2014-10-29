brew update && brew install ant phantomjs node android-sdk

echo "ANDROID_HOME=/usr/local/opt/android-sdk" >> ~/.bash_profile

android update sdk -u --all --filter platform-tool,android-19,build-tools-19.1.0

adb kill-server ; adb start-server

npm update -g npm
npm install -g bower
npm install -g cordova

npm install && bower install

if which xcodebuild >/dev/null; then
  grunt platform:add:ios
fi

if which android >/dev/null; then
  grunt platform:add:android
fi

grunt run:ios
grunt run:android
