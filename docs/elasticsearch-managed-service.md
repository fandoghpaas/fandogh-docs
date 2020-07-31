---
layout: fandogh
id: elasticsearch-managed-service
title: Elasticsearch
sidebar_label: Elasticsearch 
---


## ![Elasticsearch](/img/docs/elasticsearch-managed-service.png "Elasticsearch")

**Elasticsearch** محبوب‌ترین موتور جست‌و‌جو (Search Engine) در بین کاربران است که بر پایه کتابخانه Lucene و زبان برنامه‌نویسی Java توسعه یافته و از قدرت بالایی برخوردار است. این موتور جست‌و‌جو قابلیت جست‌و‌جو تمام متن را با پشتیبانی از پروتکل HTTP را به صورت توزیع شده در اختیار کاربران قرار می‌دهد.
همچنین بخش‌هایی از این سرویس به صورت متن‌باز تحت لیسانس‌هایی مانند Apache توسعه یافته و بخش‌هایی دیگر تحت عنوان Elastic License توسعه یافته‌اند.<br/>

برای آنکه بتوانید از مزایای Elasticsearch استفاده کنید، باید داده‌ها را به آن بدهید که این کار یا با استفاده از کتابخانه‌های موجود برای زبان‌هایی همچون Java، Python، PHP، Apache Groovy و ...   و یا با استفاده از سرویس‌های واسطی مانند Fluentd یا Bean انجام دهید.<br/>


## مزایای Elasticsearch
سرویس Elasticsearch در میان شرکت‌های بزرگی همچون Github، Udemy، Shopify و ... از محبوبیت‌ بالایی برخوردار است و از دلایل این محبوبیت می‌توان به دو مزیت زیر اشاره کرد:
* **مقیاس‌پذیری**: شما می‌توانید Elasticsearch را بسته به نیاز خود روی لپ‌تاپ شخصی گرفته تا صدها سرور به صورت توزیع شده و به راحتی مستقر کنید.
* **Relevance**: سرویس Elasticsearch این اطمینان را به شما می‌دهد که با سرعت بالا به صورت دقیق به هر داده‌ای که نیاز دارید دسترسی داشته باشید.

حال برای اینکه بتوانید این سرویس محبوب را بر روی فضانام خود دیپلوی کنید، پارامتر‌های زیر را می‌توانید مشخص کنید:
|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| elastic-search| نامی که برای سرویس مایلید در نظر گرفته شود|
|min_heap_memory| string| 512 | حداقل رم مصرفی Heap Size |
|max_heap_memory| string| 1024| حداکثر رم مصرفی Heap Size |
|elastic_password| string| changeme| رمز عبور سرویس |
|volume_name| string| | نام volumeای که به سرویس وصل می شود |
|elastic_search_exposed| true/false| true | مشخص میکند که سرویس از طریق وب در دسترس باشد یا خیر|

> توجه داشته باشید که سرویس ‌Elasticsearch برای آنکه بتواند داده‌های خود را ذخیره کند و از سرعت و کارایی مناسبی برخوردار باشد باید حتما به یک [dedicated volumes](https://docs.fandogh.cloud/docs/dedicated-volume.html) متصل شود در غیر این صورت با خطا مواجه شده و سرویس به درستی عمل نمی‌کند.

> حداقل رم قابل سفارش برای سرویس Elasticsearch باید ۲۰۴۸ مگابایت باشد تا سرویس عملکرد ایده‌آلی داشته باشد، در غیر این صورت خطاهای متفاوتی را تجربه خواهید کرد.

برای دیپلوی کردن Elasticsearch می‌توانیم به این شکل یک سرویس بسازیم:
```
  fandogh managed-service deploy elastic-search latest \
       -c service_name=elastic-search \
       -c min_heap_memory=512 \
       -c max_heap_memory=1024 \
       -c elastic_password=changeme \
       -c volume_name=VOLUME_NAME \
       -m 2048Mi
```
این دستور یک سرویس Elasticsearch ایجاد می‌کند که:
* نام آن elastic-search ( یعنی در شبکه داخلی فضانام شما باقی سرویس‌ها از طریق نام elastic-search و بر روی پورت 9200 می‌توانند به آن متصل شوند) است .
* حداقل رم مصرفی ۵۱۲ مگابایت است.
* حداکثر رم مصرفی ۱۰۲۴ مگابایت است.
* رمز عبور دیتابیس آن changeme است.
* اسم محل ذخیره سازی که به آن متصل است VOLUME_NAME بوده.
* و میزان رم کلی که به سرویس اختصاص یافته است ۲۰۴۸ مگابایت است.

> **توجه** \
برای استفاده از سرویس URL سرویس Elasticsearc در توجه داشته باشید که در صورت Expose شدن این سرویس، باید username و password را به مرورگر خود بدهید؛ مقدار password چیزی است که به هنگام ساخت سرویس به عنوان پارامتر به فندق می‌دهید و username هم `elastic` خواهد بود.

> **Connection String** \
 در صورتی که برای ارتباط با سرویس Elasticsearch نیاز به Connection String داشته باشید، مقدار آن به شکل زیر است:
> ```
 > http://elastic:YOUR_PASSWORD@ELASTIC_SERVICE_NAME:9200
 >```

## Deploy With Manifest
  

شما همچنین می توانید برای اجرای راحت تر سرویس های مدیریت شده از [مانیفست](https://docs.fandogh.cloud/docs/service-manifest.html) همانند مثال زیر استفاده کنید.

- مانیفست Elasticsearch بدون داشبورد مدیریتی
```
kind: ManagedService
name: elastic-search
spec:
  service_name: elastic-search
  version: latest
  parameters:
    - name: min_heap_memory
      value: 512
    - name: max_heap_memory
      value: 1024
    - name: elastic_password
      value: changeme
    - name: volume_name
      value: VOLUME_NAME
    - name: elastic_search_exposed
	  value: true
  resources:
      memory: 2048Mi
```
