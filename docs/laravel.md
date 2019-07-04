---
layout: fandogh
id: laravel
title: پروژه‌های لاراول
sidebar_label: پروژه‌های لاراول 
---

### ![Laravel Project](/img/docs/Django-project-banner.png "Laravel Project")

دیپلوی کردن سرویس‌ها بر روی فندق برای کاربرانی که با docker کار نکرده‌اند ممکن است مقداری مبهم باشد٬ همینطور معمولا آماده سازی پروژه‌ها برای اجرا در محیط واقعی نیاز به تنظیماتی دارد که باعث پیچیده شدن کار برنامه‌نویس می‌شوند.
ما در این بخش به توضیح چگونگی دیپلوی کردن سرویس Laravel Project بدون نیاز به دانش docker می‌پردازیم.

> اگر هنوز CLI  فندق بر روی کامپیوتر شما نصب نیست از طریق این [مستند](https://docs.fandogh.cloud/docs/getting-started.html) می‌توانید CLI را بر روی کامپیوتر خود نصب کنید.

در پوشه اصلی پروژه٬ بعد از اینکه در فندق لاگین کردید دستور `fandogh source init‍‍` را اجرا کنید. در اولین مرحله شما می‌بایست اسم سرویس رو انتخاب نمایید.

```
Service Name: mywebsite
```

 بعد از وارد کردن نام Service  برای شما گزینه هایی که بدون نیاز به دانش docker قابل اجرا هستند نمایش داده می شود. از بین گزینه های نمایش داده گزینه **Laravel Project** را انتخاب کنید.

>  توجه داشته باشید  برای انتخاب٬ شماره گزینه مورد نظر را وارد کنید.

```
-[1] Static Website
-[2] Django Project
-[3] Laravel Project
Please choose one of the project types above:

``` 

در قسمت بعدی شما باید context را وارد کنید. context همان پوشه‌ای است که خروجی برنامه شما در آن قراره گرفته است. اگر در حال حاضر در پوشه اصلی نیستید می توانید آدرس آن را وارد کنید یا در غیر این صورت خالی بگذارید و دکمه enter را فشار دهید. 

```
The context directory [.]:
```

پس از مشخص کردن اطلاعات فوق٬ فایلی با نام fandogh.yml در پوشه جاری شما ساخته می شود. 
اکنون با نوشتن دستور ` fandogh source run ` می توانید پروژه خودتان را بر روی فندق دیپلوی کنید.


 


> اگر شما از پایگاه داده mysql استفاده میکنید. با استفاده از دستورات فندق می توانید یک سرویس مدیریت شده mysql ران کنید
و اطلاعات مورد نظر را در کد خود وارد کنید. بهتر است به جای استفاده از hard code در پروژه خود این مقادیر را به عنوان environment variable در فایل fandogh.yml اضافه کنید.  

>شما برای پروژه های لاراول از app_key استفاده میکنید. این مقدار را نیز به عنوان environment variable میتوانید در فایل fandogh.yml ذخیره کنید

```
kind: ExternalService
name: myshop
spec:
  image_pull_policy: Always
  port: 80
  source:
    context: .
    project_type: laravel
  env:
    - name: APP_KEY
      value: base64:HGT49Mfm6j77W2N6K3GXqJqqNgUromHg41lRF23sEJc=
    - name: APP_DEBUG
      value: true
    - name: APP_URL
      value: http://localhost
    - name: DB_CONNECTION
      value: mysql
    - name: DB_PORT
      value: 3306
    - name: DB_DATABASE
      value: mydatabsename
    - name: DB_USERNAME
      value: dbuser_like_root
    - name: DB_PASSWORD
      value: db_password
    - name: DB_HOST
      value: mysql_service_on_fandogh
```



> حتما در نظر داشته باشید سکوی ابری فندق بر روی HTTPS قرار داد و برخی از پروژه ها با http کار میکنند. این اتفاق ممکن است باعث شود که فایل های static شما مانند css,js,img ها در سرویس شما لود نشوند برای این کار در قسمت Providers فایل appserviceprovider کلاس app service
تابع boot را به شکل زیر تغییر دهید. 

```
public function boot(UrlGenerator $url)
            if (\App::environment() === 'production') {
                $url->forceScheme('https');           
        }
```

>برای استفاده از UrlGenerator فراموش نکنید که این کلاس را وارد کنید. 

> پس از هر بار تغییر در پروژه تنها کافیست که دستور fandogh source run را مجددا اجرا کنید. 
> فایل `fandogh.yml` می‌تواند شامل تمام بخش‌هایی که در [مانیفست](https://docs.fandogh.cloud/docs/service-manifest.html) فندق است باشد٬ شما به صورت دستی قادر هستید تا بخش‌های مورد نیاز این فایل را تغییر دهید.