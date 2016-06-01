## Задание 1 (сортировка статей)

На входе:

* json [вида](http://www.reddit.com/r/javascript/.json) 
(это отображение [страницы](http://www.reddit.com/r/javascript))
* направление и поле (дата создания, баллы) для сортировки выходных данных
* выходной формат (csv, sql) и дополнительные параметры для форматтера 
(разделитель для csv, имя таблицы и полей для sql и прочее).

На выходе мы всегда отображаем следующие поля:
`id`, `title`, `utc` `creation` `date`, `score`

Yапример для статей отсортированных по баллам (в порядке убывания) 
в формате csv должно получиться, что-то вроде:

```csv
"1n3jj3", "Must.js — An assertion library with BDD syntax (awesome.must.be.true()). Ships with many expressive matchers. Honors RFC 2119 by using MUST. Good stuff and well tested.", "25.09.2013 16:09:00", 26
"1n46by", "Template inheritance for Angular JS", "26.09.2013 05:09:00", 14
"1n3bpg", "Why Lavaca is the only sane HTML5 mobile development framework out there (and why Sencha Touch sucks)", "25.09.2013 12:09:00", 8
```
