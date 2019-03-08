<template>
	<div class="search">
		<input
			type="text"
			placeholder="Wyszukaj ucznia, np. 'xd'"
			v-model="searchText"
			spellcheck="false"
			@input="inputChanged()"
		>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { mapActions } from 'vuex';

	interface ISearchData {
		searchText: string;
		// searchElement?: HTMLElement;
		searchStudents(searchText: string): string;
		showAllStudents(): void;
	}

	export default Vue.extend({
		name: 'Search',
		data() {
			return {
				searchText: '',
			} as ISearchData;
		},
		// mounted() {
		// 	this.searchElement = document.querySelector('.search');
		// },
		methods: {
			...mapActions(['searchStudents', 'showAllStudents']),
			inputChanged: function() {
				if (!!this.searchText == false) {
					// All should be visible
					this.showAllStudents();
				}
				this.searchStudents(this.searchText);
			},
		},
	});
</script>

<style scoped lang="scss">
	div.search {
		input[type='text'] {
			box-sizing: border-box;
			height: calc(2rem + 1.5vw);
			border-width: 0px;
			border-radius: 2rem;
			border-style: solid;
			font-size: 1.2rem;
			color: darken(darkgray, 50%);
			background-color: transparentize(gray, 0.8);
			padding: 1rem 2rem;
			width: calc(10rem + 20vw);

			&:focus {
				outline: none;
				box-shadow: 2px 2px 10px -5px rgba(0, 0, 0, 0.75);
				// border-color:
			}
		}
	}
</style>
