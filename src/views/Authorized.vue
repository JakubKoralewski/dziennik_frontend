<template>
	<div id="authorized">
		<NewStudent
			v-show="showNewStudentDialog"
			@newStudentAdded="showNewStudentDialog=false"
			id="new-student"
		/>
		<AddButton
			@addButtonClick="addButtonClick()"
			:class="{'blur-visible': showNewStudentDialog}"
			id="add-button"
		/>
		<div
			:class="{'visible': coverVisible, 'actually-hidden': coverActuallyHidden}"
			id="cover"
			@click="coverClick()"
		/>
		<SideBar id="nav-bar" @sideBarToggle="sideBarToggle" ref="sideBar" />
		<div class="blur-container" :class="{'blur-visible': coverVisible}">
			<div id="content">
				<NavTitle id="nav-title"/>

				<div id="students" v-if="students">
					<Student
						v-for="student of students"
						:key="student.id"
						:class="{'invisible': !student.visible}"
						:initial-student="student"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" src="./Authorized/script.ts"></script>
<style lang="scss" src="./Authorized/styles.scss" scoped></style>

