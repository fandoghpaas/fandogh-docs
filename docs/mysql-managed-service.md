---
layout: fandogh
id: mysql-managed-services
title: Mysql + phpMyAdmin
sidebar_label: Mysql + phpMyAdmin
---
### ![MySQL + PHPMyAdmin](/img/docs/mysql-phpmyadmin.png "MySQL + PHPMyAdmin")

MySQL یکی از محبوب‌ترین RDBMS‌های امروزی است که طرفداران زیادی در ایران داد، به همین دلیل MySQL به عنوان اولین managed-service به فندق اضافه شد.\
این managed-service از دو image متفاوت تشکیل شده، یکی خود MySQL و دیگری PHPMyAdmin که یک رابط کاربری تحت وب برای MySQL است.\
برای دیپلوی کردن یک سرویس MySQL شما می‌توانید موارد زیر را هنگام دیپلوی مشخص کنید:
|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| mysql| نامی که برای سرویس مایلید در نظر گرفته شود|
|phpmyadmin_enabled|boolean | true | فعال یا غیرفعال بودن PHPMyAdmin
|mysql_root_password| string| root| رمز عبور یوزر root دیتابیس|
|volume_name| string| None| نام volumeای که به سرویس وصل می شود|

> توجه داشته باشید که اگر میخواهید سرعت I/O در سرویس دیتابیس شما بیشتر شود٬ می‌توانید از volume‌ها استفاده کنید و نام آن را به صورت `c volume_name=VOLUME_NAME-` موقع ساخت Managed Service در cli وارد نمایید. ( VOLUME_NAME نام volume‌ای است که موقع ساخت آن تعیین کرده‌اید).

به عنوان مثال برای دیپلوی کردن یک MySQL می‌توانیم به این شکل یک سرویس بسازیم:
```
fandogh managed-service deploy mysql 9.1 \
     -c service_name=mydatabase \
     -c mysql_root_password=12341234\
     -c phpmyadmin_enabled=false
```
این دستور یک سرویس MySQL ایجاد می‌کند که :
* نام سرویس آن mydatabase است( یعنی در شبکه داخلی فضانام شما باقی سرویس‌ها از طریق نام mydatabase می‌توانند به آن متصل شوند) .
* رمز عبور root آن 12341234 است.
*  PHPMyAdmin هم در آن غیر‌فعال شده است.

### Deploy With Manifest
  

شما همچنین می توانید برای اجرای راحت تر سرویس های مدیریت شده از [مانیفست](https://docs.fandogh.cloud/docs/service-manifest.html) همانند مثال زیر استفاده کنید.

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
      value: YOUR_VOLUME_NAME

  resources:
      memory: 800Mi
```
