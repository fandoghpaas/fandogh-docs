---
layout: fandogh
id: mongodb-managed-service
title: MongoDB
sidebar_label: MongoDB
---


## ![MongoDB](/img/docs/MongoDB-managed-service.png "MongoDB")

پایگاه داده‌های Relational یا رابطه در سال ۱۹۷۰ معرفی شدند تا بتوان با ایجاد رابطه بین جدول داده‌ها با استفاده از Queryهای مختلف بسته به نیاز عملیات متفاوتی را بر روی این داده‌ها انجام داد.
این مدل پایگاه داده در آن زمان که سخت‌افزارهای ذخیره‌سازی گران بودند و استفاده از رایانه و اینترنت مانند امروز فراگیر نشده بود گزینه بسیار مناسب و خوبی بودند.<br/>
ولی مشکل از آن زمانی شروع شد که در سایت‌های ساده با تعداد کاربر‌های زیاد در هر API Call سرور Queryهای پیچیده‌ و زیادی را برای بدست آوردن داده‌ها انجام میداد و این موضوع هزینه زمانی و سخت‌افزاری را افزایش میداد.<br/>
به همین منظور با گذر زمان و ارزان‌تر شدن سخت‌افزارها نوع جدیدی از پایگاه‌های داده به نام NoSQL‌ها پا به عرصه گذاشتند تا با جای دادن تکنولوژی‌های پایگاه‌داده‌ای زیادی در خود، به حل مسائل سرعت بیشتری ببخشند.<br/><br/>
یکی از این پایگاه‌داده‌های محبوب [MongoDB](https://mongodb.com) است که در میان توسعه دهنده‌گان از محبوبیت بسیار بالایی برخوردار بوده و نشان داده است که در ساختارها و مقیاس‌های بزرگ و پیچیده به راحتی می‌تواند پاسخگوی نیاز‌های یک پروژه باشد.<br/>
حال برای اینکه بتوانید این سرویس محبوب بر روی فضانام خود دیپلوی کنید، پارامتر‌های زیر را می‌توانید مشخص کنید:
|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| mongodb| نامی که برای سرویس مایلید در نظر گرفته شود|
|mongodb_init_root_username| string| mongo| نام کاربری پایگاه داده|
|mongodb_init_root_password| string| mongo| گذرواژه پایگاه داده|
|mongodb_init_database| string | main| نام دیتابیسی که در ابتدا برای اجرای scriptهای نصب استفاده می‌شود |
|volume_name| string| None| نام volumeای که به سرویس وصل می شود |
|mongo_dashboard_enabled| boolean| False | در صورت نیاز به داشبورد mongo مقدار این بخش باید True شود |
|mongo_dashboard_username| string| root| نام کاربری داشبورد mongo |
|mongo_dashboard_password| string| root| نام کاربری داشبورد mongo |

> توجه داشته باشید که سرویس ‌MongoDB برای آنکه بتواند داده‌های خود را ذخیره کند و از سرعت و کارایی مناسبی برخوردار باشد باید حتما به یک [dedicated volumes](https://docs.fandogh.cloud/docs/dedicated-volume.html) متصل شود در غیر این صورت با خطا مواجه شده و سرویس به درستی عمل نمی‌کند.

به عنوان مثال برای دیپلوی کردن یک MongoDB می‌توانیم به این شکل یک سرویس بسازیم:
```
  fandogh managed-service deploy mongodb 4.2 \
       -c service_name=test-mongo \
       -c mongo_init_root_password=pass123 \
       -c mongo_init_root_username=test-user \
       -c volume_name=mongo-volume
```
این دستور یک سرویس MongoDB ایجاد می‌کند که:
* نام آن test-mongo ( یعنی در شبکه داخلی فضانام شما باقی سرویس‌ها از طریق نام test-mongo و بر روی پورت 27017 می‌توانند به آن متصل شوند) است .
* نام کاربری سرویس test-user است.
* رمز عبور آن pass123 است.
* و نام volume که به آن متصل بوده و داده‌های خود را بر روی آن ذخیره می‌کند mongo-volume است.

> **هشدار**
برای استفاده از سرویس MongoDB باید به نکته زیر توجه داشته باشید:
> * برای حفط مسائل امنیتی سرویس MongoDB به صورت یک [Internal Service](https://docs.fandogh.cloud/docs/services.html#%DB%B2-%D8%B3%D8%B1%D9%88%DB%8C%D8%B3-%D9%87%D8%A7%DB%8C-%D8%AE%D8%A7%D8%B1%D8%AC%DB%8C-%DB%8C%D8%A7-external-service) عمل می‌کند و شما خارج از namespace خود به آن دسترسی ندارید.

## Deploy With Manifest
  

شما همچنین می توانید برای اجرای راحت تر سرویس های مدیریت شده از [مانیفست](https://docs.fandogh.cloud/docs/service-manifest.html) همانند مثال زیر استفاده کنید.

- مانیفست MongoDB بدون داشبورد مدیریتی
```
kind: ManagedService
name: test-mongo
spec:
  service_name: mongodb
  version: 4.2
  parameters:
    - name: mongodb_init_root_username
      value: YOUR_USERNAME
    - name: mongodb_init_root_password
      value: YOUR_PASSWORD
    - name: mongodb_init_database
      value: main
    - name: volume_name
      value: YOUR_VOLUME_NAME
  resources:
      memory: 400Mi
```
- مانیفست MongoDB همراه با داشبورد مدیریتی

```
kind: ManagedService
name: test-mongo
spec:
  service_name: mongodb
  version: 4.2
  parameters:
    - name: mongodb_init_root_username
      value: YOUR_USERNAME
    - name: mongodb_init_root_password
      value: YOUR_PASSWORD
    - name: mongodb_init_database
      value: main
    - name: volume_name
      value: YOUR_VOLUME_NAME
    - name: mongo_dashboard_enabled
      value: 'true'
    - name: mongo_dashboard_username
      value: YOUR_DASHBOARD_USERNAME
    - name: mongo_dashboard_password
      value: YOUR_DASHBOARD_PASSWORD
  resources:
      memory: 400Mi
```
