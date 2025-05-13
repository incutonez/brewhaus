<script setup lang="ts">
export interface ICellGoogleMapProps {
	url?: string;
	text?: string;
}

defineProps<ICellGoogleMapProps>();
</script>

<template>
	<a
		v-if="!!url"
		class="underline text-blue-700"
		target="_blank"
		:href="url"
	>
		<slot>
			{{ text ?? url }}
		</slot>
	</a>
	<slot v-else>
		{{ text ?? url }}
	</slot>
</template>
