---
layout: fandogh
id: secret
title: مقدمه
sidebar_label: مقدمه
---

![Fandogh Secret](/img/docs/secret.png "Fandogh Secret")

Secretها پیکربندی‌هایی هستند که حاوی اطلاعات محرمانه‌ بوده و در `Namespace` شما ذخیره می‌شوند.\
Secret‌ها می‌توانند شامل اطلاعاتی همچون توکن‌ها یا اطلاعات حساب کاربری، مقادیر environemt variable و خیلی موارد دیگر باشند که ممکن است سرویس شما به آن نیاز داشته باشد.\
شما با تعریف secret‌های متفاوت می‌توانید از داده‌های خود محافظت کرده و دیگر نگرانی از بابت دیده شدن داده‌های حساس توسط عوامل خارجی نداشته باشید.

## انواع Secret

در حال حاضر سکوی ابری فندق از secret‌های زیر پشتیبانی ‌می‌کند.

|نوع سکرت|جزئیات|
|---	|---  |
| Docker-registry |[مشاهده](https://docs.fandogh.cloud/docs/docker-registry-secrets.html)
| Environment-secret |[مشاهده](https://docs.fandogh.cloud/docs/Environment-secret-secrets.html)
<br>

##  مدیریت Secret ها
![ CLI Image](/img/docs/cli_image.png "CLI Image")


کلیه دستورات مربوط به بخش secrets در ادامه توضیح داده شده اند.

>شما همچنین می توانید با وارد کردن دستور`fandogh secret --help` در fandogh-cli لیست دستورات موجود را مشاهده کنید.

###  create
با استفاده از دستور `fandogh secret create --name SECRET_NAME -t SECRET_TYPE -f KEY=VALUE ... -f KEY=VALUE` می‌توانید یک secret ایجاد کنید.

* **name--**\
پارامتر name نمایانگر نام secretای است که می‌خواهید بسازید.
* **t-**\
پارامتر t نمایانگر نوع secretای است که می‌خواهید ایجاد کنید.
* **f-**\
پارامتر f مخفف واژه field بوده و به فیلدهایی که برای هر Secret نیاز است وارد شود اشاره دارد.
###  delete
با استفاده از دستور ` fandogh secret delete --name secret_name` می‌توانید سکرت مورد نظر خود را حذف نمایید.
* **name--**\
پارامتر name نمایانگر نام secretای است که می‌خواهید حذف کنید.

###  put
با استفاده از دستور `fandogh secret put --name secret_name -t secret_type -f fields` می‌توانید یک سکرت را update نمایید.
* **name--**\
پارامتر name نمایانگر نام secretای است که می‌خواهید update کنید.
* **t-**\
پارامتر t نمایانگر نوع secretای است که می‌خواهید update کنید.
* **f-**\
پارامتر f نمایانگر نام فیلدهایی از سکرت است که می‌خواهید update کنید.

###  list
با استفاده از دستور `fandogh secret list` می‌توانید تمامی secretهای موجود در namespace خود را مشاهده کنید.
