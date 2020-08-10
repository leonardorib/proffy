# <h1 style="text-align: center;">![](_readmeImages/logo.png)</h1>

# <div style="text-align: center;">![](_readmeImages/landing.png)</div>

## :notebook_with_decorative_cover: About

Project created during the Next Level Week #2, carried out by Rocketseat. The purpose is to connect students and teachers through a platform available both on the web and a mobile app.

## :computer: Web Preview

<div style="text-align: center;"><img height="350px" src="_readmeImages/video_web.gif"></div>

## :iphone: Mobile App Preview

<div style="text-align: center;"><img height="350px" src="_readmeImages/video.gif"></div>

## :rocket: Technologies

- Typescript
- NodeJS + SQLite
- ReactJS
- React Native
- Expo

## :gear: Getting started

First, clone the repo:

    git clone https://github.com/leonardorib/proffy.git

#### Server

To initialize our server, go to the "server" folder and install the packages needed running:

    yarn install

Then, to actually start the server, run:
yarn start

#### Web

Enter the "web" folder and do:

    yarn install
    yarn start

#### Mobile

To run the mobile version, you need to have expo installed globally:

    yarn global add expo-cli

If using npm:

    npm install expo-cli --global

Then you can enter the "mobile" folder and do:

    yarn install
    yarn start

Expo is going to start the metro bundler and you can test it out with your physical device (Expo app needed), by pointing the camera to the QR Code.

If using a simulator, just select the option "run on Android/iOS" and it will automatically search it. For more details see Expo docs.
