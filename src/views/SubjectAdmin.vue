<template>
  <div class="subjectadmin">
    <h1>Admin Dashboard: Subjects</h1>
    <div>
      <button @click="route('/')">Go to Exam Page</button>
      <div class="addSubject">
        <button @click="addSubject = !addSubject">Add New Subject</button>
        <input v-if="addSubject" type="text" v-model="subjectToAdd">
        <button v-if="addSubject" @click="addNewSubject(subjectToAdd)">Add New Subject</button>
      </div> 
      <div class="subject" v-for="subject in subjects.data" :key="subject.id">
        <h3>{{subject.id}}</h3>
        <button @click="saveChanges(subject.id)">Save</button>
        <button @click="removeSubject(subject.id)">Remove Subject</button>
        <div>
          <p v-for="student in subject.students" :key="student" class="student">
            {{student}}
            <button @click="deleteStudent(student, subject.id)">Delete</button>
          </p>
          <button @click="addStudentClick(subject.id)">Add Student</button>
          <input v-if="addStudent == subject.id" type="text" v-model="studentToAdd">
          <button v-if="addStudent == subject.id" @click="addStudentToSubject(subject.id)">add</button>
          
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
      addStudent: '',
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
    route(path){
      this.$router.push(path)
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

    addStudentClick(exam_id){
      if(this.addStudent == exam_id){
        this.addStudent = ''
      }else{
        this.addStudent = exam_id
      }
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
  padding: 30px;
}
.addSubject{
  border-radius: 15px;
  background-color: #fafafa;
  border: 2px solid black;
  padding: 10px;
  width: 40%;
}
.student{
}
.subjectadmin{
  
}
</style>
