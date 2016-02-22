# makefile to build different versions of this app

SHELL = /bin/bash

web:	;
	@/bin/bash -c "echo Make web; \
	node enyo/tools/deploy.js -p package.js -o deploy/web;"
bb10:	;
	@/bin/bash -c "echo Make bb10; \
	node enyo/tools/deploy.js -p package.js -o deploy/bb10; \
	cp index_bb10.html deploy/bb10/index.html;"
android:	;
	@/bin/bash -c "echo Make android; \
	cp package.js package_web.js; \
	mv package_android.js package.js; \
	cp index.html index_web.html; \
	mv index_android.html index.html; \
	node enyo/tools/deploy.js -p package.js -o deploy/android; \
	mv package.js package_android.js; \
	mv package_web.js package.js; \
	mv index.html index_android.html; \
	mv index_web.html index.html; \
	cp error.html deploy/android/;"

nw:
	@/bin/bash -c "echo Make nw; \
	cp -rf deploy/web deploy/nw; \
	cp -f  package_nw.json deploy/nw/package.json; \
	mkdir deploy/platforms; \
	nwbuild --cacheDir=/tmp -p linux64 -v 0.12.3 -o deploy/platforms deploy/nw; \
	nwbuild --cacheDir=/tmp -p linux32 -v 0.12.3 -o deploy/platforms deploy/nw; \
	nwbuild --cacheDir=/tmp -p win32 -v 0.12.3 -o deploy/platforms deploy/nw; \
	nwbuild --cacheDir=/tmp -p win64 -v 0.12.3 -o deploy/platforms deploy/nw; \
	nwbuild --cacheDir=/tmp -p osx32 -v 0.12.3 -o deploy/platforms deploy/nw; \
	nwbuild --cacheDir=/tmp -p osx64 -v 0.12.3 -o deploy/platforms deploy/nw;"

all: web bb10 android

cleanall: ;
	rm -r deploy/*;


