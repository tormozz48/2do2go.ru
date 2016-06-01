## Задание №3

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
