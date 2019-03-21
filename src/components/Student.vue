<template>
	<div class="student" :class="{'edit-mode-active': editMode}">
		<div id="header">
			<div id="name">
				<contenteditable
					:noNL="true"
					@returned="saveEdit"
					id="imie"
					:contenteditable="editMode"
					@input="refreshCheckmarkStatus"
					autocomplete="off"
					autocorrect="off"
					autocapitalize="off"
					spellcheck="false"
					:title="editMode ? null : $t('student.first-name')"
					v-on="!editMode ? { click: uneditableInputClick } : {}"
					v-model="student.imie"
					tag="div"
				/>
				<contenteditable
					:noNL="true"
					@returned="saveEdit"
					id="nazwisko"
					:contenteditable="editMode"
					@input="refreshCheckmarkStatus"
					autocomplete="off"
					autocorrect="off"
					autocapitalize="off"
					spellcheck="false"
					:title="editMode ? null : $t('student.last-name')"
					v-on="!editMode ? { click: uneditableInputClick } : {}"
					v-model="student.nazwisko"
					tag="div"
				/>
			</div>
			<div id="tools">
				<div
					id="edit-mode-tools"
					:class="{'edit-mode-active': editMode, 'edit-mode-narrow': viewportBelow500, 'can-not-be-saved': !canBeSaved}"
				>
					<div id="student-name" v-if="viewportBelow500">
						<p v-html="student.imie"></p>&nbsp;
						<p v-html="student.nazwisko"></p>
					</div>
					<div id="controls">
						<i class="fas fa-times" id="edit-cancel" :title="$t('edit.cancel')" @click="cancelEdit"></i>
						<i
							class="fas fa-check"
							id="edit-save"
							:title="checkmarkStatus"
							@click="saveEdit"
							v-if="canBeSaved"
						></i>
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
				<contenteditable
					:noNL="true"
					@returned="saveEdit"
					class="info"
					id="klasa"
					:contenteditable="editMode"
					@input="refreshCheckmarkStatus"
					v-model="student.klasa"
					spellcheck="false"
					autocomplete="off"
					autocorrect="off"
					v-on="!editMode ? { click: uneditableInputClick } : {}"
					tag="div"
				/>
			</div>
			<div>
				{{$t('student.phone-number')}}:
				<contenteditable
					:noNL="true"
					@returned="saveEdit"
					class="info"
					id="telefon"
					:contenteditable="editMode"
					v-model="student.telefon"
					@input="refreshCheckmarkStatus"
					spellcheck="false"
					autocapitalize="off"
					autocorrect="off"
					v-on="!editMode ? { click: uneditableInputClick } : {}"
					tag="div"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts" src="./Student/script.ts"></script>
<style lang="scss" src="./Student/styles.scss"></style>
