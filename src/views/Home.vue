<template>
  <div class="home">
    <h1>Admin Dashboard: Exams</h1>
    <div>
      <div class="exam" v-for="exam in exams.data" :key="exam.id">
        <h3>{{exam.subject}}</h3>
        
        <div>
          <h4>{{exam.date_time}}</h4>
          <button @click="editTime = !editTime">Change</button>
          <button v-if="editTime" @click="changeDateTime">save</button>
        </div>
        
        <p v-for="student in exam.students" :key="student">
          {{student}}
          <button @click="deleteStudent(student, exam.id)">delete</button>
        </p>
        <button @click="addStudent = !addStudent">Add Student</button>
        <input v-if="addStudent" type="text" v-model="studentToAdd">
        <button v-if="addStudent" @click="addStudentToExam(exam.id)">add</button>
        <input type="datetime-local" v-if="editTime" v-model="newDateTime">
        <button @click="saveChanges(exam.id)">save</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import moment from 'moment'

export default {
  name: 'Home',
  data(){
    return{
      exams: {},
      studentToAdd: '',
      addStudent: false,
      editTime: false,
      newDateTime: ''
    }
  },
  async mounted(){
    this.exams = await axios.get('http://localhost:5000/admin/exams')
    console.log(this.exams)
  },
  methods: {
    // dateFormat(date){
    //   return date.toDate()
    // },
    deleteStudent(student_id, exam_id){
      for(let i=0; i<this.exams.data.length; i++){
        if(this.exams.data[i].id == exam_id){
          const exam_to_edit = this.exams.data[i]
          console.log(exam_to_edit)
          exam_to_edit.students = exam_to_edit.students.filter(student => student != student_id)
        }
      }
    },
    addStudentToExam(exam_id){
      for(let i=0; i<this.exams.data.length; i++){
        if(this.exams.data[i].id == exam_id){
          this.exams.data[i].students.push(this.studentToAdd)
        }
      }
      this.studentToAdd == ''
      this.addStudent == false
    },
    changeDateTime(exam_id){
      for(let i=0; i<this.exams.data.length; i++){
        if(this.exams.data[i].id == exam_id){
          console.log(this.exams.data[i].date_time)
          this.exams.data[i].date_time = moment(this.newDateTime).format()
          console.log(this.exams.data[i].date_time)
        }
      }
      
    },
    async saveChanges(exam_id){
      for(let i=0; i<this.exams.data.length; i++){
        if(this.exams.data[i].id == exam_id){
          axios.post('http://localhost:5000/admin/exams/save', this.exams.data[i])
        }
      }
    }

  }
}
</script>

<style scoped>
.exam{
  border-radius: 15px;
  background-color: #fafafa;
  border: 2px solid black;
  padding: 30px;
}
</style>
