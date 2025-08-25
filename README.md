# t3app-template

## feat

- t3-app
- postgresql
- shadcn/ui
- auth.js nodemailer

## install

### step1 克隆仓库

```
git clone https://github.com/chaochaokeji/t3app-template.git
```

### step2 修改项目名

修改文件夹名称
修改package.json中name

### step3 修改配置文件

复制 .env.example 为 .env
修改 .env 中密钥、邮箱配置、数据库账号密码

### step4 安装依赖

```
pnpm i
```

### step5 启动docker数据库

```
./start-database.sh
```

按 prisma 配置生成表

```
pnpm db:push
```

### step6 启动测试

```
pnpm dev
```
