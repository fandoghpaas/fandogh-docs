---
layout: fandogh
id: managed-services
title: سرویس‌های مدیریت شده
sidebar_label: سرویس‌های مدیریت شده
---
## managed-service چیست؟
خیلی از سرویس‌ها توسط اکثرا کاربران فندق به طور مداوم استفاده می‌شوند، به عنوان مثال MySQL یا PostgreSQL ، برای ساده‌تر کردن راه‌اندازی این نوع سرویس‌ها ما در فندق امکانی را طراحی کردیم که به کمک آن می‌توانید با سهولت بیشتری سرویس مورد نظر را راه‌اندازی کنید.\

## انواع managed-service
برای مشاهده انواع managed-service می‌توانید از دستور `fandogh managed-service help` استفاده کنید و سپس با استفاده از دستور `fandogh managed-service deploy` سرویس مورد نظر خود را دیپلوی کنید.\
هر managed-service بسته به نوع حاوی مجموعه‌ای از پارامتر‌های قابل تنظیم است که می‌توانید از طریق سویچ `c-`  مشخص کنید، در اینجا به طور کامل تمام managed-service‌ها را بررسی می‌کنیم و پارامتر‌های قابل تنظیم هر کدام را توضیح می‌دهیم.

### MySQL + PHPMyAdmin


![MySQL + PHPMyAdmin](/img/docs/mysql-phpmyadmin.png "MySQL + PHPMyAdmin")

MySQL یکی از محبوب‌ترین RDBMS‌های امروزی است که طرفداران زیادی در ایران داد، به همین دلیل MySQL به عنوان اولین managed-service به فندق اضافه شد.\
این managed-service از دو image متفاوت تشکیل شده، یکی خود MySQL و دیگری PHPMyAdmin که یک رابط کاربری تحت وب برای MySQL است.\
برای دیپلوی کردن یک سرویس MySQL شما می‌توانید موارد زیر را هنگام دیپلوی مشخص کنید:
|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| mysql| نامی که برای سرویس مایلید در نظر گرفته شود|
|phpmyadmin_enabled|boolean | true | فعال یا غیرفعال بودن PHPMyAdmin
|mysql_root_password| string| root| رمز عبور یوزر root دیتابیس|

به عنوان مثال برای دیپلوی کردن یک MySQL می‌توانیم به این شکل یک سرویس بسازیم:
```
fandogh managed-service deploy mysql 9.1 \
     -c service_name=mydatabase \
     -c mysql_root_password=12341234\
     -c phpmyadmin_enabled=false
```
این دستور یک سرویس MySQL ایجاد می‌کند که :
* نام سرویسش mydatabase است( یعنی در شبکه داخلی فضانام شما باقی سرویس‌ها از طریق نام mydatabase می‌توانند به آن متصل شوند)
* رمز عبور root آن 12341234 است
*  PHPMyAdmin هم در آن غیر‌فعال شده است.

### Postgresql + Adminer


![Postgresql + Adminer](/img/docs/postgresql-logo.png "Postgresql + Adminer")

Postgresql یکی دیگر از RDBMS‌های معروف و پرطرفداری است که می‌توانید به سادگی به عنوان یک managed-service روی Namespace خود دیپلوی کنید.
هنگام دیپلوی کردن Postgresql پارامتر‌های زیر را می‌توانید مشخص کنید:
|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| postgresql| نامی که برای سرویس مایلید در نظر گرفته شود|
|adminer_enabled|boolean | true | فعال یا غیرفعال بودن Adminer
|postgres_password| string| postgres| رمز عبور دیتابیس|

به عنوان مثال برای دیپلوی کردن یک Postgresql می‌توانیم به این شکل یک سرویس بسازیم:
```
  fandogh managed-service deploy postgresql 10.4 \
       -c service_name=test-dbms \
       -c adminer_enabled=false \
       -c postgres_password=test123
```
این دستور یک سرویس Postgresql ایجاد می‌کند که:
* نام سرویسش test-dbms ( یعنی در شبکه داخلی فضانام شما باقی سرویس‌ها از طریق نام test-dbms می‌توانند به آن متصل شوند)
* رمز عبور آن test123 است
*  Adminer هم در آن غیر‌فعال شده است.


