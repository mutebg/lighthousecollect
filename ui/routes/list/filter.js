const Filter = ({ task, uri, dateFrom, dateTo, project }) => (
  <form class="result-filter">
    <input type="hidden" name="project" value={project} />
    <div class="row">
      <div class="column">
        <input type="text" placeholder="Task" name="task" value={task} />
      </div>
      <div class="column">
        <input type="url" placeholder="URL" name="uri" value={uri} />
      </div>
      <div class="column">
        <input
          type="date"
          placeholder="Date from"
          name="dateFrom"
          value={dateFrom}
        />
      </div>
      <div class="column">
        <input type="date" placeholder="Date to" name="dateTo" value={dateTo} />
      </div>
      <div class="column">
        <button>search</button>
      </div>
    </div>
  </form>
);

export default Filter;
