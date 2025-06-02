<template>
   <div v-if="Show_User_Setting" class="container w-50 position-absolute start-50 top-25 bg-dark p-2">
         <h5>setting comp</h5>
   </div>
</template>


<script>
export default {
  props : {
     Show_User_Setting : {
      type : Boolean,
     }
  },
  data() {
    return {

    }
  }
}
</script>

