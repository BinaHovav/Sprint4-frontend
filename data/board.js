// Guidelines
// boardStore (no need for groupStore, taskStore), boardService
// *. Support saving the entire board and also on the task level,
// *. No need for saving an activities array per task, those activities are easily filtered from the board activities

// *. activites - when board is updated, the frontend does not send the activities array within the board
//    instead it only sends a new activity object: {txt, boardId, groupId, taskId}
//    the backend adds this activity to the board with $push and can also emit socket notificatios

// *. D & D Guidelines - vue-smooth-dnd / vuedraggable / react-beutiful-dnd
// *. Same model for Monday style app (do not implement a generic columns feature)
// *. We do not handle concurrent editing - needs versioning

// Rendering performance:
// Store Mutation - saveBoard
// state.board = board
// Later, support switching a specific task

// <BoardDetails> => <BoardGroup v-for / map>
// <BoardGroup> => <TaskPreview v-for / map>
// <TaskDetails> (supports edit) - initially can be loaded in seperate route
// (later on we can place it in a modal and nested route)

// The comment feature can be implemented with activity
const activity = {
  id: makeId(),
  txt: 'Changed Color',
  createdAt: Date.now(),
  byMember: userService.getLoggedinUser(),
  group: group, // optional
  task: task, // optional
}

// Store - saveTask
function storeSaveTask(boardId, groupId, task, activity) {
  board = boardService.saveTask(boardId, groupId, task, activity)
  // commit(ACTION) // dispatch(ACTION)
}

// boardService
function saveTask(boardId, groupId, task, activity) {
  const board = getById(boardId)
  // PUT /api/board/b123/task/t678

  // TODO: find the task, and update
  board.activities.unshift(activity)
  saveBoard(board)
  // return board
  // return task
}

