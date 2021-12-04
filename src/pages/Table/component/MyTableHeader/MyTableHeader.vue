<template>
  <thead>
    <tr>
      <th
        v-for="header in headers"
        :key="header.value"
        :style="header.width ? `width: ${header.width}` : ''"
      >
        <div class="header">
          <div>{{ header.name }}</div>

          <div class="icons-group">
            <div
              class="icon-badge-container"
              v-if="!ordering.sortFiled.includes(header.value)"
            >
              <i
                class="bx bxs-sort-alt bx-sm bx-tada-hover icon-color"
                @click.stop="toggleSort(header.value)"
              >
              </i>
            </div>
            <div class="icon-badge-container" v-else>
              <i
                class="bx bx-sm bx-tada-hover icon-active"
                :class="getSortIconName(header.value)"
                @click.stop="toggleSort(header.value)"
              >
              </i>
              <div class="icon-badge">
                {{ ordering.sortFiled.indexOf(header.value) + 1 }}
              </div>
            </div>

            <div class="icon-badge-container">
              <MyFilter
                :field="header.value"
                :filter-type="header.filterType"
                :filters="
                  filters.filter(
                    (filterObj) => filterObj.field === header.value
                  )
                "
                @add-filter="addFilter"
                @remove-filter="removeFilter"
              />
            </div>
          </div>
        </div>
      </th>
    </tr>
  </thead>
</template>

<script>
export default {
  name: "MyTableHeader",
  components: {
    MyFilter: () => import("../MyFilter"),
  },
  props: {
    headers: {
      type: Array,
      default: () => {
        return [];
      },
    },
    ordering: {
      type: Object,
      default: () => {
        return {};
      },
    },
    filters: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    getSortIconName(header) {
      return this.ordering.sortDirection[
        this.ordering.sortFiled.indexOf(header)
      ] === "asc"
        ? "bx-sort-down"
        : "bx-sort-up";
    },
    getFilterIconClass() {
      return "bx-filter-alt icon-color";
      // "bxs-filter-alt icon-active"
    },
    toggleSort(header) {
      const { sortFiled, sortDirection } = this.ordering;
      if (sortFiled.includes(header)) {
        const index = sortFiled.indexOf(header);
        if (sortDirection[index] === "desc") {
          sortFiled.splice(index, 1);
          sortDirection.splice(index, 1);
        } else {
          sortDirection[index] = "desc";
        }
      } else {
        sortFiled.push(header);
        sortDirection.push("asc");
      }
      this.$emit("update-ordering", {
        sortFiled: [...sortFiled],
        sortDirection: [...sortDirection],
      });
    },
    addFilter(filter) {
      this.$emit("add-filter", filter);
    },
    removeFilter(filter) {
      this.$emit("remove-filter", filter);
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}
.icons-group {
  display: flex;
  /*gap: 3px;*/
  justify-content: flex-end;
  align-items: center;
}

.icon-badge-container {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.icon-badge-container {
  position: relative;
}

.icon-badge-icon {
  font-size: 30px;
  position: relative;
}

.icon-badge {
  background-color: crimson;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  color: white;
  text-align: center;
  width: 16px;
  height: 16px;
  border-radius: 45%;
  position: absolute;
  top: -5px;
  left: 18px;
}
</style>
