
<template>
  <main>
    <h1 class="name">Employee management</h1>

    <form @submit.prevent method="post">
      <input class="input" v-model="name" type="text" name="name" placeholder="Enter employee's name" />
      <input class="input" v-model="surname" type="text" name="surname" placeholder="Enter employee's surname" />
      <input class="input" v-model="phone" type="text" name="phone" placeholder="Enter employee's phone" />
      <button type="submit" class="submit-btn" @click="addEmpl()">Add Empl</button>
    </form>

    <!-- <div class="empl-wrapper">
      <h2 class="caption">Empl List</h2>

      <div v-if="empls.length < 1">Empl list is empty</div>

      <ul v-else>
        <li class="empl-item" v-for="(empl, i) in empls" :key="empl['_id']">
          <div class="empl">
            <h3 class="empl-name">{{ empl['name'] }}</h3>
            <h4 class="empl-name">{{ empl['surname'] }}</h4>
            <h4 class="empl-name">{{ empl['phone'] }}</h4>
          </div>

          <div class="update-form" id="updateForm">
            <input type="text" name="updateName" id="updateEmpl" v-model="updateName" />
            <br />
            <input type="text" name="updateSurname" id="updateEmpl" v-model="updateSurname" />
            <br />
            <input type="text" name="updatePhone" id="updateEmpl" v-model="updatePhone" />
          </div>

          <div class="empl-btns">
            <button type="button" class="edit-btn" @click="updateEmpl($event, empl['_id'], i, empl)">
              Edit
            </button>

            <button type="button" class="del-btn" @click="delEmpl(empl['_id'])">
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div> -->
  </main>
  <DataTable v-model:editingRows="editingRows" :value="empls" editMode="row" dataKey="_id" @row-edit-save="onRowEditSave"
    :pt="{
      table: { style: 'min-width: 50rem' },
      column: {
        bodycell: ( state: DataTableState ) => ({
          style:  state['d_editing']&&'padding-top: 0.6rem; padding-bottom: 0.6rem'
        })
      }
    }"
  >
    <Column field="name" header="Name" style="width: 25%">
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" />
      </template>
    </Column>
    <Column field="surname" header="Familia" style="width: 25%">
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" />
      </template>
    </Column>
    <Column field="phone" header="Phone" style="width: 25%">
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" />
      </template>
    </Column>
    <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
    <Column style="width: 10%">
      <template #body="slotProps">
        <button type="button" class="del-btn" @click="delEmpl(slotProps.data._id)">
          Delete
        </button>
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
  import axios from "axios";
  import 'primevue/resources/themes/aura-light-green/theme.css'
  import { ref, onMounted } from 'vue'
  import DataTable, { type DataTableState } from 'primevue/datatable'
  import Column from 'primevue/column'
  import InputText from 'primevue/inputtext';
  import ColumnGroup from 'primevue/columngroup'
  import Row from 'primevue/row'

  const empls = ref([]),
        name = ref(""),
        surname = ref(""),
        phone = ref(""),
        updateName = ref(""),
        updateSurname = ref(""),
        updatePhone = ref(""),
        editingRows = ref([])

  const onRowEditSave = async (event: { newData: any; index: any; }) => {
    let { newData, index } = event;
    
    const res = await axios.put(`http://localhost:3000/api/EmplList/${newData._id}`, {
      name: newData.name,
      surname: newData.surname,
      phone: newData.phone,
    })
    .then(() => {
      getEmpls()
    })
    .catch(err => {
      console.log('updateEmpl', err)
    })
  };

  const getEmpls = async () => {
    const res = await axios.get("http://localhost:3000/api/EmplList/")
    .then(res => {
      empls.value = res.data
    })
    .catch(err => {
      console.log('getEmpls', err)
    })
  }

  const addEmpl = async () => {
    const res = await axios.post("http://localhost:3000/api/EmplList/", {
      name: name.value,
      surname: surname.value,
      phone: phone.value,
    })
    .then(() => {
      getEmpls()
    })
    .catch(err => {
      console.log('addEmpl', err)
    })

    name.value = "";
    surname.value = "";
    phone.value = "";
  }

  const delEmpl = async (id: any) => {
    await axios.delete(`http://localhost:3000/api/EmplList/${id}`)
    .then(() => {
      getEmpls()
    })
    .catch(err => {
      console.log('delEmpl', err)
    })
  }
  
  const updateEmpl = async (event: MouseEvent, id: any, i: number, empl: never) => {
    const updateForm = document.getElementsByClassName("update-form");

    const updateFormArray = [...updateForm];

    updateFormArray.forEach(async (el) => {
      if (updateFormArray.indexOf(el) === i) {
        if (!el.classList.contains("active")) {
          el.classList.add("active");

          updateName.value = empl['name'];
          updateSurname.value = empl['surname'];
          updatePhone.value = empl['phone'];

          const target = event.target as HTMLInputElement;
          target.innerHTML = "Save"
          // event.target.innerHTML = "Save";
        } else {
          const res = await axios.put(`http://localhost:3000/api/EmplList/${id}`, {
            name: updateName.value,
            surname: updateSurname.value,
            phone: updatePhone.value,
          })
          .then(() => {
            getEmpls()
          })
          .catch(err => {
            console.log('updateEmpl', err)
          })

          const target = event.target as HTMLInputElement;
          target.innerHTML = "Edit"
          // event.target.innerHTML = "Edit";

          el.classList.remove("active");
          
          updateName.value = "";
          updateSurname.value = "";
          updatePhone.value = "";
        }
      }
    });
  }

  onMounted(() => {
    getEmpls()
})
</script>



<style scoped>
  *,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  padding: 40px 5%;
}

main {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.name {
  text-align: center;
  margin-bottom: 30px;
}

.input {
  padding: 20px;
  display: block;
  width: 100%;
  margin: 0 auto 10px;
}

.submit-btn {
  display: block;
  padding: 20px;
  border: 0;
  background-color: green;
  color: white;
  width: 100%;
  margin: 20px auto 0;
  cursor: pointer;
}

.empl-wrapper {
  margin-top: 50px;
}

.empl-wrapper .caption {
  margin-bottom: 15px;
}

.empl-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(207, 236, 207);
  padding: 10px;
}

.empl-item:nth-child(even) {
  background-color: white;
}

.empl-name {
  margin-bottom: 7px;
}

.empl-btns button {
  padding: 10px;
  cursor: pointer;
  border: 0;
}

.edit-btn {
  background-color: green;
  color: white;
  margin-right: 7px;
}

.del-btn {
  background-color: red;
  color: white;
}

.update-form {
  position: absolute;
  display: none;
}

.update-form input {
  padding: 7px;
  border: 0;
}

.update-form.active {
  display: block;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th, tr {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
