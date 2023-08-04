<template>
    <div @click.stop="" class="date-picker-container">
        <div class="date-picker">
            <VDatePicker v-if="!isDateRange" v-model='dueDate' :masks="{ weekdays: 'WWW' }" />
            <VCalendar v-if="isDateRange" :attributes="attributes" :masks="{ weekdays: 'WWW' }" />
        </div>
        <div class="date-picker-time">
            <div class="start-date">
                <div class="start-date-container">
                    <label class="start-date-title">Start date</label>
                    <label class="start-date-time-picker">
                        <!-- <span @click.stop="isDateRange = !isDateRange" :class="{ 'checked': isDateRange }"
                            v-icon="'checkBox'"></span> -->
                        <span :class="{ 'checked': isDateRange }" v-icon="'checkBox'" style="cursor: not-allowed"></span>
                        <input type="text" class="start-timer" :value="getDateFormat(startDate)" :disabled="!isDateRange">
                    </label>
                </div>
            </div>
            <div class="due-date">
                <div class="due-date-container">
                    <label class="due-date-title">Due date</label>
                    <label class="due-date-time-picker">
                        <span class="checked" v-icon="'checkBox'"></span>
                        <input ref="dateFormat" type="text" class="due-timer" pattern="\d{2}/\d{2}/\d{4}"
                            @input="updateDueDate" :value="getDateFormat(dueDate)">
                        <input ref="timeFormat" type="text" class="due-timer-min" pattern="\d{2}:\d{2} (AM|PM)"
                            @input="updateDueDate" :value="getMinSec(dueDate)">
                    </label>
                </div>
            </div>
        </div>
        <div class="date-container-btns">
            <button class="date-btn-save" @click.stop="saveDueDate">Save</button>
            <button class="date-btn-remove" @click.stop="removeDueDate">Remove</button>
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
            isDateRange: false,
            startDate: Date.now() - 1000 * 60 * 60 * 24,
            dueDate: Date.now() + 1000 * 60 * 60 * 24,
            attributes: [[new Date(this.startDate), new Date(this.dueDate)]],
        }
    },
    mounted() {
        if (this.info.task.date.dueDate) {
            this.dueDate = this.info.task.date.dueDate * 1000
            if (this.info.task.date.startDate) {
                this.startDate = this.info.task.date.startDate * 1000
            }
        }
    },
    methods: {
        saveDueDate() {
            const numDate = parseInt(this.dueDate.getTime() / 1000)
            this.info.task.date.dueDate = numDate
            this.$emit('setInfo', this.info)
            this.$emit('setInfo')
        },
        removeDueDate() {
            this.info.task.date.dueDate = ''
            this.$emit('setInfo', this.info)
            this.$emit('setInfo')
        },
        getDateFormat(dateValue) {
            const date = new Date(dateValue);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear()
            return `${day}/${month}/${year}`
        },
        getMinSec() {
            const date = new Date(this.dueDate)
            const hour = date.getHours()
            const min = date.getMinutes().toString().padStart(2, '0')
            return (hour > 12) ? `${(hour - 12).toString().padStart(2, '0')}:${min} PM` : `${hour}:${min} AM`
        },
        updateDueDate() {
            const formattedDate = this.$refs.dateFormat.value;
            const formattedTime = this.$refs.timeFormat.value;
            const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
            const timePattern = /^\d{2}:\d{2} (AM|PM)$/;
            if (datePattern.test(formattedDate) && timePattern.test(formattedTime)) {
                const dateParts = formattedDate.split('/')
                const day = parseInt(dateParts[0], 10)
                const month = parseInt(dateParts[1], 10) - 1
                const year = parseInt(dateParts[2], 10)
                const timeParts = formattedTime.split(' ')
                const [hour, min] = timeParts[0].split(':')
                const isPM = timeParts[1].toUpperCase() === 'PM'
                const parsedHour = isPM ? parseInt(hour, 10) + 12 : parseInt(hour, 10)
                const newDate = new Date(year, month, day, parsedHour, parseInt(min, 10))
                this.dueDate = newDate.getTime();
            }
        },
    },
    computed: {
    }
}
</script>
  