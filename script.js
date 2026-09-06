const STORAGE_KEY = "carecue-reminders-v1";

const state = {
  reminders: loadReminders(),
  filter: "all",
};

const elements = {
  todayLabel: document.querySelector("#todayLabel"),
  footerYear: document.querySelector("#footerYear"),
  form: document.querySelector("#reminderForm"),
  titleInput: document.querySelector("#reminderTitle"),
  dateInput: document.querySelector("#reminderDate"),
  timeInput: document.querySelector("#reminderTime"),
  noteInput: document.querySelector("#reminderNote"),
  list: document.querySelector("#reminderList"),
  listSummary: document.querySelector("#listSummary"),
  clearCompleted: document.querySelector("#clearCompletedButton"),
  pendingCount: document.querySelector("#pendingCount"),
  completedCount: document.querySelector("#completedCount"),
  totalCount: document.querySelector("#totalCount"),
  progressBar: document.querySelector("#progressBar"),
  progressTrack: document.querySelector(".progress-track"),
  progressPercent: document.querySelector("#progressPercent"),
  progressMessage: document.querySelector("#progressMessage"),
  toast: document.querySelector("#toast"),
  toastMessage: document.querySelector("#toastMessage"),
  addPanel: document.querySelector("#addPanel"),
  helpButton: document.querySelector("#helpButton"),
  aboutDialog: document.querySelector("#aboutDialog"),
  closeDialog: document.querySelector("#closeDialogButton"),
  dialogDone: document.querySelector("#dialogDoneButton"),
};

const icons = {
  check: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="m6.8 12.2 3.4 3.4 7-7.25" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  clock: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.3" stroke="currentColor" stroke-width="1.8"/><path d="M12 7.7v4.65l3.05 1.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  trash: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M5.8 7.2h12.4M9.25 7.2V5.6h5.5v1.6M8 10.1v6.5m4-6.5v6.5m4-6.5v6.5M7.1 7.2l.75 12h8.3l.75-12" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  note: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M5.5 5.8h13v12.4h-13zM8.5 9h7M8.5 12h7M8.5 15h4.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

init();

function init() {
  setDateLabels();
  setDefaultFormValues();
  bindEvents();
  render();
}

function bindEvents() {
  elements.form.addEventListener("submit", handleAddReminder);
  elements.list.addEventListener("click", handleListClick);
  elements.clearCompleted.addEventListener("click", clearCompleted);

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.filter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((tab) => {
        const active = tab === button;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
      });
      renderList();
    });
  });

  document.querySelectorAll("[data-focus-form]").forEach((button) => {
    button.addEventListener("click", focusForm);
  });

  elements.helpButton.addEventListener("click", () => elements.aboutDialog.showModal());
  elements.closeDialog.addEventListener("click", () => elements.aboutDialog.close());
  elements.dialogDone.addEventListener("click", () => elements.aboutDialog.close());
  elements.aboutDialog.addEventListener("click", (event) => {
    if (event.target === elements.aboutDialog) elements.aboutDialog.close();
  });
}

function setDateLabels() {
  const now = new Date();
  elements.todayLabel.textContent = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(now);
  elements.footerYear.textContent = now.getFullYear();
}

function setDefaultFormValues() {
  const now = new Date();
  elements.dateInput.value = toDateInputValue(now);
  elements.dateInput.min = toDateInputValue(now);
  elements.timeInput.value = getRoundedTime(now);
}

function handleAddReminder(event) {
  event.preventDefault();
  const formData = new FormData(elements.form);
  const title = String(formData.get("title") || "").trim();
  const date = String(formData.get("date") || "");
  const time = String(formData.get("time") || "");
  const note = String(formData.get("note") || "").trim();

  if (!title || !date || !time) {
    elements.form.reportValidity();
    return;
  }

  state.reminders.push({
    id: createId(),
    title,
    date,
    time,
    note,
    completed: false,
    status: "pending",
    createdAt: new Date().toISOString(),
    completedAt: null,
  });

  persist();
  elements.form.reset();
  setDefaultFormValues();
  state.filter = "all";
  syncFilterTabs();
  render();
  showToast("Reminder saved");
  elements.titleInput.focus();
}

