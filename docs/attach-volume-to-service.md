---
layout: fandogh
id: attach-volume-to-service
title: اتصال dedicated volume به سرویس
sidebar_label: اتصال dedicated volume به سرویس
---
بعد از اینکه شما یک dedicate volume ایجاد کردید، قدم بعدی اتصال آن به یک سرویس است تا داده‌های سرویس مورد نظر در مسیرهای مشخص شده در آن volume ذخیره شوند.\
این روال در ادامه توضیح داده شده است.

## چگونگی اتصال سرویس به volume


![Volume Attachment](/img/docs/volume_attachment.png "Volume Attachment")

بعد از آنکه شما یک volume را ایجاد کردید، با استفاده از [مانیفست](https://docs.fandogh.cloud/docs/service-manifest.html) می‌توانید سرویس خود را به volume دلخواهتان متصل کنید.

تنها کاری که باید انجام دهید این است که مانیفست سرویس فعلی را باز کرده و mount_pathای که می‌خواهید به volume متصل شود را نوشته و volume_name را که همان نام volume ساخته شده است را همانند مانیفست زیر به آن اضافه کنید.

```
volume_mounts:
- mount_path: /data
  volume_name: vol1
```

```
kind: InternalService  
name: cache  
spec:  
  image: library/redis:latest  
  image_pull_policy: IfNotPresent  
  replicas: 1  
  volume_mounts:  
   - mount_path: /data
     volume_name: vol1  
```
یا برای یک managed-service می‌توانید بسته به نوع آن از parameter مربوط به volume استفاده کنید:
```
kind: ManagedService
name: db
spec:
  service_name: mysql
  version: 5.7
  parameters:
    - name: phpmyadmin_enabled
      value: true
    - name: mysql_root_password
      value: some_long_unpredictable_string
    - name: volume_name
      value: name_of_volme
  resources:
      memory: 500Mi


```

حال با استفاده از دستور `service apply` می‌توانید سرویس خود را مستقر کرده و در آخر ببینید که سرویس شما به درستی به volume متصل شده و اطلاعات مورد نیاز از مسیر data/ را در volume با نام vol1 ذخیره سازی می‌کند.

> توجه داشته باشید مانند تکه کد زیر، شما می‌توانید sub_path را هم به volume خود اضافه کنید تا از شلوغ شدن فضای ذخیره سازی جلوگیری به عمل آورید.

```
volume_mounts:
 - mount_path: /data
   sub_path: /sub_directory
   volume_name: vol1
```

## چگونگی جدا کردن سرویس از volume
برای آنکه بتوانید یک سرویس را از یک volume جدا کنید یا اصطلاحا detach کنید، کافی است سرویسی را که به آن متصل است destroy کرده و نام volume‌ای (volume_name) که در مانیفست آن سرویس بوده را حذف کنید.


## چگونگی حذف یک volume

برای آنکه بتوانید یک volume را حذف کنید، کافی است تا نام volume مورد نظر را به دستور زیر بدهید.

```
fandogh volume delete --name vol1
```

> **توجه : پاک کردن یک volume منجر به پاک شدن تمام محتوای داخل آن شده و بازگرداندن آن امکان‌ پذیر نخواهد بود.**

> همچنین توجه داشته باشید، اگر volume ای که قصد پاک کردن آن را دارید به یک سرویس متصل باشد، ابتدا باید آن سرویس را [destroy](https://docs.fandogh.cloud/docs/services.html) کرده و بعد تلاش به حذف volume مورد نظر کنید.

