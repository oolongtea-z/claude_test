'use strict';

// ── State ────────────────────────────────────────────────────────────────────
let tasks = [];       // [{ id, text, completed }]
let filter = 'all';   // 'all' | 'active' | 'completed'

// ── Persistence ──────────────────────────────────────────────────────────────
function loadState() {
  try {
    const raw = localStorage.getItem('todos');
    tasks = raw ? JSON.parse(raw) : [];
  } catch {
    tasks = [];
  }
}

function saveState() {
  localStorage.setItem('todos', JSON.stringify(tasks));
}

// ── Mutations ─────────────────────────────────────────────────────────────────
function addTask(text) {
  text = text.trim();
  if (!text) return;
  tasks.push({ id: Date.now(), text, completed: false });
  saveState();
  render();
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) { task.completed = !task.completed; saveState(); render(); }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveState();
  render();
}

function toggleAll(checked) {
  tasks.forEach(t => { t.completed = checked; });
  saveState();
  render();
}

function clearCompleted() {
  tasks = tasks.filter(t => !t.completed);
  saveState();
  render();
}

function setFilter(value) {
  filter = value;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  render();
}

// ── Render ────────────────────────────────────────────────────────────────────
function createTaskElement(task) {
  const li = document.createElement('li');

  const cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.className = 'task-checkbox';
  cb.checked = task.completed;
  cb.dataset.id = task.id;

  const label = document.createElement('span');
  label.className = 'task-label' + (task.completed ? ' done' : '');
  label.textContent = task.text;

  const del = document.createElement('button');
  del.className = 'delete-btn';
  del.dataset.id = task.id;
  del.title = '削除';
  del.textContent = '×';

  li.appendChild(cb);
  li.appendChild(label);
  li.appendChild(del);
  return li;
}

function render() {
  const list = document.getElementById('task-list');
  const footer = document.getElementById('footer');
  const countEl = document.getElementById('task-count');
  const clearBtn = document.getElementById('clear-completed');
  const toggleAllLabel = document.querySelector('.toggle-all-label');

  const visible = tasks.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  list.innerHTML = '';

  if (visible.length === 0 && tasks.length === 0) {
    const hint = document.createElement('li');
    hint.className = 'empty-hint';
    hint.textContent = 'タスクを追加してみましょう！';
    list.appendChild(hint);
  } else {
    visible.forEach(task => list.appendChild(createTaskElement(task)));
  }

  // Footer visibility
  if (tasks.length === 0) {
    footer.classList.add('hidden');
    return;
  }
  footer.classList.remove('hidden');

  // Count
  const activeCount = tasks.filter(t => !t.completed).length;
  countEl.textContent = `${activeCount} 件残り`;

  // Clear completed button
  const hasCompleted = tasks.some(t => t.completed);
  clearBtn.classList.toggle('hidden', !hasCompleted);

  // Toggle-all indicator
  const allDone = tasks.length > 0 && tasks.every(t => t.completed);
  toggleAllLabel.classList.toggle('toggle-all-active', allDone);
}

// ── Events ────────────────────────────────────────────────────────────────────
function wireEvents() {
  // Add task on Enter
  document.getElementById('new-task').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      addTask(e.target.value);
      e.target.value = '';
    }
  });

  // Toggle all
  document.getElementById('toggle-all').addEventListener('change', e => {
    toggleAll(e.target.checked);
  });

  // Delegated clicks on task list
  document.getElementById('task-list').addEventListener('click', e => {
    const id = Number(e.target.dataset.id);
    if (!id) return;
    if (e.target.classList.contains('task-checkbox')) toggleTask(id);
    if (e.target.classList.contains('delete-btn')) deleteTask(id);
  });

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => setFilter(btn.dataset.filter));
  });

  // Clear completed
  document.getElementById('clear-completed').addEventListener('click', clearCompleted);
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  render();
  wireEvents();
});
