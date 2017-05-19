# wechat-me 微信机器人 [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

A WeChat client with built in robot. 个人微信客户端+机器人。

- Under development 开发中

[![Node version](https://img.shields.io/badge/node-_7.6.0-green.svg?style=flat)](http://nodejs.org/download/)

## Getting Started 快速上手
 - git clone https://github.com/jaypeng2015/wechat-me
 - cd wechat-me
 - nvm install
 - npm install -g yarn
 - yarn
 - yarn start

## Main features 主要功能点
 - [x] Uses https://wx.qq.com/ as the interface  使用[微信网页版](https://wx.qq.com/)作为用户界面
 - [x] Analyses conversations from `synccheck` requests 从`synccheck`同步请求中获取对话信息
 - [ ] Integrates with api.ai to make the bot smart  与[api.ai](https://api.ai/)集成，代理越成熟，则机器人越聪明
 - [ ] Add settings to enable/disable auto-reply  增加自动回复`开启/关闭`设置
 