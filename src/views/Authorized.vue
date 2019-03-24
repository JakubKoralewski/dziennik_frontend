<template>
	<div id="authorized">
		<NewStudent 
		v-show="showNewStudentDialog"
		@newStudentAdded="showNewStudentDialog=false" 
		:aria-disabled="!showNewStudentDialog" 
		:aria-hidden="!showNewStudentDialog"
		/>
		<AddButton
			@addButtonClick="addButtonClick()"
			:class="{'blur-visible': showNewStudentDialog, 'sidebar-visible': sideBarVisible}"
		/>
		<div
			:class="{
				'visible': showNewStudentDialog || sideBarVisible,
				'actually-hidden': !(showNewStudentDialog || sideBarVisible)
				}"
			id="cover"
			@click="coverClick()"
		/>
		<SideBar @sideBarToggle="sideBarToggle" ref="sideBarComponent" @localeChange="localeChange" />
		<div class="blur-container" :class="{'blur-visible': showNewStudentDialog || sideBarVisible}">
			<div id="content">
				<NavTitle/>

				<div id="students" v-if="students">
					<Student
						v-for="student of students"
						:key="student.id"
						:class="{'invisible': !student.visible, 'narrow-viewport': viewportBelow500}"
						:initial-student="student"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" src="./Authorized/script.ts" />
<style lang="scss" src="./Authorized/styles.scss" scoped />

