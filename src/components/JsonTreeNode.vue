<template>
  <div class="json-tree-node" :class="{ 'has-guide': level > 0 }" :style="{ paddingLeft: 1 * 10 + 'px' }">
    <div class="node-header" @click="toggleExpanded">
      <i 
        v-if="hasChildren" 
        :class="['toggle-icon', expanded ? 'bx-chevron-down' : 'bx-chevron-right']"
      ></i>
      <span v-else class="spacer"></span>
      
      <span class="node-name" :class="{ 'root-name': name === 'root' }">
        {{ name === 'root' ? '' : `"${name}":` }}
      </span>
      
      <span v-if="!hasChildren" class="node-value" :class="getValueClass()">
        {{ formatValue(data) }}
      </span>
      
      <span v-else-if="!expanded" class="node-preview">
        {{ getPreview() }}
      </span>
    </div>
    
    <div v-if="hasChildren && expanded" class="node-children">
      <template v-if="Array.isArray(data)">
        <JsonTreeNode
          v-for="(item, index) in data"
          :key="index"
          :data="item"
          :name="index.toString()"
          :level="level + 1"
        />
      </template>
      <template v-else>
        <JsonTreeNode
          v-for="(value, key) in data"
          :key="key"
          :data="value"
          :name="key"
          :level="level + 1"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  data: {
    type: [Object, Array, String, Number, Boolean, null],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    default: 0
  }
})

const expanded = ref(true)

const hasChildren = computed(() => {
  return typeof props.data === 'object' && props.data !== null
})

const toggleExpanded = () => {
  if (hasChildren.value) {
    expanded.value = !expanded.value
  }
}

const formatValue = (value) => {
  if (value === null) return 'null'
  if (typeof value === 'string') return `"${value}"`
  if (typeof value === 'boolean') return value.toString()
  if (typeof value === 'number') return value.toString()
  return ''
}

const getValueClass = () => {
  const value = props.data
  if (value === null) return 'value-null'
  if (typeof value === 'string') return 'value-string'
  if (typeof value === 'number') return 'value-number'
  if (typeof value === 'boolean') return 'value-boolean'
  return ''
}

const getPreview = () => {
  const data = props.data
  if (Array.isArray(data)) {
    return `[${data.length} items]`
  } else {
    const keys = Object.keys(data)
    return `{${keys.length} properties}`
  }
}
</script>

<style scoped>
.json-tree-node {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
  line-height: 15px;
  position: relative;
}

.json-tree-node.has-guide::before {
  content: '---';
  position: absolute;
  left: -25px;
  top: 0;
  color: #ccc;
  font-size: 12px;
  line-height: 18px;
}

.node-header {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0;
  height: 18px;  
  margin-left: -23px;
  transition: background-color 0.2s;
}

.node-header:hover {
  background-color: rgba(64, 158, 255, 0.1);
  border-radius: 4px;
}

.toggle-icon {
  font-size: 16px;
  color: #409eff;
  margin-right: 4px;
  transition: transform 0.2s;
  font-family: 'boxicons';
  font-style: normal;
}

.spacer {
  width: 1px;
  margin-right: 4px;
}

.node-name {
  color: #2c3e50;
  font-weight: 500;
  margin-right: 8px;
}

.root-name {
  font-weight: 600;
  color: #409eff;
}

.node-value {
  color: #333;
}

.value-string {
  color: #28a745;
}

.value-number {
  color: #007bff;
}

.value-boolean {
  color: #fd7e14;
}

.value-null {
  color: #6c757d;
  font-style: italic;
}

.node-preview {
  color: #6c757d;
  font-style: italic;
}

.node-children {
  margin-left: 10px;
  position: relative;
}

.node-children::before {
  content: '';
  position: absolute;
  left: -25px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: repeating-linear-gradient(
    to bottom,
    #ccc 0px,
    #ccc 2px,
    transparent 2px,
    transparent 4px
  );
}

@media (max-width: 768px) {
  .json-tree-node {
    font-size: 11px;
  }
  
  .toggle-icon {
    font-size: 12px;
  }
}
</style> 