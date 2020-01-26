---
layout: fandogh
id: getting-started
title: شروع به کار
sidebar_label: شروع سریع فندق
---


## فندق چیست؟

تا پیش از بوجود آمدن سکو‌های نرم‌افزاری، کابران برای راه‌اندازی یک سرویس نرم‌افزاری آنلاین نیاز داشتند که یک سرور ( یا VPS ) تهیه کنند و سرویس خود را روی آن مستقر کنند.\
این روش حداکثر انعطاف‌پذیری را در اختیار شما قرار می‌دهد اما طبیعتا چالش‌هایی مثل پیکربندی صحیح، نگهداری و امنیت به عهده خود شما خواهد بود. گذشته از چالش‌های فنی و هزینه تیمی که برای مدیریت سرور‌ها باید بپردازید، برای تهیه چنین سرو‌رهایی شما باید به میزانی منابع سخت‌افزاری در نظر بگیرید که حتی در ساعات اوج فشار روی سرویس نرم‌افزاری که مصرف منابع به بیشترین حد خود می‌رسد، سرویس نرم‌افزاری بدون مشکل به کار خود ادامه دهد. این یعنی اگر ۶ ساعت در روز سرویس شما در ساعات اوج مصرف است، ۱۸ ساعت دیگر بخش قابل توجهی از منابع شما بلا استفاده باقی می‌ماند در حالی که هزینه آن را پرداخت کرده‌اید.\
فندق یک سکو ابری برای راه‌اندازی و نگهداری سرویس‌های نرم‌افزاری است که به کابران اجازه می‌دهد به طور منعطف و مقیاس‌پذیر سرویس‌های نرم‌افزار خود را راه‌اندازی و متناسب با منابعی که مصرف می‌کنند هزینه کنند.\
به طور خلاصه با استفاده از فندق شما فقط کافیست پروژه‌های خود را [داکرایز کنید](https://hackernoon.com/how-to-dockerize-any-application-b60ad00e76da) تا فندق آن‌ها را تبدیل به سرویس‌های در حال اجرا کند.

## شروع کار با فندق

### عضویت

برای استفاده از فندق شما نیاز به یک حساب کاربری دارید؛ شما می‌توانید از طریق   [صفحه ثبت‌نام](https://fandogh.cloud/user/register)  در فندق عضو شوید.\
در هنگام عضویت توجه داشته باشید که باید یک نام `namespace` یا `فضانام` انتخاب کنید، نامی که برای namespace انتخاب می‌کنید در آدرس سرویس‌های شما به این شکل ظاهر می‌شود:  ‌‍\
`service_name-namespace.fandogh.cloud`


### نصب CLI

 برای استفاده از سکوی ابری فندق شما می‌توانید یا از داشبورد فندق استفاده کنید یا اینکه CLI فندق را نصب و از آن استفاده کنید. برای استفاده از CLI ‌باید پایتون نسخه ۲ یا ۳ روی سیستم شما نصب باشد.\
بعد از [نصب پایتون](https://www.python.org/downloads/) می‌توانید به راحتی از طریق pip  فندق را نصب کنید:

>توجه داشته باشید قبل از نصب fandogh-cli حتما نسخه pip، بروز باشد. برای این منظور می‌توانید قبل از هر بار نصب fandogh-cli از دستور `pip install --upgrade pip` استفاده کیند.

```
pip install fandogh_cli --upgrade
یا
pip3 install fandogh-cli --upgrade
```

حال اگر داخل command line بنویسید fandogh و دکمه Enter را بزنید باید خروجی زیر را مشاهده کنید:
```
$ fandogh
Usage: fandogh [OPTIONS] COMMAND [ARGS]...

Options:
  --version  Show the version and exit.
  --help     Show this message and exit.

Commands:
  domain            Domain management commands
  image              Image management commands
  login                Login to fandogh server
  managed-service  Service management commands
  service          Service management commands
  ...
```
در غیر این صورت یعنی مشکلی در نصب فندق روی سیستم شما وجود دارد.

### ساخت اولین سرویس
برای آنکه با چگونگی کار با fandogh-cli بیشتر آشنا شوید، اجازه بدهیدچگونگی و روند ایجاد یک سرویس ساده را با هم مشاهده کنیم.\
۱) ابتدا یک directory دلخواه ایجاد کرده و داخل آن یک فایل به نام Dockerfile ایجاد نمایید و محتویات زیر را داخل آن کپی کنید:
```
FROM nginx:latest
COPY index.html /usr/share/nginx/html/
ENTRYPOINT ["nginx", "-g", "daemon off;"]
```
۲) سپس یک فایل index.html هم در همان directory و کنار Dockerfile ایجاد کنید:
```
<html>
<body>
	Hello buddy :)
</body>
</html>
```
۳) حال کافی است با استفاده از fandogh-cli یک ایمیج ایجاد کرده، منتشر کنیم و از روی آن ایمیج، سرویس مورد نظر را ایجاد کنیم:
```
$ fandogh login  --username=YOUR_USERNAME --password=YOUR_PASSWORD
Logged in successfully

$ fandogh image init  --name=simple_nginx
Image created successfully

$ fandogh image publish --version v0.1
workspace is ready.
Step 1/3 : FROM nginx:latest
 ---> c82521676580
Step 2/3 : COPY index.html /usr/share/nginx/html/
 ---> 89acd61bde6e
Step 3/3 : ENTRYPOINT nginx -g daemon off;
 ---> Running in 0454d0fabc14
 ---> 9c05b98be468
Successfully built 9c05b98be468
Pushing image to the registry...
Image has been pushed into the registry.

$ fandogh service deploy --version v0.1 --name hello-buddy
Congratulation, Your service is running ^_^
Your service is accessible using the following URLs:
 - http://hello-buddy-YOUR-NAMESPACE.fandogh.cloud
 - https://hello-buddy-YOUR-NAMESPACE.fandogh.cloud

```
