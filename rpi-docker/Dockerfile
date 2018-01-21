FROM hypriot/rpi-node:7
LABEL maintainer="jan.thomas@rwth-aachen.de"

RUN mkdir -p /opt/fritz-guest-wifi
COPY app /opt/fritz-guest-wifi
WORKDIR /opt/fritz-guest-wifi
RUN rm -f conf/config.js # Remove local confguration file, as it is not intended for the Docker image
RUN npm install
RUN npm run webpack

CMD [ "npm", "start" ]