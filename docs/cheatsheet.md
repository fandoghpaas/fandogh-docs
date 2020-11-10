---
layout: fandogh
id: fandogh-cli-cheat-sheet
title: خلاصه دستورات fandogh-cli
sidebar_label: خلاصه دستورات fandogh-cli
---
## مقدمه 
در این بخش از مستندات فندق خلاصه‌ای از دستورات fandogh-cli را بیان کرده‌ایم که به cheat sheet معروف است؛ تا در صورت نیاز کاربران بتوانند با مراجعه به این بخش دستورات را مشاهده کنند.
<br/>

## Login
دستور ورود به حساب کاربری:
```
fandogh login --username USERNAME --password PASSWORD
```
## Cluster
دستور نمایش لیست کلاستر‌ها:
```
fandogh cluster list
```

دستور ایجاد کلاستر جدید:
```
fandogh cluster add --name CLUSTER_NAME --url CLUSTER_URL
```

دستور فعال کردن کلاستر:
```
fandogh cluster active
```

دستور حذف کلاستر:
```
fandogh cluster delete
```

## Namespace

دستور نمایش فضانام‌های کاربر:
```
fandogh namespace list
```

دستور انتخاب و فعالسازی فضانام با نام `NAMESPACE_NAME`:
```
fandogh namespace active --name NAMESPACE_NAME
```
## Image

آماده‌سازی مسیر پروژه برای ساخت ایمیج از روی آن با اسم دلخواه `IMAGE_NAME`:
```
fandogh image init --name IMAGE_NAME
```
ارسال پروژه به فندق جهت ساخت ایمیج:
```
fandogh image publish --version IMAGE_VERSION
```
نمایش لیست ایمیج‌ها:
```
fandogh image list
```

نمایش لیست نسخه‌های ساخته شده از ایمیج مورد نظر `IMAGE_NAME`:
```
fandogh image versions --image IMAGE_NAME
```

نمایش لاگ‌های ساخت یک نسخه دلخواه از ایمیج با نام `IMAGE_NAME`:
```
fandogh image logs --image IMAGE_NAME --version IMAGE_VERSION
```

حذف کامل ایمیج با نام `IMAGE_NAME` به همراه کلیه نسخه‌های آن:
```
fandogh image delete --image IMAGE_NAME
```
## Service

### عملیات سرویس

ساخت سرویس با نام `SERVICE_NAME` از نسخه `IMAGE_VERSION` ایمیج با نام `IMAGE_NAME` :
```
 fandogh service deploy --image IMAGE_NAME \
 --version IMAGE_VERSION --name SERVICE_NAME
```

ساخت سرویس از روی مانیفست فندقی `FANDOGH_MANIFEST` که ایجاد کرده‌اید:
```
fandogh service apply -f FANDOGH_MANIFEST.yml
```

نمایش تمام سرویس‌های در حال اجرا در فضانام:
```
fandogh service list
```

حذف سرویس با نام `SERVICE_NAME`:
```
fandogh service destroy --name SERVICE_NAME
```

### جزئیات سرویس و مانیفست

دریافت مانیفست سرویس با نام `SERVICE_NAME`:
```
fandogh service dump --service SERVICE_NAME
```

نمایش جزئیات سرویس با نام `SERVICE_NAME`:
```
fandogh service details --name SERVICE_NAME
```


نمایش `۱۰۰` لاگ آخر سرویس با نام `SERVICE_NAME`:
```
fandogh service logs --name SERVICE_NAME
```

نمایش `۱۰۰۰` لاگ آخر سرویس با نام `SERVICE_NAME`:
```
fandogh service logs --name SERVICE_NAME --max 1000
```

نمایش `۱۰۰` لاگ آخر سرویس با نام `SERVICE_NAME` و ادامه نمایش لاگ سرویس به صورت `realtime`:
```
fandogh service logs -f --name SERVICE_NAME
```

نمایش `۱۰۰` لاگ آخر سرویس ‌با نام `SERVICE_NAME` به همراه `timestamp`:
```
fandogh service logs --name SERVICE_NAME --with-timestamp
```
### تاریخچه و Rollback
نمایش تاریخچه دیپلوی سرویس با نام `SERVICE_NAME`:
```
fandogh service history list --name SERVICE_NAME
```

حذف تاریخچه دیپلوی سرویس با نام `SERVICE_NAME` و شناسه `HISTORY_VERSION`:
```
fandogh service history delete \
--service SERVICE_NAME --version HISTORY_VERSION
```

بازگشت تنظیمات سرویس `SERVICE_NAME` به `HISTORY_VERSION`:
```
fandogh service rollback \
--service SERVICE_NAME --version HISTORY_VERSION
```
## Exec

