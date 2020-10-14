---
layout: fandogh
id: gitlab-runner-managed-service
title: Gitlab Runner
sidebar_label: Gitlab Runner
---


## ![Gitlab Runner](/img/docs/gitlab-runner-managed-service.png "Gitlab Runner")

یکی از چالش‌های مرسوم در روند توسعه محصولات نرم‌افزاری روند تست و استقرار سرویس‌ها است.\
روش سنتی حل این مسئله به صورت دستی است که طبیعتا منابع زمانی و پولی زیادی را صرف می‌کند.\
اما روش بهینه آن استفاده از فرآیند `CI/CD` است که این قابلیت را به شما می‌دهد تا با تعریف چند **Stage**، موارد تست و استقرار را به صورت کاملا اتوماتیک در اختیار داشته باشید.

پلتفرم‌های متفاوتی مانند Travis، Github، CircleCI و Gitlab این ویژگی را در اختیار کاربران خود قرار می‌دهند که با اتصال به مخازن کد با بر اساس قوانین و شرایطی که کاربر تعریف می‌کند این سرویس‌ها تغییرات صورت گرفته بر روی **Branch**های مشخصی رصد کرده و فرآیند را آغاز می‌کنند.

## Gitlab Runner
![Gitlab Runner Banner](/img/docs/gitlab-runner-banner.png "Gitlab Runner Banner")
یکی از پلتفرم‌هایی که فرآیند چرخه CI/CD را در اختیار کاربران قرار می‌دهد `Gitlab` است. برای آنکه سرویس CI/CD بتواند کار خود را به درستی انجام دهد، از سرویس‌های میانی به اسم `Gitlab Runner` استفاده می‌کند.\
سرویس‌های `Gitlab Runner` کارها (Jobs) را اجرا کرده و نتیجه را به Gitlab برمی‌گرداند.

### راه‌اندازی  Gitlab Runner
برای ساخت سرویس مدیریت شده `Gitlab Runner` به ترتیب زیر عمل کنید:

#### دریافت Gitlab Registration Token
ابتدا از طریق داشبورد مدیریت `Gitlab` وارد آدرس زیر شوید:
```
https://gitlab_website_address/admin/runners
```
بعد از آنکه وارد مسیر بالا شدید، همانند تصویر زیر `registration code` نمایش داده شده را کپی کنید.
![Gitlab Registration Token](/img/docs/gitlab_registration_token.png "Gitlab Registration Token")

#### استقرار سرویس Gitlab Runner بر روی سکو

بعد از آنکه `Registration Token` را در مرحله قبل بدست آوردید، می‌توانید این سرویس را به همراه پارامتر‌های زیر مستقر کنید:
|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| gitlab-runner| نامی که برای سرویس مایلید در نظر گرفته شود|
|gitlab_registration_token| string| | مقدار registration token که از داشبورد Gitlab دریافت کرده‌اید|
|gitlab_runner_name| string| | نامی یکتا برای runner|
| gitlab_runner_memory| string| 256m| میزان رم مورد نیاز برای راه‌اندازی runnerهای داخلی سرویس Gitlab Runner |
|gitlab_server_url| string| http://gitlab|آدرس سرویس/سرور gitlab|
| timezone| string| UTC|انتخاب timezone مورد نظر|

> در صورتی که سرویس gitlab شما داخل سکوی ابری فندق قرار دارد، کافی است نامی که برای سرویس gitlab انتخاب کرده‌اید را به صورت http://SERVICE_NAME به عنوان مقدار gitlab_server_url قرار دهید. و اگر سرور gitlab شما خارج از فضانام است، باید آدرس دقیق آن را را به صورت https://GITLAB_SERVER_URL قرار دهید.

> برای انتخاب timezone می‌توانید به آدرس زیر مراجعه کنید:
> https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

حال سرویس Gitlab Runner را با دستور زیر مستقر می‌کنیم:
```
  fandogh managed-service deploy gitlab-runner latest \
       -c service_name=gitlab-runner \
       -c gitlab_registration_token=REGISTRATION_TOKEN_FROM_GITLAB \
       -c gitlab_runner_name=sample-docker-runner \
       -m 656Mi
```

> توجه داشته باشید حداقل میزان رمی که باید به سرویس ‌Gitlab Runner تخصیص داده شود، 656 مگابایت (656Mi) است.

