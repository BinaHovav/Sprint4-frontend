import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

export const boardService = {
  query,
  getById,
  save,
  remove,
  getEmptyBoard,
  getEmptyGroup,
  getEmptyTask,
  getEmptyActivity,
}

window.cs = boardService // for console usage

async function query(filterBy = { txt: '' }) {
  return httpService.get('board', filterBy)
}
function getById(boardId) {
  return httpService.get(`board/${boardId}`)
}

async function remove(boardId) {
  return httpService.delete(`board/${boardId}`)
}
async function save(board) {
  var savedBoard
  if (board._id) {
    // console.log(board)
    savedBoard = await httpService.put(`board/${board._id}`, board)
  } else {
    savedBoard = await httpService.post('board', board)
  }
  return savedBoard
}

function getEmptyBoard() {
  return {
    title: '',
    imgUrl: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1690442303/jefferson-sees-XbeDTBjTbME-unsplash_g3n7hb.jpg',
    isStarred: false,
    archivedAt: null,
    createdBy: null,
    groups: [],
    style: {},
    labels: [],
    members: [],
    activities: []
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
    date: {
      dueDate: null,
      startDate: null,
      isDone: false,
    },
    checklists: [],
    attachments: [],
    activity: [],
    cover: { background: '', isFull: false },
    comments: [],
  }
}

function getEmptyActivity() {
  return {
    id: utilService.makeId(6),
    action: {},
    date: Date.now(),
    by: '',
  }
}
