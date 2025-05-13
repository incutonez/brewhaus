<script setup lang="ts">
import { type InputHTMLAttributes, ref } from "vue";
import FieldLabel, { type IFieldLabelProps } from "@/components/FieldLabel.vue";
import type { IChangeEvent } from "@/types/components.ts";

defineOptions({
	inheritAttrs: false,
});

export interface IFieldTextProps extends /* @vue-ignore */ InputHTMLAttributes {
	label?: string;
	labelProps?: IFieldLabelProps;
	wrapperCls?: string;
	delay?: number;
}

const { delay = 250, label = "", labelProps = undefined, wrapperCls = "" } = defineProps<IFieldTextProps>();
const inputEl = ref<HTMLInputElement>();
const model = defineModel<string>();
const valid = defineModel<boolean>("valid");
const emit = defineEmits(["inputEnd"]);
let inputEndTimer: ReturnType<typeof setTimeout>;

function onUpdateModel(event: Event) {
	const { target } = event as IChangeEvent<HTMLInputElement>;
	valid.value = inputEl.value?.checkValidity() ?? true;
	clearTimeout(inputEndTimer);
	if (target.value) {
		inputEndTimer = setTimeout(() => emit("inputEnd", model.value), delay);
	}
	else {
		emit("inputEnd", "");
	}
}
</script>

<template>
	<article
		class="flex items-center"
		:class="wrapperCls"
	>
		<slot name="label">
			<FieldLabel
				v-if="!!label"
				:text="label"
				class="mr-2"
				v-bind="labelProps"
			/>
		</slot>
		<input
			ref="inputEl"
			v-model="model"
			v-bind="$attrs"
			class="appearance-none rounded-md h-8 py-1 px-2 text-sm outline-none ring-1 ring-inset ring-offset-0 ring-gray-500 enabled:focus:ring-sky-600 bg-white text-gray-800 disabled:bg-gray-200 disabled:opacity-100 placeholder:text-gray-500 invalid:!ring-red-500"
			@input="onUpdateModel"
		>
	</article>
</template>
