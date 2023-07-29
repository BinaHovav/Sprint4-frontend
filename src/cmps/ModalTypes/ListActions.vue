<template>
    <div class="pop-over">
        <header>
            <span class="header-title fs14">List actions</span>
            <div>
                <span class="btn-close"></span>
            </div>
        </header>
        <main>
            <div>
                <ul>
                    <li>Add card...</li>
                    <li>Copy list...</li>
                    <li>Move list...</li>
                    <li>Watch</li>
                </ul>
                <hr>
                <ul>
                    <li>Sort by...</li>
                </ul>
                <hr>
                <ul>
                    <li click="">Archive this list</li>
                </ul>
            </div>
        </main>
    </div>
</template>
<script>
export default {
    name: 'ListAction',
    data() {
        return {
        }
    },
    methods: {

    },
    computed: {

    },
}
</script>
  