> توجه داشته باشید اگر قصد داشته باشید چند سرویس Gitlab Runner ایجاد کنید، حتما باید مقادیر service_name و gitlab_runner_name را به صورت مجزا و یکتا انتخاب کنید در غیر این صورت دچار خطا خواهید شد.

این دستور یک سرویس Gitlab Runner ایجاد می‌کند که:
* نام آن gitlab-runner است.
* میزان رم آن ۶۵۶ مگابایت.
* مقدار gitlab_registration_token برابر با REGISTRATION_TOKEN_FROM_GITLAB است که در مرحله قبل بدست آورده‌اید.
* نام یکتای runner یا همان gitlab_runner_name برابر با runner-one است.

بعد از آن که سرویس Gitlab Runner ساخته شد، سکوی ابری فندق روند Register کردن آن را شروع می‌کند و در صورتی که مراحل را به درستی انجام داده باشید، نتیجه‌ای مانند تصویر زیر را خواهید دید:

![Gitlab Registration Completed](/img/docs/gitlab_runner_registration_completed.png "Gitlab Registration Completed")

### نحوه محاسبه رم مصرفی سرویس Gitlab Runner
سرویس Gitlab Runner یک رم مصرفی کلی دارد که با پارامتر memory-- توسط کاربر تعیین می‌شود. سرویس Gitlab Runner برای هر Job یک سرویس داخلی ایجاد می‌کند که این سرویس داخلی که همان Runner است تنها در مدت زمان اجرای Job فعالیت دارد و بعد از اجرای کامل Job، متوقف شده و از بین می‌رود.\
این Runner داخلی برای آنکه بتواند به درستی راه‌اندازی شود به میزان مشخصی رم احتیاج دارد که می‌توانید با پارامتر `gitlab_runner_memory` آن را مشخص کنید (مقدار این پارامتر به صورت پیشفرض 256m بوده که برای پروژه‌های سبک مناسب است).\
حال چگونه باید memory انتهایی یا همان رم کلی را مشخص کنیم؟\
بر اساس این فرمول:
```
Total Memory = service memory + gitlab_runner_memory
```
در فرمول بالا به صورت مثال اگر میزان gitlab_runner_memory را برابر با 300m قرار دهیم، خود سرویس Gitlab Runner هم برای اجرا حداقل 400Mi رم نیاز خواهد داشت. در نتیجه مقدار memory-- را برابر با 700Mi قرار می‌دهیم.\
 برای روشن‌تر شدن این روند به نمونه مانیفست زیر توجه فرمایید:
 ```
kind: ManagedService
name: gitlab-runner
spec:
  service_name: gitlab-runner
  version: latest
  parameters:
    - name: gitlab_registration_token
      value: REGISTRATION_TOKEN_FROM_GITLAB
    - name: gitlab_runner_name
      value: sample-docker-runner
    - name: gitlab_runner_memory
      value: 400m
  resources:
      memory: 800Mi
```
نمونه مانیفست بالا یک سرویس `Gitlab Runner` با نام `gitlab-runner` ایجاد می‌کند. این سرویس برای `Runner` که برای هر `Job` ایجاد می‌کند، `۴۰۰ مگابایت (400m)`  رم تخصیص می‌دهد و رم مربوط به سرویس `Gitlab Runner` برابر با ۴۰۰ = ۴۰۰ - ۸۰۰ خواهد بود.

### Deploy Gitlab Runner With Manifest