// const board = {
//   _id: 'b101',
//   title: 'Gas station robotics',
//   isStarred: false,
//   archivedAt: null,
//   createdBy: {
//     _id: 'u101',
//     fullname: 'Meitar Mor',
//     imgUrl: '',
//   },
//   style: {
//     backgroundImage: '',
//   },
//   labels: [
//     {
//       id: 'l101',
//       title: 'Timeline',
//       color: '#164b35',
//       backgroundColor: 'green',
//     },
//     {
//       id: 'l102',
//       title: 'Planning',
//       color: '#faa53d',
//       backgroundColor: 'orange',
//     },
//     {
//       id: 'l103',
//       title: 'Techonology',
//       color: '#faa53d',
//       backgroundColor: 'red',
//     },
//     {
//       id: 'l104',
//       title: 'Research',
//       color: '#faa53d',
//       backgroundColor: 'yellow',
//     },
//     {
//       id: 'l105',
//       title: 'Design',
//       color: '#faa53d',
//       backgroundColor: 'pink',
//     },
//     {
//       id: 'l106',
//       title: 'Architecutre',
//       color: '#faa53d',
//       backgroundColor: 'lime',
//     },
//     {
//       id: 'l107',
//       title: 'Analysis',
//       color: '#faa53d',
//       backgroundColor: 'blue',
//     },
//     {
//       id: 'l108',
//       title: 'Finance',
//       color: '#faa53d',
//       backgroundColor: 'sky',
//     },
//     {
//       id: 'l109',
//       title: 'Compliance',
//       color: '#faa53d',
//       backgroundColor: 'purple',
//     },
//   ],
//   members: [
//     {
//       _id: 'u101',
//       fullname: 'Meitar Mor',
//       imgUrl: '',
//     },
//     {
//       _id: 'u102',
//       fullname: 'Tomer Appelman',
//       imgUrl: '',
//     },
//     {
//       _id: 'u103',
//       fullname: 'Bina Hovav',
//       imgUrl: '',
//     },
//   ],
//   groups: [
//     {
//       id: 'g101',
//       title: 'Research and Planning',
//       archivedAt: null,
//       tasks: [
//         {
//           id: 'c101',
//           title: 'Market Research',
//           description: 'Conduct an in-depth market analysis to identify potential opportunities, target markets, and competitor solutions in the gas station automation industry.',
//           members: [
//             {
//               _id: 'u101',
//               fullname: 'Meitar Mor',
//               imgUrl: '',
//             },
//             {
//               _id: 'u102',
//               fullname: 'Tomer Appelman',
//               imgUrl: '',
//             },
//             {
//               _id: 'u103',
//               fullname: 'Bina Hovav',
//               imgUrl: '',
//             },
//           ],
//           labels: ['Research', 'Planning'],
//           dueDate: 1690303727,
//           checklists: [
//             {
//               title: 'Todo',
//               todos: [
//                 'Gather data on existing gas station automation solutions',
//                 'Identify key competitors and their offerings.',
//                 'Analyze market trends and customer preferences.',
//                 'Compile a comprehensive report on the market analysis findings.',
//               ],
//             },
//           ],
//           activity: [],
//         },
//         {
//           id: 'c102',
//           title: 'Add Samples',
//         },
//       ],
//       style: {},
//     },
//     {
//       id: 'g102',
//       title: 'Group 2',
//       tasks: [
//         {
//           id: 'c103',
//           title: 'Do that',
//           archivedAt: 1589983468418,
//         },
//         {
//           id: 'c104',
//           title: 'Help me',
//           status: 'in-progress', // monday
//           priority: 'high',
//           description: 'description',
//           comments: [
//             {
//               id: 'ZdPnm',
//               txt: 'also @yaronb please CR this',
//               createdAt: 1590999817436,
//               byMember: {
//                 _id: 'u101',
//                 fullname: 'Tal Tarablus',
//                 imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
//               },
//             },
//           ],
//           checklists: [
//             {
//               id: 'YEhmF',
//               title: 'Checklist',
//               todos: [
//                 {
//                   id: '212jX',
//                   title: 'To Do 1',
//                   isDone: false,
//                 },
//               ],
//             },
//           ],
//           memberIds: ['u101'],
//           labelIds: ['l101', 'l102'],
//           dueDate: 16156215211,
//           byMember: {
//             _id: 'u101',
//             username: 'Tal',
//             fullname: 'Tal Tarablus',
//             imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
//           },
//           style: {
//             bgColor: '#26de81',
//           },
//         },
//       ],
//       style: {},
//     },
//   ],
//   activities: [
//     {
//       id: 'a101',
//       txt: 'Changed Color',
//       createdAt: 154514,
//       byMember: {
//         _id: 'u101',
//         fullname: 'Abi Abambi',
//         imgUrl: 'http://some-img',
//       },
//       task: {
//         id: 'c101',
//         title: 'Replace Logo',
//       },
//     },
//   ],

//   cmpsOrder: ['StatusPicker', 'MemberPicker', 'DatePicker'],
// }

const user = {
  _id: 'u101',
  fullname: 'Abi Abambi',
  username: 'abi@ababmi.com',
  password: 'aBambi123',
  imgUrl: 'http://some-img.jpg',
  mentions: [
    {
      //optional
      id: 'm101',
      boardId: 'm101',
      taskId: 't101',
    },
  ],
}

// <LabelPicker info={} onUpdate={} />
// <MemberPicker info={} onUpdate={} />
// <DatePicker info={} onUpdate={} />

// <DynamicPicker info={} onUpdate={} >

// For Monday Mostly:
// Dynamic Components:

// <TaskPreview> => <tr>
//    <td v-for="(cmpType) in cmpsOrder">
//         <Component :is="cmpType" :info="getCmpInfo(cmpType)" @updated="updateTask(cmpType, $event)">
//    </td>
// </tr>

function updateTask(cmpType, data) {
  // Switch by cmpType
  // case MEMBERS:
  //    task.members = data
  //    activity = boardService.getEmptyActivity()
  //    activity.txt = `Members changed for task ${}`
  //    activity.task = '{mini-task}'
  // case STATUS:
  //    task.status = data
  // dispatch to store: updateTask(task, activity)
}

const cmp1 = {
  type: 'StatusPicker',
  info: {
    selectedStatus: 'pending',
    statuses: [{}, {}],
  },
}

