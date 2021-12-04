import { orderBy } from "lodash/collection";

const DEFAULT_PAGINATION = {
  pageSize: 10,
  currentPage: 1,
  totalPages: 1,
  NextAndPrevious: [1],
};

/*
 * Query - string for search
 */
const searchRow = (rows = [], query = "") => {
  return query
    ? [
        ...rows.filter((row) => {
          return (
            Object.values(row).findIndex((value) => {
              return value.toString().toLowerCase().indexOf(query) > -1;
            }) > -1
          );
        }),
      ]
    : rows;
};

const filterBoolean = (fieldToFilter, filterValue) => {
  return fieldToFilter === filterValue;
};

const filterNumber = (fieldToFilter, filterValue) => {
  return fieldToFilter === filterValue;
};

const filterText = (fieldToFilter, filterValue) => {
  return fieldToFilter.indexOf(filterValue) > -1;
};

const filterRange = (fieldToFilter, filterValue) => {
  if (isNaN(filterValue[0])) return fieldToFilter <= filterValue[1];
  if (isNaN(filterValue[1])) return filterValue[0] <= fieldToFilter;
  return filterValue[0] <= fieldToFilter && fieldToFilter <= filterValue[1];
};

const filterMethod = {
  boolean: filterBoolean,
  number: filterNumber,
  text: filterText,
  range: filterRange,
};

/*
 * Filters array of object  - {field: 'FIELD NAME', 'TYPE OF FILTER': 'str type',  value: 'value'}
 * field - name object filed
 * TYPE OF FILTER - 'boolean', 'text', 'range', 'number'
 * value - for 'boolean': true/false, for 'text': string,
 * for 'range': [start Number, end Number], for 'text': String
 */
const filterRow = (rows = [], filters = []) => {
  return filters.length
    ? [
        ...filters.reduce((rowsAcc, filterObj) => {
          rowsAcc = rowsAcc.filter((row) =>
            filterMethod[filterObj.type](row[filterObj.field], filterObj.value)
          );
          return rowsAcc;
        }, rows),
      ]
    : rows;
};

/*
 * orders object  - {sortFiled: [...arrayOfFiled], sortDirection: [...arrayOfDirection]
 */

const orderRow = (rows = [], orders) => {
  return orders.sortFiled.length
    ? [...orderBy(rows, [...orders.sortFiled], [...orders.sortDirection])]
    : rows;
};

/*
 * Paginator object  - { pageSize: 'items on page',
 *                       currentPage: CurrentPage,
 *                       totalPages: totalPage,
 *                       NextAndPrevious:  [...arrayOfNumberPage]
 *                      }
 */

const paginateRow = (rows = [], paginator) => {
  let { currentPage, pageSize } = paginator;
  return [...rows.slice((currentPage - 1) * pageSize, currentPage * pageSize)];
};

const optionsMethod = {
  search: searchRow,
  filter: filterRow,
  order: orderRow,
  pagination: paginateRow,
};

const shownPagesNumbers = (currentPage, totalPages) => {
  if (currentPage <= 3) {
    if (totalPages < 5) {
      return [...Array(totalPages).keys()].map((page) => {
        return page + 1;
      });
    }
    return [1, 2, 3, 4, 5];
  }
  if (currentPage >= totalPages - 2) {
    return [
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }
  return [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ];
};

/*
 * Options object  - { order,  search, filter}
 */

const getData = async (
  options = {},
  pagination = { ...DEFAULT_PAGINATION }
) => {
  // We make a request every time to emulate an api call!
  const res = await fetch(`https://jsonplaceholder.typicode.com/comments`);
  let rows = await res.json();
  for (const option in options) {
    rows = optionsMethod[option](rows, options[option]);
  }
  let { currentPage, pageSize } = pagination;
  pagination.totalPages = Math.ceil(rows.length / pageSize);
  if ((currentPage - 1) * pageSize > rows.length && currentPage !== 1) {
    pagination.currentPage = 1;
  }
  pagination.NextAndPrevious = shownPagesNumbers(
    pagination.currentPage,
    pagination.totalPages
  );
  rows = paginateRow(rows, pagination);
  return { rows, pagination, options };
};

export default getData;
