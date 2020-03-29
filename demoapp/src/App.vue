<template>
    <v-app>
        <v-content>
            <v-autocomplete v-model="model"
                            :items="items"
                            :loading="isLoading"
                            :search-input.sync="search"
                            color="white"
                            hide-no-data
                            hide-selected
                            item-text="Description"
                            item-value="API"
                            label="Select user"
                            placeholder="Start typing to Search"
                            prepend-icon="mdi-database-search"
                            return-object></v-autocomplete>
        </v-content>
    </v-app>
</template>

<script>

    export default {
        name: 'App',

        components: {
        },

        data: () => ({
            descriptionLimit: 60,
            isLoading: false,
            search: null,
            model: null,
            entries: [],
        }),
        computed: {
            items() {
                return this.entries.map(entry => {
                    return entry.first_name + ' ' + entry.last_name;
                })
            },
        },

        watch: {
            search(val) {
                if (this.items.length > 0) return
                if (this.isLoading) return
                this.isLoading = true
                fetch('http://localhost:82/')
                    .then(res => res.json())
                    .then(res => {
                        this.entries = res;
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    .finally(() => (this.isLoading = false))
            },
        },
    };
</script>
