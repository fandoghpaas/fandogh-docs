---
layout: fandogh
id: source-django
title: جنگو
sidebar_label: جنگو 
---

دیپلوی کردن سرویس‌ها بر روی فندق برای کاربرانی که با docker کار نکرده‌اند ممکن است مقداری مبهم باشد٬ و همینطور معمولا آماده سازی پروژه‌ها برای اجرا در محیط واقعی نیاز به تنظیماتی دارد که باعث پیچیده شدن کار برنامه‌نویس می‌شوند.
به همین منظور شما می‌توانید بدون نیاز به دانش Docker و دیپلوی پروژهای جنگو بر روی محیط عملیاتی به سادگی با استفاده از کامند لاین فندق این کار را انجام دهید.

> اگر هنوز CLI  فندق بر روی کامپیوتر شما نصب نیست از طریق این [مستند](https://docs.fandogh.cloud/docs/getting-started.html) می‌توانید CLI را بر روی کامپیوتر خود نصب کنید.


 در پوشه اصلی پروژه٬ بعد از اینکه در فندق لاگین کردید دستور fandogh source init را اجرا کنید٬ در اولین مرحله شما می‌بایست اسم سرویس رو انتخاب نمایید.
<br>

```
Service Name: mywebsite
```


 بعد از وارد کردن نام Service  برای شما گزینه هایی که بدون نیاز به دانش docker قابل اجرا هستند نمایش داده می شود. از بین گزینه های نمایش داده گزینه Static Website را انتخاب کنید.

> توجه داشته باشید شماره گزینه مورد نظر را وارد کنید.

```
-[1] Static Website
-[2] Django Project
Please choose one of the project types above:

```
> حتما در نظر داشته باشید فایل requirements.txt در روت پروژه خود وجود داشته باشه. در غیر این صورت پیغام خطای عدم وجود این فایل را دریافت خواهید کرد.

در قسمت بعدی شما باید context را وارد کنید. context همان پوشه‌ای است که خروجی برنامه شما در آن قراره گرفته است. اگر در حال حاضر در پوشه اصلی نیستید می توانید آدرس آن را وارد کنید یا در غیر این صورت خالی بگذارید و دکمه enter را فشار دهید. 
```
The context directory [.]:
```
گزینه بعدی انتخاب ورژن پایتون هست که به صورت پیش فرض ورژن 3.7 می باشد. شما با وارد کردن ورژن مورد نظر خود می توانید ورژن را تغییر دهید. 

```
Python version [3.7]: 3.5

```
 بعد از اینکه گزینه جنگو رو انتخاب کردید فندق از شما نام ماژول WSGI را خواهد پرسید. همچنین ماژول‌های احتمالی WSGI موجود در پروژه نیز به شما نمایش داده می‌شوند. به احتمال زیاد نام ماژول در این لیست وجود دارد و شما تنها نیاز دارید که نام را در ورودی وارد کنید.
اگر فندق قادر به یافتن ماژول مورد نظر شما نبود٬ شما می‌بایست خودتان نام ماژول مورد نظرتان را وارد نمایید.


```
Possible wsgi modules are:
 - fandoghapp.wsgi
 - venv.Lib.site-packages.django.contrib.auth.handlers.modwsgi
 - venv.Lib.site-packages.django.core.wsgi
 - venv.Lib.site-packages.django.core.handlers.wsgi
WSGI module:
```
<br>

> در نظر داشته باشید fandoghapp.wsgi اسم پروژه جانگوی است که ما در حال دیپلوی هسیتم. این اسم برای شما متفاوت است.

پس از مشخص کردن ماژول WSGI از شما آدرس فولدر static پرسیده می شود. 

```
Static Path [static]: static
```

> در نظر داشته باشید هنگامی که آدرس static را وارد میکنید در تنظیمات پروژه خود مقدار STATIC_ROOT را نیز درست مشخص کرده باشید. اگر پروژه شما فایل‌های استاتیک ندارد مقدار '' را وارد نمایید.

در گزینه بعدی باید آدرس پوشه Media را مشخص کنید.

```
Media Path []:
```
> در صورتی که پروژه شما فولدر Media ندارد این قسمت را خالی بگذارید.

پس از مشخص کردن اطلاعات فوق پیغام فایلی با نام fandogh.yml در پوشه جاری شما ساخته می شود. 

اکنون با نوشتن دستور ``` fandogh source run ``` می توانید پروژه خودتون رو بر روی فندق دیپلوی کنید.

> پس از هر بار تغییر در پروژه تنها کافیست که دستور fandogh source run را مجددا اجرا کنید. 
> فایل ```fandogh.yml``` می‌تواند شامل تمام بخش‌هایی که در [مانیفست](https://docs.fandogh.cloud/docs/service-manifest.html) فندق است باشد٬ شما به صورت دستی قادر هستید بخش‌های مورد نیاز این فایل را تغییر دهید.
 

### راه اندازی Django به همراه Mysql
استفاده از پایگاه داده Mysql در بسیاری از پروژه ها یکی از نیاز های اولیه است. بسیاری از کاربران برای استفاده از پایگاه داده خود از این  RDBMS ها استفاده می‌کنند. در فندق شما می توانید از با کمک سرویس‌های مدیریت شده توسط فندق به راحتی  Mysql Server مختص به خودتون رو اجرا کنید. 
برای راه اندازی سرویس Mysql میتوانید [این بخش](https://docs.fandogh.cloud/docs/mysql-managed-service.html) را مطالعه کنید. 


#### نحوه راه اندازی Mysql در تنظیمات پروژه Django 

> برای اتصال به Mysql شما نیاز به پکیج mysqlclient دارید . در نظر داشته باشید حتما این پکیج در لیست requirements.txt خودتون وجود داشته باشه.

<br>
قبل از دیپلوی کردن پروژه خود بر روی فندق باید مقادیری که در راه اندازی سرویس Mysql خود در فندق وارد کرده اید رو در Setting پروژه خودتون وارد کنید. 
فرض کنید شما برای راه اندازی سرویس Mysql از دستوری مانند زیر استفاده کرده اید: 

```
fandogh managed-service deploy mysql 5.7 
-c service_name=db 
-c mysql_root_password=123456
-c phpmyadmin_enabled=true

```

> حتما در نظر داشته باشید پس از ساخت سرویس Mysql از قسمت PhpMyadmin دیتابیس مورد نظر خود را بسازید.

<br>

حالا کافیه توی تنظیمات پروژه جانگو خود مقادیر را وارد کنید.

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'myDatabaseName',
        'USER': 'root',
        'PASSWORD': '123456',
        'HOST': 'db',
        'PORT': '3306'
    }
}
```

اگر نمیخواهید این کدها در دسترس سایر افرادی که بر روی پروژه کار میکنند قرار بگیرد.
شما می توانید مقادیر را در فایل fandogh.yaml که پس از دستور fandogh source init زده اید به عنوان environment variable وارد 
 کنید و در این قسمت از آنها استفاده کنید. 

```
kind: ExternalService
name: mywebsite
spec:
  image_pull_policy: Always
  port: 80
  source:
    context: .
    media_path: ''
    project_type: django
    python_version: '3.5'
    static_path: static
    wsgi: fandoghapp.wsgi
  env:
    - name: Mysql_Host
        value: db
    - name: Mysql_Password
        value: 123456
    - name: Mysql_User
        value: root
    - name: DB_Name
        value: myDatabaseName     
```
که این مقادیر به صورت زیر در سیتنگ پروژه جانگو اضافه می شوند.

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ.get('Mysql_Host', 'local_name'),
        'USER': os.environ.get('Mysql_User', 'local_user'),
        'PASSWORD': os.environ.get('Mysql_Password', 'local_pass'),
        'HOST': os.environ.get('Mysql_Host', 'local_host'),
        'PORT': '3306'
    }
}
```

<br>
اکنون با دستور fandogh source run پروژه خودتون رو به همراه Mysql می تونید deploy کنید.

> حتما در نظر داشته باشید بعد از تغییرات پایگاه داده فایل های migration خودتون را دوباره بسازید که به سرور های فندق انتقال پیدا کنند و تغییرات جدید شما لحاظ بشود.
   