const cmp2 = {
  type: 'MemberPicker',
  info: {
    selectedMembers: ['m1', 'm2'],
    members: ['m1', 'm2', 'm3'],
  },
}

const cmp3 = {
  type: 'DatePicker',
  info: {
    selectedDate: '2022-09-07',
  },
}

// React.js
// export function TaskPreview({ task }) {
//     //GET FROM STORE
//     const cmpsOrder = [
//       "status-picker",
//       "member-picker",
//       "date-picker",
//       "priority-picker",
//     ];
//     return (
//       <section>
//         <h5>{task.txt}</h5>
//         {cmpsOrder.map((cmp, idx) => {
//           return (
//             <DynamicCmp
//               cmp={cmp}
//               key={idx}
//               onUpdate={(data) => {
//                 console.log("Updating: ", cmp, "with data:", data);
//                 // make a copy, update the task, create an action
//                 // Call action: updateTask(task, action)
//               }}
//             />
//           );
//         })}
//       </section>
//     );
//   }

// export function DynamicCmp({ cmp, info, onUpdate }) {
//     switch (cmp) {
//         case "status-picker":
//             return <StatusPicker info={info} onUpdate={onUpdate} />;
//         case "member-picker":
//             return <MemberPicker info={info} onUpdate={onUpdate} />;
//         default:
//             return <p>UNKNOWN {cmp}</p>;
//     }
// }


