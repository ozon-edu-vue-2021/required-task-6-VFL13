<template>
  <DropDown>
    <template #drop-dow-toggle>
      <i class="bx bx-sm bx-tada-hover" :class="filterIconClass"></i>
    </template>
    <template #drop-dow-content>
      <div class="filter active">
        <h3>Column filter</h3>
        <div v-if="showRangeSwitch" class="filter-container">
          <h3>Use range</h3>
          <label class="switch">
            <input v-model="range" type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
        <div class="filter-container">
          <MyInput
            v-model="value"
            :placeholder="range ? 'from' : 'value'"
            :input-type="inputType"
            :use-debounce="false"
          />
          <MyInput
            v-if="range"
            v-model="toValue"
            placeholder="to"
            input-type="number"
            :use-debounce="false"
          />
          <button class="icon-btn" @click.stop="addFilter">
            <i class="bx bx-sm bx-message-square-add icon-add"></i>
          </button>
        </div>
        <h3 v-if="filters.length">Filtered By</h3>
        <div
          class="filter-container"
          v-for="filter in filters"
          :key="filter.value.toString() + filter.type"
        >
          <h3>{{ getFilterString(filter) }}</h3>
          <button class="icon-btn" @click.stop="removeFilter(filter)">
            <i class="bx bx-sm bx-message-square-minus icon-remove"></i>
          </button>
        </div>
      </div>
    </template>
  </DropDown>
</template>

<script>
export default {
  name: "MyFilter",
  props: {
    filterType: {
      type: String,
      validator: function (value) {
        return ["text", "number", "range"].indexOf(value) !== -1;
      },
      default: "text",
    },
    filters: {
      type: Array,
      default() {
        return [];
      },
    },
    field: {
      type: String,
      required: true,
    },
  },
  components: {
    MyInput: () => import("../MyInput/MyInput"),
    DropDown: () => import("../DropDown"),
  },
  data() {
    return {
      opened: false,
      range: false,
      value: null,
      toValue: null,
    };
  },
  created() {
    if (this.filterType === "range") {
      this.range = true;
    }
  },
  computed: {
    filterIconClass() {
      return this.filters.length
        ? "bx-filter-alt icon-active"
        : "bx-filter-alt icon-color";
    },
    showRangeSwitch() {
      return this.filterType === "number";
    },
    inputType() {
      return this.filterType === "text" ? "text" : "number";
    },
  },
  methods: {
    setOpened() {
      this.opened = !this.opened;
    },
    toggleRangeInput() {
      this.range = !this.range;
    },
    removeFilter(filter) {
      this.$emit("remove-filter", filter);
    },
    addFilter() {
      const filterObj = {
        type:
          this.filterType === "text" ? "text" : this.range ? "range" : "number",
        field: this.field,
        value: this.range
          ? [parseInt(this.value), parseInt(this.toValue)]
          : this.filterType === "text"
          ? this.value
          : parseInt(this.value),
      };
      this.$emit("add-filter", filterObj);
    },
    getFilterString(filter) {
      if (filter.type === "range") {
        if (isNaN(filter.value[0])) return `TO ${filter.value[1]}`;
        if (isNaN(filter.value[1])) return `FROM ${filter.value[0]}`;
        return `FROM ${filter.value[0]} TO ${filter.value[1]}`;
      }
      return filter.value;
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 0;
  padding: 0;
  text-align: center;
}
.icon-btn {
  border: 0;
  background: transparent;
}
.icon-add {
  color: mediumseagreen;
}
.icon-remove {
  color: salmon;
}
.filter-container {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px;
}
.filter {
  position: absolute;
  right: 10px;
  min-width: 200px;
  min-height: 30px;
  background: #f3f3f3;
  border: 2px solid gray;
  border-radius: 10px;
  display: none;
  transition: all 0.5s;
  z-index: 2;
}
.active {
  display: block;
  margin-left: 7px;
  margin-right: 7px;
  overflow-x: hidden;
  overflow-y: auto;
  margin-bottom: 7px;
}
</style>
