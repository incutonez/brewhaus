<script setup lang="ts">
import { IconLoading } from "@/components/Icons.ts";
</script>

<template>
	<Teleport to="body">
		<div class="absolute inset-0 flex items-center justify-center loading-mask">
			<IconLoading class="animate-spin" />
		</div>
	</Teleport>
</template>
