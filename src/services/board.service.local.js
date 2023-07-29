import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'board'

export const boardService = {
  query,
  getById,
  save,
  remove,
  getEmptyBoard,
  addBoardMsg,
  getEmptyGroup,
  getEmptyTask,
  getEmptyActivity
}
window.cs = boardService

async function query(filterBy = { txt: '', price: 0 }) {
  var boards = await storageService.query(STORAGE_KEY)
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    boards = boards.filter((board) => regex.test(board.vendor) || regex.test(board.description))
  }
  if (filterBy.price) {
    boards = boards.filter((board) => board.price <= filterBy.price)
  }
  return boards
}

function getById(boardId) {
  return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
  await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
  var savedBoard
  if (board._id) {
    savedBoard = await storageService.put(STORAGE_KEY, board)
  } else {
    // Later, owner is set by the backend
    // board.owner = userService.getLoggedinUser()
    savedBoard = await storageService.post(STORAGE_KEY, board)
  }
  return savedBoard
}

async function addBoardMsg(boardId, txt) {
  // Later, this is all done by the backend
  const board = await getById(boardId)
  if (!board.msgs) board.msgs = []

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  }
  board.msgs.push(msg)
  await storageService.put(STORAGE_KEY, board)

  return msg
}

function getEmptyBoard() {
  return {
    _id: '',
    title: '',
    isStarred: false,
    archivedAt: null,
    createdBy: null,
    groups: [],
    style: {},
  }
}
function getEmptyGroup() {
  return {
    id: utilService.makeId(4),
    title: '',
    archivedAt: null,
    tasks: [],
  }
}

function getEmptyTask() {
  return {
    id: utilService.makeId(4),
    title: '',
    description: '',
    members: [],
    labels: [],
    dueDate: null,
    checklists: [],
    attachment: null,
    activity: [],
    cover: '',
    comments: [],
  }
}

function getEmptyActivity() {
  return {
    id: utilService.makeId(4),
    action: {
      type:'',
      txt: '',
      componentId:'',
      movedCmp:'',
      movedUser:''
    },
    date: Date.now(),
    by: ''
  }
}

