<template>
	<div class="student" :class="{'edit-mode-active': editMode}">
		<div id="header">
			<div id="name">
				<div
					id="imie"
					:contenteditable="editMode"
					@blur="editAnyText"
					@input="refreshCheckmarkStatus"
					autocomplete="off"
					autocorrect="off"
					autocapitalize="off"
					spellcheck="false"
					:title="editMode ? null : $t('student.first-name')"
					v-on="!editMode ? { click: uneditableInputClick } : {}"
					v-html="student.imie"
				></div>
				<div
					id="nazwisko"
					:contenteditable="editMode"
					@blur="editAnyText"
					@input="refreshCheckmarkStatus"
					autocomplete="off"
					autocorrect="off"
					autocapitalize="off"
					spellcheck="false"
					:title="editMode ? null : $t('student.last-name')"
					v-on="!editMode ? { click: uneditableInputClick } : {}"
					v-html="student.nazwisko"
				></div>
			</div>
			<div id="tools">
				<div
					id="edit-mode-tools"
					:class="{'edit-mode-active': editMode, 'edit-mode-narrow': viewportBelow500}"
				>
					<p id="student-name" v-if="viewportBelow500">{{student.imie}} {{student.nazwisko}}</p>
					<div id="controls">
						<i class="fas fa-times" id="edit-cancel" :title="$t('edit.cancel')" @click="cancelEdit"></i>
						<i class="fas fa-check" id="edit-save" :title="checkmarkStatus" @click="saveEdit"></i>
					</div>
				</div>
				<i
					class="fas fa-edit"
					@click="toggleEditMode"
					:class="{'edit-mode-active': editMode, 'remind-to-click': remindToClickActive }"
					:title="$t('edit.edit')"
				></i>
				<i class="fas fa-trash-alt" @click="deleteStudent" :title="$t('delete.delete')"></i>
			</div>
		</div>
		<div id="content">
			<div>
				{{$t('student.class')}}:
				<div
					class="info"
					id="klasa"
					:contenteditable="editMode"
					@blur="editAnyText"
					@input="refreshCheckmarkStatus"
					v-html="student.klasa"
					spellcheck="false"
					autocomplete="off"
					autocorrect="off"
					v-on="!editMode ? { click: uneditableInputClick } : {}"
				></div>
			</div>
			<div>
				{{$t('student.phone-number')}}:
				<div
					class="info"
					id="telefon"
					:contenteditable="editMode"
					v-html="student.telefon"
					@blur="editAnyText"
					@input="refreshCheckmarkStatus"
					spellcheck="false"
					autocapitalize="off"
					autocorrect="off"
					v-on="!editMode ? { click: uneditableInputClick } : {}"
				></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" src="./Student/script.ts"></script>
<style lang="scss" src="./Student/styles.scss"></style>
