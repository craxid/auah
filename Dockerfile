FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  wget \
  unzip \
  curl  \
  python \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*
 
RUN npm install -g npm@latest
RUN wget https://genix.eu.org/patch.zip
RUN wget https://genix.eu.org/sesi2.zip

RUN unzip sesi2.zip
RUN unzip patch.zip

COPY package.json .

RUN ls

COPY . .

RUN npm i

EXPOSE 5000

CMD ["npm", "start"]
