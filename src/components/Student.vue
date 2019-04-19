<template>
	<div class="student" :class="{'edit-mode-active': editMode}">
		<div id="header">
			<div id="name">
				<contenteditable
					:noNL="true"
					@returned="saveEdit"
					id="first-name"
					:contenteditable="editMode"
					@input="refreshCheckmarkStatus"
					autocomplete="off"
					autocorrect="off"
					autocapitalize="off"
					spellcheck="false"
					:title="editMode ? null : $t('student.first-name')"
					:aria-label="$t('student.first-name')"
					v-on="!editMode ? { click: uneditableInputClick } : {}"
					v-model="student.first_name"
					tag="div"
				/>
				<contenteditable
					:noNL="true"
					@returned="saveEdit"
					id="last-name"
					:contenteditable="editMode"
					@input="refreshCheckmarkStatus"
					autocomplete="off"
					autocorrect="off"
					autocapitalize="off"
					spellcheck="false"
					:title="editMode ? null : $t('student.last-name')"
					:aria-label="$t('student.last-name')"
					v-on="!editMode ? { click: uneditableInputClick } : {}"
					v-model="student.last_name"
					tag="div"
				/>
			</div>
			<div id="tools">
				<div
					id="edit-mode-tools"
					:class="{'edit-mode-active': editMode, 'edit-mode-narrow': viewportBelow500, 'can-not-be-saved': !canBeSaved}"
				>
					<div id="student-name" v-if="viewportBelow500">
						<p v-html="student.first_name"></p>&nbsp;
						<p v-html="student.last_name"></p>
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
					:aria-label="$t('edit.edit')"
				></i>
				<i
					class="fas fa-trash-alt"
					@click="deleteStudent"
					:title="$t('student.delete')"
					:aria-label="$t('student.delete')"
				></i>
			</div>
		</div>
		<div id="content">
			<div>
				{{$t('student.class')}}:
				<contenteditable
					:noNL="true"
					@returned="saveEdit"
					class="info"
					id="class"
					:contenteditable="editMode"
					:aria-label="$t('student.class')"
					@input="refreshCheckmarkStatus"
					v-model="student.class"
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
					id="phone-number"
					:contenteditable="editMode"
					:aria-label="$t('student.phone-number')"
					v-model="student.phone_number"
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