// ;(async () => {
//   await storageService.post(STORAGE_KEY, {
//     _id: 'b101',
//     title: 'Gas station robotics',
//     isStarred: false,
//     archivedAt: null,
//     createdBy: {
//       _id: 'u101',
//       fullname: 'Meitar Mor',
//       imgUrl: '',
//     },
//     style: {
//       backgroundImage: '',
//     },
//     labels: [
//       {
//         id: 'l101',
//         title: 'Low priority',
//         color: 'green',
//       },
//       {
//         id: 'l102',
//         title: 'Planing',
//         color: 'orange',
//       },
//       {
//         id: 'l103',
//         title: 'Techonology',
//         color: 'light-green',
//       },
//       {
//         id: 'l104',
//         title: 'Research',
//         color: 'yellow',
//       },
//       {
//         id: 'l105',
//         title: 'Design',
//         color: 'pink',
//       },
//       {
//         id: 'l106',
//         title: 'l106',
//         color: 'light-yellow',
//       },
//       {
//         id: 'l107',
//         title: 'l107',
//         color: 'blue',
//       },
//       {
//         id: 'l108',
//         title: 'Finance',
//         color: 'sky',
//       },
//       {
//         id: 'l109',
//         title: 'Enhancement',
//         color: 'purple',
//       },
//       {
//         id: 'l110',
//         title: 'High priority',
//         color: 'red',
//       },
//     ],
//     members: [
//       {
//         _id: 'u101',
//         fullname: 'Meitar Mor',
//         imgUrl: '',
//       },
//       {
//         _id: 'u102',
//         fullname: 'Tomer Appelman',
//         imgUrl: '',
//       },
//       {
//         _id: 'u103',
//         fullname: 'Bina Hovav',
//         imgUrl: '',
//       },
//     ],
//     groups: [
//       {
//         id: 'g101',
//         title: 'Research and Planning',
//         archivedAt: null,
//         tasks: [
//           {
//             id: 'c101',
//             title: 'Market Research',
//             description: 'Conduct an in-depth market l107 to identify potential opportunities, target markets, and competitor solutions in the gas station automation industry.',
//             members: [
//               {
//                 _id: 'u101',
//                 fullname: 'Meitar Mor',
//                 imgUrl: '',
//               },
//               {
//                 _id: 'u102',
//                 fullname: 'Tomer Appelman',
//                 imgUrl: '',
//               },
//               {
//                 _id: 'u103',
//                 fullname: 'Bina Hovav',
//                 imgUrl: '',
//               },
//             ],
//             labels: ['l101', 'l102'],
//             dueDate: 1690303727,
//             checklists: [
//               {
//                 title: 'Todo',
//                 todos: [
//                   { id: 't101', txt: 'Gather data on existing gas station automation solutions', isDone: true },
//                   { id: 't102', txt: 'Identify key competitors and their offerings.', isDone: false },
//                   { id: 't103', txt: 'Analyze market trends and customer preferences.', isDone: false },
//                   { id: 't104', txt: 'Compile a comprehensive report on the market l107 findings.', isDone: false },
//                 ],
//               },
//             ],
//             attachment: null,
//             activity: [],
//             cover: 'green',
//             comments: [],
//           },
//           {
//             id: 'c102',
//             title: 'l103 Evaluation',
//             description: 'Evaluate existing robotic technologies, sensors, and AI algorithms suitable for automating gas station tasks.',
//             members: [
//               {
//                 _id: 'u102',
//                 fullname: 'Tomer Appelman',
//                 imgUrl: '',
//               },
//               {
//                 _id: 'u103',
//                 fullname: 'Bina Hovav',
//                 imgUrl: '',
//               },
//             ],
//             labels: ['l106', 'l107', 'l103'],
//             dueDate: null,
//             checklists: [
//               {
//                 title: 'Research and review existing robotic technologies',
//                 todos: [
//                   { id: 't101', txt: 'Identify and compile a list of robotic technologies currently used in various industries.', isDone: true },
//                   { id: 't102', txt: 'Evaluate the capabilities and limitations of each robotic l103 in terms of mobility, dexterity, and adaptability.', isDone: true },
//                   {
//                     id: 't104',
//                     txt: 'Assess the potential applicability of these technologies to gas station tasks, considering factors such as safety, efficiency, and cost-effectiveness.',
//                     isDone: false,
//                   },
//                 ],
//               },
//               {
//                 title: 'Sensor assessment and selection',
//                 todos: [
//                   { id: 't101', txt: 'Investigate available sensor technologies, including cameras, LiDAR, ultrasonic sensors, and RFID systems.', isDone: false },
//                   { id: 't102', txt: 'Compare the specifications, accuracy, and range of each sensor type to determine their suitability for gas station automation.', isDone: false },
//                   { id: 't104', txt: 'Prioritize sensors that can provide real-time data for navigation, object detection, and human interaction.', isDone: false },
//                 ],
//               },
//             ],
//             attachment: null,
//             activity: [],
//             cover: '',
//             comments: [],
//           },
//           {
//             id: 'c103',
//             title: 'Regulatory Compliance Research',
//             description: 'Research and understand the legal and safety regulations related to deploying robots in gas station environments.',
//             members: [
//               {
//                 _id: 'u103',
//                 fullname: 'Bina Hovav',
//                 imgUrl: '',
//               },
//             ],
//             labels: ['l106', 'l107', 'l103'],
//             dueDate: 1691661600,
//             checklists: [],
//             attachment: null,
//             activity: [],
//             cover: 'orange',
//             comments: [],
//           },
//           {
//             id: 'c104',
//             title: 'Cost-Benefit l107',
//             description: 'Perform a cost-benefit l107 to assess the financial viability and potential return on investment (ROI) of the robot deployment.',
//             members: [
//               {
//                 _id: 'u102',
//                 fullname: 'Tomer Appelman',
//                 imgUrl: '',
//               },
//               {
//                 _id: 'u103',
//                 fullname: 'Bina Hovav',
//                 imgUrl: '',
//               },
//             ],
//             labels: ['l106', 'l107', 'l102'],
//             dueDate: 1691834400,
//             checklists: [],
//             attachment: null,
//             activity: [],
//             cover: '',
//           },
//           {
//             id: 'c105',
//             title: 'Project Timeline',
//             description: 'Create a detailed project timeline with key milestones and deadlines for the entire development process.',
//             members: [
//               {
//                 _id: 'u101',
//                 fullname: 'Meitar Mor',
//                 imgUrl: '',
//               },
//               {
//                 _id: 'u102',
//                 fullname: 'Tomer Appelman',
//                 imgUrl: '',
//               },
//               {
//                 _id: 'u103',
//                 fullname: 'Bina Hovav',
//                 imgUrl: '',
//               },
//             ],
//             labels: ['l110', 'l102'],
//             dueDate: 1690884000,
//             checklists: [],
//             attachment: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690354268/basic_project_timeline_template_from_PowerSlides_ecbxoh.avif',
//             activity: [],
//             cover: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690354268/basic_project_timeline_template_from_PowerSlides_ecbxoh.avif',
//             comments: [],
//           },
//         ],
//       },

