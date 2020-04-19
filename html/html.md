# List of HTML tags

## Structural Tags

`<a>text</a>` - hyperlink

_placement: inline_  
Can be used in two ways:

- To create a link to another document, by using the href attribute
- To create a bookmark inside a document, by using the id attribute

**target=”\_blank” rel=”noopener noreferrer"></a>** - безопасное использование ссылки
_Множество специальных атрибутов_

---

`<article>{childrens}</article>` - тег для группировки DOM компонентов;
**Placement: block**  
_Не имеет специфических атрибутов_

---

`<aside>{childrens}</aside>` - группирует меньшее количество содержимое
**Placement: block**  
_Не имеет специфических атрибутов_

---

`<hgroup>` - группирует заголовки
**Placement: block**  
_Не имеет специфических атрибутов_

```html
<hgroup>
  <h1>text</h1>
  <h1>text</h1>
</hgroup>
```

---

`<hr>` - horizontal line
**Placement: block**  
_Не имеет специфических тегов_

---

`<details>` - элемент управления, из которого пользователь может получить дополнительную информацию, развернув его или скрыв.  
Выпадающий список.
**Placement: block**

- `open` - определяет когда блок должен быть видим на странице

```html
<details>
  <summary>What is HTML?</summary>
  <p>HTML is a markup language for describing the structure of web pages.</p>
</details>
```

---

`<summary>` - внутренний тэг для `<details>`  
**Placement: block**  
_Не имеет специфических тегов_

---

`<section>{childrens}</section>` - группировка большого количества дочерних элементов
**Placement: block**  
_Не имеет специфических тегов_

## Metadata Tags

`<link>` - подключается только в head секции, являет собой ссылку на другие документы, файлы, ресурсы  
_Content: None. It is an empty element_

- `crossorigin` - anonymous || use-credentials
- `href`
- `media` - media types
- `rel` - specifies the relationship of the linked resource
- `type`

---

`<meta>` - метадата документа
_Content: None. It is an empty element_

- `name`
- `content`

---

`<style>{test}</style>` - стили на странице
_Content: text/css_

- `type` - text/css для css кода
- `media` - выбираем тип, т.е. _screen_ или _print_ или и оба вместе

## Form Tags

`<button>` - кастомизируемая кнопка отправки формы
**Content: Any block, inline, and text**

- `autofocus`
- `disabled`
- `form` - form_id для формы, которую отправляем
- `formaction` - URL
- `formenctype` - application/x-www-form-urlencoded | multipart/form-data | text/plain
- `formmethod` - method post, get, etc.
- `formnovalidate` - has jnly one value - _formnovalidate_
- `formtarget`
- `name`
- `type`
- `value`

---

`<fieldset>` - группа полей, первым дочерним элементов может быть `<legend>`  
**Placement: block**  
_Не имеет специфических тегов_

---

`<datalist>` - массив опций для input  
**Placement: block**  
_Не имеет специфических тегов_  
_Content: `<option>` elements_

```html
<input type="text" list="browsers" />
<datalist id="browsers">
  <option value="Firefox"> </option>
  <option value="Chrome"> </option>
  <option value="Internet Explorer"> </option>
  <option value="Opera"> </option>
  <option value="Safari"> </option>
</datalist>
```

---

`<form>`
**Placement: block**

- `action` - URL
- `autocomplete` - on | off
- `enctype` - application/x-www-form-urlencoded | multipart/form-data | text/plain
- `method` - get | post | etc.
- `name`
- `novalidate` - boolean atribut
- `target` - \_blank | \_parent | \_self | \_top

---

`<input>`  
**Placement: Inline**  
_Content: None. It is an empty element_

- `type` = button |  
  checkbox |  
  color |  
  date |  
  datetime |  
  datetime-local |  
  email |  
  file |  
  hidden |  
  image |  
  month |  
  number |  
  password |  
  radio |  
  range |  
  reset |  
  search |  
  submit |  
  tel |  
  text |  
  time |  
  url |  
  week;

- `accept` - file extensions

etc.

---

`<meter>` - лоадер, показывающий статус загрузки или ходв чего либо  
**Placement: inline**  
_Content: Inline and text, but no `<meter>` among its descendants_

- `value`
- `max`
- `min`

---

`<optgroup>` - группа `<options>` внутри `<select>`

```html
<select>
  <optgroup label="Sports cars">
    <option value="ferrari">Ferrari</option>
    <option value="lamborghini">Lamborghini</option>
  </optgroup>
  <optgroup label="Luxury cars">
    <option value="mercedes">Mercedes</option>
    <option value="bentley">Bentley</option>
  </optgroup>
</select>
```

---
