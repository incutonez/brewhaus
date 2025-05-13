<script setup lang="ts">
import { ref, watch } from "vue";
import BaseDialog from "@/components/BaseDialog.vue";
import BaseLink from "@/components/BaseLink.vue";
import FieldDisplay from "@/components/FieldDisplay.vue";
import LinkGoogleMap from "@/components/LinkGoogleMap.vue";
import { viewBreweries } from "@/router.ts";
import { getActiveBreweryRecord, loadBreweryRecord, setActiveBrewery } from "@/stores/breweries.ts";
import { useAppDispatch, useAppSelector } from "@/stores/main.ts";

export interface IViewBreweryProps {
	breweryId: string;
}

const { breweryId } = defineProps<IViewBreweryProps>();
const dispatch = useAppDispatch();
const viewRecord = useAppSelector(getActiveBreweryRecord);
const open = ref(true);

watch(() => breweryId, ($breweryId) => {
	if ($breweryId) {
		dispatch(loadBreweryRecord($breweryId));
	}
}, {
	immediate: true,
});

watch(open, ($open) => {
	if (!$open) {
		dispatch(setActiveBrewery());
		viewBreweries();
	}
});
</script>

<template>
	<BaseDialog
		v-if="viewRecord"
		v-model="open"
		:title="`Details: ${viewRecord.name}`"
		body-class="flex flex-col space-y-4"
	>
		<template
			v-if="viewRecord"
			#content
		>
			<section class="flex space-x-4">
				<FieldDisplay
					:value="viewRecord.name"
					label="Name"
				/>
				<FieldDisplay
					:value="viewRecord.brewery_type"
					label="Brewery Type"
				/>
				<FieldDisplay
					label="Phone"
					:value="viewRecord.phone"
				/>
			</section>
			<section class="flex space-x-4">
				<FieldDisplay label="Address">
					<span v-if="viewRecord.address_1">{{ viewRecord.address_1 }}</span>
					<span v-if="viewRecord.address_2">{{ viewRecord.address_2 }}</span>
					<span v-if="viewRecord.address_3">{{ viewRecord.address_3 }}</span>
					<span>{{ viewRecord.city }}, {{ viewRecord.state_province }} {{ viewRecord.postal_code }}</span>
					<span>{{ viewRecord.country }}</span>
				</FieldDisplay>
				<section class="flex flex-col space-y-4">
					<FieldDisplay
						v-if="viewRecord.website_url"
						label="Website"
					>
						<BaseLink :url="viewRecord.website_url" />
					</FieldDisplay>
					<FieldDisplay label="Location">
						<LinkGoogleMap
							:latitude="viewRecord.latitude"
							:longitude="viewRecord.longitude"
						>
							<template #text>
								<div class="flex flex-col">
									<span>Lat: {{ viewRecord.latitude }}</span>
									<span>Long: {{ viewRecord.longitude }}</span>
								</div>
							</template>
						</LinkGoogleMap>
					</FieldDisplay>
				</section>
			</section>
		</template>
	</BaseDialog>
</template>
