---
layout: fandogh
id: kong-managed-service
title: Kong
sidebar_label: Kong 
---


## ![Kong](/img/docs/kong-managed-service.png "Kong")

**Kong** یک سرویس **API Layer** متن‌باز و مقیاس‌پذیر است که از آن به عنوان یک سرویس **API Gateway** یا **API Middleware** نیز یاد می‌شود. Kong در جلوی RESTful API قرار می‌گیرد و این قابلیت را دارد تا با پلاگین‌های متفاوتی که Functionalityهای بیشتری به آن می‌دهد توسط کاربر تنظیم شود.<br/>
در ابتدا سرویس Kong در Mashape ساخته شد تا بیش از ۱۵۰۰۰ API و میکروسرویس مربوط به Marketplace خود را ایمن و مدیریت کرده و گسترش دهد. این Marketplace میلیاردها request را به صورت ماهیانه برای بیش از ۲۰۰۰۰۰ هزار توسعه دهنده ایجاد می‌کند و امروز در کسب‌و‌کارهایی با مقیاس‌های بزرگ و کوچک در دسترس و در حال استفاده است.<br/>

## مزایای Kong
* **مقیاس‌پذیری**: مقیاس سرویس kong به راحتی بسته به نیاز و تعداد میکروسرویس‌های کاربر با اضافه کردن ماشین‌های بیشتر گسترش میابد.
* **Modular**: شما می‌توایند با اضافه کردن Pluginهای متفاوت که به راحتی نصب و تنظیم می‌شوند، سرویس Kong خود را گسترش دهید.
* **قابل اجرا بر روی هر زیرساختی**: سرویس Kong به راحتی به روی سرور‌های ابری یا سرور‌های On-Premise قابل نصب و راه‌اندازی است.

## چگونگی کارکرد Kong
برای آنکه به چگونگی عملکرد سرویس Kong پی ببرید به تصویر زیر از سایت [kong](https://konghq.com/about-kong) توجه کنید:

![kong-workflow](/img/docs/kong-workflow.png "kong-workflow")

وقتی سرویس Kong مستقر شده و اجرا می‌شود، تمام درخواست‌هایی که به سمت میکروسرویس‌ها می‌آیند، ابتدا از Kong رد می‌شوند و بعد از آن Kong این درخواست‌ها را proxy کرده و به سمت مقصد‌هایی که باید، هدایت می‌کند.<br/>
در بین این درخواست‌ها و پاسخ‌ها، بسته به Pluginهایی که نصب کرده‌اید و تنظیماتی که اعمال کرده‌اید، سرویس Kong عملیات‌های متفاوتی را بر روی آن‌ها انجام می‌دهد تا مطمئن‌ شود این درخواست‌ها با سیاست‌های تعیین شده تطبیق داشته باشد.<br/>
حال برای اینکه بتوانید این سرویس محبوب را بر روی فضانام خود دیپلوی کنید، پارامتر‌های زیر را می‌توانید مشخص کنید:
|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| kong| نامی که برای سرویس مایلید در نظر گرفته شود|
|kong_pg_host| string| postgresql | نام سرویس دیتابیس PostgreSQL |
|kong_pg_user| string| postgres| نام کاربری سرویس PostgreSQL |
|kong_pg_password| string| postgres| رمز عبور سرویس PostgreSQL |
|kong_pg_database| string| kong-database| نام دیتابیس سرویس kong |
|kong_dashboard_enabled| boolean| False| فعال یا غیرفعال بودن داشبورد Kong |
|dashboard_database| string| kong-dashboard-db| نام دیتابیس داشبورد Kong |

> توجه داشته باشید که سرویس ‌Kong برای آنکه بتواند داده‌ها و تنظیمات خود را ذخیره کند و از سرعت و کارایی مناسبی برخوردار باشد باید حتما به یک دیتابیس متصل شود در غیر این صورت با خطا مواجه شده و سرویس به درستی عمل نمی‌کند.

برای ‌‌این کار کافیست یک دیتابیس مدیریت شده PostgreSQL که به یک Dedicated Volume متصل است را ایجاد کنید و نام آن را به عنوان **kong_pg_host** در تنظیمات قرار دهید.

برای دیپلوی کردن Kong می‌توانیم به این شکل یک سرویس بسازیم:
```
  fandogh managed-service deploy kong latest \
       -c service_name=test-kong \
       -c kong_pg_host=postgresql \
       -c kong_pg_user=postgres \
       -c kong_pg_password=postgres \
       -c kong_pg_database=kong-database \
       -c kong_dashboard_enabled=True \
       -c dashboard_database=kong-dashboard-db \
```
این دستور یک سرویس Kong ایجاد می‌کند که:
* نام آن test-kong ( یعنی در شبکه داخلی فضانام شما باقی سرویس‌ها از طریق نام test-kong و بر روی پورت 8000 می‌توانند به آن متصل شوند) است .
* نام سرویس دیتابیس postgresql است.
* نام دیتابیس مربوط به سرویس kong-database است.
* نام کاربری سرویس دیتابیس postgres است.
* رمز عبور سرویس دیتابیس postgres است.
* داشبورد مدیریتی kong فعال است.
* و نام دیتابیس داشبورد kong-dashboard-db است.

> **هشدار**
برای استفاده از سرویس Kong باید به نکته زیر توجه داشته باشید:
برای حفط مسائل امنیتی سرویس Kong به صورت یک [Internal Service](https://docs.fandogh.cloud/docs/services.html#%DB%B2-%D8%B3%D8%B1%D9%88%DB%8C%D8%B3-%D9%87%D8%A7%DB%8C-%D8%AE%D8%A7%D8%B1%D8%AC%DB%8C-%DB%8C%D8%A7-external-service) عمل می‌کند و شما خارج از namespace خود به آن دسترسی نداشته و تنها از طریق داشبورد مدیریتی خود kong می‌توانید به محتوای آن دسترسی داشته باشید.

> **توجه**
در صورتی که از dashboard مربوط به Kong استفاده می‌کنید، در اولین اجرا باید connection جدید را به داشبورد معرفی کنید تا به سرویس شما متصل شود. برای این که از بخش **connections** یک اتصال جدید ایجاد کنید که نام آن می‌تواند دلخواه باشد و آدرس آن که در سطر دوم از شما خواسته می‌شود باید به شکل **http://kong_service_name:8001** باشد.

## Deploy With Manifest
  

شما همچنین می توانید برای اجرای راحت تر سرویس های مدیریت شده از [مانیفست](https://docs.fandogh.cloud/docs/service-manifest.html) همانند مثال زیر استفاده کنید.

- مانیفست Kong بدون داشبورد مدیریتی
```
kind: ManagedService
name: test-kong
spec:
  service_name: mssql
  version: latest
  parameters:
    - name: kong_pg_host
      value: postgresql
    - name: kong_pg_user
      value: postgres
    - name: kong_pg_password
      value: postgres
    - name: kong_pg_database
      value: kong-database
    - name: kong_dashboard_enabled
      value: false
  resources:
      memory: 2048Mi
```
- مانیفست Kong همراه با داشبورد مدیریتی

```
kind: ManagedService
name: test-kong
spec:
  service_name: mssql
  version: latest
  parameters:
    - name: kong_pg_host
      value: postgresql
    - name: kong_pg_user
      value: postgres
    - name: kong_pg_password
      value: postgres
    - name: kong_pg_database
      value: kong-database
    - name: kong_dashboard_enabled
      value: true
    - name: dashboard_database
      value: kong-dashboard-db
  resources:
      memory: 2048Mi
```
