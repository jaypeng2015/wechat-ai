# WeChat AI | 微信机器人 [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

A WeChat client with built in robot integrated with [api.ai](https://api.ai). 

个人微信客户端+机器人([api.ai](https://api.ai))。

  - Under development 开发中

[![Node version](https://img.shields.io/badge/node-_7.6.0-green.svg?style=flat)](http://nodejs.org/download/)

## Getting Started | 快速上手

  - git clone https://github.com/jaypeng2015/wechat-ai
  - cd wechat-ai
  - nvm install
  - npm install -g yarn
  - yarn
  - yarn start
  - login
  - Go to `Menu, Settings -> Auto Reply`, enable auto-reply for the contacts

 ## Advanced Settings | 高级设置

  Go to `Menu, Settings -> Api Key`, set your own api key if you have a better api.ai agent.

 ## Build | 构建

 ### Mac OS

  `yarn build:mac`.

  The output can be found in `.output` folder, with both the original package and the dmg file.

  输出位于`output`目录下，包含打包app文件以及dmg安装包。

### Windows

  TBD.

  敬请期待。

 ## Note | 请注意

  The conversation will be sent to api.ai if auto-reply is enabled.
  Check [Terms & Conditions](https://api.ai/terms/)

  开启自动回复的对话会被发往api.ai, 查看[条款及协议](https://api.ai/terms/)

  ## Resources | 资源

    - [License (ISC)](https://github.com/nathanbuchar/electron-settings/blob/master/LICENSE.md)
    - [Releases](https://github.com/jaypeng2015/wechat-ai/releases) 
