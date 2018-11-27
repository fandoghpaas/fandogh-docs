---
layout: fandogh
id: service-manifest
title: مانیفست سرویس
sidebar_label: مانیفست سرویس
---

## مانیفست سرویس چیست؟
دیپلوی کردن سرویس‌ها بسته به تنظیماتی که حین دیپلوی سرویس مشخص می‌کنید می‌تواند پیچیده شود، و انجام این کار با استفاده از `fandogh service deploy` برای تعداد زیادی سرویس کاملا خسته‌کننده است و همچنین احتمال خطا در تنظیمات را هم بالا می‌برد.
به همین دلیل امکانی را در نظر گرفتیم که شما مشخصات سرویسی که قرار است ساخته شود را در یک فایل با فرمت و ساختار مشخص می‌نویسید و هر بار که فایل را از طریق `fandogh service apply` در اختیار CLI قرار دهید، سرویس مورد نظر شما با مشخصات مورد نظر شما ایجاد **یا با ویژگی‌های جدید به روزرسانی** می‌شود.
به عنوان مثال اگر فایل manifest خود را با نام `api-v1.2.yaml` ذخیره کرده باشید، می‌توانید با دستور زیر آن را دیپلوی کنید.
```
fandogh service apply -f api-v1.2.yaml
```
## ساختار مانیفست سرویس
اگر قبلا با CLI برای دیپلوی سرویس‌های مورد نیازتان کار کرده باشید احتمالا بیشتر قسمت‌های مانیفست به نظر شما آشنا می‌آید، در غیر اینصورت هم نگران نباشید، مانیفست بسیار ساختار ساده‌ای دارد و در این مستند سعی شده توضیحات دقیقی هم فراهم شود.
فرمت فایل‌های مانیفست [Yaml](https://www.tutorialspoint.com/grav/grav_yaml_syntax.htm) است،  Yaml فرمتی است درست مثل Json  فقط شمایل متفاوتی دارد و به نسبت خواناتر است.
به ازای هر سرویس لازم است شما یک آبجکت بنویسید که فیلد‌های زیر را دارا باشد:
 - **kind**
 نوع سرویسی که قصد دیپلوی آن را دارید، انواع سرویس این موارد هستند:
     - **ExternalService** این مورد برای سرویس‌هایی که قصد دارید به طور خارجی در دسترس باشند، مثل API‌ها، قابل استفاده است.
     این نوع سرویس‌ها مشابه حالت پیشفرض دستور  `fandogh service deploy‍`  بدون حضور سویچ `internal--‍` است.
     - **InternalService** این مورد برای سرویس‌هایی که داخلی هستند، و فقط  توسط سرویس‌های دیگر شما استفاده می‌شوند، مثل دیتابیس‌های، Message brokerها و...، قابل استفاده است.
     این نوع سرویس‌ها مثل سویچ `internal--` در دستور `fandogh service deploy‍` است.
     -  **ManagedService** از این مورد برای دیپلوی سرویس‌های آماده استفاده فندق مثل mysql یا Postgresql باید استفاده کنید.
 - **name**
 نامی که برای سرویس خود انتخاب کردید، این نامی است که باقی سرویس‌ها از طریق آن این سرویس را پیدا می‌کنند، این مورد مشابه سویچ `name--` در دستور `fandogh service deploy` است.
 - **spec**
این فیلد حاوی آبجکتی است که بسته به مقدار فیلد `kind` ساختار متفاوتی دارد و مشخصات سرویس شما داخل آن قرار می‌گیرد.
این ساختار کلی مانیفست است:
```
kind: ExternalService
name: some-api
spec:

```
که البته در قسمت spec باید مشخصات سرویس قرار بگیرد.
حالا مقدار فیلد `spec‍` را به ازای `kind`های مختلف بررسی می‌کنیم:
### فیلد spec در ExternalService ها
کلید‌های اصلی برای این فیلد عبارتند از:
 - **image**
این فیلد باید حاوی نام و ورژن ایمیجی باشد که مایلید سرویس از روی آن ساخته شود، به مثال‌های زیر توجه کنید:
     - `my_api:7.9.1` یعنی ورژن 7.9.1 از ایمیج my_api  که باید [قبلا در فندق منتشر](https://docs.fandogh.cloud/docs/images.html) کرده باشید.
     - `library/nginx:latest` یعنی ورژن latest  از ایمیج nginx که در رجسیتری docker hub قرار دارد.
     -‍ `docker-registry.my-company.com:5000/my-api:2.3` یعنی ورژن 2.3 از ایمیجی که در یک رجیستری دلخواه قبلا push کرده‌اید.

> توجه داشته باشید اگر این رجیستری private است و نیاز به credential دارد [باید secret مورد نیاز را
> بسازید](https://docs.fandogh.cloud/docs/secret.html#docker-registry) و حتما فیلد `image_pull_secret` را در مانیفست مشخص کنید.

 - **image_pull_policy**
زمانی که از رجیستری‌های خارجی استفاده می‌کنید بسته به اینکه چطور ورژن‌های مربوط به تصاویر خود را مدیریت می‌کنید ممکن است نیاز پیدا کنید همیشه صرف‌نظر از اینکه image روی registry محلی فندق هست یا نیست حتما ایمیج از رجیستری دوباره دریافت شود، برای این کار باید این فیلد را روی مقدار `Always‍` ست کنید، حالت پیشفرض این فیلد `IfNotPresent`  است.
 - **image_pull_secret**
 زمانی که قرار است ایمیج مربوط به سرویس از یک رجیستری خارجی private دریافت شود(pull شود) لازم است [قبلا Secret مربوط به رجیستری را ساخته باشید](https://docs.fandogh.cloud/docs/secret.html#docker-registry) و نام secret را اینجا مشخص کنید.
 - **replicas**
در این فیلد می‌توانید مشخص کنید که چند instance از سرویس مورد نظرتان نیاز دارید، به طور پیشفرض مقدار این فیلد 1 است.
 - **port**
از طریق این فیلد مشخص می‌کنید که درخواست‌هایی که کاربران به پورت ۸۰ ( یا ۴۴۳) ارسال می‌کنند باید به کدام پورت از سرویس شما هدایت شوند.به عنوان مثلا اگر یک اپ NodeJS دارید که روی پورت ۳۰۰۰ اجرا شده و می‌خواهید درخواست‌های HTTP از پورت 80 به پورت3000 آن سرویس هدایت شود، از طریق فیلد port باید این موضوع رو مشخص کنید.
البته به طور پیش‌فرض پورت ۸۰ همیشه در نظر گرفته میشه و اگر سرویس مورد نظرتان روی پورت ۸۰ سرویس‌دهی می‌کند، نیاز ندارید این فیلد را مشخص کنید.
 - **path**
 اگر مایل هستید سرویس مورد نظرتان روی path خاصی درخواست‌ها را پاسخ دهد، مثلا یک سرویس wordpress دارید به عنوان بلاگ استفاده می‌کنید، می‌توانید از طریق این فیلد path را مشخص کنید، مثلا `/blog/`  تا فقط درخواست‌هایی که به آن مسیر ارسال شدند به وردپرس برسند و روی بقیه path ها  بتوانید سرویس‌های دیگر اجرا کنید.
 - **allow_http**
اگر این فیلد true باشد، به این معنیست که فندق نباید درخواست‌های HTTP را به HTTPS ریدایرکت کند. به طور پیشفرض مقدار این فیلد true است تا درخواست HTTP ریدایرکت نشوند.
 - **env**
این فیلد یک آرایه از environment variable‌هایی است که مایلید موقع اجرای پراسس روی کانتینر مورد نظرتان set شده باشند، می‌توانید به این شکل مقادیرش را مشخص کنید:

```
  env:
    - name: some_variable
      value: some_value

```

شما همچنین می توانید با اضافه کردن فیلد hidden به env های خود تعیین کنید که مقادیر تعیین شده نمایش داده بشن یا نه.

> توجه داشته باشید که تمام env ها به صورت پیش فرض hidden:false در نظر گرفته می شوند و اگر
> میخواهید مقدار فیلد نمایش داده نشود باید مقدار hidden را true قرار دهید:

```
  env:
    - name: some_variable
      value: some_value
      hidden: true

```

 - **domains**
اینجا می‌توانید لیست دامنه‌هایی که می‌خواهید به این سرویس متصل کنید را مشخص کنید، مثلا سرویس مورد نظر فرانت وب‌سایت شماست و مایلید روی domain.com و www.domain.com  در دسترس باشد:
```
  domains:
     - name: domain.com
     - name: www.domain.com
```
 - **port_mapping**
بعضی مواقع یک سرویس بخصوص ممکن است نیاز داشته باشد بیش از یک پورت از خود را expose کند، البته منظور expose کردن برای سرویس‌های داخل همان Namespace است، برای اینکار می‌توانید از این فیلد استفاده کنید.

> توجه داشته باشید که از طریق port_mapping نمی‌توانید پورتی را به طور
> External اکسپوز کنید، port_mapping پورت‌های یک سرویس را برای سرویس‌های
> دیگر همان namespace در دسترس قرار می‌دهد.

مثلا می‌خواهیم پورت ۸۰۸۰ کانتینر را روی پورت ۸۰۸۱ با پروتکل TCP  اکسپوز کنیم و پورت 11001رو روی پورت دیگری مثل 7701 با پروتکل UDP اکسپوز کنیم:
```
  port_mapping:
    - port: 8081
      target_port: 8080
      protocol: TCP
    - port: 7701
      target_port: 11001
      protocol: UDP
```

> توجه داشته باشید که target_port پورتی است که داخل کانتینر سرویس شما
> روی آن پورت داره سرویس میده و port پورتی است که قرار هست بقیه سرویس‌ها
> از بیرون از طریق آن پورت با آن سرویس بخصوص تماس بگیرند.

مقدار پیشفرض برای پروتکل TCP است، پس نیازی نیست همیشه قید کنید اگر به UDP نیازی ندارید.

 - **volume_mounts**
همان طور که می‌دانید فندق به هر کدام از کاربران یک [فضای ذخیره‌سازی مانا](https://docs.fandogh.cloud/docs/namespaces.html#%D9%81%D8%B6%D8%A7%DB%8C-%D8%B0%D8%AE%DB%8C%D8%B1%D9%87-%D8%B3%D8%A7%D8%B2%DB%8C-%D9%81%D8%B6%D8%A7%D9%86%D8%A7%D9%85-%D9%87%D8%A7) هنگام عضویت ارائه می‌دهد که محتویات آن با از بین رفتن یا ریست شدن سرویس از بین نمی‌رود.\
این فضای ذخیره سازی همواره در مسیر `/mnt/shared-volume` در تمام سرویس‌ها در دسترسی است.
اما بعضا کاربران نیاز دارند که بخشی از این فضا را در مسیری بخصوص در دسترس قرار دهند یا به اصطلاح mount کنند.\
مثلا ایمیج رسمی MySQL در docker hub اینطور پیکربندی شده که دیتابیس و فایل‌های مرتبط را در مسیر `/var/lib/mysql` ذخیره می‌کند، برای اینکه فایل‌های MySQL در فضاذخیره‌سازی قرار بگیرد باید هنگام ساخت سرویس فندق بخشی از فضای ذخیره‌سازی را در مسیر `/var/lib/mysql‍` (یا هر مسیر مورد نظر دیگری) mount کند.\
برای رفع این نیاز شما می‌توانید در مانیفست با استفاده از volume_mounts مشخص کنید که چه بخشی از فضاذخیره‌سازی شما در چه مسیری باید در دسترس قرار بگیرد.\
به مثال زیر توجه کنید:
```
volume_mounts:
    - mount_path: /var/lib/mysql
      sub_path: mysql
```

> توجه داشته باشید که آدرس mount_path حتما باید از مسیر روت نوشته شود در غیر این صورت سرور دچار خطا خواهد شد
> و manifest به درستی set نمی شود.

با اضافه کردن این بخش به مانیفست سرویس یک دایکتوری در فضای‌ذخیره‌سازی شما به نام mysql ساخته می‌شود و در نقطه /var/lib/mysql  سرویس مورد نظر شما mount می‌شود.\
شما می‌توانید از طریق sub_path  دایرکتوری‌ بخصوصی از فضای ذخیره‌سازی را مشخص کنید و به وسیله mount_path معلوم کنید که آن دایرکتوری در کجای سرویس باید mount شود.\
توجه داشته باشید اگر که می خواهید از dedicated volume استفاده کنید می توانید مانند قطعه کد زیر از متغیر volume_name استفاده کرده و نام volumeای که ساخته اید را در جلوی آن قرار دهید.

```
volume_mounts:
    - mount_path: /var/lib/mysql
      sub_path: mysql
      volume_name: my-volume
```

 - **resources**
از طریق این فیلد می‌توانید مشخص کنید که چه مقدار منابع نیاز دارید، ساختار این فیلد به این شکل است:
```
  resources:
    memory: 200Mi
```
که 200Mi یعنی ۲۰۰ مگابایت فضای رم باید به این سرویس تخصیص داده شود، می‌توانید هر مقداری که نیاز دارید را مشخص کنید،‌ مثلا برای ۱ گیگ باید 1024Mi بنویسید.
 - **readiness_probe** و **liveness_probe**
پایداری سرویس شما در گروی این است که فندق بتواند به درستی سلامت و آمادگی سرویس شما را تشخیص دهد، در بسیاری از موارد بدون همکاری سرویس شما امکان اینکه این امر به طور دقیق انجام شود وجود ندارد.
به همین دلیل، امکانی در manifest وجود دارد که از طریق آن می‌توانید یک API در اختیار فندق قرار دهید تا از طریق آن API فندق بتواند از صحت/آمادگی سرویس شما مطلع شود.
روش کار به این شکل است که یک HTTP API مشخص می‌کنید که فندق آن را در بازه‌های زمانی مشخص فراخوانی می‌کند و اگر با کد 200 پاسخ دریافت کند به معنی سلامت سرویس شماست و در غیر اینصورت یعنی سرویس دچار مشکل شده است.

```
  liveness_probe:
    initial_delay_seconds: 12
    period_seconds: 60
    http_get:
      path: "/are-you-live"
      port: 80
  readiness_probe:
    initial_delay_seconds: 5
    period_seconds: 10
    http_get:
      path: "/are-you-ready"
      port: 80
```
در مثال بالا در ابتدا قبل از این فندق ترافیک را به سمت سرویس شما هدایت کند، از طریق فراخوانی pathای که در قسمت readiness_probe مشخص کردید از آمادگی سرویس شما برای دریافت ترافیک اطمینان حاصل می‌کند، این موضوع برای سرویس‌هایی که زمان نیاز دارند تا به طور کامل لود شوند، بسیار کاربردی است.
سپس بعد از راه‌اندازی سرویس به اندازه `initial_delay_seconds` صبر می‌کند و سپس هر  در بازه های زمانی مشخص شده توسط `period_seconds`  بر حسب ثانیه، از طریق فراخوانی path ، مثلا  `/are-you-live` ، سلامت سرویس را بررسی می‌کند، در صورتی که با کدی غیر از ۲۰۰ پاسخ دریافت کند سرویس را restart می‌کند.

### فیلد‌ spec در InternalServiceها
فیلد spec در InternalService ها کاملا مشابه فیلد spec در ExternalService هاست به جز اینکه فیلد‌های زیر را ندارد:
- port
- path
- allow_http
- domains

### فیلد spec در ManagedServiceها
 - **service_name**
از طریق این فیلد مشخص می‌کنید کدام یک از managed-service های فندق را قصد دارید ایجاد کنید، برای مشاهده انواع managed-service‌ها به [این بخش](https://docs.fandogh.cloud/docs/managed-services.html#%D8%A7%D9%86%D9%88%D8%A7%D8%B9-managed-service) رجوع کنید.
 - **version**
از طریق این فیلد مشخص می‌کنید برای سرویس انتخاب شده کدام ورژن را مایل هستید دیپلوی کنید.
 - **parameters**
هر managed-service مجموعه‌ای پارامتر‌های پیکربندی را دارد که می‌توانید از طریق این قسمت مشخص کنید مثلا برای یک سرویس mysql می‌توانیم این موارد را مشخص کنیم:
```
  parameters:
    - name: phpmyadmin_enabled
      value: true
    - name: mysql_root_password
      value: root
```

 - **resources**
از طریق این فیلد می‌توانید مشخص کنید که چه مقدار منابع نیاز دارید، ساختار این فیلد به این شکل است:
```
  resources:
    memory: 200Mi
```
که 200Mi یعنی ۲۰۰ مگابایت فضای رم باید به این سرویس تخصیص داده شود، می‌توانید هر مقداری که نیاز دارید را مشخص کنید،‌مثلا برای ۱ گیگ باید 1024Mi بنویسید.

### قابلیت استفاده از متغیر در manifest
شما می‌توانید در داخل manifest از متغیر‌های مختلف استفاده کنید و هنگام فراخوانی دستور `fandogh service apply` مقدار متغیر‌ها را مشخص کنید.
به عنوان مثلا تصور کنید، مقدار Environment variable ای مثل DB_PASSWORD را مایل نیستید در فایل manifest بنویسید، برای این کار می‌توانید به این شکل عمل کنید:
```
kind: ExternalService
name: hello-world
spec:
  image: registry.my-comapny.com:5000/golabi/api:v1
  image_pull_policy: Always
  image_pull_secret: "private-registry-secret"
  replicas: 4
  port: 8080
  env:
    - name: DB_PASSWORD
      value: ${DB_PASSWORD}
```
اگر دقت کنید مقداری که برای DB_PASSWORD مشخص شده `{DB_PASSWORD}$` است یعنی این مقدار یک متغیر است.
بعدا هنگام دیپلوی باید مقدار این متغیر را مشخص کنید:
<br/>
**۱- Inline Param**
در این روش شما باید مقدار environment variable را در ادامه دستور apply مانند قطعه کد زیر قرار دهید.
```
fandogh service apply \
-f my-api-manifest.yaml \
-p DB_PASSWORD=somelongunpredictablestring
```
<br/>
**۲- OS Environment Variable**
در این روش شما می توانید از environment variable هایی که از قبل بر روی محیط خود ایجاد کرده اید استفاده کنید. مزیت این روش نسبت به روش Inline Param در این است که فقط شما باید نام varaibleای که از قبل بر روی محیط خود ایجاد کرده اید را بعد از p- قرار دهید.
برای مثال اگر شما از قبل در محیط خود DB_PASSWORD   را export کرده بودید و حالا همین متغیر را در مانیفست خود استفاده کرده اید٬ مانند دستور زیر باید در ادامه دستو apply بنویسید p DB_PASSWORD-  تا خود cli مقدار این متغیر را از روی محیطی که بر روی آن در حال اجرا می باشد بخواند.
```
fandogh service apply \
-f my-api-manifest.yaml \
-p DB_PASSWORD
```

## نمونه مانیفست برای انواع سرویس

### نمونه مانیفست برای ExternalService
```
kind: ExternalService
name: hello-world
spec:
  image: registry.my-comapny.com:5000/gerdoo/hello-world:v1
  image_pull_policy: Always
  image_pull_secret: "private-registry-secret"
  replicas: 4
  port: 8080
  path: /hello-world/
  allow_http: false
  env:
    - name: DEBUG
      value: 1
    - name: API_KEY
      value: SOME_LONG_RANDOM_STRING

  domains:
     - name: hello-world.my-company.com
     - name: hw.my-company.com

  port_mapping:
    - port: 8081
      target_port: 8081
      protocol: tcp
  resources:
    memory: 100Mi
  volume_mounts:
    - mount_path: /var/lib/mysql
      sub_path: mysql
  liveness_probe:
    initial_delay_seconds: 12
    period_seconds: 60
    http_get:
      path: "/are-you-live"
      port: 80
  readiness_probe:
    initial_delay_seconds: 5
    period_seconds: 10
    http_get:
      path: "/are-you-ready"
      port: 80
```
### نمونه مانیفست برای InternalService
```
kind: InternalService
name: cache
spec:
  image: library/redis:latest
  image_pull_policy: IfNotPresent
  replicas: 1
  env:
    - name: VERSION
      value: v1
  port_mapping:
    - port: 6379
      target_port: 6379
      # default protocol is TCP
  resources:
    memory: 400Mi
  volume_mounts:
    - mount_path: /var/lib/mysql
      sub_path: mysql
  liveness_probe:
    initial_delay_seconds: 12
    period_seconds: 60
    http_get:
      path: "/are-you-live"
      port: 80
  readiness_probe:
    initial_delay_seconds: 5
    period_seconds: 10
    http_get:
      path: "/are-you-ready"
      port: 80
```
### نمونه مانیفست برای ManagedService
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

  resources:
      memory: 800Mi

```







