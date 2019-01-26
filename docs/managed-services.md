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

Postgresql یک ORDBMS معروف و پرطرفدار است که می‌توانید به سادگی به عنوان یک managed-service روی Namespace خود دیپلوی کنید.
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

### ![Redis](/img/docs/redis-managed-service.png "Redis")

شاید تا به حال نام پایگاه داده قدرتمند Redis را شنیده باشید.
طبق توضیحات سایت [Redis.io](https://redis.io) ٬ Redis یک پایگاه داده متن‌باز است که با قابلیت ذخیره داده‌ها به صورت in-memory باعث بالا رفتن سرعت ذخیره و بازیابی داده‌ها می‌شود.
برای اینکه بتوانید این سرویس را دیپلوی کنید٬ پارامتر‌های زیر را می‌توانید مشخص کنید:
|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| redis| نامی که برای سرویس مایلید در نظر گرفته شود|
|redis_password| string| None| رمز عبور دیتابیس|
|volume_name| string| None| نام volumeای که به سرویس وصل می شود|

> توجه داشته باشید که سرویس ‌Redis به صورت پیش فرض داده‌های خود را در Memory نگهداری می‌کند و این حالت پایدار نیست٬ زیرا چنانچه service شما تحت هر شرایطی از بین برود و یا restart شود٬ داده‌های شما پاک می‌شود٬ لذا حتما از یک [dedicated volumes](https://docs.fandogh.cloud/docs/dedicated-volume.html)  استفاده نمایید٬تا backup دیتاهای خود را به صورت مستمر ثبت و حفظ کنید.

به عنوان مثال برای دیپلوی کردن یک Redis می‌توانیم به این شکل یک سرویس بسازیم:
```
  fandogh managed-service deploy redis 5.0.3 \
       -c service_name=test-redis \
       -c redis_password=pass123
```
این دستور یک سرویس Redis ایجاد می‌کند که:
* نام سرویس آن test-redis ( یعنی در شبکه داخلی فضانام شما باقی سرویس‌ها از طریق نام test-redis و بر روی پورت 6379 می‌توانند به آن متصل شوند) .
* رمز عبور آن pass123 است.

> **هشدار**

برای استفاده از سرویس Redis باید به ۲ نکته زیر توجه داشته باشید:
*  در صورتی که **رمز عبور** یا **redis_password** را وارد نکنید٬ برای اجرای دستورها دیگر  نیازی به رمز عبور نخواهید داشت ولی با این کار **سرویس را در معرض خطرهای بیرونی زیادی** قرار می‌دهید لذا بهتر است که از رمز عبور معتبری استفاده نمایید.<br>
* برای حفط مسائل امنیتی سرویس Redis به صورت یک [Internal Service](https://docs.fandogh.cloud/docs/services.html#%DB%B2-%D8%B3%D8%B1%D9%88%DB%8C%D8%B3-%D9%87%D8%A7%DB%8C-%D8%AE%D8%A7%D8%B1%D8%AC%DB%8C-%DB%8C%D8%A7-external-service) عمل می‌کند و شما خارج از namespace خود به آن دسترسی ندارید.

### ![Proxy](/img/docs/proxy-managed-service.png "Proxy")

هنگامی که شما سرویس‌های خود را دیپلوی می‌کنید٬ سکو ترافیک خروجی سرویس شما را بر روی Range  IP های متفاوتی برمی‌گرداند.
این حالت در برخی شرایط که نیاز به یک IP آدرس مشخص وجود دارد٬ کار را کمی دشوار می‌کند.
برای اینکه بتوانید از این مشکل جلوگیری به عمل آورید می‌توانید از Proxy Managed Service استفاده کنید. تنها کافی‌ است با استفاده از دستور ``fandogh managed-service deploy proxy 1 -c service_name PROXY_SERVICE``  یک سرویس Proxy ایجاد کرده و داخل سرویسی که می‌خواهید ترافیک خروجی آن بر روی range ip مشخصی قرار گیرد تنظیم می‌کنید که این سرویس٬ responseهای خود را به **proxy:3128** هدایت  کند.<br/>
برای اینکه بتوانید این سرویس را دیپلوی کنید٬ پارامتر‌های زیر را می‌توانید مشخص کنید:
|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| proxy| نامی که برای سرویس مایلید در نظر گرفته شود|


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
