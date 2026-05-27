<script setup lang="ts">
import ProjectList from "@/components/ProjectList.vue";
import EducationList from "@/components/EducationList.vue";
import ExperienceList from "@/components/ExperienceList.vue";
</script>

<template>
  <main class="max-w-6xl mx-auto p-8 flex flex-col items-center">
    <h1 class="text-3xl font-bold text-slate-800 mb-4">Michael Mayr</h1>
    <ExperienceList/>
    <EducationList/>
    <ProjectList/>
  </main>
</template>
