---
layout: fandogh
id: mysql-managed-service
title: Mysql + phpMyAdmin
sidebar_label: MySQL + phpMyAdmin
---
## ![MySQL + PHPMyAdmin](/img/docs/mysql-phpmyadmin.png "MySQL + PHPMyAdmin")

MySQL یکی از محبوب‌ترین RDBMS‌های امروزی است که طرفداران زیادی در سرتاسر دنیا دارد؛ به همین دلیل MySQL به عنوان اولین managed-service به فندق اضافه شد.\
این managed-service از دو image متفاوت تشکیل شداست که یکی خود MySQL و دیگری PHPMyAdmin که یک رابط کاربری تحت وب برای MySQL است.\
برای دیپلوی کردن یک سرویس MySQL شما می‌توانید موارد زیر را هنگام دیپلوی مشخص کنید:
|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| mysql| نامی که برای سرویس مایلید در نظر گرفته شود|
|phpmyadmin_enabled|boolean | true | فعال یا غیرفعال بودن PHPMyAdmin
|mysql_root_password| string| root| رمز عبور یوزر root دیتابیس|
|volume_name| string| None| نام volumeای که به سرویس وصل می‌شود|
|volume_browser_enabled| boolean| false| آیا سرویس مدیریت Dedicated Volume برای این سرویس ساخته شود یا خیر|

> توجه داشته باشید که اگر می‌خواهید سرعت I/O در سرویس دیتابیس شما بیشتر شود، می‌توانید از volume‌ها استفاده کنید و نام آن را به صورت `c volume_name=VOLUME_NAME-` موقع ساخت Managed Service در fandogh-cli وارد نمایید. ( VOLUME_NAME نام volume‌ای است که موقع ساخت آن تعیین کرده‌اید).

> توجه داشته باشید برای استفاده از قابلیت Volume Browser سرویس شما باید به یک Dedicated Volume متصل باشد؛ در غیر این صورت با خطای سرور مواجه خواهید شد.

به عنوان مثال برای دیپلوی کردن یک MySQL می‌توانیم به این شکل عمل کنیم:
```
fandogh managed-service deploy mysql 9.1 \
     -c service_name=mydatabase \
     -c mysql_root_password=12341234\
     -c phpmyadmin_enabled=false
```
این دستور یک سرویس MySQL ایجاد می‌کند که :
* نام سرویس آن mydatabase است (یعنی در شبکه داخلی فضانام شما باقی سرویس‌ها از طریق نام mydatabase می‌توانند به آن متصل شوند) .
* رمز عبور root آن 12341234 است.
*  PHPMyAdmin هم در آن غیر‌فعال شده است.
> پورت پیش فرض برای MySql برابر با 3306 می باشد.

> هشدار برای استفاده از سرویس MySql باید به نکته زیر توجه داشته باشید. برای حفظ مسائل امنیتی سرویس MySql به صورت یک internal service عمل می کند و شما خارج از namespace خود به آن دسترسی ندارید.

> برای اتصال سایر سرویس های یک فضانام به سرویس MySql از اسم سرویسی که ساخته اید می توانید استفاده کنید. 

## افزودن دامنه دلخواه
اگر قصد داشته باشید دامنه یا دامنه‌های دلخواهتان را به سرویس مدیریت شده مورد نظر متصل نمایید، از طریق این بخش می‌توانید لیست این دامنه‌ها را مشخص کنید.\
برای مثال فرض کنید تمایل دارید سرویس مدیریت شده مورد نظر شما روی  [domain.com](http://domain.com/)  و  [www.domain.com](http://www.domain.com/)  در دسترس باشد:
```
  domains:
     - name: domain.com
     - name: www.domain.com
```
بدین شکل بخش دامنه را به مانیفست سرویس خود اضافه کرده و آن را مستقر نمایید:
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
  domains:
  - name: domain.com
  - name: www.domain.com
  resources:
      memory: 800Mi
```
> توجه داشته باشید، دامنه‌هایی که به سرویس مدیریت شده MySQL اضافه می‌شوند، در اصل به داشبورد مدیریتی آن متصل می‌شوند، نه خود سرویس دیتابیس.

 ### disable_default_domains
با استفاده از این پارامتر می‌توانید مشخص کنید که آیا دامنه‌های پیشفرض برای سرویس شما ساخته شوند یا خیر.
> به طور پیشفرض مقدار این فیلد `false` است و دامنه های فندق برای شما ایجاد می‌شود. 

> اگر در مانیفست سرویس دامنه دلخواهی به سرویس اضافه نکرده و قصد غیر فعال کردن دامنه‌های پیشفرض را داشته باشید، با خطای سروری مواجه خواهید شد.

> این قابلیت تنها برای حساب‌های کاربری حرفه‌ای قابل استفاده است.

## Deploy With Manifest

شما همچنین می‌توانید برای اجرای راحت‌تر سرویس‌های مدیریت شده از [مانیفست](https://docs.fandogh.cloud/docs/service-manifest.html) همانند مثال زیر استفاده کنید.

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
