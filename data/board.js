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
