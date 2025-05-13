<script setup lang="ts">
import LinkGoogleMap from "@/components/LinkGoogleMap.vue";
import type { IBrewery } from "@/types/api.ts";

export interface ICellGoogleMapProps {
	record: IBrewery;
}

defineProps<ICellGoogleMapProps>();
</script>

<template>
	<LinkGoogleMap
		:latitude="record.latitude"
		:longitude="record.longitude"
	>
		<template #text>
			<span>{{ record.city }}, {{ record.state_province }}</span>
		</template>
		<template #afterLink>
			<span class="ml-2">({{ record.country }})</span>
		</template>
	</LinkGoogleMap>
</template>

<style scoped>

</style>
