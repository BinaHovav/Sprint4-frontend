<template>
    <div @click.stop="" class="date-picker-container">
        <div class="date-picker">
            <VDatePicker v-if="!isDateRange" v-model='dueDate' :masks="{ weekdays: 'WWW' }" />
            <VDatePicker v-if="isDateRange" v-model.range="range" :masks="{ weekdays: 'WWW' }" />
        </div>
        <div class="date-picker-time">
            <div class="start-date">
                <div class="start-date-container">
                    <label class="start-date-title">Start date</label>
                    <label class="start-date-time-picker">
                        <span @click.stop="isDateRange = !isDateRange" :class="{'checked' : isDateRange}" v-icon="'checkBox'"></span>
                        <input type="text" class="start-timer" :value="getDateFormat(startDate)" :disabled="isDateRange">
                    </label>
                </div>
            </div>
            <div class="due-date">
                <div class="due-date-container">
                    <label class="due-date-title">Due date</label>
                    <label class="due-date-time-picker">
                        <span class="checked" v-icon="'checkBox'"></span>
                        <input type="text" class="due-timer" :value="getDateFormat(dueDate)">
                        <input type="text" class="due-timer-min" :value="getMinSec(dueDate)">
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        info: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            range: {
                start: new Date(this.dueDate),
                end: new Date(this.dueDate)
            },
            selectedDate: '',
            isDateRange: false,
            startDate: Date.now() - 1000 * 60 * 60 * 24,
            dueDate: Date.now(),
        }
    },
    mounted(){
        if (this.info.task.date.dueDate){
            this.dueDate = this.info.task.date.dueDate * 1000
        }
        if (this.info.task.date.startDate){

            this.dueDate = this.info.task.date.dueDate * 1000
        }
    },
    methods: {
        getDateFormat(dueDate) {
            const date = new Date(dueDate)
            const day = date.getDay().toString().padStart(2, '0')
            const month = date.getMonth().toString().padStart(2, '0')
            const year = date.getFullYear()
            return `${day}/${month}/${year}`
        },
        getMinSec(dueDate) {
            const date = new Date(dueDate)
            const hour = date.getHours()
            const min = date.getMinutes()
            return (hour > 12) ? `${hour - 12}:${min} PM` : `${hour}:${min} AM`
        }
    },
    computed: {
    }
}
</script>
  