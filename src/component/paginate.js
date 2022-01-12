export const Paginate = (data) => {

    const pages = Number(data.numTasks) / 3
    const style = [
        {left: 125, position: 'absolute'},
        {right: 540, position: 'absolute'}
    ]
    
    if(1 !== data.page && Math.ceil(pages) !== data.page){
        return (
            <><button style={style[0]} className="page-link" onClick={data.previewButton}>Previous</button>
            <button style={style[1]} className="page-link" onClick={data.nextButton}>Next</button></>
        )
    }

    if(1 !== data.page){
        return <button style={style[0]} className="page-link" onClick={data.previewButton}>Previous</button>
    }

    if(Math.ceil(pages) !== data.page){
        return <button style={style[1]} className="page-link" onClick={data.nextButton}>Next</button>
    }
    
    
}