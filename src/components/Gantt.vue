<template>

  <div>
  <div ref="gantt" style="width: 100%; height: 500px;"></div>
  </div>

</template>
 
<script>
import {gantt} from 'dhtmlx-gantt'
import firebase from 'firebase/app'

export default {
  name: 'gantt',
  props: {
    tasks: {
      type: Object,
      default () {
        return {data: [], links: []}
      }
    }
  },

  methods: {
    $_initGanttEvents: function() {
      if (!gantt.$_eventsInitialized) {
        gantt.attachEvent('onTaskSelected', (id) => {
          let task = gantt.getTask(id);
          this.$emit('task-selected', task);
        });

        gantt.attachEvent('onTaskIdChange', (id, new_id) => {
          if (gantt.getSelectedId() == new_id) {
            let task = gantt.getTask(new_id);
            this.$emit('task-selected', task);
          }
        });

        gantt.$_eventsInitialized = true;
      }
    },

    $_initDataProcessor: function() {
      if (!gantt.$_dataProcessorInitialized) {
        gantt.createDataProcessor((entity, action, data, id) => { 
          this.$emit(`${entity}-updated`, id, action, data);
        });

        gantt.$_dataProcessorInitialized = true;
      }
    }
  },

  mounted: function () {
    this.$_initGanttEvents();
    gantt.config.xml_date = "%Y-%m-%d";

    gantt.init(this.$refs.gantt);
    gantt.parse(this.$props.tasks);

    this.$_initDataProcessor();
  }
}
gantt.i18n.setLocale({
    date: {
        month_full: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        month_short: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", 
            "Авг", "Сент", "Окт", "Ноябр", "Дек"],
        day_full: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг",
             "Пятница", "Суббота"],
        day_short: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
    },
    labels: {
        new_task: "Новая задача",
        icon_save: "Сохранить",
        icon_cancel: "Отменить",
        icon_details: "Details",
        icon_edit: "Отправить",
        icon_delete: "Удалить",
        gantt_save_btn: "Сохранить",
        gantt_cancel_btn: "Отменить",
        gantt_delete_btn: "Удалить",
        confirm_closing: "",// Your changes will be lost, are you sure?
        confirm_deleting: "Задача будет удалена, вы уверены?",
        section_description: "Название задачи",
        section_time: "Период выполнения задачи",
        section_type: "Type",
 
        /* grid columns */
        column_wbs: "WBS",
        column_text: "Задача",
        column_start_date: "Время начала",
        column_duration: "Длительность",
        column_add: "",
 
        /* link confirmation */
        link: "Link",
        confirm_link_deleting: "will be deleted",
        link_start: " (start)",
        link_end: " (end)",
 
        type_task: "Task",
        type_project: "Project",
        type_milestone: "Milestone",
 
        minutes: "Минут",
        hours: "Часов",
        days: "Дней",
        weeks: "Недель",
        months: "Месяцев",
        years: "Лет",
 
        /* message popup */
        message_ok: "Ок",
        message_cancel: "Отменить",
 
        /* constraints */
        section_constraint: "Constraint",
        constraint_type: "Constraint type",
        constraint_date: "Constraint date",
        asap: "As Soon As Possible",
        alap: "As Late As Possible",
        snet: "Start No Earlier Than",
        snlt: "Start No Later Than",
        fnet: "Finish No Earlier Than",
        fnlt: "Finish No Later Than",
        mso: "Must Start On",
        mfo: "Must Finish On",
 
        /* resource control */
        resources_filter_placeholder: "type to filter",
        resources_filter_label: "hide empty"
    }
});

</script>
 
<style>
    @import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>
