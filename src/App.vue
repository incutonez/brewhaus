<script setup lang="ts">
import { watch } from "vue";
import { useIsFetching } from "@tanstack/vue-query";
import { setStoreStatus } from "@/stores/breweries.ts";
import { useAppDispatch } from "@/stores/main.ts";

const dispatch = useAppDispatch();
const isFetching = useIsFetching();

watch(isFetching, ($isFetching) => dispatch(setStoreStatus($isFetching)));
</script>

<template>
	<main class="size-full">
		<RouterView />
	</main>
</template>
