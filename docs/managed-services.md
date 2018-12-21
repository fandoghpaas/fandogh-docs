---
layout: fandogh
id: managed-services
title: سرویس‌های مدیریت شده
sidebar_label: سرویس‌های مدیریت شده
---
## managed-service چیست؟
خیلی از سرویس‌ها مانند MySQL یا PostgreSQL به طور مداوم توسط کاربران فندق استفاده می‌شوند. ما در فندق برای ساده‌تر کردن راه‌اندازی این نوع سرویس‌ها٬ امکانی را طراحی کردیم که به کمک آن می‌توانید با سهولت بیشتری این نوع سرویس‌ها را راه‌اندازی کنید.

## انواع managed-service
برای مشاهده انواع managed-service می‌توانید از دستور `fandogh managed-service help` استفاده کنید و سپس با استفاده از دستور `fandogh managed-service deploy` سرویس مورد نظر خود را دیپلوی کنید.
هر managed-service بسته به نوع آن٬ حاوی مجموعه‌ای از پارامتر‌های قابل تنظیم است که می‌توانید از طریق سویچ `c-`  مشخص کنید، در اینجا به طور کامل تمام managed-service‌ها را بررسی می‌کنیم و پارامتر‌های قابل تنظیم هر کدام را توضیح می‌دهیم.


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

### ![Postgresql + Adminer](/img/docs/postgresql-adminer.png "Postgresql + Adminer")

Postgresql یکی دیگر از RDBMS‌های معروف و پرطرفداری است که می‌توانید به سادگی به عنوان یک managed-service روی Namespace خود دیپلوی کنید.
هنگام دیپلوی کردن Postgresql پارامتر‌های زیر را می‌توانید مشخص کنید:
|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| postgresql| نامی که برای سرویس مایلید در نظر گرفته شود|
|adminer_enabled|boolean | true | فعال یا غیرفعال بودن Adminer
|postgres_password| string| postgres| رمز عبور دیتابیس|
|volume_name| string| None| نام volumeای که به سرویس وصل می شود|

> توجه داشته باشید که اگر میخواهید سرعت I/O در سرویس دیتابیس شما بیشتر شود٬ می‌توانید از volume‌ها استفاده کنید و نام آن را به صورت `c volume_name=VOLUME_NAME-` موقع ساخت Managed Service در cli وارد نمایید. ( VOLUME_NAME نام volume‌ای است که موقع ساخت آن تعیین کرده‌اید).
> 
به عنوان مثال برای دیپلوی کردن یک Postgresql می‌توانیم به این شکل یک سرویس بسازیم:
```
  fandogh managed-service deploy postgresql 10.4 \
       -c service_name=test-dbms \
       -c adminer_enabled=false \
       -c postgres_password=test123
```
این دستور یک سرویس Postgresql ایجاد می‌کند که:
* نام سرویس آن test-dbms ( یعنی در شبکه داخلی فضانام شما باقی سرویس‌ها از طریق نام test-dbms می‌توانند به آن متصل شوند) .
* رمز عبور آن test123 است.
*  Adminer هم در آن غیر‌فعال شده است.

### ![Mattermost](/img/docs/mattermost_messenger.png "Mattermost")
  
  برنامه Mattermost یک سرویس پیام‌رسان است که عمده استفاده از آن برای شرکت‌ها بوده و از محبوبیت بالایی برخوردار است. این برنامه این قابلیت را دارد که به صورت رایگان بر روی سرورهای شخصی مورد استفاده قرار گیرد٬به همین منظور برای آنکه کار برای شما راحت تر شود٬ ما نیز این سرویس را به سرویس های مدیریت شده خود اضافه کردیم تا بتوانید بر روی namespace خود یک پیام‌رسان اختصاصی داشته باشید.
  برای **deploy** کردن این سرویس کافی است به ترتیب زیر عمل کنید.
  ۱- ابتدا مانیفست زیر را کپی کرده و بر روی سیستم خود در یک فایل جدید با فرمت **yml.** ذخیره نمایید.
  ```
kind: ManagedService
name: chat-db
spec:
  service_name: postgresql
  version: 10.4

---

kind: ExternalService
name: chat
spec:
  image: mattermost/mattermost-prod-app:5.6.1
  port: 8000
  env:
    - name: DB_HOST
      value: chat-db
    - name: DB_PORT
      value: 5432
    - name: MM_USERNAME
      value: postgres
    - name: MM_PASSWORD
      value: postgres
    - name: MM_DBNAME
      value: mm
  volume_mounts:
    - mount_path: /mattermost/data
      sub_path: chat/data
      volume_name: chat-volume
    - mount_path: /mattermost/logs
      sub_path: chat/logs
      volume_name: chat-volume
#- mount_path: /mattermost/config
#sub_path: chat/config
    - mount_path: /mattermost/plugins
      sub_path: chat/plugins
      volume_name: chat-volume
 ```
> توجه داشته باشید MM_PASSWORD در این فایل تنها برای آزمایش می‌باشد و باید یک password مناسب‌تری را انتخاب نمایید.

۲- سپس با استفاده از **cli** به آدرسی که فایل **yml.**  را در آنجا ذخیره کرده‌اید بروید و دستور زیر را اجرا نمایید.
```
fandogh service apply -f {path_to_yml_file}/your_file.yml
```
بعد از اینکه این دستور را اجرا کردید٬ سرور بقیه کارها را انجام می‌دهد و در کمتر از یک دقیقه برنامه شما بر روی URL که cli به شما می‌دهد قابل دسترسی می‌باشد و می‌توانید آن را با همکاران و دوستان خود به اشتراک بگذارید.

> توجه داشته باشید در صورتی که از قابلیت **سرویس رایگان** استفاده می‌کنید٬باید خط‌های مربوط به  volume_name را از مانیفست بالا حذف کنید در غیر این صورت با خطا مواجه خواهید شد.

> فایل های شما در حالت **حساب رایگان** بر روی **Shared Storage** مربوط به namesapce شما ذخیره می‌شود که این فضا محدود است و بین تمام سرویس های شما اشتراک گذاری شده است.
### Deploy With Manifest
  

شما همچنین می توانید برای اجرای راحت تر سرویس های مدیریت شده ار [مانیفست](https://docs.fandogh.cloud/docs/service-manifest.html) همانند مثال زیر استفاده کنید.

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