function handleListClick(event) {
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;
  const item = actionButton.closest("[data-id]");
  if (!item) return;

  const id = item.dataset.id;
  const reminder = state.reminders.find((entry) => entry.id === id);
  if (!reminder) return;

  if (actionButton.dataset.action === "toggle") {
    reminder.completed = !reminder.completed;
    reminder.status = reminder.completed ? "completed" : "pending";
    reminder.completedAt = reminder.completed ? new Date().toISOString() : null;
    persist();
    render();
    showToast(reminder.completed ? "Reminder completed" : "Reminder marked pending");
  }

  if (actionButton.dataset.action === "delete") {
    state.reminders = state.reminders.filter((entry) => entry.id !== id);
    persist();
    render();
    showToast("Reminder deleted");
  }
}

function clearCompleted() {
  const completedTotal = state.reminders.filter((reminder) => reminder.completed).length;
  if (!completedTotal) return;
  state.reminders = state.reminders.filter((reminder) => !reminder.completed);
  persist();
  render();
  showToast(`${completedTotal} completed ${completedTotal === 1 ? "reminder" : "reminders"} cleared`);
}

function render() {
  renderStats();
  renderProgress();
  renderList();
}

function renderStats() {
  const pending = state.reminders.filter((reminder) => !reminder.completed).length;
  const completedToday = state.reminders.filter((reminder) => reminder.completed && isToday(reminder.completedAt)).length;
  elements.pendingCount.textContent = pending;
  elements.completedCount.textContent = completedToday;
  elements.totalCount.textContent = state.reminders.length;
}

function renderProgress() {
  const today = toDateInputValue(new Date());
  const todaysReminders = state.reminders.filter((reminder) => reminder.date === today);
  const done = todaysReminders.filter((reminder) => reminder.completed).length;
  const percentage = todaysReminders.length ? Math.round((done / todaysReminders.length) * 100) : 0;
  elements.progressBar.style.width = `${percentage}%`;
  elements.progressPercent.textContent = `${percentage}%`;
  elements.progressTrack.setAttribute("aria-valuenow", percentage);

  if (!todaysReminders.length) {
    elements.progressMessage.textContent = "A clear start makes a calmer day.";
  } else if (percentage === 100) {
    elements.progressMessage.textContent = "Everything for today is complete.";
  } else if (percentage >= 50) {
    elements.progressMessage.textContent = "You’re making good progress today.";
  } else {
    elements.progressMessage.textContent = "One small step at a time.";
  }
}

function renderList() {
  const filtered = state.reminders
    .filter((reminder) => state.filter === "all" || (state.filter === "completed" ? reminder.completed : !reminder.completed))
    .sort(sortReminders);

  const total = state.reminders.length;
  const filterLabel = state.filter === "all" ? "reminder" : `${state.filter} reminder`;
  elements.listSummary.textContent = filtered.length
    ? `${filtered.length} ${filterLabel}${filtered.length === 1 ? "" : "s"}${state.filter === "all" && total !== filtered.length ? ` · ${total} total` : ""}`
    : state.filter === "all" ? "No reminders yet" : `No ${state.filter} reminders`;

  elements.clearCompleted.hidden = !state.reminders.some((reminder) => reminder.completed);

  if (!filtered.length) {
    elements.list.innerHTML = emptyState();
    return;
  }

  elements.list.innerHTML = filtered.map(reminderTemplate).join("");
}

