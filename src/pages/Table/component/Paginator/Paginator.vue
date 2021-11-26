<template>
  <div class="paginator-container">
    <div class="paginator-control">
      Page {{ paginator.currentPage }} of {{ paginator.totalPages }} | Rows per
      page
      <select v-model="selected" @change="setPageSize">
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <div class="paginator-control">
      <i class="bx bx-arrow-to-left bx-sm" @click.stop="selectPage(1)"></i>
      <i
        class="bx bx-left-arrow-alt bx-sm"
        @click.stop="selectPage(paginator.currentPage - 1)"
      ></i>
      <button
        v-for="page in paginator.NextAndPrevious"
        :key="page"
        :class="page === paginator.currentPage ? 'active' : ''"
        :disabled="page === paginator.currentPage"
        class="button"
        @click.stop="selectPage(page)"
      >
        {{ page }}
      </button>
      <i
        class="bx bx-right-arrow-alt bx-sm"
        @click.stop="selectPage(paginator.currentPage + 1)"
      ></i>
      <i
        class="bx bx-arrow-to-right bx-sm"
        @click.stop="selectPage(paginator.totalPages)"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Paginator",
  props: {
    paginator: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      selected: 10,
      options: [5, 10, 15, 25, 50],
    };
  },
  methods: {
    selectPage(page) {
      if (page === 0) {
        page = 1;
      }
      if (page > this.paginator.totalPages) {
        page = this.paginator.totalPages;
      }
      if (page !== this.paginator.currentPage) {
        this.$emit("change-pagination", {
          ...this.paginator,
          currentPage: page,
        });
      }
    },
    setPageSize() {
      if (this.selected !== this.paginator.pageSize) {
        this.$emit("change-pagination", {
          ...this.paginator,
          pageSize: this.selected,
        });
      }
    },
  },
  watch: {
    "paginator.pageSize": {
      handler: function (val) {
        if (val) {
          this.selected = val;
        }
      },
    },
  },
};
</script>

<style scoped>
.paginator-container {
  display: flex;
  justify-content: flex-end;
  gap: 30px;
}
.paginator-control {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}
.button {
  background: #2c3e50;
  border-radius: 10px;
  border: none;
  color: white;
  padding: 4px 8px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 4px 2px;
  cursor: pointer;
}
.button:hover {
  background-color: #4da6ff;
}
.active {
  background-color: dodgerblue;
}
</style>