// ;(async () => {
//   localStorage.setItem(
//     STORAGE_KEY,
//     JSON.stringify([
//       {
//         _id: 'b101',
//         title: 'Gas Station Robotics',
//         isStarred: true,
//         archivedAt: null,
//         imgUrl: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690367544/photo-1687791301950-972428a58aa4_h9urah.avif',
//         createdBy: {
//           _id: 'u101',
//           fullname: 'Meitar Mor',
//           imgUrl: '',
//         },
//         style: {
//           backgroundImage: '',
//         },
//         labels: [
//           {
//             id: 'l101',
//             title: 'Low priority',
//             color: 'green',
//           },
//           {
//             id: 'l102',
//             title: 'Planning',
//             color: 'orange',
//           },
//           {
//             id: 'l103',
//             title: 'Techonology',
//             color: 'lime',
//           },
//           {
//             id: 'l104',
//             title: 'Research',
//             color: 'yellow',
//           },
//           {
//             id: 'l105',
//             title: 'Design',
//             color: 'pink',
//           },
//           {
//             id: 'l106',
//             title: 'Medium priority',
//             color: 'subtle-yellow',
//           },
//           {
//             id: 'l107',
//             title: 'Analysis',
//             color: 'blue',
//           },
//           {
//             id: 'l108',
//             title: 'Finance',
//             color: 'teal',
//           },
//           {
//             id: 'l109',
//             title: 'Enhancement',
//             color: 'purple',
//           },
//           {
//             id: 'l110',
//             title: 'High priority',
//             color: 'red',
//           },
//         ],
//         members: [
//           {
//             _id: 'u101',
//             fullname: 'Meitar Mor',
//             imgUrl: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690444042/290515844_760005839156054_4788470373949981322_n_ouudqs.jpg',
//           },
//           {
//             _id: 'u102',
//             fullname: 'Tomer Appelman',
//             imgUrl: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690444315/Untitled_jx0ppe.png',
//           },
//           {
//             _id: 'u103',
//             fullname: 'Bina Hovav',
//             imgUrl: 'https://ca.slack-edge.com/T04U05NLZ2M-U0579PGBRFS-4cc9b9703df7-512',
//           },
//         ],
//         groups: [
//           {
//             id: 'g101',
//             title: 'Research and Planning',
//             archivedAt: null,
//             tasks: [
//               {
//                 id: 'c101',
//                 title: 'Market Research',
//                 description: 'Conduct an in-depth market l107 to identify potential opportunities, target markets, and competitor solutions in the gas station automation industry.',
//                 members: ['u101', 'u102', 'u103'],
//                 labels: ['l104', 'l102'],
//                 dueDate: 1690303727,
//                 checklists: [
//                   {
//                     title: 'Todo',
//                     todos: [
//                       { id: 't101', txt: 'Gather data on existing gas station automation solutions', isDone: true },
//                       { id: 't102', txt: 'Identify key competitors and their offerings.', isDone: false },
//                       { id: 't103', txt: 'Analyze market trends and customer preferences.', isDone: false },
//                       { id: 't104', txt: 'Compile a comprehensive report on the market l107 findings.', isDone: false },
//                     ],
//                   },
//                 ],
//                 attachment: null,
//                 activity: [],
//                 cover: 'green',
//                 comments: [],
//               },
//               {
//                 id: 'c102',
//                 title: 'l103 Evaluation',
//                 description: 'Evaluate existing robotic technologies, sensors, and AI algorithms suitable for automating gas station tasks.',
//                 members: ['u102', 'u103'],
//                 labels: ['l106', 'l107', 'l103'],
//                 dueDate: null,
//                 checklists: [
//                   {
//                     title: 'Research and review existing robotic technologies',
//                     todos: [
//                       { id: 't101', txt: 'Identify and compile a list of robotic technologies currently used in various industries.', isDone: true },
//                       { id: 't102', txt: 'Evaluate the capabilities and limitations of each robotic l103 in terms of mobility, dexterity, and adaptability.', isDone: true },
//                       {
//                         id: 't104',
//                         txt: 'Assess the potential applicability of these technologies to gas station tasks, considering factors such as safety, efficiency, and cost-effectiveness.',
//                         isDone: false,
//                       },
//                     ],
//                   },
//                   {
//                     title: 'Sensor assessment and selection',
//                     todos: [
//                       { id: 't101', txt: 'Investigate available sensor technologies, including cameras, LiDAR, ultrasonic sensors, and RFID systems.', isDone: false },
//                       { id: 't102', txt: 'Compare the specifications, accuracy, and range of each sensor type to determine their suitability for gas station automation.', isDone: false },
//                       { id: 't104', txt: 'Prioritize sensors that can provide real-time data for navigation, object detection, and human interaction.', isDone: false },
//                     ],
//                   },
//                 ],
//                 attachment: null,
//                 activity: [],
//                 cover: '',
//                 comments: [],
//               },
//               {
//                 id: 'c103',
//                 title: 'Regulatory Compliance Research',
//                 description: 'Research and understand the legal and safety regulations related to deploying robots in gas station environments.',
//                 members: ['u103'],
//                 labels: ['l106', 'l107', 'l103'],
//                 dueDate: 1691661600,
//                 checklists: [],
//                 attachment: null,
//                 activity: [],
//                 cover: 'orange',
//                 comments: [],
//               },
//               {
//                 id: 'c104',
//                 title: 'Cost-Benefit l107',
//                 description: 'Perform a cost-benefit l107 to assess the financial viability and potential return on investment (ROI) of the robot deployment.',
//                 members: ['u102', 'u103'],
//                 labels: ['l106', 'l107', 'l102'],
//                 dueDate: 1691834400,
//                 checklists: [],
//                 attachment: null,
//                 activity: [],
//                 cover: '',
//               },
//               {
//                 id: 'c105',
//                 title: 'Project Timeline',
//                 description: 'Create a detailed project timeline with key milestones and deadlines for the entire development process.',
//                 members: ['u101', 'u102', 'u103'],
//                 labels: ['l110', 'l102'],
//                 dueDate: 1690884000,
//                 checklists: [],
//                 attachment: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690354268/basic_project_timeline_template_from_PowerSlides_ecbxoh.avif',
//                 activity: [],
//                 cover: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690354268/basic_project_timeline_template_from_PowerSlides_ecbxoh.avif',
//                 comments: [],
//               },
//             ],
//           },

