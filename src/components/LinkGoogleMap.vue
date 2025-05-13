<script setup lang="ts">
// http://maps.google.com/maps?q=loc:38.9419+-78.3020
import { computed } from "vue";
import BaseLink from "@/components/BaseLink.vue";

export interface ICellGoogleMapProps {
	text?: string;
	latitude?: string | number;
	longitude?: string | number;
}

const { text = "", latitude = undefined, longitude = undefined } = defineProps<ICellGoogleMapProps>();

const url = computed(() => {
	if (latitude && longitude) {
		return `https://maps.google.com/maps?q=loc:${latitude}+${longitude}`;
	}
	return undefined;
});
</script>

<template>
	<span>
		<BaseLink :url="url">
			<slot name="text">{{ text }}</slot>
		</BaseLink>
		<slot name="afterLink" />
	</span>
</template>
