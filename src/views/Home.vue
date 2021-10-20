<template>
  <div class="home">
    <h1>Admin Dashboard: Exams</h1>
    <div>
      <button @click="route('SubjectAdmin')">Go to Subject Page</button>
      <div class ="addExam">
        <button @click="addExam = !addExam">Add New Exam</button>
        <select v-if="addExam" v-model="selectedSubject">
            <option v-for="data in subjects.data" :key="data">
              {{data.id}}
            </option>
        </select>
        <input v-if="addExam" type="datetime-local" v-model="dateToAdd">
        <button v-if="addExam" @click="addNewExam()">Add New Exam</button>
      </div>

      <div class="exam" v-for="exam in exams.data" :key="exam.id">
        <h3>{{exam.subject}}</h3>
        <button @click="saveChanges(exam.id)">Post to Firebase</button>
        <div>
          <h4>{{exam.date_time}}</h4>
          <button @click="editTimeClick(exam.id)">Change Time</button>
          <input type="datetime-local" v-if="editTime == exam.id" v-model="newDateTime">
          <button v-if="editTime == exam.id" @click="changeDateTime(exam.id)">Save New Time</button>
        </div>
        
        <p v-for="student in exam.students" :key="student">
          {{student}}
          <button @click="deleteStudent(student, exam.id)">delete</button>
        </p>
        <button @click="addStudentClick(exam.id)">Add Student</button>
        <input v-if="addStudent == exam.id" type="text" v-model="studentToAdd">
        <button v-if="addStudent == exam.id" @click="addStudentToExam(exam.id)">add</button>
        
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
      subjects: {},
      //Add Exams
      selectedSubject: '',
      dateToAdd: '',  
      addExam: false,
      //Add Students to Exams
      addStudent: '',
      studentToAdd: '',
      //Edit exam dates
      editTime: '',
      newDateTime: ''
    }
  },
  async mounted(){
    this.exams = await axios.get('http://localhost:5000/admin/exams')
    this.subjects = await axios.get('http://localhost:5000/admin/subjects')
    console.log(this.exams)
  },
  methods: {
    // dateFormat(date){
    //   return date.toDate()
    // },
    debug(){
      console.log(this.subjects.data)
    },
    route(path){
      this.$router.push(path)
    },
    addNewExam(){
      if(this.selectedSubject == '' || this.dateToAdd == ''){
        return
      }
      let date = moment(this.dateToAdd).format()
      let exam = {
        students: [],
        subject: this.selectedSubject,
        date_time: date
      }
      console.log(exam)
      //console.log(this.subjects[0])
      this.exams.data.push(exam)
    },
    deleteStudent(student_id, exam_id){
      for(let i=0; i<this.exams.data.length; i++){
        if(this.exams.data[i].id == exam_id){
          const exam_to_edit = this.exams.data[i]
          console.log(exam_to_edit)
          exam_to_edit.students = exam_to_edit.students.filter(student => student != student_id)
        }
      }
    },
    addStudentClick(exam_id){
      if(this.addStudent == exam_id){
        this.addStudent = ''
      }else{
        this.addStudent = exam_id
      }
    },

    editTimeClick(exam_id){
      if(this.editTime == exam_id){
        this.editTime = ''
      }else{
        this.editTime= exam_id
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
.addExam{
  border-radius: 15px;
  background-color: #fafafa;
  border: 2px solid black;
  padding: 10px;
  width: 40%;
}
.home{

}
</style>
