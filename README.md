# fritz-guest-wifi
Node.js web app to enable the FRITZ!Box guest wifi using your smartphone, tablet or notebook. Each time a user enables the guest wifi, a random password is generated. Guests can connect to your guest wifi by scanning a QR code or manually entering the credentials provided at your screen. By default, the wifi gets disabled after 30 minutes of inactivity.

Guest Wifi disabled        |  Guest Wifi enabled
:-------------------------:|:-------------------------:
![Guest Wifi disabled](https://raw.githubusercontent.com/janthomas89/fritz-guest-wifi/master/doc/guest-wifi-disabled.png =250x)  |  ![Guest Wifi enabled](https://raw.githubusercontent.com/janthomas89/fritz-guest-wifi/master/doc/guest-wifi-enabled.png =250x)


## Deployment
There are three options to deploy this app.

### 1. Docker-Compose App (on x86)
```
docker-compose up -d
```

### 2. Docker-Compose App (on arm, e.g. raspberry pi)
```
cd rpi-docker
docker-compose up -d
```

The images are not available at Docker Hub, so you need to build them locally from source. In both cases you may want to provide custom configuration using a ```docker-compose.override.yml``` file.


### 3. Standard Node.js App
```
cd app
npm install
npm start
```



## Configuration
The app can be configured using the following environment variables.

| Name  | Default Value | Mandatory |
|:------|:--------------|:----------|
| WEBAPP_PORT | 3000 | |
| FRITZBOX_USERNAME |  | yes |
| FRITZBOX_PASSWORD |  | yes |
| FRITZBOX_HOST | fritz.box | |
| GUESTWIFI_AUTODISABLE | 1 | |
| GUESTWIFI_DEACTIVATEAFTER | 30 | |
| GUESTWIFI_WAITFORLASTGUEST | 1 | |

Alternatively, you can provide a configuration file according to the schema of ```app/config/default.json```. Please consult https://github.com/lorenwest/node-config for more information on file-based configuration.


## Compatibility
Tested with FRITZ!OS 06.83 on FRITZ!Box Fon WLAN 7360