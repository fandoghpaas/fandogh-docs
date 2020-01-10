---
layout: fandogh
id: memcached-managed-service
title: Memcached
sidebar_label: Memcached
---


## ![Memcached](/img/docs/memcached-managed-service.png "Memcached")

Memcached یک سیستم ذخیره داده به صورت In-Memory است. معمولا از این سرویس برای سرعت بخشیدن به وب سایتهای مبتنی بر بانک اطلاعاتی پویا استفاده می‌شود تا با ذخیره کردن داده ها و objectها در RAM، از تعداد دفعاتی که یک منبع داده خارجی (مانند پایگاه داده یا API) نیاز به خواندن داده‌ها داشته باشد، کاسته و از اجرای Query‌های تکراری جلوگیری کند. Memcached نرم افزاری رایگان و متن باز تحت مجوز اصلاح شده BSD است. Memcached روی سیستم عامل های مشابه یونیکس (مانند لینوکس و OS X) و در مایکروسافت ویندوز اجرا می شود که البته بستگی به کتابخانه libevent دارد.</br>

API های Memcached یک جدول Hash بسیار بزرگ توزیع شده بین چندین ماشین یا سرویس ارائه می دهند. وقتی جدول کامل باشد، درج های بعدی باعث می شود داده های قدیمی تر در حداقل مرتبه استفاده شده اخیر (LRU) پاک شوند. برنامه ها یا سرویس‌هایی که از Memcached استفاده می‌کنند، درخواست‌هایشان ابتدا به سمت RAM منتقل می‌شود و در صورت نبودن دیتای مورد نیاز یا نیاز به بروزرسانی داده‌های جدید این درخواست‌ها به در پشت صحنه به سمت Databaseها منتفل می‌شود.

> توجه داشته باشید که Memcached هیچ مکانیسم داخلی برای ردیابی خطاها که ممکن است اتفاق بیفتد ندارد. با این وجود برخی از ابزارهای third-party این قابلیت را ارائه می دهند که در حال حاضر فندق به صورت مدیریت شده از آن‌ها پشتیبانی‌ نمی‌کند و در صورت نیاز، خود کاربر وظیفه استقرار (deploy) ‌آن را بر عهده دارد.

برای اینکه بتوانید این سرویس را دیپلوی کنید٬ پارامتر‌های زیر را می‌توانید مشخص کنید:
|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| redis| نامی که برای سرویس مایلید در نظر گرفته شود|
|memcached_username| string| memcache| نام کاربری|
|memcached_password| string| memcache|گذرواژه|

برای دیپلوی کردن یک Memcached می‌توانیم به این شکل یک سرویس بسازیم:
```
  fandogh managed-service deploy memcached latest \
       -c service_name=test-memcached \
       -c memcached_username=user
       -c memcached_password=password
       -m 1024
```
این دستور یک سرویس Memcached ایجاد می‌کند که:
* نام آن test-memcached ( یعنی در شبکه داخلی فضانام شما باقی سرویس‌ها از طریق نام test-redis و بر روی پورت 11211 می‌توانند به آن متصل شوند) .
* میزان رم آن 1024 مگابایت.
* نام کاربری user
* و رمز عبور آن password است.

>  برای حفط مسائل امنیتی سرویس Memcached به صورت یک [Internal Service](https://docs.fandogh.cloud/docs/services.html#%DB%B2-%D8%B3%D8%B1%D9%88%DB%8C%D8%B3-%D9%87%D8%A7%DB%8C-%D8%AE%D8%A7%D8%B1%D8%AC%DB%8C-%DB%8C%D8%A7-external-service) عمل می‌کند و شما خارج از namespace خود به آن دسترسی ندارید.

## Deploy With Manifest
  

شما همچنین می توانید برای اجرای راحت تر سرویس های مدیریت شده از [مانیفست](https://docs.fandogh.cloud/docs/service-manifest.html) همانند مثال زیر استفاده کنید.

- مانیفست Memcached
```
kind: ManagedService
name: test-memcached
spec:
  service_name: memcached
  version: latest
  parameters:
    - name: memcached_username
      value: user
    - name: memcached_password
      value: password
  resources:
      memory: 1024Mi
```