//           {
//             id: 'g102',
//             title: 'Design and Development',
//             archivedAt: null,
//             tasks: [
//               {
//                 id: 'c101',
//                 title: 'Conceptual Design',
//                 description: 'Design the initial concept and architecture of the gas station robots, considering safety, efficiency, and user-friendliness.',
//                 members: ['u101', 'u102'],
//                 labels: ['l106', 'l102', 'l105'],
//                 dueDate: 1690303727,
//                 checklists: [
//                   {
//                     title: 'Todo',
//                     todos: [
//                       { id: 't101', txt: 'Brainstorm and sketch initial robot design ideas.', isDone: true },
//                       { id: 't102', txt: 'Consider safety features and risk assessment.', isDone: true },
//                       { id: 't103', txt: 'Collaborate with the team to finalize the concept.', isDone: false },
//                     ],
//                   },
//                 ],
//                 attachment: null,
//                 activity: [],
//                 cover: 'teal',
//                 comments: [],
//               },
//               {
//                 id: 'c102',
//                 title: 'Hardware Selection',
//                 description: 'Select appropriate hardware components, including robotic arms, sensors, cameras, and communication modules.',
//                 members: ['u101', 'u103'],
//                 labels: ['l110', 'l103'],
//                 dueDate: null,
//                 checklists: [],
//                 attachment: null,
//                 activity: [],
//                 cover: 'red',
//                 comments: [
//                   { byUser: 'Bina Hovav', txt: 'This is very urgent', createdAt: null },
//                   { byUser: 'Meitar Mor', txt: 'We need to meet on zoom about this', createdAt: null },
//                 ],
//               },
//               {
//                 id: 'c103',
//                 title: 'Software Development',
//                 description: 'Develop the software and AI algorithms to enable autonomous navigation, fueling, maintenance, and customer interactions.',
//                 members: ['u101', 'u102', 'u103'],
//                 labels: ['l106', 'l103'],
//                 dueDate: 1691143200,
//                 checklists: [
//                   {
//                     title: 'todo',
//                     todos: [
//                       {
//                         id: 't101',
//                         txt: 'Design and implement a robust localization system (e.g., SLAM) to enable the robotic system to map and navigate the gas station environment autonomously.',
//                         isDone: true,
//                       },
//                       {
//                         id: 't102',
//                         txt: 'Develop obstacle avoidance algorithms to ensure the robot can navigate safely and efficiently in a dynamic environment with vehicles and pedestrians.',
//                         isDone: true,
//                       },
//                       {
//                         id: 't103',
//                         txt: 'Implement path planning algorithms to optimize robots route for fueling, maintenance, and customer interactions.',
//                         isDone: true,
//                       },
//                     ],
//                   },
//                 ],
//                 attachment: null,
//                 activity: [],
//                 cover: '',
//                 comments: [],
//               },
//               {
//                 id: 'c104',
//                 title: 'UX/UI Design',
//                 description: 'Design a user-friendly interface for gas station attendants and customers to interact with the robots seamlessly.',
//                 members: ['u103'],
//                 labels: ['l110', 'l102', 'l105'],
//                 dueDate: 1691834400,
//                 checklists: [],
//                 attachment: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690358214/download_wdvxxq.png',
//                 activity: [],
//                 cover: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690358214/download_wdvxxq.png',
//                 comments: [],
//               },
//               {
//                 id: 'c105',
//                 title: 'Prototyping',
//                 description: 'Build functional prototypes of the gas station robots for testing and validation.',
//                 members: ['u101'],
//                 labels: ['l110', 'l102', 'l109'],
//                 dueDate: 1691056800,
//                 checklists: [],
//                 attachment: '',
//                 activity: [],
//                 cover: 'green',
//                 comments: [],
//               },
//             ],
//           },
//           {
//             id: 'g103',
//             title: 'Testing and Refinement',
//             archivedAt: null,
//             tasks: [
//               {
//                 id: 'c101',
//                 title: 'Performance Testing',
//                 description: 'Test the gas station robots under various scenarios to evaluate their performance, efficiency, and accuracy.',
//                 members: ['u101', 'u103'],
//                 labels: ['l110', 'l103'],
//                 dueDate: 1692007200,
//                 checklists: [],
//                 attachment: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690358903/Picture1-1-768x726_nqbwqi.png',
//                 activity: [],
//                 cover: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690358903/Picture1-1-768x726_nqbwqi.png',
//                 comments: [],
//               },
//               {
//                 id: 'c102',
//                 title: 'User Acceptance Testing',
//                 description: 'Conduct user acceptance testing with gas station staff and customers to gather feedback and make improvements.',
//                 members: ['u101'],
//                 labels: ['l106', 'l109', 'l107'],
//                 dueDate: null,
//                 checklists: [
//                   {
//                     title: 'todo',
//                     todos: [
//                       { id: 't101', txt: 'Test Case Preparation', isDone: true },
//                       { id: 't102', txt: 'UAT Environment Setup', isDone: true },
//                       { id: 't103', txt: 'UAT Execution and Issue Reporting', isDone: false },
//                       { id: 't104', txt: 'Feedback Collection and l107', isDone: false },
//                     ],
//                   },
//                 ],
//                 attachment: null,
//                 activity: [],
//                 cover: '',
//                 comments: [],
//               },
//               {
//                 id: 'c103',
//                 title: 'Iterative Refinement',
//                 description: 'Continuously improve robots functionality, user interface, and behavior based on user feedback and real-world testing results.',
//                 members: ['u101', 'u103'],
//                 labels: ['l106', 'l103', 'l109'],
//                 dueDate: null,
//                 checklists: [],
//                 attachment: null,
//                 activity: [],
//                 cover: 'orange',
//                 comments: [],
//               },
//               {
//                 id: 'c104',
//                 title: 'Security Audit',
//                 description: 'Perform a comprehensive security audit to safeguard robots control system from potential cyber threats.',
//                 members: ['u102'],
//                 labels: ['l110'],
//                 dueDate: 1692439200,
//                 checklists: [],
//                 attachment: '',
//                 activity: [],
//                 cover: 'purple',
//                 comments: [],
//               },
//             ],
//           },
//           {
//             id: 'g104',
//             title: 'Deployment and Launch',
//             archivedAt: null,
//             tasks: [
//               {
//                 id: 'c101',
//                 title: 'Pilot Deployment',
//                 description: 'Deploy a pilot fleet of gas station robots in selected gas stations to assess their performance in real-world conditions.',
//                 members: ['u101'],
//                 labels: ['l104', 'l102'],
//                 dueDate: 1691661600,
//                 checklists: [],
//                 attachment: null,
//                 activity: [],
//                 cover: 'lime',
//                 comments: [],
//               },
//               {
//                 id: 'c102',
//                 title: 'Staff Training',
//                 description: 'Provide comprehensive training to gas station attendants and staff for seamless integration with the robot system.',
//                 members: ['u101', 'u102', 'u103'],
//                 labels: ['l110', 'l102', 'l109'],
//                 dueDate: 1691402400,
//                 checklists: [],
//                 attachment: null,
//                 activity: [],
//                 cover: 'pink',
//                 comments: [],
//               },
//               {
//                 id: 'c103',
//                 title: 'Public Relations Campaign',
//                 description: 'Plan and execute a public relations campaign to create awareness and excitement about the innovative robotic gas station.',
//                 members: ['u103'],
//                 labels: ['l110', 'l105', 'l102'],
//                 dueDate: 1691316000,
//                 checklists: [
//                   {
//                     title: 'todo',
//                     todos: [
//                       {
//                         id: 't101',
//                         txt: 'Define campaign objectives',
//                         isDone: true,
//                       },
//                       {
//                         id: 't102',
//                         txt: 'Identify target audience and channels',
//                         isDone: false,
//                       },
//                       {
//                         id: 't103',
//                         txt: 'Develop compelling messages and content',
//                         isDone: false,
//                       },
//                       {
//                         id: 't104',
//                         txt: 'Implement Outreach and Monitor Results',
//                         isDone: false,
//                       },
//                     ],
//                   },
//                 ],
//                 attachment: null,
//                 activity: [],
//                 cover: '',
//                 comments: [],
//               },
//               {
//                 id: 'c104',
//                 title: 'Full-Scale Deployment',
//                 description: 'Roll out the robotic system to gas stations across the region, starting with those that were part of the pilot program.',
//                 members: ['u102', 'u103'],
//                 labels: ['l110'],
//                 dueDate: null,
//                 checklists: [],
//                 attachment: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690360236/large-scale-redundant-setup_d3wkno.png',
//                 activity: [],
//                 cover: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690360236/large-scale-redundant-setup_d3wkno.png',
//                 comments: [],
//               },
//               {
//                 id: 'c105',
//                 title: 'Prototyping',
//                 description: 'Build functional prototypes of the gas station robots for testing and validation.',
//                 members: ['u102'],
//                 labels: ['l110', 'l102', 'l103'],
//                 dueDate: null,
//                 checklists: [],
//                 attachment: '',
//                 activity: [],
//                 cover: 'orange',
//                 comments: [],
//               },
//             ],
//           },
//           {
//             id: 'g105',
//             title: 'Post-Launch Monitoring',
//             archivedAt: null,
//             tasks: [
//               {
//                 id: 'c101',
//                 title: 'Performance Evaluation',
//                 description: 'Monitor and evaluate robots performance, efficiency, and customer satisfaction post-launch.',
//                 members: ['u102'],
//                 labels: ['l104', 'l107'],
//                 dueDate: 1692698400,
//                 checklists: [],
//                 attachment: null,
//                 activity: [],
//                 cover: '',
//                 comments: [],
//               },
//               {
//                 id: 'c102',
//                 title: 'Continuous Improvement',
//                 description: 'Gather feedback from gas station staff and customers to make continuous improvements and updates.',
//                 members: ['u101', 'u102', 'u103'],
//                 labels: ['l104', 'l107', 'l109'],
//                 dueDate: null,
//                 checklists: [
//                   {
//                     title: 'todo',
//                     todos: [
//                       { id: 't101', txt: 'Design feedback collection mechanisms', isDone: true },
//                       { id: 't102', txt: 'Implement regular feedback sessions', isDone: false },
//                       { id: 't103', txt: 'Analyze and interpret feedback data', isDone: false },
//                       { id: 't104', txt: 'Develop and implement improvement plans', isDone: false },
//                     ],
//                   },
//                 ],
//                 attachment: null,
//                 activity: [],
//                 cover: 'teal',
//                 comments: [[{ byUser: 'Bina Hovav', txt: 'We should meet weekly about this', createdAt: null }]],
//               },
//               {
//                 id: 'c103',
//                 title: 'Expansion Planning',
//                 description: 'Plan for the expansion of the robotic gas station system to other regions and countries.',
//                 members: ['u101'],
//                 labels: ['l106', 'l102'],
//                 dueDate: null,
//                 checklists: [],
//                 attachment: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690360672/wedding_table_planner_powerpoint_2_mzgb5g.jpg',
//                 activity: [],
//                 cover: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690360672/wedding_table_planner_powerpoint_2_mzgb5g.jpg',
//                 comments: [],
//               },
//               {
//                 id: 'c104',
//                 title: 'Software Updates and Upgrades',
//                 description: 'Regularly update robots software to introduce new features and enhancements.',
//                 members: ['u101', 'u102', 'u103'],
//                 labels: ['l106', 'l103'],
//                 dueDate: null,
//                 checklists: [],
//                 attachment: '',
//                 activity: [],
//                 cover: 'purple',
//                 comments: [],
//               },
//               {
//                 id: 'c105',
//                 title: 'Success Metrics l107',
//                 description: "Analyze key success metrics, such as customer wait times, fueling efficiency, and cost savings, to assess the project's overall impact.",
//                 members: ['u102', 'u103'],
//                 labels: ['l109', 'l107', 'l108'],
//                 dueDate: 1693476000,
//                 checklists: [],
//                 attachment: '',
//                 activity: [],
//                 cover: '',
//                 comments: [],
//               },
//             ],
//           },
//         ],
//         style: {},
//         activitys:[],
//       },

