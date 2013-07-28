# makefile to build different versions of this app

all:
	# make web version
	node enyo/tools/deploy.js -p package.js -o deploy/web
	# make android version
	cp package.js package_web.js
	mv package_android.js package.js
	cp index.html index_web.html
	mv index_android.html index.html
	node enyo/tools/deploy.js -p package.js -o deploy/android
	mv package.js package_android.js
	mv package_web.js package.js
	mv index.html index_android.html
	mv index_web.html index.html
	cp -r js deploy/android/
	cp error.html deploy/android/