//       {
//         id: 'g102',
//         title: 'Design and Development',
//         archivedAt: null,
//         tasks: [
//           {
//             id: 'c101',
//             title: 'Conceptual Design',
//             description: 'Design the initial concept and architecture of the gas station robots, considering safety, efficiency, and user-friendliness.',
//             members: [
//               {
//                 _id: 'u101',
//                 fullname: 'Meitar Mor',
//                 imgUrl: '',
//               },
//               {
//                 _id: 'u102',
//                 fullname: 'Tomer Appelman',
//                 imgUrl: '',
//               },
//             ],
//             labels: ['l106', 'l102', 'l105'],
//             dueDate: 1690303727,
//             checklists: [
//               {
//                 title: 'Todo',
//                 todos: [
//                   { id: 't101', txt: 'Brainstorm and sketch initial robot design ideas.', isDone: true },
//                   { id: 't102', txt: 'Consider safety features and risk assessment.', isDone: true },
//                   { id: 't103', txt: 'Collaborate with the team to finalize the concept.', isDone: false },
//                 ],
//               },
//             ],
//             attachment: null,
//             activity: [],
//             cover: 'sky',
//             comments: [],
//           },
//           {
//             id: 'c102',
//             title: 'Hardware Selection',
//             description: 'Select appropriate hardware components, including robotic arms, sensors, cameras, and communication modules.',
//             members: [
//               {
//                 _id: 'u101',
//                 fullname: 'Meitar Mor',
//                 imgUrl: '',
//               },
//               {
//                 _id: 'u103',
//                 fullname: 'Bina Hovav',
//                 imgUrl: '',
//               },
//             ],
//             labels: ['l110', 'l103'],
//             dueDate: null,
//             checklists: [],
//             attachment: null,
//             activity: [],
//             cover: 'red',
//             comments: [
//               { byUser: 'Bina Hovav', txt: 'This is very urgent', createdAt: null },
//               { byUser: 'Meitar Mor', txt: 'We need to meet on zoom about this', createdAt: null },
//             ],
//           },
//           {
//             id: 'c103',
//             title: 'Software Development',
//             description: 'Develop the software and AI algorithms to enable autonomous navigation, fueling, maintenance, and customer interactions.',
//             members: [
//               {
//                 _id: 'u101',
//                 fullname: 'Meitar Mor',
//                 imgUrl: '',
//               },
//               {
//                 _id: 'u102',
//                 fullname: 'Tomer Appelman',
//                 imgUrl: '',
//               },
//               {
//                 _id: 'u103',
//                 fullname: 'Bina Hovav',
//                 imgUrl: '',
//               },
//             ],
//             labels: ['l106', 'l103'],
//             dueDate: 1691143200,
//             checklists: [
//               {
//                 title: 'todo',
//                 todos: [
//                   {
//                     id: 't101',
//                     txt: 'Design and implement a robust localization system (e.g., SLAM) to enable the robotic system to map and navigate the gas station environment autonomously.',
//                     isDone: true,
//                   },
//                   {
//                     id: 't102',
//                     txt: 'Develop obstacle avoidance algorithms to ensure the robot can navigate safely and efficiently in a dynamic environment with vehicles and pedestrians.',
//                     isDone: true,
//                   },
//                   {
//                     id: 't103',
//                     txt: 'Implement path planning algorithms to optimize robots route for fueling, maintenance, and customer interactions.',
//                     isDone: true,
//                   },
//                 ],
//               },
//             ],
//             attachment: null,
//             activity: [],
//             cover: '',
//             comments: [],
//           },
//           {
//             id: 'c104',
//             title: 'UX/UI Design',
//             description: 'Design a user-friendly interface for gas station attendants and customers to interact with the robots seamlessly.',
//             members: [
//               {
//                 _id: 'u103',
//                 fullname: 'Bina Hovav',
//                 imgUrl: '',
//               },
//             ],
//             labels: ['l110', 'l102', 'l105'],
//             dueDate: 1691834400,
//             checklists: [],
//             attachment: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690358214/download_wdvxxq.png',
//             activity: [],
//             cover: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690358214/download_wdvxxq.png',
//             comments: [],
//           },
//           {
//             id: 'c105',
//             title: 'Prototyping',
//             description: 'Build functional prototypes of the gas station robots for testing and validation.',
//             members: [
//               {
//                 _id: 'u101',
//                 fullname: 'Meitar Mor',
//                 imgUrl: '',
//               },
//             ],
//             labels: ['l110', 'l102', 'l109'],
//             dueDate: 1691056800,
//             checklists: [],
//             attachment: '',
//             activity: [],
//             cover: 'green',
//             comments: [],
//           },
//         ],
//       },
//       {
//         id: 'g103',
//         title: 'Testing and Refinement',
//         archivedAt: null,
//         tasks: [
//           {
//             id: 'c101',
//             title: 'Performance Testing',
//             description: 'Test the gas station robots under various scenarios to evaluate their performance, efficiency, and accuracy.',
//             members: [
//               {
//                 _id: 'u101',
//                 fullname: 'Meitar Mor',
//                 imgUrl: '',
//               },
//               {
//                 _id: 'u103',
//                 fullname: 'Bina Hovav',
//                 imgUrl: '',
//               },
//             ],
//             labels: ['l110', 'l103'],
//             dueDate: 1692007200,
//             checklists: [],
//             attachment: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690358903/Picture1-1-768x726_nqbwqi.png',
//             activity: [],
//             cover: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690358903/Picture1-1-768x726_nqbwqi.png',
//             comments: [],
//           },
//           {
//             id: 'c102',
//             title: 'User Acceptance Testing',
//             description: 'Conduct user acceptance testing with gas station staff and customers to gather feedback and make improvements.',
//             members: [
//               {
//                 _id: 'u101',
//                 fullname: 'Meitar Mor',
//                 imgUrl: '',
//               },
//             ],
//             labels: ['l106', 'l109', 'l107'],
//             dueDate: null,
//             checklists: [
//               {
//                 title: 'todo',
//                 todos: [
//                   { id: 't101', txt: 'Test Case Preparation', isDone: true },
//                   { id: 't102', txt: 'UAT Environment Setup', isDone: true },
//                   { id: 't103', txt: 'UAT Execution and Issue Reporting', isDone: false },
//                   { id: 't104', txt: 'Feedback Collection and l107', isDone: false },
//                 ],
//               },
//             ],
//             attachment: null,
//             activity: [],
//             cover: '',
//             comments: [],
//           },
//           {
//             id: 'c103',
//             title: 'Iterative Refinement',
//             description: 'Continuously improve robots functionality, user interface, and behavior based on user feedback and real-world testing results.',
//             members: [
//               {
//                 _id: 'u101',
//                 fullname: 'Meitar Mor',
//                 imgUrl: '',
//               },

