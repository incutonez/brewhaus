<script setup lang="ts">
import { watch } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import { IconCancel, IconClose } from "@/components/Icons.ts";

export interface IBaseDialogProps {
	title?: string;
	bodyClass?: string;
	footerClass?: string;
	closable?: boolean;
}

const { closable = true, title = "", bodyClass = "", footerClass = "" } = defineProps<IBaseDialogProps>();
const open = defineModel<boolean>();
const emit = defineEmits(["close", "cancel", "open"]);

function onClickCancel() {
	open.value = false;
	emit("cancel");
}

watch(open, ($open) => {
	if ($open) {
		emit("open");
	}
	else {
		emit("close");
	}
});
</script>

<template>
	<Teleport to="body">
		<dialog
			class="z-1 flex shadow-md border rounded border-gray-300 flex-col absolute left-0 right-0 top-0 bottom-0 m-auto bg-white"
			:open="open"
		>
			<header class="flex items-center justify-between border-b border-slate-400 bg-slate-200 p-2">
				<slot name="title">
					<h1
						v-if="!!title"
						class="font-bold"
					>
						{{ title }}
					</h1>
				</slot>
				<BaseButton
					v-if="closable"
					theme="close"
					:icon="IconClose"
					@click="onClickCancel"
				/>
			</header>
			<section
				class="flex-1 overflow-auto p-2"
				:class="bodyClass"
			>
				<slot name="content" />
			</section>
			<footer
				class="flex space-x-2 justify-end border-t border-slate-400 p-2"
				:class="footerClass"
			>
				<slot name="footer" />
				<BaseButton
					v-if="closable"
					text="Cancel"
					theme="danger"
					:icon="IconCancel"
					@click="onClickCancel"
				/>
			</footer>
		</dialog>
	</Teleport>
</template>