function reminderTemplate(reminder) {
  const dateLabel = formatDate(reminder.date);
  const showDate = reminder.date !== toDateInputValue(new Date());
  const safeTitle = escapeHtml(reminder.title);
  const safeNote = escapeHtml(reminder.note);
  return `
    <article class="reminder-item ${reminder.completed ? "is-complete" : ""}" data-id="${reminder.id}">
      <button class="reminder-check" type="button" data-action="toggle" aria-label="${reminder.completed ? "Mark as pending" : "Mark as completed"}: ${safeTitle}">
        ${icons.check}
      </button>
      <div class="reminder-content">
        <p class="reminder-title">${safeTitle}</p>
        <div class="reminder-details">
          <span class="reminder-time">${icons.clock}${formatTime(reminder.time)}</span>
          ${showDate ? `<span class="detail-dot" aria-hidden="true"></span><span>${dateLabel}</span>` : ""}
          ${safeNote ? `<span class="detail-dot" aria-hidden="true"></span><span class="reminder-note">${icons.note}${safeNote}</span>` : ""}
        </div>
      </div>
      <div class="reminder-actions">
        <span class="status-badge">${reminder.completed ? "Done" : "Pending"}</span>
        <button class="delete-button" type="button" data-action="delete" aria-label="Delete ${safeTitle}" title="Delete reminder">${icons.trash}</button>
      </div>
    </article>
  `;
}

function emptyState() {
  const isFiltered = state.filter !== "all";
  return `
    <div class="empty-state">
      <div class="empty-illustration" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none">
          <path d="M9.5 12.3V9.65a6.5 6.5 0 0 1 13 0v2.65M6.2 12.5h19.6l-1.5 12H7.7l-1.5-12Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
          <path d="M16 16.15v4.55M13.7 18.4h4.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </div>
      <h3>${isFiltered ? `No ${state.filter} reminders` : "Your list is clear"}</h3>
      <p>${isFiltered ? "Try another view to see the reminders in your care list." : "Add your first reminder and it will appear here, ready when you are."}</p>
    </div>
  `;
}

function syncFilterTabs() {
  document.querySelectorAll("[data-filter]").forEach((tab) => {
    const active = tab.dataset.filter === state.filter;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });
}

function focusForm() {
  elements.addPanel.scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(() => elements.titleInput.focus(), 350);
}

function loadReminders() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const reminders = JSON.parse(stored);
    return Array.isArray(reminders)
      ? reminders.filter(isValidReminder).map(normalizeReminder)
      : [];
  } catch (error) {
    console.warn("CareCue could not load saved reminders.", error);
    return [];
  }
}

function normalizeReminder(reminder) {
  const completed = reminder.completed === true ||
    reminder.status === "completed" ||
    reminder.status === "complete";

  return {
    ...reminder,
    completed,
    status: completed ? "completed" : "pending",
    completedAt: completed ? (reminder.completedAt || null) : null,
  };
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.reminders));
  } catch (error) {
    console.warn("CareCue could not save reminders.", error);
    showToast("Could not save on this device");
  }
}

function isValidReminder(reminder) {
  return reminder && typeof reminder === "object" && typeof reminder.title === "string" &&
    typeof reminder.date === "string" && typeof reminder.time === "string";
}

function sortReminders(a, b) {
  if (a.completed !== b.completed) return Number(a.completed) - Number(b.completed);
  return `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`);
}

function formatTime(time) {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(date);
}

function formatDate(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(date);
}

function isToday(isoDate) {
  if (!isoDate) return false;
  return toDateInputValue(new Date(isoDate)) === toDateInputValue(new Date());
}

function toDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getRoundedTime(date) {
  const rounded = new Date(date);
  rounded.setMinutes(Math.ceil((rounded.getMinutes() + 1) / 15) * 15, 0, 0);
  return `${String(rounded.getHours()).padStart(2, "0")}:${String(rounded.getMinutes()).padStart(2, "0")}`;
}

function createId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

let toastTimer;
function showToast(message) {
  elements.toastMessage.textContent = message;
  elements.toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 2500);
}