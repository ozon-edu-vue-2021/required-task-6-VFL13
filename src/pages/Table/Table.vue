<template>
  <div class="table-container">
    <h1>Table</h1>
    <div class="table-wrapper">
      <MyTable
        :rows="rows"
        :paginator="paginator"
        :headers="headers"
        :options="options"
        @update="loadData"
      />
    </div>
  </div>
</template>

<script>
import getData from "../../plugins/api";
import MyTable from "./component/MyTable/MyTable";

export default {
  name: "Table",
  components: { MyTable },
  data() {
    return {
      rows: [],
      paginator: {},
      headers: [
        {
          name: "ID",
          value: "id",
          width: "120px",
          filterType: "number",
        },
        {
          name: "Post ID",
          value: "postId",
          width: "120px",
          filterType: "number",
        },
        {
          name: "Title",
          value: "name",
          width: "200px",
          filterType: "text",
        },
        {
          name: "Email",
          value: "email",
          width: "100px",
          filterType: "text",
        },
        {
          name: "Comment",
          value: "body",
          width: "300px",
          filterType: "text",
        },
      ],
      options: {
        order: {
          sortFiled: [],
          sortDirection: [],
        },
        search: "",
        filter: [],
      },
      loading: false,
    };
  },
  created() {
    this.loadData(this.options);
  },
  methods: {
    async loadData(sendOptions, sendPagination) {
      const { rows, pagination, options } = await getData(
        sendOptions,
        sendPagination
      );
      this.rows = rows;
      this.paginator = pagination;
      this.options = options;
    },
  },
};
</script>

<style>
.table-container {
  width: 100%;
}
h1 {
  text-align: center;
  margin: 10px;
}
.table-wrapper {
  padding: 0 50px;
}
.table {
  width: 100%;
  border: none;
  margin-bottom: 20px;
}
.table thead th {
  font-weight: bold;
  text-align: left;
  border: none;
  padding: 10px 5px 10px 15px;
  background: #d8d8d8;
  font-size: 14px;
}
.table thead tr th:first-child {
  border-radius: 8px 0 0 8px;
}
.table thead tr th:last-child {
  border-radius: 0 8px 8px 0;
}
.table tbody td {
  text-align: left;
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  vertical-align: top;
}
.table tbody td div {
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
}
.table tbody tr:nth-child(even) {
  background: #f3f3f3;
}
.table tbody tr td:first-child {
  border-radius: 8px 0 0 8px;
}
.table tbody tr td:last-child {
  border-radius: 0 8px 8px 0;
}
.icon-color {
  color: var(--main-grat-color);
}
.icon-color:hover {
  color: cadetblue;
}
.icon-active {
  color: royalblue;
}
.icon-active:hover {
  color: cadetblue;
}
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 17px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(13px);
  -ms-transform: translateX(13px);
  transform: translateX(13px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 30px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
