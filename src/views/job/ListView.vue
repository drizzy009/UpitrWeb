<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="w-full">
      <div class="mb-5">
        <form class="relative">
          <label
            for="job-search"
            class="sr-only"
          >Search</label>
          <input
            id="job-search"
            class="form-input w-full pl-9 rounded border border-gray-400 shadow-md focus:border-slate-300"
            type="search"
            placeholder="Search job title or keyword…"
          />
          <button
            class="absolute inset-0 right-auto group"
            type="submit"
            aria-label="Search"
          >
            <svg
              class="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
              <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
            </svg>
          </button>
        </form>
      </div>

      <div class="space-y-2">
        <JobListItem
          v-for="item in items"
          :key="item.id"
          :item="item"
        />
      </div>

    </div>
  </div>
</template>
<script setup>
import JobListItem from '../../components/jobs/JobListItem.vue'
const items = [
  {
    id: 0,
    company: "Rainoil",
    role: "Depot Manager",
    link: "/jobs/detail",
    details: "Contract / On Sites / Lagos, Nigeria",
    date: "Aug 7 2022",
    type: "Featured",
    fav: true,
  },
  {
    id: 1,
    company: "Rainoil",
    role: "Station Manager",
    link: "/jobs/detail",
    details: "Contract / On Site / Lagos, Nigeria",
    date: "Sep 2 2022",
    type: "New",
    fav: true,
  },
  {
    id: 2,
    company: "Rainoil",
    role: "Market Represenative",
    link: "/jobs/detail",
    details: "Contract / On Site / Lagos, Nigeria",
    date: "Sep 2 2022",
    type: "New",
    fav: false,
  },
  {
    id: 3,
    company: "Rainoil",
    role: "System Administrator",
    link: "/jobs/detail",
    details: "Full-time / On Site / Asaba Delta, Nigeria",
    date: "Sep 2 2022",
    type: "New",
    fav: false,
  },
  {
    id: 4,
    company: "Rainoil",
    role: "Front Desk Manager",
    link: "/jobs/detail",
    details: "Full-time / On Site / Ogara Ikorodu, Nigeria",
    date: "Jul 2 2022",
    type: "New",
    fav: true,
  },
  {
    id: 5,
    company: "Rainoil",
    role: "Senior Accountant",
    link: "/jobs/detail",
    details: "Part-time / On Site /VI Lagos, Nigeria",
    date: "Jul 2 2022",
    type: "New",
    fav: false,
  },
  {
    id: 6,
    company: "Rainoil",
    role: "HR Manager",
    link: "/jobs/detail",
    details: "Freelance / On Site / Ogara Ikorodu, Nigeria",
    date: "Jul 2 2022",
    type: "New",
    fav: false,
  },
  {
    id: 7,
    company: "Rainoil",
    role: "Senior Accountant",
    link: "/jobs/detail",
    details: "Part-time / On Site /VI Lagos, Nigeria",
    date: "Jul 2 2022",
    type: "New",
    fav: false,
  },
  {
    id: 8,
    company: "Rainoil",
    role: "HR Manager",
    link: "/jobs/detail",
    details: "Freelance / On Site / Ogara Ikorodu, Nigeria",
    date: "Jul 2 2022",
    type: "New",
    fav: false,
  },
  {
    id: 9,
    company: "Rainoil",
    role: "Senior Accountant",
    link: "/jobs/detail",
    details: "Part-time / On Site /VI Lagos, Nigeria",
    date: "Jul 2 2022",
    type: "New",
    fav: false,
  },
  {
    id: 10,
    company: "Rainoil",
    role: "HR Manager",
    link: "/jobs/detail",
    details: "Freelance / On Site / Ogara Ikorodu, Nigeria",
    date: "Jul 2 2022",
    type: "New",
    fav: false,
  },
  {
    id: 11,
    company: "Rainoil",
    role: "Senior Accountant",
    link: "/jobs/detail",
    details: "Part-time / On Site /VI Lagos, Nigeria",
    date: "Jul 2 2022",
    type: "New",
    fav: false,
  },
  {
    id: 12,
    company: "Rainoil",
    role: "HR Manager",
    link: "/jobs/detail",
    details: "Freelance / On Site / Ogara Ikorodu, Nigeria",
    date: "Jul 2 2022",
    type: "New",
    fav: true
  }
];
</script>