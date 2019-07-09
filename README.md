# Week View

> A simple mobile UI widget for picking a date within a period.

## Getting Started

### Installing

npm
```shell
npm install week-view
```

ES2015 module import
```js
import WeekView from 'week-view'
```
Load it via ~~a link tag and~~ a script tag
```html
<!-- css is included in js -->
<script src="/path/to/week-view.js"></script>
```

### Usage
```js
new WeekView(element[, options])
```
- **element**
  - Type: `CSS selector` or `HTMLElement`
  - The container for the widget, normally a div at the top of the page
- **options** (optional)
  - Type: `Object`
  - See [Options](#Options) below.


## Options

### num
- Type: `Number`
- Default: 7

Length of the period. Restricted in [1, 14].

### startDate
- Type: `Date`
- Default: `new Date()`

Initial start date of the period.

### minDate
- Type: `Date`
- Default: `new Date()`

Minimum date. **If given is later than `startDate`, it'll be set to `startDate`**.

### maxDate
- Type: `Date` or `null`
- Default: `null`

Maximum date. **If given is earlier than `minDate`, it'll be set to `null`**.

### onSelect
- Type: `function`
- Default: `date => {}`

Function to be called when a date is selected.

Param: `Date` - the date selected.

### onChangePeriod
- Type: `function`
- Default: `(oldStart, currentStart) => {}`

Function to be called when the period is changed.

Params: 
  - `oldStart` - the old period's start date
  - `currentStart` - current period's start date

### showHeader
- Type: `Boolean`
- Default: `true`

Whether to show the header, which contains header text and prev/next buttons.

### headerText
- Type: `function`
- Default: `date => date.toLocaleDateString()`

Header text.

Param: `Date` - the date selected.

### cellClass
- Type: `Object`
- Default: `{}`

A set of key-value pairs where key is your custom css class, and value is a function who receives a `Date` and returns `Boolean`. The class will be added to corresponding cell element when the function returns `true`.

e.g.
```js
{
    'week-end': date => return [6,0].includes(date.getDay())
}
```
will add 'week-end' on weekend cells.

### days
- Type: `Array`
- Default: `['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']`

Day texts from Sunday to Saturday.

## API

### setStart(start[, offset])
- **start**
  - Type: `Date`
- **offset** (optional)
  - Type: `Number`
- (return value)
  - Type: `this`

Set the period starting from `start`, set `offset`th date in the period selected.

### refresh()
- (return value)
  - Type: `this`

Re-render current period, e.g. new options set.

### setOptions(options)
- **options**
  - Type: `Object`
- (return value)
  - Type: `this`

Set new options for the instance, automatically refresh.

> `num`, `startDate`, `minDate`, `maxDate` are not supported.

### selectDate(date)
- **date**
  - Type: `Date`
- (return value)
  - Type: `this`

Try to set the given date selected.

### destroy()

Destroy the instance.

### dates
- Type: `Array`

Dates within the current period.

### selected
- Type: `Date`

Selected date.

## Browser Support
- Chrome latest
- Firefox latest
- QQ Browser latest

## License

[MIT](https://opensource.org/licenses/MIT).
