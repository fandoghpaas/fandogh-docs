---
layout: fandogh
id: metabase-managed-service
title: Metabase
sidebar_label: Metabase
---


## ![Metabase](/img/docs/metabase-managed-service.png "Metabase")

[Metabase](https://metabase.com) یک سرویس تحلیلی متن‌باز برای کسب‌و‌کارها است.\
با استفاده از این سرویس می‌تواند داده‌های موجود در Database‌های خود را در قالب نموداری یا جدولی و به گونه‌ای که خوانا و قابل درک باشد مشاهده کنید. یکی از موارد استفاده از سرویس Metabase، برای تحلیل داده‌ها در موارد Marketing است؛ چرا که به راحتی می‌توانید هر گونه و هر شکل از داده‌ها را جهت بررسی تهیه کنید و آن‌ها را ذخیره کنید.<br/>

یکی از ویژگی‌های مهم این سرویس مصرف بهینه منابع و همچنین سرعت در گزارش گیری است. اگر شما تا به امروز با Queryهای دستی داده‌های خود را از Database تهیه می‌کردید، حتما مشاهده کرده‌اید که فشار زیادی به پردازنده‌ها وارد می‌شود؛ در صورتی که با استفاده از سرویس Metabase، این فشارها به حداقل می‌رسند. <br/>
از طرفی کار با Metabase به مراتب راحت‌تر بوده و اشخاص غیر فنی هم به راحتی می‌توانند از آن استفاده کنند.

![dashboard](/img/docs/metabase-homepage-dashboard.png "dashboard")

## Databaseهای تحت پوشش
سرویس Metabase با Databaseهای زیادی همخوانی دارد و این موضوع یکی از نقاط قوت و مزایای استفاده از این سرویس قدرتمند به حساب می‌آید.\
در جدول زیر می‌توانید اسامی Databaseهایی که Metabase از آن‌ها پشتیبانی می‌کند را مشاهده کنید.

|نام Database|نام Database|نام Database|
|---	|---	|---	|
| MySQL | Postgres | MongoDB |
| Druid|  AWS Redshift | Microsoft SQL Server |
| Oracle | SQLite | H2 |
| Vertica | Google Analytics | Crate |
| Snowflake | Presto | Spark |

## استقرار سرویس

حال برای اینکه بتوانید این سرویس محبوب را بر روی فضانام خود دیپلوی کنید، پارامتر‌های زیر را می‌توانید مشخص کنید:
|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| metabase| نامی که برای سرویس مایلید در نظر گرفته شود|
|db_type| string| mysql| نوع دیتابیس داخلی برای ذخیره تنظیمات سرویس (mysql - postgres) |
|db_name| string| metabase_config| نام دیتابیسی که تنظیمات سرویس باید داخل آن ذخیره شود|
|db_host| string | metabase-mysql| نام سرویس دیتابیسی که باید به آن متصل شود |
|db_user| string| root| نام کاربری دیتابیس |
|db_password| string| root| گذرواژه دیتابیس |
|internal_db_enabled| boolean| True | تعیین می‌کند دیتابیس به صورت داخلی ساخته شود یا خیر|

به عنوان مثال برای دیپلوی کردن یک Metabase می‌توانیم به این شکل یک سرویس بسازیم:
```
  fandogh managed-service deploy metabase latest \
       -c service_name=test-metabase \
       -m 1536Mi
```
این دستور یک سرویس Metabase ایجاد می‌کند که:
* نام آن test-metabase است .

> توجه داشته باشید از آنجایی که internal_db_enabled به صورت پیش‌فرض True است، فندق در کنار سرویس test-metabase یک سرویس دیتابیس با نام metabase-mysql ایجاد می‌کند و داخل آن یک دیتابیس با نام metabase_config وجود دارد تا test-metabase تنظیمات خود را داخل آن بنویسید.

اگر قصد دارید سرویس Metabase تنظیمات خود را داخل سرویس Database دیگری که از قبل ساخته‌اید ذخیره کند باید پارامتر‌های مطرح شده در جدول بالا را با تنظیمات دلخواه خود تغییر داده و مقدار `internal_db_enabled` را برابر با `false` قرار دهید.

> برای ذخیره تنظیمات ‌Metabase شما فقط می‌توانید آدرس سرویس دیتابیس MySQL یا Posrgres را قرار دهید، در غیر این صورت بهتر است از Internal Database استفاده کنید.

> برای ساخت سرویس Metabase شما حداقل به 1536Mi رم نیاز خواهید داشت در غیر این صورت با خطای سروری مواجه خواهید شد.

## Deploy With Manifest

شما همچنین می توانید برای اجرای راحت تر سرویس های مدیریت شده از [مانیفست](https://docs.fandogh.cloud/docs/service-manifest.html) همانند مثال زیر استفاده کنید.

- مانیفست Metaservice با Internal Database
```
kind: ManagedService
name: test-metabase
spec:
  service_name: metabase
  version: latest
  parameters:
    - name: internal_database_enabled
      value: 'true'
  resources:
      memory: 1536Mi
```
- مانیفست Metaservice بدون Internal Database

```
kind: ManagedService
name: test-metabase
spec:
  service_name: metabase
  version: latest
  parameters:
    - name: internal_database_enabled
      value: 'false'
    - name: db_type
      value: mysql_or_postgres
    - name: db_name
      value: DATABASE_NAME
    - name: db_host
      value: DATABASE_SERVICE_NAME
    - name: db_user
      value: DATABASE_USERNAME
    - name: db_password
      value: DATABASE_PASSWORD
  resources:
      memory: 1536Mi
```

## کار با Metabase Dashboard

بعد از آنکه سرویس Metabase را دیپلوی کردید و آدرس آن را دریافت کردید، از طریق مرورگر وارد آدرس شوید.

![welcome](/img/docs/metabase-step-zero.png "welcome")

در ابتدا به شما یک صفحه تنظیمات نمایش داده می‌شود در قدم اول باید مشخصات کاربری خود را وارد کنید تا بعد از آن بتوانید با آن تنظیمات وارد سرویس شوید.

![admin-step](/img/docs/metabase-step-one.png "admin-step")


در گام بعدی Metabase از شما مشخصات سرویس دیتابیسی را می‌پرسد که میخواهید داده‌های تحلیلی از آن خوانده شود.

![db-setup](/img/docs/metabase-step-two.png "db-setup")

در این صفحه ابتدا نوع دیتابیس را مشخص کنید. سپس مقدار HOST را برابر با آدرس فندقی سرویس دیتابیس که همان `service_name` است قرار دهید و یا اگر خارج از فندق است، آدرس آن را وارد کنید.\
مقدار PORT را برابر یا مقدار پورت سرویس دیتابیس قرار دهید و در انتها نام DATABASE که داده‌ها از آن باید خوانده شود و USERNAME و PASSWORD را وارد نمایید و تایید کنید.

> شما می‌توانید این تنظیمات را رد کرده و بعدا از طریق داشبورد آن را انجام دهید که در ادامه توضیح داده می‌شود.

![reporter](/img/docs/metabase-step-three.png "reporter")

در گام آخر می‌توانید مشخص کنید که داده‌های فنی مربوط به استفاده از سرویس برای سرور‌های Metabase ارسال شود یا خیر.

> توجه داشته باشید داده‌های شما برای سرور‌های Metabase ارسال نمی‌شود، بلکه لاگ‌های مربوط به خطاها و تجربیات کاربری ارسال می‌شوند تا در نسخه‌های بعدی بتوانند محصول را بهبود ببخشند.

### کار با Metabase Dashboard

بعد از آنکه تنظیمات را به درستی به اتمام رساندید، به صورت خودکار به داشبورد مدیریتی Metabase هدایت خواهید شد.\
برای آشنایی بیشتر با کارایی و نحوه استفاده از داشبورد Metabase می‌توانید به لینک [مستندات این سرویس](https://metabase.com/docs/latest/getting-started.html) مراجعه کنید.


### اضافه کردن Database به Metabase

برای آنکه بتوانید دیتابیس‌های جدید را به سرویس Metabase متصل کرده و داده‌های آن‌ها را مشاهده کنید، به ترتیب زیر عمل کنید:

۱) ابتدا از بر روی آیکن `چرخ دنده` یا همان تنظیمات در گوشه بالا سمت راست داشبورد کلیک کنید.\
۲) از منوی نمایش داده شده، گزینه `Admin` را انتخاب نمایید.\
۳) از نوار منو نمایش داده شده در بالای صفحه، گزینه `Databases` را انتخاب نمایید.\
۴) بر روی دکمه `Add Database` کلیک کنید.\
۵) در صفحه نمایش داده شده به ترتیب:\
۵-۱) نوع دیتابیس را مشخص کنید.\
۵-۲) یک نام دلخواه برای `Connection` انتخاب نمایید؛ چرا که بعد از اتمام ساخت، داده‌‌های مربوط به این Database  با این نام در صفحه اول داشبورد نمایش داده خواهد شد.\
۵-۳) مقدار `Host` را برابر با آدرس سرویس دیتابیس قرار دهید. (اگر سرویس دیتابیس داخل سکوی ابری فندق قرار دارد، کافی‌ است تنها نام سرویس را قرار دهید.)\
۵-۴) مقدار `Port` را برابر با مقدار پورت سرویس Database قرار دهید. (به عنوان مثال پورت سرویس MySQL برابر با 3306 است).\
۵-۵) مقدار `Database name` همان نام دیتابیس مورد نظر شماست که باید tableهای آن خوانده شده و داده‌های آن برای تحلیل نمایش داده شود.\
۵-۶) در انتها `Username` و `Password` دیتابیس را وارد کرده و تایید نمایید.

> توجه داشته باشید در صورتی که دیتابیس حجیمی دارید، بهتر است برای جلوگیری از فشار بر روی سرویس Metabase و همینطور سرویس Database، گزینه `This is a large database, so let me choose when Metabase syncs and scans` را فعال نمایید. در غیر این صورت سرویس Metabase به صورت ساعتی داده‌ها را از سرویس Database خواهند خواند.


