## cas 单点登录流程

#### 使用到的工具

- nginx 代理静态 html 文件
- SwitchHost 切换本地 host
- koa 做服务端

#### nginx 配置

```
server {
    listen       80;
    
    location /server/ {
        proxy_pass http://127.0.0.1:3000/;
    }
    location / {
        root E:/playground/demos/demo-cas/pages;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}
```

#### host 配置

```
127.0.0.1 okey.com
127.0.0.1 server.okey.com
```

####  流程

1. 启动 nginx
2. 切换 host
3. 访问 http://okey.com
4. 没有登录将会重定向到 login 页面
5. 登录完成会 set-cookie ，然后在有效时间内再打开页面不再需要重新登录，重定向到 home 页面