اجرای دستور `COMMAND` بر روی سرویس با نام `SERVICE_NAME` و خروج از آن:
```
fandogh exec -s SERVICE_NAME "COMMAND"
```

اجرای دستور `COMMAND` بر روی سرویس با نام `SERVICE_NAME` و باقی‌ماندن در آن:
```
fandogh exec -i -s SERVICE_NAME "COMMAND"
```
## Managed Service

نمایش لیست سرویس‌های مدیریت شده و راهنمای تنظیمات آن‌ها:
```
 fandogh managed-service help
```

ساخت سرویس مدیریت‌شده با تنظیمات مورد نیاز:
```
fandogh managed-service deploy SERVICE_NAME SERVICE_VERSION \
-c CONFIG_ONE=VALUE ... -c CONFIG_LAST=VALUE_LAST
```

ساخت سرویس مدیریت شده `MySQL` به همراه داشبورد مدیریتی `PHPMyAdmin`:
```
fandogh managed-service deploy mysql latest \
-c phpmyadmin_enabled=true
```

ساخت سرویس مدیریت شده `PostgreSQL` بدون داشبورد مدیریتی `Adminer`:
```
fandogh managed-service deploy postgresql latest \
-c adminer_enabled=false
```
## Domain

### عملیات دامنه

ساخت دامنه جدید با نام `DOMAIN_NAME`:
```
fandogh domain add --name DOMAIN_NAME
```

مشاهده لیست دامنه‌های ثبت شده:
```
fandogh domain list
```

نمایش جزئیات دامنه با نام `DOMAIN_NAME`:
```
fandogh domain details --name DOMAIN_NAME
```

درخواست تایید و احراز مالکیت دامنه با نام `DOMAIN_NAME`:
```
fandogh domain verify --name DOMAIN_NAME
```

حذف دامنه با نام `DOMAIN_NAME`:
```
fandogh domain delete --name DOMAIN_NAME
```
### عملیات گواهی SSL

درخواست بررسی و صدور `گواهی SSL` برای دامنه با نام `DOMAIN_NAME`:
```
fandogh domain request-certificate --name DOMAIN_NAME
```

لغو گواهی SSL دامنه با نام `DOMAIN_NAME`:
```
fandogh domain revoke-certificate --name DOMAIN_NAME
```
## Secret

نمایش لیست سکرت‌های موجود:
```
fandogh secret list
```

ساخت سکرت جدید از نوع `SECRET_TYPE` با نام `SECRET_NAME` و مقادیر `FIELD`:
```
fandogh secret create --name SECRET_NAME \
--type SECRET_TYPE -f FIELD=VALUE \
-f FIELD=VALUE ...
```


ساخت سکرت از نوع `docker-registry` با نام `SECRET_NAME` و فیلدهای مورد نیاز:
```
fandogh secret create --name SECRET_NAME \
--type docker-registry \
-f username=USERNAME \
-f password=password \
-f server=SERVER_ADDRESS
```

ساخت سکرت از نوع `environment-secret‍` با نام `SECRET_NAME` و فیلدهای مورد نیاز:
```
fandogh secret create \
--name SECRET_NAME \
-t environment-secret \
-f SECRET_KEY=SECRET_VALUE
```

دستور `update` کردن فیلدهای سکرت از نوع `docker-registry` با نام `SECRET_NAME`:
```
fandogh secret update --name SECRET_NAME \
--type docker-registry \
-f username=NEW_USERNAME \
-f password=NEW_password \
-f server=NEW_SERVER_ADDRESS
```

حذف سکرت با نام `SECRET_NAME`:
```
fandogh secret delete --name SECRET_NAME
```

## Source

آماده‌سازی یک پروژه غیر داکری با نام `SERVICE_NAME` برای ساخت ایمیج و سرویس:
```
fandogh source init --name SERVICE_NAME
```

شروع پروسه ساخت ایمیج و سرویس از روی پروژه غیر داکری:
```
fandogh source run
```
## Volume

ساخت volume جدید با نام `VOLUME_NAME` و ظرفیت `VOLUME_SIZE`:
```
fandogh volume add -n VOLUME_NAME -c VOLUME_SIZE
```

ساخت volume جدید با نام `VOLUME_NAME` و ظرفیت `10 گیگابایت`:
```
fandogh volume add -n VOLUME_NAME -c 10
```

افزایش فضای volume با نام `VOLUME_NAME` و ظرفیت جدید `VOLUME_CAPACITY`:
```
fandogh volume expand -n VOLUME_NAME -c VOLUME_CAPACITY
```

نمایش لیست volumeهای موجود:
```
fandogh volume list
```

حذف volume با نام `VOLUME_NAME`:
```
fandogh volume delete --name VOLUME_NAME
```
