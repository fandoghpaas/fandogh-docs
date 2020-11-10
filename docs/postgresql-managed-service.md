---
layout: fandogh
id: postgresql-managed-service
title: PostgreSQL + Adminer
sidebar_label: PostgreSQL + Adminer
---
## ![Postgresql + Adminer](/img/docs/postgresql-adminer.png "Postgresql + Adminer")

PostgreSQL یک ORDBMS معروف و پرطرفدار است که می‌توانید به سادگی به عنوان یک managed-service روی Namespace خود دیپلوی کنید.\
هنگام دیپلوی کردن Postgresql پارامتر‌های زیر را می‌توانید مشخص کنید:
|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| postgresql| نامی که برای سرویس مایلید در نظر گرفته شود|
|adminer_enabled|boolean | true | فعال یا غیرفعال بودن Adminer
|postgres_password| string| postgres| رمز عبور دیتابیس|
|volume_name| string| None| نام volumeای که به سرویس وصل می‌شود|
|volume_browser_enabled| boolean| false| آیا سرویس مدیریت Dedicated Volume برای این سرویس ساخته شود یا خیر|

> توجه داشته باشید که اگر میخواهید سرعت I/O در سرویس دیتابیس شما بیشتر شود، می‌توانید از volume‌ها استفاده کنید و نام آن را به صورت `c volume_name=VOLUME_NAME-` موقع ساخت Managed Service در fandogh-cli وارد نمایید. ( VOLUME_NAME نام volume‌ای است که موقع ساخت آن تعیین کرده‌اید).

> توجه داشته باشید برای استفاده از قابلیت Volume Browser سرویس شما باید به یک Dedicated Volume متصل باشد؛ در غیر این صورت با خطای سرور مواجه خواهید شد.

به عنوان مثال برای دیپلوی کردن یک PostgreSQL می‌توانیم به این شکل یک سرویس بسازیم:
```
  fandogh managed-service deploy postgresql 10.4 \
       -c service_name=test-dbms \
       -c adminer_enabled=false \
       -c postgres_password=test123
```
این دستور یک سرویس PostgreSQL ایجاد می‌کند که:
* نام سرویس آن test-dbms ( یعنی در شبکه داخلی فضانام شما باقی سرویس‌ها از طریق نام test-dbms می‌توانند به آن متصل شوند) .
* رمز عبور آن test123 است.
* نام کاربری نیز postgres می‌باشد
*  Adminer هم در آن غیر‌فعال شده است.

> پورت پیشفرض برای PostgreSQL برابر با 5432 می باشد. 

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
  service_name: postgresql
  version: 10.4
  parameters:
    - name: adminer_enabled
      value: true
    - name: postgres_password
      value: some_long_unpredictable_string
    - name: volume_name
      value: YOUR_VOLUME_NAME
  domains:
  - name: domain.com
  - name: www.domain.com
  resources:
      memory: 3072Mi
```

> توجه داشته باشید، دامنه‌هایی که به سرویس مدیریت شده PostgreSQL اضافه می‌شوند، در اصل به داشبورد مدیریتی آن متصل می‌شوند، نه خود سرویس دیتابیس.

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
  service_name: postgresql
  version: 10.4
  parameters:
    - name: adminer_enabled
      value: true
    - name: postgres_password
      value: some_long_unpredictable_string
    - name: volume_name
      value: YOUR_VOLUME_NAME
  resources:
      memory: 600Mi
```
> هشدار برای استفاده از سرویس PostgresSql باید به نکته زیر توجه داشته باشید: برای حفط مسائل امنیتی سرویس PostgresSql به صورت یک Internal Service عمل می‌کند و شما خارج از namespace خود به آن دسترسی ندارید.
