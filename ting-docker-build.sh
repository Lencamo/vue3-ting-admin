#!/bin/bash

yum install git -y
git clone https://github.com/Lencamo/vue3-ting-admin.git
cd ./vue3-ting-admin
docker build -t ting-ui:v1.0 .
docker run -itd --name ting-ui -p 81:80 ruoyi-ui:v1.0
