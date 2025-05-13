<script setup lang="ts">
import { computed } from "vue";

export interface IBaseButtonProps {
	text?: string;
	theme?: "normal" | "plain" | "table" | "close" | "danger";
	icon?: object | string;
}

const { text = undefined, theme = "normal", icon = undefined } = defineProps<IBaseButtonProps>();
const buttonClass = computed(() => {
	return {
		[`button-${theme}`]: true,
		"button-icon-only": !text,
	};
});
</script>

<template>
	<button
		class="base-button"
		:class="buttonClass"
	>
		<slot name="icon">
			<Component
				:is="icon"
				v-if="!!icon"
			/>
		</slot>
		<slot name="text">
			<span v-if="!!text">{{ text }}</span>
		</slot>
	</button>
</template>
