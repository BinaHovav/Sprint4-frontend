<template>
    <section class="user-details" v-if="loggedInUser">
        <header>
            <h2>Account</h2>
            <div class="user-info">
                <div class="user-img">
                    <img :src="loggedInUser.imgUrl" alt="user">
                </div>
                <div class="details">
                    <div class="user-name">
                        {{ loggedInUser.fullname }}
                    </div>
                    <div class="username">
                        score: {{ loggedInUser.score }}
                    </div>
                </div>
            </div>
            <ul>
                <li>Switch accounts</li>
                <li>Manage account</li>
                <hr>
            </ul>
        </header>
        <h2>Mellow</h2>

        <ul>
            <li>Profile and visibility</li>
            <li>Activity</li>
            <li>Cards</li>
            <li>Settings</li>
            <hr>
        </ul>
        <ul>
            <li>Help</li>
            <li>Shortcuts</li>
            <hr>
        </ul>
        <ul>
            <li @click="onLogout">Log out</li>
        </ul>
    </section>
    <section class="user-details" v-else>
        <h2 style="cursor: pointer;" @click="this.$router.push('/login')">Sign up</h2>
        <h2>Already have and account? <span style="color: rgb(88, 4, 133); cursor: pointer;" @click="this.$router.push('/login')">Log in</span></h2>
    </section>
</template>
<script>
//   import { eventBus } from '../services/event-bus.service'

export default {
    name: 'AppHeader',
    data() {
        return {
        }
    },
    created() {
    },


    watch: {
    },

    methods: {
        async onLogout() {
            try {
                await this.$store.dispatch({ type: 'logout' })
                this.$router.push('/')
                this.$emit('toggleUserDetails')
            } catch {
                console.log('could not logout');
            }
        }
    },
    computed: {
        loggedInUser() {
            return this.$store.getters.loggedinUser
        },
        board() {
            return this.$store.getters.getCurrBoard
        },

    },
    components: {},
}
</script>
  