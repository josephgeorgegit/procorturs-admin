<template>
  <div class="subjectadmin">
    <h1>Admin Dashboard: Subjects</h1>
    <div>
      <div> 
        <button @click="debug()">Debug</button>
      </div>
      <div>
        <button @click="addSubject = !addSubject">Add New Subject</button>
        <input v-if="addSubject" type="text" v-model="subjectToAdd">
        <button v-if="addSubject" @click="addNewSubject(subjectToAdd)">Add New Subject</button>
      </div> 
      <div class="subject" v-for="subject in subjects.data" :key="subject.id">
        <h3>{{subject.id}}</h3>
        <button @click="saveChanges(subject.id)">Save</button>
        <button @click="removeSubject(subject.id)">delete</button>
        <div>
          <p v-for="student in subject.students" :key="student">
            {{student}}
            <button @click="deleteStudent(student, subject.id)">delete</button>
          </p>
          <button @click="addStudent = !addStudent">Add Student</button>
          <input v-if="addStudent" type="text" v-model="studentToAdd">
          <button v-if="addStudent" @click="addStudentToSubject(subject.id)">add</button>
          
        </div>
        
        
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'SubjectAdmin',
  data(){
    return{
      subjects: {},
      addSubject: false,
      subjectToAdd: '',
      addStudent: false,
      studentToAdd: ''
    }
  },
  async mounted(){
    this.subjects = await axios.get('http://localhost:5000/admin/subjects')
  },
  methods: {
    // dateFormat(date){
    //   return date.toDate()
    // },
    debug(){
      console.log(this.subjects.data[0])
    },

    addNewSubject(subject_id){
      let subject_to_add = {
        students: [],
        id: subject_id
      }
      this.subjects.data.push(subject_to_add)
          },

    removeSubject(subject_id){
      this.subjects.data = this.subjects.data.filter(x => x.id != subject_id)
    },

    deleteStudent(student_id, subject_id){
      for(let i=0; i<this.subjects.data.length; i++){
        if(this.subjects.data[i].id == subject_id){
          const subject_to_edit = this.subjects.data[i]
          console.log(subject_to_edit)
          subject_to_edit.students = subject_to_edit.students.filter(student => student != student_id)
        }
      }
    },

    addStudentToSubject(subject_id){
      for(let i=0; i<this.subjects.data.length; i++){
        if(this.subjects.data[i].id == subject_id){
          this.subjects.data[i].students.push(this.studentToAdd)
        }
      }
      this.studentToAdd == ''
      this.addStudent == false
    },

    async saveChanges(subject_id){
      for(let i=0; i<this.subjects.data.length; i++){
        if(this.subjects.data[i].id == subject_id){
          axios.post('http://localhost:5000/admin/subjects/save', this.subjects.data[i])
          console.log(this.subjects.data[i])
        }
      }
    }

  }
}
</script>

<style scoped>
.subject{
  border-radius: 15px;
  background-color: #fafafa;
  border: 2px solid black;
  padding: 20px;
}
</style>