//       {
//         _id: 'b102',
//         title: 'Project Management',
//         imgUrl: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690460257/gradient_wresqa.jpg',
//       },
//       {
//         _id: 'b103',
//         title: 'Kanban Template',
//         imgUrl: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690460260/Screenshot_2023-07-27_at_15.16.27_dziz4h.jpg',
//       },
//       {
//         _id: 'b104',
//         title: 'Simple Project Board',
//         imgUrl: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690460839/ren-ran-Jy6luiLBsrk-unsplash_f92t1z.jpg',
//       },
//       {
//         _id: 'b105',
//         title: 'Remote Team Hub',
//         imgUrl: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690460927/ankush-minda-7KKQG0eB_TI-unsplash_u7drj5.jpg',
//       },
//       {
//         _id: 'b106',
//         title: 'Smart Health Devices',
//         imgUrl: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690446239/martin-martz-voOla3T8TAM-unsplash_uwhvl2.jpg',
//       },
//       {
//         _id: 'b107',
//         title: 'AI-Powered Learning',
//         imgUrl: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690446242/marek-piwnicki-FFofrEuXsL4-unsplash_vnnykd.jpg',
//       },
//       {
//         _id: 'b108',
//         title: 'Enhanced Online Security',
//         imgUrl: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690446239/javier-miranda-kBU5APay4T0-unsplash_iscwqp.jpg',
//       },
//       {
//         _id: 'b109',
//         title: 'Mobile Payment Solutions',
//         imgUrl: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690446244/marek-piwnicki-5MVnLlI3Flg-unsplash_cyqyb6.jpg',
//       },
//       {
//         _id: 'b110',
//         title: 'Intelligent Chat Support',
//         imgUrl: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690446241/marek-piwnicki-pjf3gGDvTeM-unsplash_ww11qq.jpg',
//       },
//     ])
//   )
// })()
