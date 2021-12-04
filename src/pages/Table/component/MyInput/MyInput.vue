<template>
  <div class="input-container">
    <div :class="inputClasses">
      <input
        class="my-input"
        :type="inputType"
        :value="value"
        @focus="focusHandler"
        @blur="blurHandler"
        @input="inputHandler"
      />
      <div v-show="showPlaceholder" :class="placeholderClasses">
        <div class="placeholder-text">{{ placeholder }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import _debounce from "lodash.debounce";

export default {
  name: "MyInput",
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    inputType: {
      type: String,
      default: "text",
    },
    useDebounce: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      value: "",
      focused: false,
    };
  },
  created() {
    if (this.useDebounce) {
      this.debouncedEmit = _debounce(this.sentValue, 1000);
    }
  },
  computed: {
    isActive() {
      return this.focused || !!this.value;
    },
    inputClasses() {
      return [
        "input-wrapper",
        {
          "input-wrapper_focused": this.focused || this.value,
        },
      ];
    },
    showPlaceholder() {
      return true;
    },
    placeholderClasses() {
      return [
        "input-placeholder",
        {
          "input-placeholder_lifted": this.isActive,
        },
      ];
    },
  },
  methods: {
    inputHandler(event) {
      this.value = event.target.value;
      if (this.useDebounce) {
        this.debouncedEmit(this.value);
      } else {
        this.sentValue(this.value);
      }
    },
    focusHandler() {
      this.focused = true;
    },
    blurHandler() {
      this.focused = false;
    },
    sentValue(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style scoped>
.input-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.input-wrapper {
  position: relative;
  display: inline-flex;
  border-radius: 10px;
  border: 2px solid dimgray;
  text-overflow: ellipsis;
  overflow: hidden;
}
.input-wrapper_focused {
  border: 2px solid dodgerblue;
  overflow: unset;
}
.my-input {
  width: 100%;
  height: 30px;
  padding: 6px 16px 6px 6px;
  box-sizing: border-box;
  border: 0;
  outline: 0;
  background-color: transparent;
}
.input-placeholder {
  position: absolute;
  display: flex;
  padding: 6px 20px 6px 6px;
  width: 100%;
  color: #8d95a5;
  white-space: nowrap;
  text-overflow: ellipsis;
  pointer-events: none;
  transform-origin: left top;
  transition: 300ms;
  box-sizing: border-box;
}
.placeholder-text {
  text-overflow: ellipsis;
  overflow: hidden;
}
.input-placeholder_lifted {
  transform: translateY(-20px) scale(0.75);
}
</style>
