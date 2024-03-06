<script setup lang="ts">
import 'primevue/resources/themes/aura-light-green/theme.css'
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
</script>

<template>
  <div class="inl">  
    <InputGroup class="fiel">
      <InputGroupAddon>
        <i class="pi pi-user">Name</i>
      </InputGroupAddon>
      <InputText placeholder="" />
    </InputGroup>
    <InputGroup class="fiel">
      <InputGroupAddon>
        <i class="pi pi-user">Surname</i>
      </InputGroupAddon>
      <InputText placeholder="" />
    </InputGroup>
    <InputGroup class="fiel">
      <InputGroupAddon>
        <i class="pi pi-user">Phone number</i>
      </InputGroupAddon>
      <InputText placeholder="" />
    </InputGroup>
    <Button class="fiel2" label="Add" />
  </div>
  
</template>

<style>
  .fiel{
    width: 100%;
    margin-right: 5px;
  }
  .fiel2{
    width: 10%;
  }
  .inl{
    display: inline-flex;
    width: 100%;;
  }
</style>