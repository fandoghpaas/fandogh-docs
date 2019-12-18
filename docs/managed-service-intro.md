---
layout: fandogh
id: managed-services-intro
title: مقدمه
sidebar_label: مقدمه
---
## managed-service چیست؟
![Managed Service Intro](/img/docs/managed-service-intro.png "Managed Service Intro")<br><br>
خیلی از سرویس‌ها مانند MySQL یا PostgreSQL به طور مداوم توسط کاربران استفاده می‌شوند. ما در سکو فندق برای ساده‌تر کردن راه‌اندازی این نوع سرویس‌ها٬ امکانی را طراحی کردیم که به کمک آن می‌توانید با سهولت بیشتری این نوع سرویس‌ها را راه‌اندازی کنید.
<br>
در حالت کلی در دسته‌بندی انواع سرویس‌ها٬ اگر یک سرویس به صورت پیش‌فرض بر روی سکو فندق وجود داشته باشد٬ به آن **سرویس مدیریت شده** می‌گوییم اما اگر کاربر خود٬ سرویسی را از طریق یک ایمیج دلخواه ایجاد کند٬‌آن را **سرویس کاربر یا سرویس** می‌نامیم.

> Managed Service‌ها عموما سرویس‌های کاربردی و مهمی هستند که خود سکو وظیفه نگهداری  آن‌ها را بر عهده دارد٬ لذا توصیه ما به کاربران این است که تا حد ممکن از ایمیج‌های دلخواه استفاده نکرده و از سرویس‌های مدیریت شده فندق استفاده کنند تا از مشکلات امنیتی و فنی در آینده جلوگیری شود.
>
 برای اطلاع از نحوه ساخت سرویس‌ها و انواع آن‌ها می‌توانید به این [اینجا](https://docs.fandogh.cloud/docs/services.html) مراجعه نمایید.


### لیست سرویس‌های مدیریت شده یا Managed Service 
|نام سرویس|ورژن|جزئیات|
|---	|---	|---  |
| Redis| 5.0.3 |[مشاهده](https://docs.fandogh.cloud/docs/redis-managed-service.html)
| Redis Dashboard| latest |[مشاهده](https://docs.fandogh.cloud/docs/redis-managed-service.html)
| MySQL| 5.7 |[مشاهده](https://docs.fandogh.cloud/docs/mysql-managed-service.html)
| phpMyAdmin| latest |[مشاهده](https://docs.fandogh.cloud/docs/mysql-managed-service.html)
| PostgreSQL| 10.4 |[مشاهده](https://docs.fandogh.cloud/docs/postgresql-managed-service.html)
| Adminer| latest |[مشاهده](https://docs.fandogh.cloud/docs/postgresql-managed-service.html)
| MongoDB| latest |[مشاهده](https://docs.fandogh.cloud/docs/mongodb-managed-service.html)
| Mongo Dashboard| latest |[مشاهده](https://docs.fandogh.cloud/docs/mongodb-managed-service.html)
| Proxy| latest |[مشاهده](https://docs.fandogh.cloud/docs/proxy-managed-service.html)
<br>

## نحوه دیپلوی کردن ManagedServiceها
برای دیپلوی کردن ManagedServiceها دو راه وجود دارد:
* استفاده از fandogh-cli
* استفاده از manifest

### fandogh-cli
برای اینکه بتوانید یک سرویس را از طریق **fandogh-cli**  دیپلوی کنید٬ ابتدا همانند دستور زیر با استفاده از دستور `help` لیست سرویس‌های مدیریت شده را مشاهده کنید.
```
fandogh managed-servce help
```

بعد از اینکه لیست سرویس‌ها را مشاهده کردید٬ می‌توانید با استفاده از دستور `deploy`  سرویس مدیریت شده مورد نظر خود را دیپلوی کنید.
برای مثال به این دستور توجه فرمایید:
```
fandogh managed-service deploy mysql 5.7
```
بعد از وارد کردن دستور بالا٬ فندق یک سرویس مدیریت شده از ایمیج Mysql که ورژن آن 5.7 می‌باشد را برای شما دیپلوی می‌کند.

### manifest
در قسمت [مانیفست سرویس](https://docs.fandogh.cloud/docs/service-manifest.html) بطور کامل در مورد چگونگی استفاده از مانیفست‌ها برای ساخت سرویس صحبت شده است و در اینجا برای مثال یک مورد را با هم بررسی می‌کنیم. <br>
به مانیفست زیر توجه کنید:

```
kind: ManagedService
name: db
spec:
  service_name: mysql
  version: 5.7
  parameters:
    ...
  resources:
      memory: 800Mi
```
برای آنکه بتوانید یک سرویس مدیریت شده را از طریق مانیفست اجرا نمایید٬ فقط کافی است **kind** را به **ManagedService** تغییر داده و در قسمت **service_name** نام سرویس مدیریت شده ای را که از لیست انتخاب کرده‌اید را جایگزین نموده و در قسمت **version** ورژن ایمیج را وارد نمایید.
