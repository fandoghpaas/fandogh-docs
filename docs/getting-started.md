---
id: getting-started
title: شروع به کار
sidebar_label: شروع سریع فندق
---


# فندق چیست؟

تا پیش از به وجود آمدن سکو‌های نرم‌افزاری، کابران برای راه‌اندازی یک سرویس نرم‌افزاری آنلاین نیاز داشتند که یک سرور ( یا VPS ) تهیه کنند و سرویس خود را روی آن ارائه دهند.
این روش حداکثر انعطاف‌پذیری را در اختیار شما قرار می‌دهد اما طبیعتا چالش‌هایی مثل پیکربندی صحیح، نگهداری و امنیت به عهده خود شما خواهد بود. گذشته از چالش‌های فنی و هزینه تیمی که برای مدیریت سرور‌ها باید بپردازید، برای تهیه چنین سرو‌رهایی شما باید به میزانی منابع سخت‌افزاری در نظر بگیرید که حتی در ساعات اوج فشار روی سرویس نرم‌افزاری که مصرف منابع به بیشترین حد خود می‌رسد، سرویس نرم‌افزاری بدون مشکل به کار خود ادامه دهد. این یعنی اگر ۶ ساعت در روز سرویس شما در ساعات اوج مصرف است، ۱۸ ساعت دیگر روز بخش قابل توجهی از منابع شما بلا استفاده باقی می‌ماند در حالی که هزینه آن را پرداخت کرده‌اید.

فندق یک سکو برای راه‌اندازی و نگهداری سرویس‌های نرم‌افزاری است که به کابران اجازه می‌دهد به طور منعطف و مقیاس‌پذیر سرویس‌های نرم‌افزار خود را راه‌اندازی کنند و متناسب با منابعی که مصرف می‌کنند هزینه کنند.
به طور خلاصه با استفاده از فندق شما فقط کافیست پروژه‌های خود را [داکرایز کنید](https://hackernoon.com/how-to-dockerize-any-application-b60ad00e76da) تا فندق آن‌ها را تبدیل به سرویس‌های در حال اجرا کند.

# شروع کار با فندق

## عضویت

برای استفاده از فندق شما نیاز به یک حساب کاربری دارید، شما می‌توانید از طریق   [اینجا](https://fandogh.cloud)  در فندق عضو شوید.
در هنگام عضویت توجه داشته باشید که باید یک namespace انتخاب کنید، نامی که برای namespace انتخاب می‌کنید در آدرس سرویس‌های شما به این شکل ظاهر می‌شود:  ‌‍
`service_name-namespace.fandogh.cloud`


## نصب CLI

برای استفاده از سکو فندق شما می‌توانید یا از داشبورد فندق استفاده کنید یا اینکه CLI فندق را نصب و استفاده کنید.برای استفاده از CLI ‌باید پایتون نسخه ۲ یا ۳ روی سیستم شما نصب باشد.
اگر پایتون روی سیستم شما نصب باشه به راحتی از طریق pip می‌تونید فندق رو نصب کنید:
```
pip install fandogh_cli --upgrade
```
حالا اگر داخل کامند لاین بنویسید fandogh و اینتر رو بزنید باید این خروجی رو ببینید:
```
$ fandogh
Usage: fandogh [OPTIONS] COMMAND [ARGS]...

Options:
  --version  Show the version and exit.
  --help     Show this message and exit.

Commands:
  domain           Domain management commands
  image            Image management commands
  login            Login to fandogh server
  managed-service  Service management commands
  service          Service management commands
```

در غیر این صورت یعنی توی نصب فندق روی سیستمتون یک جای کار ایراد داره.

## ساخت اولین سرویس
اجازه بدید یک سرویس ساده بسازیم تا بهتر با فندق آشنا بشیم.
یک دایرکتوری بسازید داخلش یک فایل به نام Dockerfile بسازید با این محتویات:
```
FROM nginx:latest
COPY index.html /usr/share/nginx/html/
ENTRYPOINT ["nginx", "-g", "daemon off;"]
```
و یک فایل index.html هم کنارش می‌سازیم:
```
<html>
<body>
	Hello buddy :)
</body>
</html>
```
حالا کافیه ایمیج بسازیم، منتشر کنیم و سرویس رو اجرا کنیم:
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
