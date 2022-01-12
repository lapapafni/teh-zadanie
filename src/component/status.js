export const Status = ({status}) => {

    switch (status){
        case 0:
            return <h6 className="card-subtitle mb-2 text-muted">Не выполнена</h6>
        case 1:
            return <h6 className="card-subtitle mb-2 text-muted">Не выполнена, отредактирована администратором</h6>
        case 10:
            return <h6 className="card-subtitle mb-2 text-muted">Выполенена</h6>
        case 11:
            return <h6 className="card-subtitle mb-2 text-muted">Выполенена, отредактирована администратором</h6>
        default:
            return <>Неизвестный статус</>
    }
}