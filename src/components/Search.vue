<template>
	<div class="search">
		<input
			type="text"
			:placeholder="$t('search.placeholder')"
			:class="{'wrapped': isSearchWrapped}"
			:value="searchText"
			@input="setSearchText($event.target.value)"
			spellcheck="false"
		>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Watch } from 'vue-property-decorator';
	import { mapActions, mapState, mapMutations } from 'vuex';

	@Component({
		name: 'Search',
		computed: mapState(['searchText', 'isSearchWrapped']),
		methods: {
			...mapActions(['searchStudents', 'showAllStudents']),
			...mapMutations(['setSearchText']),
		},
	})
	export default class Search extends Vue {
		/* State */
		searchText: string;
		/** Checks whether flex-item Search.vue component is wrapped.
		 *  Is used for centering the placeholder text.
		 *  If its row it should be center, if column should be flex-start.
		 */
		isSearchWrapped: boolean;

		/* Actions */
		searchStudents: (searchText: string) => void;
		showAllStudents: () => void;

		@Watch('searchText')
		onSearchTextChange(searchText: string) {
			if (!searchText) {
				// All should be visible
				this.showAllStudents();
			} else {
				this.searchStudents(searchText);
			}
		}

		mounted() {
			this.onSearchTextChange(this.searchText);
		}
	}
</script>

<style scoped lang="scss">
	div.search {
		input[type='text'] {
			box-sizing: border-box;
			height: calc(2rem + 1.5vw);
			border-width: 0px;
			border-radius: 2rem;
			border-style: solid;
			font-size: calc(0.5rem + 1vw);

			color: darken(darkgray, 50%);
			background-color: transparentize(gray, 0.8);
			padding: 1rem 2rem;
			width: calc(10rem + 20vw);
			text-align: start;
			&.wrapped {
				text-align: center;
			}

			&:focus {
				outline: none;
				box-shadow: 2px 2px 10px -5px rgba(0, 0, 0, 0.75);
				// border-color:
			}
		}
	}
</style>
