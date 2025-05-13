<script setup lang="ts">
export interface IFieldLabelProps {
	text: string;
	separator?: string;
}

const { separator = ":" } = defineProps<IFieldLabelProps>();
</script>

<template>
	<label class="uppercase font-semibold text-gray-800 text-sm">{{ text }}{{ separator }}</label>
</template>
