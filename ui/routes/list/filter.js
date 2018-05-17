const Filter = ({ task, uri, dateFrom, dateTo, project }) => (
  <form class="result-filter">
    <input type="hidden" name="project" value={project} />
    <div class="column">
      <label for="task">Task</label>
      <input
        type="text"
        placeholder="Task"
        name="task"
        id="task"
        value={task}
      />
    </div>
    <div class="column">
      <label for="url">URL</label>
      <input type="url" placeholder="URL" name="uri" id="url" value={uri} />
    </div>
    <div class="column">
      <label for="dateFrom">Date from</label>
      <input
        type="date"
        placeholder="Date from"
        name="dateFrom"
        id="dateFrom"
        value={dateFrom}
      />
    </div>
    <div class="column">
      <label for="dateTo">Date to</label>
      <input
        type="date"
        placeholder="Date to"
        name="dateTo"
        id="dateTo"
        value={dateTo}
      />
    </div>
    <div class="column">
      <a href={`/list?project=${project}`}>reset</a>
      <button class="btn btn--primary">search</button>
    </div>
  </form>
);

export default Filter;
