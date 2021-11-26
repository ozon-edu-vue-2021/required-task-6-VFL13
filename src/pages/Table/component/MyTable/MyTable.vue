<template>
  <div>
    <div class="header-actions">
      <div class="virtual-scroll">
        <h2>Enable Virtual Scroll</h2>
        <label class="switch">
          <input
            v-model="virtualScroll"
            @change="togglePagination"
            type="checkbox"
          />
          <span class="slider round"></span>
        </label>
      </div>
      <MyInput @input="search" placeholder="Search" />
    </div>
    <table class="table">
      <MyTableHeader
        :headers="headers"
        :ordering="options.order"
        :filters="options.filter"
        @update-ordering="updateOrdering"
        @add-filter="addFilter"
        @remove-filter="removeFilter"
      />
      <tbody ref="tbody">
        <tr class="firstRow" :style="{ height: `${firstRowHeight}px` }">
          <td colspan="100%"></td>
        </tr>
        <tr v-for="row in renderRows" :key="row.id">
          <td>
            <div>{{ row.id }}</div>
          </td>
          <td>
            <div>{{ row.postId }}</div>
          </td>
          <td>
            <div>{{ row.name }}</div>
          </td>
          <td>
            <div>{{ row.email }}</div>
          </td>
          <td>
            <div>{{ row.body }}</div>
          </td>
        </tr>
        <tr
          ref="lastRow"
          class="lastRow"
          :style="{ height: `${lastRowHeight}px` }"
        >
          <td colspan="100%"></td>
        </tr>
      </tbody>
    </table>
    <Paginator
      v-if="!virtualScroll"
      :paginator="paginator"
      @change-pagination="updatePagination"
    />
  </div>
</template>

<script>
import { isEqual } from "lodash/lang";
import _debounce from "lodash.debounce";

export default {
  name: "MyTable",
  components: {
    MyInput: () => import("../MyInput"),
    Paginator: () => import("../Paginator"),
    MyTableHeader: () => import("../MyTableHeader"),
  },
  props: {
    headers: {
      type: Array,
      default: () => {
        return [];
      },
    },
    rows: {
      type: Array,
      default: () => {
        return [];
      },
    },
    paginator: {
      type: Object,
      default: () => {
        return {};
      },
    },
    options: {
      type: Object,
      default: () => {
        return {
          order: {
            sortFiled: [],
            sortDirection: [],
          },
          search: "",
          filter: [],
        };
      },
    },
  },
  data() {
    return {
      virtualScroll: false,
      startIndex: 0,
      step: 10,
      elementHeight: 50,
      firstRowHeight: 0,
      lastRowHeight: 0,
      lastScrollPosition: window.scrollY,
    };
  },
  computed: {
    renderRows() {
      return this.rows.slice(this.startIndex, this.startIndex + this.step);
    },
    tableHeight() {
      return this.elementHeight * this.rows.length;
    },
  },
  created() {
    this.debouncedHandleScroll = _debounce(this.handleScroll, 100);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    togglePagination() {
      if (this.virtualScroll) {
        this.$emit(
          "update",
          { ...this.options },
          { ...this.paginator, pageSize: 500, currentPage: 1, totalPages: 1 }
        );
        this.startIndex = 0;
        this.firstRowHeight = 0;
        this.lastRowHeight = 0;
        this.lastScrollPosition = window.scrollY;
        this.initTable();
        window.addEventListener("scroll", this.handleScroll);
      } else {
        this.$emit(
          "update",
          { ...this.options },
          { ...this.paginator, pageSize: 10, currentPage: 1, totalPages: 1 }
        );
        this.$refs.lastRow.style.height = null;
        window.removeEventListener("scroll", this.handleScroll);
      }
    },
    initTable() {
      const tableTop = this.$refs.tbody.getBoundingClientRect().top;
      const viewPortY = document.documentElement.clientHeight;

      if (tableTop > 0) {
        this.step = Math.floor((viewPortY - tableTop) / this.elementHeight);
      } else {
        this.step = Math.floor(viewPortY / this.elementHeight);
        this.startIndex = Math.floor(-tableTop / this.elementHeight);
      }

      this.firstRowHeight = this.startIndex * this.elementHeight;
      this.lastRowHeight =
        this.rows.length * this.elementHeight - this.step * this.elementHeight;
    },
    handleScroll() {
      const top = this.$refs.tbody.getBoundingClientRect().top;
      const viewportY = document.documentElement.clientHeight;

      if (top < 0) {
        this.step = Math.floor(viewportY / this.elementHeight);
        this.startIndex = Math.floor(-top / this.elementHeight);
      } else {
        this.startIndex = 0;
        this.step = Math.floor((viewportY - top) / this.elementHeight);
      }

      this.$nextTick(() => {
        this.firstRowHeight = this.startIndex * this.elementHeight;
        this.lastRowHeight =
          this.rows.length * this.elementHeight -
          this.step * this.elementHeight -
          this.firstRowHeight;
      });
    },
    updateRows(options, paginator) {
      this.$emit("update", options, paginator);
    },
    updateOrdering(ordering) {
      this.updateRows(
        { ...this.options, order: ordering },
        { ...this.paginator, currentPage: 1 }
      );
    },
    updatePagination(pagination) {
      this.updateRows(this.options, pagination);
    },
    search(value) {
      this.updateRows(
        { ...this.options, search: value },
        { ...this.paginator, currentPage: 1 }
      );
    },
    addFilter(filter) {
      const filters = [...this.options.filter];
      filters.push(filter);
      this.updateRows(
        { ...this.options, filter: filters },
        { ...this.paginator, currentPage: 1 }
      );
    },
    removeFilter(filter) {
      const filters = [
        ...this.options.filter.filter(
          (filterObj) => !isEqual(filterObj, filter)
        ),
      ];
      this.updateRows(
        { ...this.options, filter: filters },
        { ...this.paginator, currentPage: 1 }
      );
    },
  },
};
</script>

<style scoped>
.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.virtual-scroll {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 15px;
}
.firstRow td,
.lastRow td {
  padding: 0;
}
</style>
