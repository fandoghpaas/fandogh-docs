---
layout: fandogh
id: minio-managed-service
title: Minio
sidebar_label: Minio
---


## ![Minio](/img/docs/minio-managed-service.png "Minio")

اگر شما به دنبال راه حلی برای ذخیره‌سازی داده‌های متفاوت هستید بهتر است از Object Storageها استفاده کنید.
یکی از این Object Storageها Minio است. </br>
Minio یک  [cloud storage](https://en.wikipedia.org/wiki/Cloud_storage "Cloud storage") سازگار با [Amazon S3](https://en.wikipedia.org/wiki/Amazon_S3 "Amazon S3") است که به شما این امکان را میدهد تا فایل‌های خود را بر روی آن ذخیره کنید.<br/>

> توجه داشته باشید maximum اندازه یک فایل برای یک Object نمیتواند بیشتر از ۵ ترابایت باشد.

برای اینکه بتوانید این سرویس را دیپلوی کنید٬ پارامتر‌های زیر را می‌توانید مشخص کنید:
|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| minio| نامی که برای سرویس مایلید در نظر گرفته شود|
|minio_access_key| string| | مقدار access key|
|minio_secret_key| string| |مقدار secret key|
|volume_name| string| |نام volumeای که به سرویس وصل می شود|

> توجه داشته باشید طول minio_access_key و minio_secret_key باید بیشتر از ۱۲ کاراکتر باشد، در غیر این صورت با خطای سرور مواجه خواهید شد.

برای دیپلوی کردن یک Minio می‌توانیم به این شکل یک سرویس بسازیم:
```
  fandogh managed-service deploy minio latest \
       -c service_name=test-minio \
       -c minio_access_key=12charchters
       -c minio_secret_key=12charchters
       -c volume_name=VOLUME_NAME
       -m 512
```
این دستور یک سرویس Minio ایجاد می‌کند که:
* نام آن test-minio ( یعنی در شبکه داخلی فضانام شما باقی سرویس‌ها از طریق نام test-minio و بر روی پورت 9000 می‌توانند به آن متصل شوند) .
* میزان رم آن 512 مگابایت.
* minio_access_key آن 12charchters
* minio_secret_key آن 12charchters 
* و نام volume که داده‌های minio بر روی آن ذخیره می‌شود VOLUME_NAME است.

بعد از آن که سرویس Minio ساخته شد، از طریق لینکی که در اختیار شما قرار می‌گیرد می‌توانید وارد داشبورد مدیریتی Minio شده و access_key و secret_key را وارد نمایید و از سرویس استفاده کنید.

## Deploy With Manifest
  

شما همچنین می توانید برای اجرای راحت تر سرویس های مدیریت شده از [مانیفست](https://docs.fandogh.cloud/docs/service-manifest.html) همانند مثال زیر استفاده کنید.

- مانیفست Minio
```
kind: ManagedService
name: test-minio
spec:
  service_name: minio
  version: latest
  parameters:
    - name: minio_access_key
      value: 12charachters
    - name: minio_secret_key
      value: 12charachters
    - name: volume_name
      value: VOLUME_NAME
  resources:
      memory: 512Mi
```
