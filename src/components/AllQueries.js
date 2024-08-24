import React, { useState } from 'react'
import Course from './Course'

const AllQueries = () => {
    const [courses,setCourses]=useState([
        {title: 'Java Course', description:'This is demo course'},
        {title: 'Django Course', description:'This is demo course'},
        {title: 'React Course', description:'This is demo course'}
    ])

  return (
    <div>
      <h1>All Queries</h1>
      {
        courses.length>0 ? courses.map((course) =>
            <Course course={course}/>
        ): 'No courses available' 
      }
    </div>
  )
}

export default AllQueries
