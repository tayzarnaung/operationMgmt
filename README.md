Download xampp from https://www.apachefriends.org/download.html

change this downloaded xampp to executable by:
	sudo chmod +x xampp-installer.run
check by:
	ls -al xampp-installer.run
install xampp by following:
	sudo ./xampp-installer.run
To open xampp,
 	cd /opt/lammpp
	sudo ./manager-linux-x64.run
(Or)
	sudo /opt/lampp/lampp start (or) stop

	(Optional)
	sudo gedit /etc/environment 
	add /opt/lampp/bin/php
	sudo ln -s /opt/lmapp/lampp/bin/php /usr/local/bin/php

install composer
to install laravel, check php version:
	php --version
	php -m to find requirements
	sudo apt-get install php-mbstring and php-xml


to install angular 7,
sudo apt install curl
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt-get install -y nodejs

npm -v
node -v
node
	console.log('hi')
node node_test.js(from nodejs.org/en/about)

sudo npm install -g @angular/cli
sudo npm unistall -g @angular/cli

delete vendor
composer update
php artisan key:generate ,if No application encryption key has been specified.
copy .env file
create database operationMgmt

php artisan serve
npm start



 Laravel's log file located at /public/storage/logs/laravel-<date>.log (above laravel 5.0)Monitor the log - linux/osx:
  	tail -f /laravel/storage/logs/laravel-<date>.log
  	tail -f storage/logs/laravel-2019-02-28.log
  	Log::info(Address::all());	Log::error("hi");
