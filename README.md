# 2do2go.ru
Тестовое задание для [2do2go.ru](https://www.2do2go.ru/)

[![Build Status](https://travis-ci.org/tormozz48/2do2go.ru.svg?branch=master)](https://travis-ci.org/tormozz48/2do2go.ru)
[![Coverage Status](https://img.shields.io/coveralls/tormozz48/2do2go.ru.svg?style=flat)](https://coveralls.io/r/tormozz48/2do2go.ru?branch=master)


## Установка

* Склонировать репозиторий: `git clone https://github.com/tormozz48/2do2go.ru.git`
* Перейти в директорию проекта: `cd 2do2go.ru`
* Установить npm зависимости: `npm install`
* Запустить сервер: `npm start`

После запуска открыть в браузере: `http://localhost:3000/`

### Разное

* Запуск линтера eslint: `npm run lint`
* Запуск тестов: `npm test`
* Запуск тестов с вычислением покрытия кода тестами: `npm run cover`

## Задание #1 Сортировка статей

#### Формулировка задания

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

* Решение [здесь](./src/task1)
* Тесты [здесь](./test/task1)

#### Примечания к заданию #1

Решение данного задания можно существенно улучшить с помощью высокоуровневых
библиотек для работы со Stream API, таких как:
* [through2](https://www.npmjs.com/package/through2)
* [highland](https://www.npmjs.com/package/highland)

Такой подход будет особенно актуальным для случая обработки больших объемов данных.

## Задание #2 Агрегация статей

#### Формулировка задания

Имея на входе тот же json (что и в задании 1) и выходной формат мы должны получить информацию по количеству статей для каждого домена отсортированную по убыванию, т.е. поля:
`domain` `articles count` (количество статей на домене) `score summ` (сумма баллов всех статей домена), например в `csv`:
```csv
    "github.com", 13, 123 "rathercurio.us", 10, 55 "bunselmeyer.net", 5, 40
```

* Решение [здесь](./src/task2)

#### Примечания к заданию #2

Что можно улучшить:

1. Можно вообще отказаться от сервера, точнее использовать статический сервер,
а данные с удаленного источника подтягивать напрямую на клиента.
2. Улучшить обработку ошибок. Добавить страницы 404 и 500 а также реализовать правильный вывод для ошибки в AJAX методе получения данных.
3. Добавить тесты для серверного и клиентского кода.
4. Отказаться от ссылок на CDN для загрузки стилей и все собирать локально с помощью webpack.
5. Починить и включить линтирование для react компонентов.
6. Добавить возможность устанавливать дополнительные настройки в зависимости от выбранного формата (`csv`, `json`, `sql`)

## Задание #3 Дополнительное задание

#### Формулировка задания

Дан массив объектов с полями `id` (уникальный идентификатор) и `parentId` (идентификатор родителя). 
Для входных данных верно следующее: индекс ребенка всегда больше индекса родителя в исходном массиве.

**Задача**: превратить массив "плоских" объектов в массив объектов с вложенными детьми (поле children).

Исходные данные:
```js
[
    {id: 1, parentId: 0},
    {id: 2, parentId: 0},
    {id: 3, parentId: 1},
    {id: 4, parentId: 1},
    {id: 5, parentId: 2},
    {id: 6, parentId: 4},
    {id: 7, parentId: 5}
];
```

должны превратиться в:
```js
[
    {
        id: 1,
        parentId: 0,
        children: [
            {
                id: 3,
                parentId: 1
            },
            {
                id: 4,
                parentId: 1,
                children: [
                    {
                        id: 6,
                        parentId: 4
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        parentId: 0,
        children: [
            {
                id: 5,
                parentId: 2,
                children: [
                    {
                        id: 7,
                        parentId: 5
                    }
                ]
            }
        ]
    }
]
```

* Решение [здесь](./src/task3)
* Тесты [здесь](./test/task3)

#### Примечания к заданию #3:

1. В алгоритме используются неэффективные методы `Array.prototype.unshift`. 
При условии что нам не важен порядок ключей в узлах-объектах результирующего
дерева, то `unshift` можно заменить на более эффективный `push`.

2. Решение мутабельно - т.е. оно изменяет входные данные, что не слишком хорошо.
Чтобы избежать этой проблемы можно перед построением дерева проводить полное копирование
исходного массива.
