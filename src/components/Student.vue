<template>
	<div class="student">
		<div id="header">
			<div id="name">{{ student.imie }} {{ student.nazwisko }}</div>
			<div id="tools">
				<i class="fas fa-edit"></i>
				<i class="fas fa-trash-alt" @click="deleteStudent"></i>
			</div>
		</div>
		<div id="content">
			<div id="klasa">
				Klasa:
				<span class="info">{{student.klasa}}</span>
			</div>
			<div id="telefon">
				Telefon:
				<span class="info">{{student.telefon}}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { IStudent } from '@/interfaces';
	import { mapActions } from 'vuex';

	export default Vue.extend({
		name: 'Student',
		props: {
			student: {
				type: Object,
				required: true,
			},
		},
		methods: {
			...mapActions({ storeDeleteStudent: 'deleteStudent' }),
			deleteStudent() {
				console.log(`deleting student nr. ${this.student.id}`);
				(this as any).storeDeleteStudent(this.student.id);
			},
		},
	});
</script>

<style lang="scss">
	@import '@/scss/_mixins.scss';
	.student {
		overflow: hidden;
		/* width: 25%; */
		// height: 25%; // makes elements unnaturally shrink when height very small

		// flex-basis: 25%;
		max-width: calc(61.8% + 6.18rem); // golden ratio

		border-radius: 1rem;
		$student-bg-color: lighten($main-color, 2%);
		background-color: $student-bg-color;
		flex-grow: 1;
		margin-right: $students-left-padding;
		margin-bottom: $students-top-padding;
		@include nav-shadow;
		display: flex;
		flex-direction: column;
		transition: opacity 0.25s ease-in-out;

		&.invisible {
			opacity: 0;
			// display: none;
		}

		#content {
			box-sizing: border-box;
			padding: 1rem;
			font-weight: 300;

			.info {
				font-weight: 400;
			}
		}

		#header {
			display: flex;
			flex-direction: row;
			align-items: center;
			width: auto;
			padding: calc(0.5rem + 1vh) calc(0.5rem + 1vw);
			background-color: darken($student-bg-color, 2%);
			// background-color: lightblue;
			// border-bottom-right-radius: 0.5rem;
			// border-bottom-left-radius: 0.5rem;
			border-style: solid;
			border-width: 0px;
			border-bottom-width: 1px;
			border-color: transparentize(black, 0.9);

			// height: calc(1rem + 1vh);
			// height: 50rem;

			#name {
				text-align: center;
				line-height: 100%;
				height: 100%;
				font-weight: 500;
				word-break: break-word;
			}

			#tools {
				margin-left: auto;
				// background-color: darken($main-color, 2%);
				padding: 0.1rem;
				border-radius: 0.1rem;
				i {
					margin-left: 1vw;
					cursor: pointer;
					transition: all 0.25s ease-in-out;
					transition-property: color, transform;
					transform-origin: center center;

					&:hover {
						animation-name: wiggle;
						animation-duration: 1000ms;
						animation-iteration-count: 1;
						animation-timing-function: ease-out;
						&.fa-edit {
							color: lighten(blue, 20%);
						}
						&.fa-trash-alt {
							color: lighten(red, 20%);
						}
					}

					&:active {
						transition: font-size 100ms ease-in;
						font-size: 1.1rem;
					}
				}
			}
		}

		// &:nth-child(even) {
		// 	background-color: darken($main-color, 1%);
		// }
		// &:nth-child(odd) {
		// 	background-color: lighten($main-color, 1%);
		// }
	}
</style>