شما همچنین می توانید برای اجرای راحت تر سرویس های مدیریت شده از [مانیفست](https://docs.fandogh.cloud/docs/service-manifest.html) همانند مثال زیر استفاده کنید.

- مانیفست  Gitlab Runner
```
kind: ManagedService
name: gitlab-runner
spec:
  service_name: gitlab-runner
  version: latest
  parameters:
    - name: gitlab_registration_token
      value: REGISTRATION_TOKEN_FROM_GITLAB
    - name: gitlab_runner_name
      value: sample-docker-runner
    - name: gitlab_runner_memory
      value: 256m
  resources:
      memory: 656Mi
```

## ایجاد Job در ‌Gitlab
برای آنکه بتوانید از ویژگی `Gitlab CI` استفاده کنید، باید فایل `gitlab-ci.yml.` را در مسیر root پروژه خود ایجاد کنید.\
این فایل شامل تنظیمات پروسه CI است که در stageهای متفاوتی می‌تواند تعریف شود. برای مثال فرض کنید میخواهیم برای branchهای `develop` و `master` از یک مخزن که کدهای ما داخل آن قرار دارد Job خاصی تعریف کنیم تا با هر push در هر یک از branchهای مورد نظر، روند CI/CD فعال شده و ایمیجی جدید از پروژه ما ساخته و آن را به رجیستری سکوی ابری فندق ارسال کند:
```
build_job:
  stage: build
  image: python:3.5
  variables:  
    COLLECT_ERROR: 1  
  script:
    - echo "starting job..."
    - pip install fandogh-cli --upgrade
    - fandogh login --username $FANDOGH_USERNAME --password $FANDOGH_PASSWORD
    - fandogh namespace active --name $FANDOGH_NAMESPACE
    - fandogh image init --name git
    - fandogh image publish --version $CI_JOB_ID
  only:
    - develop
    - master
```
این فایل شامل بخش‌های زیر است:

* **stage**: هر stage نشان دهنده یک مرحله مجزا از چرخه CI/CD است که می‌خواهیم اجرا شود. ما در این فایل یک stage به نام build تعریف کرده‌ایم (توجه داشته باشید شما می‌توانید برای stage‌ها هر اسمی انتخاب کنید اما بهتر است از همان اسم‌های استاندارد مانند test،build،deploy و ... استفاده نمایید تا خواناتر و قابل فهم باشند.).

* **image**: برای آنکه هر Job بتواند کار خود را شروع کند، نیاز دارد تا بداند قرار است پروسه را در چه محیطی شروع کند؛ در مورد Job مورد نظر ما تعریف کرده‌ایم تا از ایمیج `python:3.5` استفاده شود.

* **variables**: در این بخش‌ می‌توانید Environment Variableهای مورد نیاز پروسه CI را ایجاد کنید. Environment Variableهایی که در این بخش تعریف می‌شوند مانا نیستند و در جایی ذخیره نمی‌شوند با اتمام پروسه حذف می‌شوند.
 
* **script**: در این بخش دستوراتی که در آن stage بخصوص باید اجرا شود را تعریف می‌کنیم.
	```
    - echo "starting job..."
    - pip install fandogh-cli --upgrade
    - fandogh login --username $FANDOGH_USERNAME --password $FANDOGH_PASSWORD
    - fandogh namespace active --name $FANDOGH_NAMESPACE
    - fandogh image init --name git
    - fandogh image publish --version $CI_JOB_ID
	```
	این دستورات به ترتیب اجرا می‌شوند و در صورتی که در اجرای هر خط مشکل یا خطایی وجود نداشته باشد، خط بعدی اجرا می‌شود. در این script ابتدا شروع فرآیند echo می‌شود، سپس آخرین نسخه از fandogh-cli را در محیط نصب می‌کند.\
بعد از آنکه fandogh-cli با موفقیت نصب شد، با استفاده از `Environment Variableهای Global` که نحوه تعریف آن‌ها را در بخش بعدی توضیح میدهیم، وارد حساب کاربری شده و فضانامی که قرار است ایمیج در آن ساخته شود را انتخاب می‌کنیم.\
در انتها ایمیج با نام `git` آماده شده و روند publish کردن ایمیج جدید شروع می‌شود.
	> توجه داشته باشید در دستور publish مقدار نسخه ایمیج را برابر با CI_JOB_ID$ قرار داده‌ایم؛ این Environment Variable توسط خود Gitlab CI ایجاد شده است که در ادامه در مورد آن‌ها توضیح داده‌ایم.

* **only**: در این بخش نام Branchهایی که تصمیم دارید تا Gitlab CI تغییرات آن را برای اجرای فرآیند مانیتور کند را مشخص می‌کنید که در مثل ما این Branchها فقط شامل `Develop` و `Master` است.

بعد از آنکه فرآیند بالا با موفقیت به پایان برسد در قسمت Jobها که زیر مجموعه CI/CD در بخش Admin هستند، با تصویری شبیه به تصویر زیر مواجه خواهید شد که بیانگر وضعیت Build و مدت زمان اجرای آن و شاخه‌ای که Job بر روی آن انجام شده و موارد دیگر خواهد بود:
 ![Gitlab  Runner Job Status](/img/docs/gitlab_runner_job_status.png "Gitlab Runner Job Status")

> برای آشنایی بیشتر با چگونگی ایجاد Job در Gitlab می‌توانید به لینک‌های زیر مراجعه کنید
> https://blog.fandogh.cloud/articles/how-to-gitlab-ci.html
> https://docs.gitlab.com/ee/ci/

## تعریف Environment Variable برای Runner
در برخی Jobها شما ممکن است در روند CI از داده‌هایی استفاده کنید که امنیتی و حساس هستند و نمی‌خواهید به صورت خام در دسترس باشند؛ به همین منظور می‌توانید از قابلیت تعریف Environment Variable داخل Gitlab CI  استفاده کنید.\
برای انجام این کار در قسمت Admin داشبورد Gitlab خود، وارد قسمت Settings شوید و گزینه CI/CD را انتخاب نمایید.\
در صفحه باز شده بخش `Variables` را Expand کنید تا بتوانید Environment Variableهای مورد نیاز خود را وارد نمایید.
![Gitlab Env ](/img/docs/gitlab_env.png "Gitlab Env")
## Environment Variableها در Gitlab CI/CD
سرویس `Gitlab CI` در هنگام اجرا [Environment Variableهایی](https://docs.gitlab.com/ee/ci/variables/#list-all-environment-variables)  را در محیط عملیاتی ایجاد می‌کند که در هنگام تعریف Job می‌تواند کاربردی باشد:
```
export CI_JOB_ID="50"
export CI_COMMIT_SHA="1ecfd275763eff1d6b4844ea3168962458c9f27a"
export CI_COMMIT_SHORT_SHA="1ecfd275"
export CI_COMMIT_REF_NAME="master"
export CI_REPOSITORY_URL="https://gitlab-ci-token:abcde-1234ABCD5678ef@example.com/gitlab-org/gitlab-foss.git"
export CI_COMMIT_TAG="1.0.0"
export CI_JOB_NAME="spec:other"
export CI_JOB_STAGE="test"
export CI_JOB_MANUAL="true"
export CI_JOB_TRIGGERED="true"
export CI_JOB_TOKEN="abcde-1234ABCD5678ef"
export CI_PIPELINE_ID="1000"
export CI_PIPELINE_IID="10"
export CI_PAGES_DOMAIN="gitlab.io"
export CI_PAGES_URL="https://gitlab-org.gitlab.io/gitlab-foss"
export CI_PROJECT_ID="34"
export CI_PROJECT_DIR="/builds/gitlab-org/gitlab-foss"
export CI_PROJECT_NAME="gitlab-foss"
export CI_PROJECT_TITLE="GitLab FOSS"
export CI_PROJECT_NAMESPACE="gitlab-org"
export CI_PROJECT_ROOT_NAMESPACE="gitlab-org"
export CI_PROJECT_PATH="gitlab-org/gitlab-foss"
export CI_PROJECT_URL="https://example.com/gitlab-org/gitlab-foss"
export CI_REGISTRY="registry.example.com"
export CI_REGISTRY_IMAGE="registry.example.com/gitlab-org/gitlab-foss"
export CI_REGISTRY_USER="gitlab-ci-token"
export CI_REGISTRY_PASSWORD="longalfanumstring"
export CI_RUNNER_ID="10"
export CI_RUNNER_DESCRIPTION="my runner"
export CI_RUNNER_TAGS="docker, linux"
export CI_SERVER="yes"
export CI_SERVER_URL="https://example.com"
export CI_SERVER_HOST="example.com"
export CI_SERVER_PORT="443"
export CI_SERVER_PROTOCOL="https"
export CI_SERVER_NAME="GitLab"
export CI_SERVER_REVISION="70606bf"
export CI_SERVER_VERSION="8.9.0"
export CI_SERVER_VERSION_MAJOR="8"
export CI_SERVER_VERSION_MINOR="9"
export CI_SERVER_VERSION_PATCH="0"
export GITLAB_USER_EMAIL="user@example.com"
export GITLAB_USER_ID="42"
```