//               {
//                 _id: 'u103',
//                 fullname: 'Bina Hovav',
//                 imgUrl: '',
//               },
//             ],
//             labels: ['l106', 'l103', 'l109'],
//             dueDate: null,
//             checklists: [],
//             attachment: null,
//             activity: [],
//             cover: 'orange',
//             comments: [],
//           },
//           {
//             id: 'c104',
//             title: 'Security Audit',
//             description: 'Perform a comprehensive security audit to safeguard robots control system from potential cyber threats.',
//             members: [
//               {
//                 _id: 'u102',
//                 fullname: 'Tomer Appelman',
//                 imgUrl: '',
//               },
//             ],
//             labels: ['l110'],
//             dueDate: 1692439200,
//             checklists: [],
//             attachment: '',
//             activity: [],
//             cover: 'purple',
//             comments: [],
//           },
//         ],
//       },
//       {
//         id: 'g104',
//         title: 'Deployment and Launch',
//         archivedAt: null,
//         tasks: [
//           {
//             id: 'c101',
//             title: 'Pilot Deployment',
//             description: 'Deploy a pilot fleet of gas station robots in selected gas stations to assess their performance in real-world conditions.',
//             members: [
//               {
//                 _id: 'u101',
//                 fullname: 'Meitar Mor',
//                 imgUrl: '',
//               },
//             ],
//             labels: ['l104', 'l102'],
//             dueDate: 1691661600,
//             checklists: [],
//             attachment: null,
//             activity: [],
//             cover: 'lime',
//             comments: [],
//           },
//           {
//             id: 'c102',
//             title: 'Staff Training',
//             description: 'Provide comprehensive training to gas station attendants and staff for seamless integration with the robot system.',
//             members: [
//               {
//                 _id: 'u101',
//                 fullname: 'Meitar Mor',
//                 imgUrl: '',
//               },
//               {
//                 _id: 'u102',
//                 fullname: 'Tomer Appelman',
//                 imgUrl: '',
//               },
//               {
//                 _id: 'u103',
//                 fullname: 'Bina Hovav',
//                 imgUrl: '',
//               },
//             ],
//             labels: ['l110', 'l102', 'l109'],
//             dueDate: 1691402400,
//             checklists: [],
//             attachment: null,
//             activity: [],
//             cover: 'pink',
//             comments: [],
//           },
//           {
//             id: 'c103',
//             title: 'Public Relations Campaign',
//             description: 'Plan and execute a public relations campaign to create awareness and excitement about the innovative robotic gas station.',
//             members: [
//               {
//                 _id: 'u103',
//                 fullname: 'Bina Hovav',
//                 imgUrl: '',
//               },
//             ],
//             labels: ['l110', 'l105', 'l102'],
//             dueDate: 1691316000,
//             checklists: [
//               {
//                 title: 'todo',
//                 todos: [
//                   {
//                     id: 't101',
//                     txt: 'Define campaign objectives',
//                     isDone: true,
//                   },
//                   {
//                     id: 't102',
//                     txt: 'Identify target audience and channels',
//                     isDone: false,
//                   },
//                   {
//                     id: 't103',
//                     txt: 'Develop compelling messages and content',
//                     isDone: false,
//                   },
//                   {
//                     id: 't104',
//                     txt: 'Implement Outreach and Monitor Results',
//                     isDone: false,
//                   },
//                 ],
//               },
//             ],
//             attachment: null,
//             activity: [],
//             cover: '',
//             comments: [],
//           },
//           {
//             id: 'c104',
//             title: 'Full-Scale Deployment',
//             description: 'Roll out the robotic system to gas stations across the region, starting with those that were part of the pilot program.',
//             members: [
//               {
//                 _id: 'u102',
//                 fullname: 'Tomer Appelman',
//                 imgUrl: '',
//               },
//               {
//                 _id: 'u103',
//                 fullname: 'Bina Hovav',
//                 imgUrl: '',
//               },
//             ],
//             labels: ['l110'],
//             dueDate: null,
//             checklists: [],
//             attachment: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690360236/large-scale-redundant-setup_d3wkno.png',
//             activity: [],
//             cover: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690360236/large-scale-redundant-setup_d3wkno.png',
//             comments: [],
//           },
//           {
//             id: 'c105',
//             title: 'Prototyping',
//             description: 'Build functional prototypes of the gas station robots for testing and validation.',
//             members: [
//               {
//                 _id: 'u102',
//                 fullname: 'Tomer Appelman',
//                 imgUrl: '',
//               },
//             ],
//             labels: ['l110', 'l102', 'l103'],
//             dueDate: null,
//             checklists: [],
//             attachment: '',
//             activity: [],
//             cover: 'orange',
//             comments: [],
//           },
//         ],
//       },
//       {
//         id: 'g105',
//         title: 'Post-Launch Monitoring',
//         archivedAt: null,
//         tasks: [
//           {
//             id: 'c101',
//             title: 'Performance Evaluation',
//             description: 'Monitor and evaluate robots performance, efficiency, and customer satisfaction post-launch.',
//             members: [
//               {
//                 _id: 'u102',
//                 fullname: 'Tomer Appelman',
//                 imgUrl: '',
//               },
//             ],
//             labels: ['l104', 'l107'],
//             dueDate: 1692698400,
//             checklists: [],
//             attachment: null,
//             activity: [],
//             cover: '',
//             comments: [],
//           },
//           {
//             id: 'c102',
//             title: 'Continuous Improvement',
//             description: 'Gather feedback from gas station staff and customers to make continuous improvements and updates.',
//             members: [
//               {
//                 _id: 'u101',
//                 fullname: 'Meitar Mor',
//                 imgUrl: '',
//               },
//               {
//                 _id: 'u102',
//                 fullname: 'Tomer Appelman',
//                 imgUrl: '',
//               },
//               {
//                 _id: 'u103',
//                 fullname: 'Bina Hovav',
//                 imgUrl: '',
//               },
//             ],
//             labels: ['l104', 'l107', 'l109'],
//             dueDate: null,
//             checklists: [
//               {
//                 title: 'todo',
//                 todos: [
//                   { id: 't101', txt: 'Design feedback collection mechanisms', isDone: true },
//                   { id: 't102', txt: 'Implement regular feedback sessions', isDone: false },
//                   { id: 't103', txt: 'Analyze and interpret feedback data', isDone: false },
//                   { id: 't104', txt: 'Develop and implement improvement plans', isDone: false },
//                 ],
//               },
//             ],
//             attachment: null,
//             activity: [],
//             cover: 'sky',
//             comments: [[{ byUser: 'Bina Hovav', txt: 'We should meet weekly about this', createdAt: null }]],
//           },
//           {
//             id: 'c103',
//             title: 'Expansion Planning',
//             description: 'Plan for the expansion of the robotic gas station system to other regions and countries.',
//             members: [
//               {
//                 _id: 'u101',
//                 fullname: 'Meitar Mor',
//                 imgUrl: '',
//               },
//             ],
//             labels: ['l106', 'l102'],
//             dueDate: null,
//             checklists: [],
//             attachment: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690360672/wedding_table_planner_powerpoint_2_mzgb5g.jpg',
//             activity: [],
//             cover: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690360672/wedding_table_planner_powerpoint_2_mzgb5g.jpg',
//             comments: [],
//           },
//           {
//             id: 'c104',
//             title: 'Software Updates and Upgrades',
//             description: 'Regularly update robots software to introduce new features and enhancements.',
//             members: [
//               {
//                 _id: 'u101',
//                 fullname: 'Meitar Mor',
//                 imgUrl: '',
//               },
//               {
//                 _id: 'u102',
//                 fullname: 'Tomer Appelman',
//                 imgUrl: '',
//               },
//               {
//                 _id: 'u103',
//                 fullname: 'Bina Hovav',
//                 imgUrl: '',
//               },
//             ],
//             labels: ['l106', 'l103'],
//             dueDate: null,
//             checklists: [],
//             attachment: '',
//             activity: [],
//             cover: 'purple',
//             comments: [],
//           },
//           {
//             id: 'c105',
//             title: 'Success Metrics l107',
//             description: "Analyze key success metrics, such as customer wait times, fueling efficiency, and cost savings, to assess the project's overall impact.",
//             members: [
//               {
//                 _id: 'u102',
//                 fullname: 'Tomer Appelman',
//                 imgUrl: '',
//               },
//               {
//                 _id: 'u103',
//                 fullname: 'Bina Hovav',
//                 imgUrl: '',
//               },
//             ],
//             labels: ['l109', 'l107', 'l108'],
//             dueDate: 1693476000,
//             checklists: [],
//             attachment: '',
//             activity: [],
//             cover: '',
//             comments: [],
//           },
//         ],
//       },
//     ],
//     style: {},
//   })
// })()