<script setup lang="ts">
import FieldLabel from "@/components/FieldLabel.vue";

export interface IFieldDisplayProps {
	label?: string;
	value?: string;
}

const { value = "-", label = "" } = defineProps<IFieldDisplayProps>();
</script>

<template>
	<article class="flex flex-col space-y-1">
		<FieldLabel
			v-if="!!label"
			:text="label"
		/>
		<slot>
			<span>{{ value }}</span>
		</slot>
	</article>
</template>
