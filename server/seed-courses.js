import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('✅ MongoDB connected\n')
  const db = mongoose.connection.db

  // Add 4 new courses
  const newCourses = [
    { title: 'Python Programming Masterclass', category: 'Web Development', price: 3000, duration: '14 weeks', level: 'Beginner', description: 'Learn Python from scratch.', instructor: 'Mr. Hafiz Iddrisu', tenantId: 'default-tenant', isActive: true },
    { title: 'Ethical Hacking & Penetration Testing', category: 'Cybersecurity', price: 4500, duration: '16 weeks', level: 'Advanced', description: 'Master ethical hacking techniques.', instructor: 'Mr. Kwame Asante', tenantId: 'default-tenant', isActive: true },
    { title: 'Cloud Computing with AWS', category: 'Networking', price: 4000, duration: '12 weeks', level: 'Intermediate', description: 'Learn AWS services and cloud architecture.', instructor: 'Mr. Yaw Boakye', tenantId: 'default-tenant', isActive: true },
    { title: 'UI/UX Design Professional', category: 'Graphic Design', price: 2500, duration: '10 weeks', level: 'Beginner', description: 'Master Figma, user research, and prototyping.', instructor: 'Ms. Grace Osei', tenantId: 'default-tenant', isActive: true },
  ]
  
  await db.collection('courses').insertMany(newCourses)
  console.log('✅ 4 new courses added')

  // Get all courses
  const allCourses = await db.collection('courses').find({}).toArray()
  console.log(`📚 Processing ${allCourses.length} courses...`)

  const videoMap = {
    'Web Development': [
      { title: 'HTML Crash Course', url: 'https://www.youtube.com/embed/UB1O30fR-EE', duration: 60 },
      { title: 'CSS Crash Course', url: 'https://www.youtube.com/embed/yfoY53QXEnI', duration: 90 },
      { title: 'JavaScript Basics', url: 'https://www.youtube.com/embed/W6NZfCO5SIk', duration: 80 },
      { title: 'React Tutorial', url: 'https://www.youtube.com/embed/w7ejDZ8SWv8', duration: 75 },
    ],
    'Mobile': [
      { title: 'Flutter Setup', url: 'https://www.youtube.com/embed/x0uinJvhNxI', duration: 50 },
      { title: 'Flutter Widgets', url: 'https://www.youtube.com/embed/fq4N0hgOWzU', duration: 65 },
      { title: 'State Management', url: 'https://www.youtube.com/embed/3tm_R7YMZCY', duration: 70 },
    ],
    'Cybersecurity': [
      { title: 'Intro to Cybersecurity', url: 'https://www.youtube.com/embed/inWWhr5tnEA', duration: 55 },
      { title: 'Network Security Basics', url: 'https://www.youtube.com/embed/E03gh1huvW0', duration: 70 },
      { title: 'Ethical Hacking Tools', url: 'https://www.youtube.com/embed/3Kq1MIfTWCE', duration: 60 },
    ],
    'Data Analysis': [
      { title: 'Python for Data Science', url: 'https://www.youtube.com/embed/rfscVS0vtbw', duration: 80 },
      { title: 'Pandas Tutorial', url: 'https://www.youtube.com/embed/vmEHCJofslg', duration: 65 },
      { title: 'Data Visualization', url: 'https://www.youtube.com/embed/a9UrKTVEeZA', duration: 55 },
    ],
    'AI': [
      { title: 'AI Fundamentals', url: 'https://www.youtube.com/embed/JMUxmLyrhSk', duration: 60 },
      { title: 'Machine Learning Basics', url: 'https://www.youtube.com/embed/Gv9_4yMHFhI', duration: 75 },
      { title: 'Neural Networks', url: 'https://www.youtube.com/embed/aircAruvnKk', duration: 70 },
    ],
    'Networking': [
      { title: 'Networking Basics', url: 'https://www.youtube.com/embed/qiQR5rTSshw', duration: 50 },
      { title: 'IP Addressing', url: 'https://www.youtube.com/embed/v8aYhOxZuNg', duration: 45 },
      { title: 'AWS Cloud Basics', url: 'https://www.youtube.com/embed/ulprqHHWlng', duration: 65 },
    ],
    'Graphic Design': [
      { title: 'Figma Tutorial', url: 'https://www.youtube.com/embed/Cx2dkpBxst8', duration: 55 },
      { title: 'UI Design Principles', url: 'https://www.youtube.com/embed/c9Wg6Cb_YlU', duration: 60 },
      { title: 'Design Systems', url: 'https://www.youtube.com/embed/EK-pHkc5EL4', duration: 50 },
    ],
  }

  // Delete old content
  await db.collection('coursecontents').deleteMany({})

  for (const course of allCourses) {
    const category = course.category || 'Web Development'
    const videos = videoMap[category] || videoMap['Web Development']

    const content = {
      courseId: course._id,
      sections: [
        {
          title: 'Getting Started',
          lessons: [
            {
              title: videos[0].title,
              videoUrl: videos[0].url,
              duration: videos[0].duration,
              order: 1,
              isPreview: true,
              description: 'Introduction and setup.',
              assignment: {
                title: 'Setup Check',
                description: 'Verify your environment is ready.',
                questions: [
                  { question: 'What IDE are you using?', options: ['VS Code', 'Sublime', 'Atom', 'Other'], correctAnswer: 0 },
                  { question: 'Did you install all required tools?', options: ['Yes', 'No'], correctAnswer: 0 },
                ],
                passingScore: 100
              }
            },
            {
              title: videos[1].title,
              videoUrl: videos[1].url,
              duration: videos[1].duration,
              order: 2,
              isPreview: true,
              description: 'Core concepts and fundamentals.',
              assignment: {
                title: 'Knowledge Check',
                description: 'Test your understanding.',
                questions: [
                  { question: 'What is the main purpose?', options: ['Development', 'Analysis', 'Security', 'Design'], correctAnswer: 0 },
                ],
                passingScore: 100
              }
            },
          ]
        },
        {
          title: 'Core Skills',
          lessons: [
            {
              title: videos[2].title,
              videoUrl: videos[2].url,
              duration: videos[2].duration,
              order: 1,
              description: 'Advanced topics deep dive.',
              assignment: {
                title: 'Practice Project',
                description: 'Apply what you learned.',
                questions: [
                  { question: 'Did you complete the project?', options: ['Yes', 'Partially', 'No'], correctAnswer: 0 },
                ],
                passingScore: 100
              }
            },
          ]
        },
        {
          title: 'Final Assessment',
          lessons: [
            {
              title: 'Course Summary & Final Quiz',
              videoUrl: videos[0].url,
              duration: 30,
              order: 1,
              description: 'Review and final exam.',
              assignment: {
                title: 'Final Exam',
                description: 'Complete to earn your certificate.',
                questions: [
                  { question: 'What did you learn?', options: ['Programming', 'Design', 'Security', 'All topics'], correctAnswer: 3 },
                  { question: 'Can you apply these skills?', options: ['Yes', 'Not yet'], correctAnswer: 0 },
                ],
                passingScore: 50
              }
            },
          ]
        },
      ],
      requirements: ['Basic computer skills', 'Internet connection'],
      whatYouWillLearn: ['Professional skills', 'Hands-on projects'],
      instructor: { name: course.instructor || 'Expert', bio: 'Professional instructor', photo: '' },
      thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&q=80',
      trailerUrl: videos[0].url
    }

    await db.collection('coursecontents').insertOne(content)
    console.log('✅ Content added:', course.title)
  }

  console.log('\n🎉 ALL DONE! All courses have videos and assignments!')
  process.exit(0)
}

seed().catch(err => {
  console.error('ERROR:', err.message)
  process.exit(1)
})