export const Filter = (data) => {

    const sortDirectionCheck = localStorage.getItem('sortDirection') === 'true'
    const sortFieldId = localStorage.getItem('sortFieldId') === 'true'
    const sortFieldUsername = localStorage.getItem('sortFieldUsername') === 'true'
    const sortFieldEmail = localStorage.getItem('sortFieldEmail') === 'true'
    const sortFieldStatus = localStorage.getItem('sortFieldStatus') === 'true'
    

    return (
        <div style={{position: 'absolute', top:200, right:150}}>
            <h5>Сортировка:</h5>
        <div className="form-check">
            <input className="form-check-input" checked={sortDirectionCheck} type="checkbox" name="sortDirection" onChange={data.filterTasks} />
            <label className="form-check-label" htmlFor="flexCheckDefault">
                 Отображать последние задачи
            </label>
        </div>
        <div className="form-check">
            <input className="form-check-input" disabled={sortFieldEmail || sortFieldUsername || sortFieldStatus} checked={sortFieldId} type="checkbox" name="sortFieldId" onChange={data.filterTasks} />
            <label className="form-check-label" htmlFor="flexCheckDefault">
                 Отображать по id
            </label>
        </div>
        <div className="form-check">
            <input className="form-check-input"disabled={sortFieldEmail || sortFieldStatus || sortFieldId} checked={sortFieldUsername} type="checkbox" name="sortFieldUsername" onChange={data.filterTasks} />
            <label className="form-check-label" htmlFor="flexCheckDefault">
                 Отображать по имени
            </label>
        </div>
        <div className="form-check">
            <input className="form-check-input" disabled={sortFieldStatus || sortFieldUsername || sortFieldId} checked={sortFieldEmail} type="checkbox" name="sortFieldEmail" onChange={data.filterTasks} />
            <label className="form-check-label" htmlFor="flexCheckDefault">
                 Отображать по email
            </label>
        </div>
        <div className="form-check">
            <input className="form-check-input" disabled={sortFieldEmail || sortFieldUsername || sortFieldId} checked={sortFieldStatus} type="checkbox" name="sortFieldStatus" onChange={data.filterTasks} />
            <label className="form-check-label" htmlFor="flexCheckDefault">
                 Отображать по статусу
            </label>
        </div>
        </div>
    )
}